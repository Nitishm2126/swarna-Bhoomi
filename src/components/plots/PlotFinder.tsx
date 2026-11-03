'use client';

import React, { useState, useEffect, useMemo, useTransition } from 'react';
import { Plot, PlotFilterCriteria, SearchMode, FacingDirection, PlotAvailability } from '@/types/plot';
import { searchPlots } from '@/services/plots.service';
import { PlotCard } from './PlotCard';
import { PlotLayoutSimulator } from '../simulator/PlotLayoutSimulator';
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  Compass,
  Layers,
  ArrowUpDown,
  Check,
  ChevronDown,
  Sparkles,
  Info,
  Building,
  CheckCircle2
} from 'lucide-react';

interface PlotFinderProps {
  initialPlots?: Plot[];
  className?: string;
}

export function PlotFinder({ initialPlots = [], className = '' }: PlotFinderProps) {
  // Filter state
  const [areaInput, setAreaInput] = useState<string>('700'); // Default to 700 sqft as specified in journey
  const [searchMode, setSearchMode] = useState<SearchMode>('nearby');
  const [tolerance, setTolerance] = useState<number>(50);
  const [facing, setFacing] = useState<FacingDirection | 'All'>('All');
  const [phase, setPhase] = useState<number | 'All'>('All');
  const [availability, setAvailability] = useState<PlotAvailability | 'All'>('Available');
  const [minWidth, setMinWidth] = useState<string>('');
  const [minLength, setMinLength] = useState<string>('');
  const [sortBy, setSortBy] = useState<'area_asc' | 'area_desc' | 'plot_asc' | 'phase_asc'>('area_asc');

  // Filter UI toggles
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  // Results state
  const [results, setResults] = useState<Plot[]>(initialPlots);
  const [totalMatches, setTotalMatches] = useState<number>(initialPlots.length);
  const [totalInventory, setTotalInventory] = useState<number>(initialPlots.length);
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);
  const [isPending, startTransition] = useTransition();

  // Execute search whenever filter criteria change
  useEffect(() => {
    startTransition(async () => {
      const criteria: PlotFilterCriteria = {
        area: areaInput ? parseFloat(areaInput) : null,
        searchMode,
        tolerance,
        facing,
        phase,
        minWidth: minWidth ? parseFloat(minWidth) : null,
        minLength: minLength ? parseFloat(minLength) : null,
        availability,
        sortBy,
      };

      const res = await searchPlots(criteria);
      setResults(res.plots);
      setTotalMatches(res.totalMatches);
      setTotalInventory(res.totalInventory);

      // Keep selection in sync safely without adding selectedPlot to dependency array
      setSelectedPlot((prev) => (prev && !res.plots.some((p) => p.id === prev.id) ? null : prev));
    });
  }, [areaInput, searchMode, tolerance, facing, phase, availability, minWidth, minLength, sortBy]);

  // Reset all filters to default
  const handleResetFilters = () => {
    setAreaInput('');
    setSearchMode('exact');
    setTolerance(50);
    setFacing('All');
    setPhase('All');
    setAvailability('Available');
    setMinWidth('');
    setMinLength('');
    setSortBy('area_asc');
  };

  // Scroll to simulator smoothly when user clicks "View on Layout"
  const handleViewOnLayout = (plot: Plot) => {
    setSelectedPlot(plot);
    const layoutElement = document.getElementById('plot-simulator-section');
    if (layoutElement) {
      layoutElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Preset quick sizes
  const sizePresets = [600, 700, 800, 1000, 1200, 1500];

  return (
    <section id="plot-finder-section" className={`scroll-mt-24 space-y-10 ${className}`}>
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/15 bg-brand-green/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-green">
          <Sparkles className="h-3.5 w-3.5 text-brand-gold" />
          <span>Verified Inventory Search</span>
        </div>
        <h2 className="font-serif text-3xl font-bold tracking-tight text-brand-green sm:text-4xl">
          Find Your Perfect Residential Plot
        </h2>
        <p className="text-sm leading-relaxed text-brand-dark-muted sm:text-base">
          Search real plot area statements across Phase 1, Phase 2, and Phase 3. Filter by exact square feet, facing direction, or tolerance with immediate master plan visualization.
        </p>
      </div>

      {/* Filter Control Console */}
      <div className="rounded-2xl border border-brand-border bg-white p-5 shadow-xs sm:p-7">
        <div className="space-y-6">
          {/* Row 1: Primary Area Input + Search Modes */}
          <div className="grid gap-6 md:grid-cols-12 md:items-end">
            {/* Area in Sq.Ft. */}
            <div className="md:col-span-5 space-y-2">
              <label htmlFor="area-input" className="block text-xs font-bold uppercase tracking-wider text-brand-green">
                Desired Plot Area (Sq.Ft.)
              </label>
              <div className="relative">
                <input
                  id="area-input"
                  type="number"
                  min="0"
                  max="5000"
                  step="10"
                  value={areaInput}
                  onChange={(e) => setAreaInput(e.target.value)}
                  placeholder="e.g. 700"
                  className="w-full rounded-xl border border-brand-border bg-brand-cream-surface/40 px-4 py-3 text-base font-semibold text-brand-dark placeholder:text-brand-dark-muted/60 focus:border-brand-gold focus:bg-white focus:outline-hidden transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-brand-dark-muted">
                  Sq.Ft.
                </span>
              </div>

              {/* Quick Area Buttons */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] font-medium text-brand-dark-muted">Quick:</span>
                {sizePresets.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setAreaInput(size.toString())}
                    className={`rounded-md px-2 py-0.5 text-xs font-medium transition-colors ${
                      areaInput === size.toString()
                        ? 'bg-brand-green text-white'
                        : 'bg-brand-cream-surface text-brand-dark-muted hover:text-brand-dark hover:bg-brand-cream-muted'
                    }`}
                  >
                    {size} sft
                  </button>
                ))}
              </div>
            </div>

            {/* Search Modes (Exact, Nearby with Tolerance, Minimum) */}
            <div className="md:col-span-4 space-y-2">
              <span className="block text-xs font-bold uppercase tracking-wider text-brand-green">
                Area Match Mode
              </span>
              <div className="grid grid-cols-3 rounded-xl border border-brand-border bg-brand-cream-surface/60 p-1 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setSearchMode('exact')}
                  className={`rounded-lg py-2 transition-all ${
                    searchMode === 'exact'
                      ? 'bg-white text-brand-green shadow-xs'
                      : 'text-brand-dark-muted hover:text-brand-dark'
                  }`}
                >
                  Exact
                </button>
                <button
                  type="button"
                  onClick={() => setSearchMode('nearby')}
                  className={`rounded-lg py-2 transition-all ${
                    searchMode === 'nearby'
                      ? 'bg-white text-brand-green shadow-xs'
                      : 'text-brand-dark-muted hover:text-brand-dark'
                  }`}
                >
                  Nearby
                </button>
                <button
                  type="button"
                  onClick={() => setSearchMode('min')}
                  className={`rounded-lg py-2 transition-all ${
                    searchMode === 'min'
                      ? 'bg-white text-brand-green shadow-xs'
                      : 'text-brand-dark-muted hover:text-brand-dark'
                  }`}
                >
                  Min Area
                </button>
              </div>

              {/* Tolerance Slider for Nearby Mode */}
              {searchMode === 'nearby' && (
                <div className="flex items-center justify-between text-xs text-brand-dark-muted px-1">
                  <span>Tolerance: ±{tolerance} sq.ft.</span>
                  <div className="flex gap-1.5">
                    {[25, 50, 100].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTolerance(t)}
                        className={`rounded px-1.5 py-0.5 text-[11px] font-semibold ${
                          tolerance === t
                            ? 'bg-brand-gold text-brand-dark'
                            : 'bg-brand-cream-surface text-brand-dark-muted hover:text-brand-dark'
                        }`}
                      >
                        ±{t}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sorting Dropdown */}
            <div className="md:col-span-3 space-y-2">
              <label htmlFor="sort-dropdown" className="block text-xs font-bold uppercase tracking-wider text-brand-green">
                Sort Inventory
              </label>
              <div className="relative">
                <select
                  id="sort-dropdown"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full appearance-none rounded-xl border border-brand-border bg-brand-cream-surface/40 px-3.5 py-3 pr-8 text-xs font-semibold text-brand-dark focus:border-brand-gold focus:bg-white focus:outline-hidden"
                >
                  <option value="area_asc">Area: Low to High</option>
                  <option value="area_desc">Area: High to Low</option>
                  <option value="plot_asc">Plot Number</option>
                  <option value="phase_asc">Phase Number</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-dark-muted" />
              </div>
            </div>
          </div>

          {/* Row 2: Secondary Quick Filter Tabs (Phase, Facing, Availability) */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-brand-border/60 pt-4">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              {/* Phase Selector */}
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-brand-dark-muted">Phase:</span>
                <div className="inline-flex rounded-lg border border-brand-border bg-brand-cream-surface/50 p-0.5">
                  {(['All', 1, 2, 3] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPhase(p)}
                      className={`rounded px-2.5 py-1 font-medium transition-colors ${
                        phase === p
                          ? 'bg-brand-green text-white'
                          : 'text-brand-dark-muted hover:text-brand-dark'
                      }`}
                    >
                      {p === 'All' ? 'All' : `P${p}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Facing Selector */}
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-brand-dark-muted">Facing:</span>
                <div className="inline-flex rounded-lg border border-brand-border bg-brand-cream-surface/50 p-0.5">
                  {(['All', 'East', 'North', 'West', 'South'] as const).map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFacing(f)}
                      className={`rounded px-2.5 py-1 font-medium transition-colors ${
                        facing === f
                          ? 'bg-brand-green text-white'
                          : 'text-brand-dark-muted hover:text-brand-dark'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Availability Selector */}
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-brand-dark-muted">Status:</span>
                <div className="inline-flex rounded-lg border border-brand-border bg-brand-cream-surface/50 p-0.5">
                  {(['Available', 'Reserved', 'Sold', 'All'] as const).map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setAvailability(a)}
                      className={`rounded px-2.5 py-1 font-medium transition-colors ${
                        availability === a
                          ? 'bg-brand-green text-white'
                          : 'text-brand-dark-muted hover:text-brand-dark'
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Advanced & Reset Actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                  showAdvanced
                    ? 'bg-brand-gold/20 text-brand-green border border-brand-gold/40'
                    : 'text-brand-dark-muted hover:text-brand-dark'
                }`}
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span>Dimensions</span>
              </button>

              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 rounded-lg border border-brand-border px-2.5 py-1.5 text-xs font-semibold text-brand-dark-muted hover:text-brand-green hover:border-brand-green transition-colors"
                title="Reset all filters"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Clear</span>
              </button>
            </div>
          </div>

          {/* Row 3 (Collapsible): Dimension Constraints */}
          {showAdvanced && (
            <div className="grid gap-4 rounded-xl border border-brand-border/60 bg-brand-cream-surface/40 p-4 sm:grid-cols-2 text-xs">
              <div className="space-y-1.5">
                <label htmlFor="min-width" className="block font-semibold text-brand-dark">
                  Minimum Frontage Width (Feet)
                </label>
                <input
                  id="min-width"
                  type="number"
                  min="0"
                  value={minWidth}
                  onChange={(e) => setMinWidth(e.target.value)}
                  placeholder="e.g. 20 ft"
                  className="w-full rounded-lg border border-brand-border bg-white px-3 py-2 text-xs font-medium text-brand-dark focus:border-brand-gold focus:outline-hidden"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="min-length" className="block font-semibold text-brand-dark">
                  Minimum Plot Length (Feet)
                </label>
                <input
                  id="min-length"
                  type="number"
                  min="0"
                  value={minLength}
                  onChange={(e) => setMinLength(e.target.value)}
                  placeholder="e.g. 35 ft"
                  className="w-full rounded-lg border border-brand-border bg-white px-3 py-2 text-xs font-medium text-brand-dark focus:border-brand-gold focus:outline-hidden"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Active Search Summary Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-brand-dark-muted px-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-brand-dark">
            Showing <strong className="text-brand-green">{totalMatches}</strong> of {totalInventory} plots
          </span>
          {areaInput && (
            <span className="hidden sm:inline text-brand-dark-muted">
              • Matching {areaInput} sq.ft. (
              {searchMode === 'exact'
                ? 'Exact'
                : searchMode === 'nearby'
                ? `±${tolerance} sq.ft.`
                : 'Minimum'}
              )
            </span>
          )}
          {availability !== 'All' && (
            <span className="hidden md:inline text-brand-dark-muted">
              • Status: <strong className="text-brand-green">{availability}</strong>
            </span>
          )}
        </div>

        {totalMatches > 0 && (
          <div className="text-xs text-brand-dark-muted">
            Click any card to highlight on the layout plan below
          </div>
        )}
      </div>

      {/* Results Grid / Empty State */}
      {results.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((plot) => (
            <PlotCard
              key={plot.id}
              plot={plot}
              isSelected={selectedPlot?.id === plot.id}
              onSelect={(p) => setSelectedPlot(p)}
              onViewOnLayout={handleViewOnLayout}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-brand-border bg-white p-12 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-cream-surface text-brand-dark-muted">
            <Search className="h-6 w-6" />
          </div>
          <h3 className="font-serif text-lg font-bold text-brand-green">
            No matching plots found
          </h3>
          <p className="mt-1 max-w-md mx-auto text-xs text-brand-dark-muted leading-relaxed">
            No verified plot records match your current criteria. Try selecting &ldquo;Nearby Area&rdquo; with a higher tolerance or reset filters to explore all available inventory.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand-green px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-brand-green-surface transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}

      {/* Coupled Interactive Layout Simulator */}
      <div id="plot-simulator-section" className="pt-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl font-bold text-brand-green sm:text-2xl">
              Township Layout Simulator
            </h3>
            <p className="text-xs text-brand-dark-muted">
              Click any plot on the master plan to view verified dimensions or initiate WhatsApp enquiry
            </p>
          </div>
        </div>

        <PlotLayoutSimulator
          plots={results.length > 0 ? results : initialPlots}
          selectedPlot={selectedPlot}
          onSelectPlot={(p) => setSelectedPlot(p)}
        />
      </div>
    </section>
  );
}
