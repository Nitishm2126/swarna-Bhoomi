'use client';

import React, { useState, useEffect, useTransition, useCallback } from 'react';
import { Plot, FacingDirection, CornerPreference, SmartPlotPreferences } from '@/types/plot';
import { SmartPlotCard } from './SmartPlotCard';
import { formatINR } from '@/lib/formatters';
import { useScrollReveal } from '@/lib/useScrollReveal';
import {
  Search,
  Sparkles,
  RotateCcw,
  SlidersHorizontal,
  ChevronDown,
  ArrowRight,
  Compass,
  Layers,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

interface PlotDiscoveryViewProps {
  initialPlots?: Plot[];
  initialTotalMatches?: number;
  initialTotalInventory?: number;
}

export function PlotDiscoveryView({
  initialPlots = [],
  initialTotalMatches = 0,
  initialTotalInventory = 0,
}: PlotDiscoveryViewProps) {
  // Form State: Customer Preferences
  const [minArea, setMinArea] = useState<string>('');
  const [maxArea, setMaxArea] = useState<string>('');
  const [minBudget, setMinBudget] = useState<string>('');
  const [maxBudget, setMaxBudget] = useState<string>('');
  const [facing, setFacing] = useState<FacingDirection | 'All'>('All');
  const [cornerPreference, setCornerPreference] = useState<CornerPreference>('any');
  const [phase, setPhase] = useState<number | 'All'>('All');
  const [sortBy, setSortBy] = useState<'price_asc' | 'price_desc' | 'area_asc' | 'area_desc' | 'plot_asc'>('price_asc');

  // Active query state
  const [appliedPreferences, setAppliedPreferences] = useState<SmartPlotPreferences>({
    facing: 'All',
    cornerPreference: 'any',
    phase: 'All',
    sortBy: 'price_asc',
  });

  // Results State
  const [plots, setPlots] = useState<Plot[]>(initialPlots.slice(0, 5));
  const [page, setPage] = useState<number>(1);
  const [totalMatches, setTotalMatches] = useState<number>(initialTotalMatches || initialPlots.length);
  const [totalInventory, setTotalInventory] = useState<number>(initialTotalInventory || initialPlots.length);
  const [hasMore, setHasMore] = useState<boolean>(
    initialTotalMatches > 5 || initialPlots.length > 5
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const headerRef = useScrollReveal<HTMLDivElement>();
  const formRef = useScrollReveal<HTMLDivElement>();

  // Fetch plots from Backend API
  const fetchMatchingPlots = useCallback(
    async (prefs: SmartPlotPreferences, targetPage: number = 1, append: boolean = false) => {
      try {
        if (append) {
          setLoadingMore(true);
        } else {
          setLoading(true);
        }

        const params = new URLSearchParams();
        params.set('page', targetPage.toString());
        params.set('limit', '5'); // Fixed 5 items per requirement

        if (prefs.minArea) params.set('minArea', prefs.minArea.toString());
        if (prefs.maxArea) params.set('maxArea', prefs.maxArea.toString());
        if (prefs.minBudget) params.set('minBudget', prefs.minBudget.toString());
        if (prefs.maxBudget) params.set('maxBudget', prefs.maxBudget.toString());
        if (prefs.facing && prefs.facing !== 'All') params.set('facing', prefs.facing);
        if (prefs.cornerPreference && prefs.cornerPreference !== 'any') {
          params.set('cornerPreference', prefs.cornerPreference);
        }
        if (prefs.phase && prefs.phase !== 'All') params.set('phase', prefs.phase.toString());
        if (prefs.sortBy) params.set('sortBy', prefs.sortBy);
        params.set('availability', 'Available');

        const res = await fetch(`/api/plots?${params.toString()}`);
        if (!res.ok) throw new Error('Failed to fetch from backend inventory');

        const data = await res.json();

        if (append) {
          setPlots((prev) => [...prev, ...data.plots]);
        } else {
          setPlots(data.plots);
        }

        setPage(data.page);
        setTotalMatches(data.totalMatches);
        setTotalInventory(data.totalInventory);
        setHasMore(data.hasMore);
      } catch (err) {
        console.error('Error fetching matching plots:', err);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    []
  );

  // Initial load if no server seed provided
  useEffect(() => {
    if (initialPlots.length === 0) {
      fetchMatchingPlots(appliedPreferences, 1, false);
    }
  }, [fetchMatchingPlots, initialPlots.length, appliedPreferences]);

  // Form Submit Handler
  const handleFindPlots = (e: React.FormEvent) => {
    e.preventDefault();

    const newPreferences: SmartPlotPreferences = {
      minArea: minArea ? parseFloat(minArea) : null,
      maxArea: maxArea ? parseFloat(maxArea) : null,
      minBudget: minBudget ? parseFloat(minBudget) : null,
      maxBudget: maxBudget ? parseFloat(maxBudget) : null,
      facing,
      cornerPreference,
      phase,
      sortBy,
      availability: 'Available',
    };

    setAppliedPreferences(newPreferences);
    fetchMatchingPlots(newPreferences, 1, false);

    // Smooth scroll down to results section
    const resultsElement = document.getElementById('plot-results-container');
    if (resultsElement) {
      resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Reset Preferences
  const handleReset = () => {
    setMinArea('');
    setMaxArea('');
    setMinBudget('');
    setMaxBudget('');
    setFacing('All');
    setCornerPreference('any');
    setPhase('All');
    setSortBy('price_asc');

    const defaultPrefs: SmartPlotPreferences = {
      facing: 'All',
      cornerPreference: 'any',
      phase: 'All',
      sortBy: 'price_asc',
      availability: 'Available',
    };

    setAppliedPreferences(defaultPrefs);
    fetchMatchingPlots(defaultPrefs, 1, false);
  };

  // Show More Plots (Next 5)
  const handleShowMore = () => {
    if (!hasMore || loadingMore) return;
    const nextPage = page + 1;
    fetchMatchingPlots(appliedPreferences, nextPage, true);
  };

  // Quick Area Presets
  const handleSizePreset = (min: number | null, max: number | null) => {
    setMinArea(min ? min.toString() : '');
    setMaxArea(max ? max.toString() : '');
  };

  // Quick Budget Presets in Lakhs
  const handleBudgetPreset = (min: number | null, max: number | null) => {
    setMinBudget(min ? min.toString() : '');
    setMaxBudget(max ? max.toString() : '');
  };

  return (
    <div className="space-y-12 pb-24">
      {/* 1. Page Header */}
      <div ref={headerRef} className="reveal text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/15 bg-brand-green/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-green">
          <Sparkles className="h-3.5 w-3.5 text-brand-gold-dark" />
          <span>Smart Plot Discovery</span>
        </div>
        <h1 className="font-serif heading-display text-4xl sm:text-5xl font-bold text-brand-green">
          Find Your Dream Plot
        </h1>
        <p className="text-base sm:text-lg leading-relaxed text-brand-dark-muted font-normal max-w-2xl mx-auto">
          Discover a plot that perfectly matches your dream home. Set your preferred plot size, budget, and orientation to browse real, verified inventory.
        </p>
      </div>

      {/* 2. Customer Preferences Form */}
      <div ref={formRef} className="reveal max-w-4xl mx-auto">
        <form
          onSubmit={handleFindPlots}
          className="rounded-3xl border border-brand-border bg-white p-6 sm:p-9 shadow-sm space-y-8"
        >
          {/* Section 1: Plot Size (Sq.Ft.) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-brand-green flex items-center gap-2">
                <span>1. Preferred Plot Size (Sq.Ft.)</span>
              </label>
              <span className="text-[11px] text-brand-dark-muted font-medium">
                Plots range from 517 to 1,600 sq.ft.
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div>
                <input
                  type="number"
                  min="0"
                  step="50"
                  value={minArea}
                  onChange={(e) => setMinArea(e.target.value)}
                  placeholder="Min sq.ft. (e.g. 600)"
                  className="w-full rounded-xl border border-brand-border bg-brand-cream/60 px-4 py-3 text-sm font-medium text-brand-dark placeholder:text-brand-dark-muted/50 focus:border-brand-gold focus:bg-white focus:outline-hidden transition-colors"
                />
              </div>
              <div>
                <input
                  type="number"
                  min="0"
                  step="50"
                  value={maxArea}
                  onChange={(e) => setMaxArea(e.target.value)}
                  placeholder="Max sq.ft. (e.g. 1200)"
                  className="w-full rounded-xl border border-brand-border bg-brand-cream/60 px-4 py-3 text-sm font-medium text-brand-dark placeholder:text-brand-dark-muted/50 focus:border-brand-gold focus:bg-white focus:outline-hidden transition-colors"
                />
              </div>
            </div>

            {/* Quick Size Presets */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] font-semibold text-brand-dark-muted mr-1">
                Quick Sizes:
              </span>
              {[
                { label: 'All Sizes', min: null, max: null },
                { label: '500–800 sft', min: 500, max: 800 },
                { label: '800–1200 sft', min: 800, max: 1200 },
                { label: '1200+ sft', min: 1200, max: null },
              ].map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSizePreset(p.min, p.max)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                    (p.min === null ? minArea === '' : minArea === p.min.toString()) &&
                    (p.max === null ? maxArea === '' : maxArea === p.max?.toString())
                      ? 'bg-brand-green text-white shadow-xs'
                      : 'bg-brand-cream-surface text-brand-dark-muted hover:text-brand-dark hover:bg-brand-cream-muted'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Section 2: Budget in Indian Rupees */}
          <div className="space-y-3 pt-6 border-t border-brand-border/60">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-brand-green">
                2. Budget (Indian Rupees &bull; ₹)
              </label>
              <span className="text-[11px] text-brand-dark-muted font-medium">
                Starting from ₹7 Lakhs*
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-brand-dark-muted">
                  ₹
                </span>
                <input
                  type="number"
                  min="0"
                  step="50000"
                  value={minBudget}
                  onChange={(e) => setMinBudget(e.target.value)}
                  placeholder="Min Budget (e.g. 700000)"
                  className="w-full rounded-xl border border-brand-border bg-brand-cream/60 pl-8 pr-4 py-3 text-sm font-medium text-brand-dark placeholder:text-brand-dark-muted/50 focus:border-brand-gold focus:bg-white focus:outline-hidden transition-colors"
                />
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-brand-dark-muted">
                  ₹
                </span>
                <input
                  type="number"
                  min="0"
                  step="50000"
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(e.target.value)}
                  placeholder="Max Budget (e.g. 1500000)"
                  className="w-full rounded-xl border border-brand-border bg-brand-cream/60 pl-8 pr-4 py-3 text-sm font-medium text-brand-dark placeholder:text-brand-dark-muted/50 focus:border-brand-gold focus:bg-white focus:outline-hidden transition-colors"
                />
              </div>
            </div>

            {/* Quick Budget Presets */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] font-semibold text-brand-dark-muted mr-1">
                Presets:
              </span>
              {[
                { label: 'All Budgets', min: null, max: null },
                { label: 'Under ₹8L', min: null, max: 800000 },
                { label: '₹8L – ₹12L', min: 800000, max: 1200000 },
                { label: 'Above ₹12L', min: 1200000, max: null },
              ].map((b, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleBudgetPreset(b.min, b.max)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                    (b.min === null ? minBudget === '' : minBudget === b.min.toString()) &&
                    (b.max === null ? maxBudget === '' : maxBudget === b.max?.toString())
                      ? 'bg-brand-green text-white shadow-xs'
                      : 'bg-brand-cream-surface text-brand-dark-muted hover:text-brand-dark hover:bg-brand-cream-muted'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Facing, Corner, and Phase Preferences */}
          <div className="grid gap-6 sm:grid-cols-3 pt-6 border-t border-brand-border/60">
            {/* Plot Facing */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-green">
                3. Plot Facing
              </label>
              <div className="relative">
                <select
                  value={facing}
                  onChange={(e) => setFacing(e.target.value as any)}
                  className="w-full appearance-none rounded-xl border border-brand-border bg-brand-cream/60 px-4 py-3 pr-9 text-sm font-semibold text-brand-dark focus:border-brand-gold focus:bg-white focus:outline-hidden transition-colors"
                >
                  <option value="All">Any Facing</option>
                  <option value="East">East Facing</option>
                  <option value="North">North Facing</option>
                  <option value="West">West Facing</option>
                  <option value="South">South Facing</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-dark-muted" />
              </div>
            </div>

            {/* Corner Plot Preference */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-green">
                4. Corner Plot
              </label>
              <div className="relative">
                <select
                  value={cornerPreference}
                  onChange={(e) => setCornerPreference(e.target.value as CornerPreference)}
                  className="w-full appearance-none rounded-xl border border-brand-border bg-brand-cream/60 px-4 py-3 pr-9 text-sm font-semibold text-brand-dark focus:border-brand-gold focus:bg-white focus:outline-hidden transition-colors"
                >
                  <option value="any">Any Plot (Corner or Regular)</option>
                  <option value="corner_only">Corner Plots Only</option>
                  <option value="non_corner">Regular Plots Only</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-dark-muted" />
              </div>
            </div>

            {/* Phase Preference */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-green">
                5. Phase (Optional)
              </label>
              <div className="relative">
                <select
                  value={phase}
                  onChange={(e) =>
                    setPhase(e.target.value === 'All' ? 'All' : parseInt(e.target.value, 10))
                  }
                  className="w-full appearance-none rounded-xl border border-brand-border bg-brand-cream/60 px-4 py-3 pr-9 text-sm font-semibold text-brand-dark focus:border-brand-gold focus:bg-white focus:outline-hidden transition-colors"
                >
                  <option value="All">Any Phase (Phase 1, 2, 3)</option>
                  <option value="1">Phase 1</option>
                  <option value="2">Phase 2</option>
                  <option value="3">Phase 3</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-dark-muted" />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-brand-border/60">
            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-brand-border bg-white px-5 py-3.5 text-xs font-semibold text-brand-dark hover:border-brand-green hover:text-brand-green transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5 text-brand-dark-muted" />
              <span>Reset Preferences</span>
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-brand-green px-8 py-3.5 text-sm font-bold text-white shadow-md hover:bg-brand-green-surface active:scale-[0.99] transition-all cursor-pointer"
            >
              <Search className="h-4 w-4 text-brand-gold" />
              <span>{loading ? 'Matching Plots...' : 'Find Matching Plots'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* 3. Results Section */}
      <div id="plot-results-container" className="max-w-5xl mx-auto space-y-6 pt-4">
        {/* Results Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-border/60 pb-4 px-1">
          <div className="flex items-center gap-2 text-sm text-brand-dark-muted">
            <span className="font-semibold text-brand-dark">
              Matching Plots: <strong className="text-brand-green">{totalMatches}</strong>
            </span>
            <span className="text-brand-dark-muted/60">&bull;</span>
            <span className="text-xs">
              Showing <strong className="text-brand-dark font-semibold">{plots.length}</strong> of{' '}
              {totalMatches} available
            </span>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-brand-dark-muted font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => {
                const newSort = e.target.value as any;
                setSortBy(newSort);
                const updated = { ...appliedPreferences, sortBy: newSort };
                setAppliedPreferences(updated);
                fetchMatchingPlots(updated, 1, false);
              }}
              className="rounded-lg border border-brand-border bg-white px-2.5 py-1.5 text-xs font-semibold text-brand-dark focus:border-brand-gold focus:outline-hidden"
            >
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="area_asc">Area: Small to Large</option>
              <option value="area_desc">Area: Large to Small</option>
              <option value="plot_asc">Plot Number</option>
            </select>
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-44 rounded-2xl border border-brand-border/60 bg-brand-cream/50 animate-pulse p-6"
              />
            ))}
          </div>
        )}

        {/* Plot Cards List (Initially max 5, then 5 more on Show More) */}
        {!loading && plots.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2">
            {plots.map((plot) => (
              <SmartPlotCard key={plot.id} plot={plot} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && plots.length === 0 && (
          <div className="rounded-3xl border border-dashed border-brand-border bg-white p-12 sm:p-16 text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-cream-surface text-brand-dark-muted">
              <Search className="h-7 w-7 text-brand-gold-dark" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-brand-green">
              No Matching Plots Found
            </h3>
            <p className="max-w-md mx-auto text-sm text-brand-dark-muted leading-relaxed">
              We couldn&apos;t find an available plot that meets all your selected criteria. Try
              broadening your budget or choosing &ldquo;Any Facing&rdquo; or &ldquo;All Sizes&rdquo; to
              explore all available inventory.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 rounded-xl bg-brand-green px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-brand-green-surface transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset to All Available Plots</span>
              </button>
            </div>
          </div>
        )}

        {/* Show More Plots Button */}
        {!loading && hasMore && plots.length > 0 && (
          <div className="pt-6 text-center">
            <button
              type="button"
              onClick={handleShowMore}
              disabled={loadingMore}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-green/30 bg-brand-cream-surface px-8 py-3.5 text-sm font-bold text-brand-green hover:bg-brand-green hover:text-white transition-all shadow-xs cursor-pointer active:scale-[0.99]"
            >
              {loadingMore ? (
                <>
                  <div className="h-4 w-4 border-2 border-brand-green border-t-transparent rounded-full animate-spin" />
                  <span>Loading More Plots...</span>
                </>
              ) : (
                <>
                  <span>Show More Plots</span>
                  <ChevronDown className="h-4 w-4" />
                </>
              )}
            </button>
            <p className="mt-2 text-xs text-brand-dark-muted">
              Showing {plots.length} of {totalMatches} matching plots
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

