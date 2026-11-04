import {
  Plot,
  PlotFilterCriteria,
  PlotAvailability,
  SmartPlotPreferences,
  SmartPlotResponse,
} from '@/types/plot';
import { INITIAL_PLOTS } from './plots.data';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';

const STORAGE_KEY = 'swarna_bhoomi_plots_v1';
let inMemoryPlots: Plot[] = [...INITIAL_PLOTS];

/**
 * Normalizes any plot object so all required attributes are populated.
 */
function normalizePlot(plot: Plot): Plot {
  const pricePerSqft = plot.pricePerSqft ?? (plot.isCorner ? 1200 : 1150);
  const price = plot.price ?? Math.round(plot.areaSqft * pricePerSqft);
  const roadWidth = plot.roadWidthFeet ?? (plot.isCorner ? 40 : 30);
  const cornerPosition =
    plot.cornerPosition ??
    (plot.isCorner
      ? `Corner plot adjoining ${roadWidth}ft Main Avenue & 30ft Sector Cross Road`
      : null);
  const description =
    plot.description ??
    `Prime residential plot #${plot.plotNumber} situated in ${plot.phaseName} of Swarna Bhoomi Township. Features ${plot.facing || 'East'} orientation, direct access to ${roadWidth}ft blacktop road, and official DTCP approved boundary demarcation.`;
  const additionalSpecifications = plot.additionalSpecifications ?? {
    'Approval Status': 'DTCP Approved (No: 92/2026)',
    'Survey Number': '143/1A1B, Krishnapuram',
    'Bank Loan': '80% Approved (SBI / HDFC / Axis Bank)',
    'Groundwater': 'Sweet Potable Water at 35–45 ft depth',
    'Road Infrastructure': `${roadWidth}ft Tar Blacktop with Kerb Stones`,
    'Demarcation': 'Numbered Concrete Survey Stone Placed',
    'Title & Registration': 'Clear Parent Title, Immediate Registration & Patta',
  };
  const images =
    plot.images && plot.images.length > 0
      ? plot.images
      : [
          '/assets/site/layout-plan.jpg',
          '/assets/site/hero-banner.jpg',
          '/assets/site/concepts.jpg',
          '/assets/site/plot-details.jpg',
        ];

  return {
    ...plot,
    price,
    pricePerSqft,
    roadWidthFeet: roadWidth,
    cornerPosition,
    description,
    images,
    additionalSpecifications,
  };
}

/**
 * Retrieves the working plot dataset.
 * Uses browser localStorage when available to preserve admin updates,
 * falling back to inMemoryPlots / INITIAL_PLOTS seed data.
 */
export function getStoredPlots(): Plot[] {
  if (typeof window === 'undefined') {
    return inMemoryPlots.map(normalizePlot);
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PLOTS));
      inMemoryPlots = [...INITIAL_PLOTS];
      return inMemoryPlots.map(normalizePlot);
    }
    const parsed = JSON.parse(raw);
    inMemoryPlots =
      Array.isArray(parsed) && parsed.length > 0 ? parsed : [...INITIAL_PLOTS];
    return inMemoryPlots.map(normalizePlot);
  } catch (err) {
    console.warn('Failed to load plots from localStorage, using initial seed', err);
    return inMemoryPlots.map(normalizePlot);
  }
}

/**
 * Persists plot array to memory and localStorage
 */
export function saveStoredPlots(plots: Plot[]): void {
  const normalized = plots.map(normalizePlot);
  inMemoryPlots = [...normalized];
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    } catch (err) {
      console.error('Failed to save plots to localStorage', err);
    }
  }
}

/**
 * SMART PLOT MATCHING ENGINE
 *
 * Filters inventory by customer preferences (size, budget, facing, corner, phase, status)
 * and returns paginated, logically sorted results.
 */
