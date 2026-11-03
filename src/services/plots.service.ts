import { Plot, PlotFilterCriteria, PlotAvailability } from '@/types/plot';
import { INITIAL_PLOTS } from './plots.data';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';

const STORAGE_KEY = 'swarna_bhoomi_plots_v1';
let inMemoryPlots: Plot[] = [...INITIAL_PLOTS];

/**
 * Retrieves the working plot dataset.
 * Uses browser localStorage when available to preserve admin updates,
 * falling back to inMemoryPlots / INITIAL_PLOTS seed data.
 */
export function getStoredPlots(): Plot[] {
  if (typeof window === 'undefined') {
    return inMemoryPlots;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PLOTS));
      inMemoryPlots = [...INITIAL_PLOTS];
      return inMemoryPlots;
    }
    const parsed = JSON.parse(raw);
    inMemoryPlots = Array.isArray(parsed) && parsed.length > 0 ? parsed : [...INITIAL_PLOTS];
    return inMemoryPlots;
  } catch (err) {
    console.warn('Failed to load plots from localStorage, using initial seed', err);
    return inMemoryPlots;
  }
}

/**
 * Persists plot array to memory and localStorage
 */
export function saveStoredPlots(plots: Plot[]): void {
  inMemoryPlots = [...plots];
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(plots));
    } catch (err) {
      console.error('Failed to save plots to localStorage', err);
    }
  }
}

/**
 * Primary Plot Search & Filtering Logic.
 * If Supabase is connected, it can query PostgreSQL, or run client-side/isomorphic
 * against the verified plot repository with exact mathematical matching.
 */
export async function searchPlots(criteria: PlotFilterCriteria): Promise<{
  plots: Plot[];
  totalMatches: number;
  totalInventory: number;
}> {
  // If Supabase is active, we can run queries against PostgreSQL
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from('plots').select('*, phases(phase_name, phase_number)');

      // Phase filter
      if (criteria.phase !== 'All') {
        query = query.eq('phase_number', criteria.phase);
      }

      // Availability filter
      if (criteria.availability !== 'All') {
        query = query.eq('availability', criteria.availability);
      }

      // Facing filter
      if (criteria.facing !== 'All') {
        query = query.eq('facing', criteria.facing);
      }

      // Area filter based on searchMode
      if (criteria.area && criteria.area > 0) {
        if (criteria.searchMode === 'exact') {
          query = query.eq('area_sqft', criteria.area);
        } else if (criteria.searchMode === 'nearby') {
          const tol = criteria.tolerance || 50;
          query = query
            .gte('area_sqft', Math.max(0, criteria.area - tol))
            .lte('area_sqft', criteria.area + tol);
        } else if (criteria.searchMode === 'min') {
          query = query.gte('area_sqft', criteria.area);
        }
      }

      // Dimensions
      if (criteria.minWidth && criteria.minWidth > 0) {
        query = query.gte('width_feet', criteria.minWidth);
      }
      if (criteria.minLength && criteria.minLength > 0) {
        query = query.gte('length_feet', criteria.minLength);
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        // Map Supabase rows to Plot model
        const mapped: Plot[] = data.map((row: any) => ({
          id: row.id,
          projectId: row.project_id,
          phaseId: row.phase_id,
          phaseNumber: row.phases?.phase_number || 1,
          phaseName: row.phases?.phase_name || `Phase ${row.phases?.phase_number || 1}`,
          plotNumber: row.plot_number,
          areaSqft: Number(row.area_sqft),
          facing: row.facing,
          widthFeet: row.width_feet ? Number(row.width_feet) : null,
          lengthFeet: row.length_feet ? Number(row.length_feet) : null,
          availability: row.availability as PlotAvailability,
          layoutX: row.layout_x ? Number(row.layout_x) : null,
          layoutY: row.layout_y ? Number(row.layout_y) : null,
          layoutWidth: row.layout_width ? Number(row.layout_width) : null,
          layoutHeight: row.layout_height ? Number(row.layout_height) : null,
          isCorner: Boolean(row.is_corner),
          notes: row.notes,
        }));

        return sortAndReturn(mapped, criteria, mapped.length);
      }
    } catch (dbError) {
      console.warn('Supabase query failed, falling back to local dataset', dbError);
    }
  }

  // Authoritative local / in-memory execution
  const allPlots = getStoredPlots();
  const totalInventory = allPlots.length;

  let filtered = allPlots.filter((plot) => {
    // 1. Phase Filter
    if (criteria.phase !== 'All' && plot.phaseNumber !== criteria.phase) {
      return false;
    }

    // 2. Availability Filter
    if (criteria.availability !== 'All' && plot.availability !== criteria.availability) {
      return false;
    }

    // 3. Facing Filter
    if (criteria.facing !== 'All' && plot.facing !== criteria.facing) {
      return false;
    }

    // 4. Area Search Modes
    if (criteria.area && criteria.area > 0) {
      const targetArea = criteria.area;
      if (criteria.searchMode === 'exact') {
        if (Math.round(plot.areaSqft) !== Math.round(targetArea)) {
          return false;
        }
      } else if (criteria.searchMode === 'nearby') {
        const tol = Math.max(10, criteria.tolerance ?? 50);
        const minA = targetArea - tol;
        const maxA = targetArea + tol;
        if (plot.areaSqft < minA || plot.areaSqft > maxA) {
          return false;
        }
      } else if (criteria.searchMode === 'min') {
        if (plot.areaSqft < targetArea) {
          return false;
        }
      }
    }

    // 5. Dimension Filters
    if (criteria.minWidth && criteria.minWidth > 0) {
      if (!plot.widthFeet || plot.widthFeet < criteria.minWidth) {
        return false;
      }
    }
    if (criteria.minLength && criteria.minLength > 0) {
      if (!plot.lengthFeet || plot.lengthFeet < criteria.minLength) {
        return false;
      }
    }

    return true;
  });

  return sortAndReturn(filtered, criteria, totalInventory);
}