export async function searchPlotsSmart(
  preferences: SmartPlotPreferences
): Promise<SmartPlotResponse> {
  const allPlots = getStoredPlots();
  const totalInventory = allPlots.length;

  const {
    minArea,
    maxArea,
    minBudget,
    maxBudget,
    facing = 'All',
    cornerPreference = 'any',
    phase = 'All',
    availability = 'Available',
    sortBy = 'price_asc',
    page = 1,
    limit = 5,
  } = preferences;

  // Filter according to customer requirements
  const matched = allPlots.filter((plot) => {
    // 1. Availability Status
    if (availability !== 'All' && plot.availability !== availability) {
      return false;
    }

    // 2. Phase Filter
    if (phase !== 'All' && plot.phaseNumber !== Number(phase)) {
      return false;
    }

    // 3. Facing Direction
    if (facing !== 'All') {
      if (!plot.facing || plot.facing.toLowerCase() !== facing.toLowerCase()) {
        return false;
      }
    }

    // 4. Corner Plot Preference
    if (cornerPreference === 'corner_only' && !plot.isCorner) {
      return false;
    }
    if (cornerPreference === 'non_corner' && plot.isCorner) {
      return false;
    }

    // 5. Plot Size / Area in Sq.Ft.
    if (minArea !== null && minArea !== undefined && minArea > 0) {
      if (plot.areaSqft < minArea) {
        return false;
      }
    }
    if (maxArea !== null && maxArea !== undefined && maxArea > 0) {
      if (plot.areaSqft > maxArea) {
        return false;
      }
    }

    // 6. Budget in Indian Rupees (INR)
    const plotPrice = plot.price ?? Math.round(plot.areaSqft * (plot.isCorner ? 1200 : 1150));
    if (minBudget !== null && minBudget !== undefined && minBudget > 0) {
      if (plotPrice < minBudget) {
        return false;
      }
    }
    if (maxBudget !== null && maxBudget !== undefined && maxBudget > 0) {
      if (plotPrice > maxBudget) {
        return false;
      }
    }

    return true;
  });

  // Logical Sorting
  const sorted = [...matched].sort((a, b) => {
    const priceA = a.price ?? Math.round(a.areaSqft * (a.isCorner ? 1200 : 1150));
    const priceB = b.price ?? Math.round(b.areaSqft * (b.isCorner ? 1200 : 1150));

    switch (sortBy) {
      case 'price_asc':
        return priceA - priceB;
      case 'price_desc':
        return priceB - priceA;
      case 'area_asc':
        return a.areaSqft - b.areaSqft;
      case 'area_desc':
        return b.areaSqft - a.areaSqft;
      case 'plot_asc':
        return (
          parseInt(a.plotNumber, 10) - parseInt(b.plotNumber, 10) ||
          a.plotNumber.localeCompare(b.plotNumber)
        );
      case 'phase_asc':
        return a.phaseNumber - b.phaseNumber;
      default:
        return priceA - priceB;
    }
  });

  // Pagination (first 5, then next 5, etc.)
  const validPage = Math.max(1, page);
  const validLimit = Math.max(1, limit);
  const startIndex = (validPage - 1) * validLimit;
  const paginatedPlots = sorted.slice(startIndex, startIndex + validLimit);
  const totalMatches = sorted.length;
  const totalPages = Math.ceil(totalMatches / validLimit) || 1;
  const hasMore = startIndex + validLimit < totalMatches;

  return {
    plots: paginatedPlots,
    totalMatches,
    totalInventory,
    page: validPage,
    limit: validLimit,
    totalPages,
    hasMore,
  };
}

/**
 * Legacy Search & Filtering (preserved for backward compatibility with simulator)
 */
export async function searchPlots(criteria: PlotFilterCriteria): Promise<{
  plots: Plot[];
  totalMatches: number;
  totalInventory: number;
}> {
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from('plots').select('*, phases(phase_name, phase_number)');

      if (criteria.phase !== 'All') {
        query = query.eq('phase_number', criteria.phase);
      }
      if (criteria.availability !== 'All') {
        query = query.eq('availability', criteria.availability);
      }
      if (criteria.facing !== 'All') {
        query = query.eq('facing', criteria.facing);
      }
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
      if (criteria.minWidth && criteria.minWidth > 0) {
        query = query.gte('width_feet', criteria.minWidth);
      }
      if (criteria.minLength && criteria.minLength > 0) {
        query = query.gte('length_feet', criteria.minLength);
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
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
          price: row.price ? Number(row.price) : undefined,
          layoutX: row.layout_x ? Number(row.layout_x) : null,
          layoutY: row.layout_y ? Number(row.layout_y) : null,
          layoutWidth: row.layout_width ? Number(row.layout_width) : null,
          layoutHeight: row.layout_height ? Number(row.layout_height) : null,
          isCorner: Boolean(row.is_corner),
          notes: row.notes,
        }));

        return sortAndReturn(mapped.map(normalizePlot), criteria, mapped.length);
      }
    } catch (dbError) {
      console.warn('Supabase query failed, falling back to local dataset', dbError);
    }
  }

  const allPlots = getStoredPlots();
  const totalInventory = allPlots.length;

  const filtered = allPlots.filter((plot) => {
    if (criteria.phase !== 'All' && plot.phaseNumber !== criteria.phase) {
      return false;
    }
    if (criteria.availability !== 'All' && plot.availability !== criteria.availability) {
      return false;
    }
    if (criteria.facing !== 'All' && plot.facing !== criteria.facing) {
      return false;
    }
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
        return (
          parseInt(a.plotNumber, 10) - parseInt(b.plotNumber, 10) ||
          a.plotNumber.localeCompare(b.plotNumber)
        );
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
 * Fetch a single plot by ID or plotNumber
 */
export function getPlotById(idOrPlotNumber: string): Plot | undefined {
  const plots = getStoredPlots();
  const searchKey = idOrPlotNumber.trim().toLowerCase();

  return plots.find(
    (p) =>
      p.id.toLowerCase() === searchKey ||
      p.plotNumber.toLowerCase() === searchKey ||
      `plot-${p.plotNumber.toLowerCase()}` === searchKey ||
      `p${p.phaseNumber}-${p.plotNumber.toLowerCase()}` === searchKey
  );
}

/**
 * Add a new plot (Admin function)
 */
export function addPlot(newPlotData: Omit<Plot, 'id'>): {
  success: boolean;
  error?: string;
  plot?: Plot;
} {
  const plots = getStoredPlots();

  const exists = plots.some(
    (p) =>
      p.phaseNumber === newPlotData.phaseNumber &&
      p.plotNumber.trim() === newPlotData.plotNumber.trim()
  );
  if (exists) {
    return {
      success: false,
      error: `Plot ${newPlotData.plotNumber} already exists in Phase ${newPlotData.phaseNumber}.`,
    };
  }

  if (newPlotData.areaSqft <= 0) {
    return { success: false, error: 'Plot area must be greater than 0 sq.ft.' };
  }

  const pricePerSqft =
    newPlotData.pricePerSqft ??
    (newPlotData.price && newPlotData.areaSqft > 0
      ? Math.round(newPlotData.price / newPlotData.areaSqft)
      : newPlotData.isCorner
      ? 1200
      : 1150);

  const price =
    newPlotData.price ?? Math.round(newPlotData.areaSqft * pricePerSqft);

  const newPlot: Plot = normalizePlot({
    ...newPlotData,
    id: `plot-p${newPlotData.phaseNumber}-${newPlotData.plotNumber.trim()}`,
    price,
    pricePerSqft,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const updated = [...plots, newPlot];
  saveStoredPlots(updated);

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
        price: newPlot.price,
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

  if (
    (updates.plotNumber && updates.plotNumber !== current.plotNumber) ||
    (updates.phaseNumber && updates.phaseNumber !== current.phaseNumber)
  ) {
    const targetPhase = updates.phaseNumber ?? current.phaseNumber;
    const targetNumber = updates.plotNumber ?? current.plotNumber;
    const duplicate = plots.some(
      (p) =>
        p.id !== id &&
        p.phaseNumber === targetPhase &&
        p.plotNumber.trim() === targetNumber.trim()
    );
    if (duplicate) {
      return {
        success: false,
        error: `Plot ${targetNumber} already exists in Phase ${targetPhase}.`,
      };
    }
  }

  if (updates.areaSqft !== undefined && updates.areaSqft <= 0) {
    return { success: false, error: 'Plot area must be greater than 0 sq.ft.' };
  }

  const updatedPlot: Plot = normalizePlot({
    ...current,
    ...updates,
    updatedAt: new Date().toISOString(),
  });

  plots[index] = updatedPlot;
  saveStoredPlots(plots);

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
        price: updatedPlot.price,
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

  const header = lines[0].split(',').map((h) => h.trim().toLowerCase());
  const plotNumIdx = header.findIndex((h) => h.includes('plot'));
  const phaseIdx = header.findIndex((h) => h.includes('phase'));
  const areaIdx = header.findIndex((h) => h.includes('area') || h.includes('sqft'));
  const facingIdx = header.findIndex((h) => h.includes('facing'));
  const statusIdx = header.findIndex((h) => h.includes('status') || h.includes('avail'));
  const priceIdx = header.findIndex((h) => h.includes('price') || h.includes('cost'));

  if (plotNumIdx === -1 || areaIdx === -1) {
    result.errors.push('CSV header must contain at least "plot" and "area" columns.');
    return result;
  }

  const currentPlots = getStoredPlots();
  const newlyImported: Plot[] = [];

  for (let i = 1; i < lines.length; i++) {
    result.totalProcessed++;
    const row = lines[i].split(',').map((c) => c.trim());
    const plotNum = row[plotNumIdx];
    const area = parseFloat(row[areaIdx]);
    const phaseNum = phaseIdx !== -1 && row[phaseIdx] ? parseInt(row[phaseIdx], 10) : 1;
    const facing = facingIdx !== -1 && row[facingIdx] ? (row[facingIdx] as any) : 'East';
    const status = statusIdx !== -1 && row[statusIdx] ? (row[statusIdx] as PlotAvailability) : 'Available';
    const rawPrice = priceIdx !== -1 && row[priceIdx] ? parseFloat(row[priceIdx]) : undefined;

    if (!plotNum || isNaN(area) || area <= 0) {
      result.skippedCount++;
      result.errors.push(`Row ${i + 1}: Invalid plot number or area`);
      continue;
    }

    const exists = currentPlots.some(
      (p) => p.phaseNumber === phaseNum && p.plotNumber === plotNum
    );
    if (exists) {
      result.skippedCount++;
      result.errors.push(`Row ${i + 1}: Plot ${plotNum} in Phase ${phaseNum} already exists.`);
      continue;
    }

    const pricePerSqft = 1150;
    const price = rawPrice && !isNaN(rawPrice) ? rawPrice : Math.round(area * pricePerSqft);

    const newPlot: Plot = normalizePlot({
      id: `plot-p${phaseNum}-${plotNum}`,
      projectId: 'proj-swarna-bhoomi',
      phaseId: `phase-${phaseNum}`,
      phaseNumber: phaseNum,
      phaseName: `Phase ${phaseNum}`,
      plotNumber: plotNum,
      areaSqft: area,
      facing,
      availability: status,
      price,
      pricePerSqft,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    currentPlots.push(newPlot);
    newlyImported.push(newPlot);
    result.importedCount++;
  }

  if (newlyImported.length > 0) {
    saveStoredPlots(currentPlots);
  }

  return result;
}