function sortAndReturn(
  plots: Plot[],
  criteria: PlotFilterCriteria,
  totalInventory: number
): { plots: Plot[]; totalMatches: number; totalInventory: number } {
  const sorted = [...plots].sort((a, b) => {
    switch (criteria.sortBy) {
      case 'area_asc':
        return a.areaSqft - b.areaSqft;
      case 'area_desc':
        return b.areaSqft - a.areaSqft;
      case 'plot_asc':
        return parseInt(a.plotNumber, 10) - parseInt(b.plotNumber, 10) || a.plotNumber.localeCompare(b.plotNumber);
      case 'phase_asc':
        return a.phaseNumber - b.phaseNumber;
      default:
        return 0;
    }
  });

  return {
    plots: sorted,
    totalMatches: sorted.length,
    totalInventory,
  };
}

/**
 * Fetch a single plot by ID or plot number
 */
export function getPlotById(id: string): Plot | undefined {
  const plots = getStoredPlots();
  return plots.find((p) => p.id === id);
}

/**
 * Add a new plot (Admin function)
 */
export function addPlot(newPlotData: Omit<Plot, 'id'>): { success: boolean; error?: string; plot?: Plot } {
  const plots = getStoredPlots();

  // Validate duplicate plot number in the same phase
  const exists = plots.some(
    (p) => p.phaseNumber === newPlotData.phaseNumber && p.plotNumber.trim() === newPlotData.plotNumber.trim()
  );
  if (exists) {
    return { success: false, error: `Plot ${newPlotData.plotNumber} already exists in Phase ${newPlotData.phaseNumber}.` };
  }

  if (newPlotData.areaSqft <= 0) {
    return { success: false, error: 'Plot area must be greater than 0 sq.ft.' };
  }

  const newPlot: Plot = {
    ...newPlotData,
    id: `plot-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const updated = [...plots, newPlot];
  saveStoredPlots(updated);

  // If Supabase is connected, attempt sync
  if (isSupabaseConfigured && supabase) {
    supabase
      .from('plots')
      .insert({
        project_id: 'a1b2c3d4-e5f6-7890-1234-56789abcdef0',
        phase_id: `b1b2c3d4-e5f6-7890-1234-56789abcdef${newPlot.phaseNumber}`,
        plot_number: newPlot.plotNumber,
        area_sqft: newPlot.areaSqft,
        facing: newPlot.facing,
        width_feet: newPlot.widthFeet,
        length_feet: newPlot.lengthFeet,
        availability: newPlot.availability,
        layout_x: newPlot.layoutX,
        layout_y: newPlot.layoutY,
        layout_width: newPlot.layoutWidth,
        layout_height: newPlot.layoutHeight,
      })
      .then(({ error }) => {
        if (error) console.warn('Supabase plot insert error:', error.message);
      });
  }

  return { success: true, plot: newPlot };
}

/**
 * Update an existing plot (Admin function)
 */
export function updatePlot(
  id: string,
  updates: Partial<Omit<Plot, 'id'>>
): { success: boolean; error?: string; plot?: Plot } {
  const plots = getStoredPlots();
  const index = plots.findIndex((p) => p.id === id);

  if (index === -1) {
    return { success: false, error: 'Plot record not found.' };
  }

  const current = plots[index];

  // If phase or plot number is changed, check uniqueness
  if (
    (updates.plotNumber && updates.plotNumber !== current.plotNumber) ||
    (updates.phaseNumber && updates.phaseNumber !== current.phaseNumber)
  ) {
    const targetPhase = updates.phaseNumber ?? current.phaseNumber;
    const targetNumber = updates.plotNumber ?? current.plotNumber;
    const duplicate = plots.some(
      (p) => p.id !== id && p.phaseNumber === targetPhase && p.plotNumber.trim() === targetNumber.trim()
    );
    if (duplicate) {
      return { success: false, error: `Plot ${targetNumber} already exists in Phase ${targetPhase}.` };
    }
  }

  if (updates.areaSqft !== undefined && updates.areaSqft <= 0) {
    return { success: false, error: 'Plot area must be greater than 0 sq.ft.' };
  }

  const updatedPlot: Plot = {
    ...current,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  plots[index] = updatedPlot;
  saveStoredPlots(plots);

  // Supabase sync
  if (isSupabaseConfigured && supabase) {
    supabase
      .from('plots')
      .update({
        plot_number: updatedPlot.plotNumber,
        area_sqft: updatedPlot.areaSqft,
        facing: updatedPlot.facing,
        width_feet: updatedPlot.widthFeet,
        length_feet: updatedPlot.lengthFeet,
        availability: updatedPlot.availability,
        layout_x: updatedPlot.layoutX,
        layout_y: updatedPlot.layoutY,
      })
      .eq('id', id)
      .then(({ error }) => {
        if (error) console.warn('Supabase plot update error:', error.message);
      });
  }

  return { success: true, plot: updatedPlot };
}

/**
 * Delete a plot (Admin function)
 */
export function deletePlot(id: string): { success: boolean; error?: string } {
  const plots = getStoredPlots();
  const filtered = plots.filter((p) => p.id !== id);

  if (filtered.length === plots.length) {
    return { success: false, error: 'Plot not found.' };
  }

  saveStoredPlots(filtered);

  if (isSupabaseConfigured && supabase) {
    supabase.from('plots').delete().eq('id', id);
  }

  return { success: true };
}

/**
 * Reset dataset back to initial audited seed
 */
export function resetPlotsToSeed(): void {
  saveStoredPlots(INITIAL_PLOTS);
}

/**
 * CSV / JSON Import validation & batch execution
 */
export interface ImportResult {
  totalProcessed: number;
  importedCount: number;
  skippedCount: number;
  errors: string[];
}

export function importPlotsFromCSV(csvText: string): ImportResult {
  const lines = csvText.split(/\r?\n/).filter((l) => l.trim().length > 0);
  const result: ImportResult = {
    totalProcessed: 0,
    importedCount: 0,
    skippedCount: 0,
    errors: [],
  };

  if (lines.length < 2) {
    result.errors.push('CSV file is empty or missing data rows.');
    return result;
  }

  // Parse header
  const header = lines[0].split(',').map((h) => h.trim().toLowerCase());
  const plotNumIdx = header.findIndex((h) => h.includes('plot'));
  const phaseIdx = header.findIndex((h) => h.includes('phase'));
  const areaIdx = header.findIndex((h) => h.includes('area') || h.includes('sqft'));
  const facingIdx = header.findIndex((h) => h.includes('facing'));
  const widthIdx = header.findIndex((h) => h.includes('width'));
  const lengthIdx = header.findIndex((h) => h.includes('length'));
  const availIdx = header.findIndex((h) => h.includes('avail') || h.includes('status'));

  if (plotNumIdx === -1 || areaIdx === -1) {
    result.errors.push('Required columns missing: CSV must include at least "Plot" and "Area".');
    return result;
  }

  const existingPlots = getStoredPlots();
  const newPlots: Plot[] = [];

  for (let i = 1; i < lines.length; i++) {
    result.totalProcessed++;
    const row = lines[i].split(',').map((cell) => cell.trim());
    const plotNumber = row[plotNumIdx];
    const rawArea = row[areaIdx];

    if (!plotNumber || !rawArea) {
      result.skippedCount++;
      result.errors.push(`Row ${i + 1}: Missing plot number or area.`);
      continue;
    }

    const areaSqft = parseFloat(rawArea);
    if (isNaN(areaSqft) || areaSqft <= 0) {
      result.skippedCount++;
      result.errors.push(`Row ${i + 1}: Invalid area "${rawArea}". Must be a positive number.`);
      continue;
    }

    const phaseNumber = phaseIdx !== -1 && parseInt(row[phaseIdx], 10) ? parseInt(row[phaseIdx], 10) : 1;
    const facingRaw = facingIdx !== -1 ? row[facingIdx] : null;
    const facing = ['North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West'].includes(
      facingRaw || ''
    )
      ? (facingRaw as any)
      : null;

    const widthFeet = widthIdx !== -1 && parseFloat(row[widthIdx]) ? parseFloat(row[widthIdx]) : null;
    const lengthFeet = lengthIdx !== -1 && parseFloat(row[lengthIdx]) ? parseFloat(row[lengthIdx]) : null;

    const availRaw = availIdx !== -1 ? row[availIdx] : 'Available';
    const availability: PlotAvailability =
      availRaw === 'Sold' ? 'Sold' : availRaw === 'Reserved' ? 'Reserved' : 'Available';

    // Duplicate check
    const isDuplicate =
      existingPlots.some((p) => p.phaseNumber === phaseNumber && p.plotNumber === plotNumber) ||
      newPlots.some((p) => p.phaseNumber === phaseNumber && p.plotNumber === plotNumber);

    if (isDuplicate) {
      result.skippedCount++;
      result.errors.push(`Row ${i + 1}: Duplicate Plot ${plotNumber} in Phase ${phaseNumber}.`);
      continue;
    }

    newPlots.push({
      id: `imported-${Date.now()}-${i}`,
      projectId: 'proj-swarna-bhoomi',
      phaseId: `phase-${phaseNumber}`,
      phaseNumber,
      phaseName: `Phase ${phaseNumber}`,
      plotNumber,
      areaSqft,
      facing,
      widthFeet,
      lengthFeet,
      availability,
      layoutX: 100 + (newPlots.length % 10) * 60,
      layoutY: 100 + Math.floor(newPlots.length / 10) * 60,
      layoutWidth: 50,
      layoutHeight: 40,
    });

    result.importedCount++;
  }

  if (newPlots.length > 0) {
    saveStoredPlots([...existingPlots, ...newPlots]);
  }

  return result;
}
