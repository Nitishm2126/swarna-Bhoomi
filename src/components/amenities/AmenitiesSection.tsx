'use client';

import React, { useState } from 'react';
import { PROJECT_AMENITIES } from '@/services/projects.service';
import { useScrollReveal, useStaggerReveal } from '@/lib/useScrollReveal';
import {
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';

type AmenityFilter = 'All' | 'Existing' | 'Under Development' | 'Planned';

export function AmenitiesSection() {
  const [filter, setFilter] = useState<AmenityFilter>('All');
  const headerRef = useScrollReveal<HTMLDivElement>();
  const gridRef = useStaggerReveal<HTMLDivElement>();

  const filtered = PROJECT_AMENITIES.filter((a) => {
    if (filter === 'All') return true;
    return a.status === filter;
  });

  const statusCounts = {
    Existing: PROJECT_AMENITIES.filter(a => a.status === 'Existing').length,
    'Under Development': PROJECT_AMENITIES.filter(a => a.status === 'Under Development').length,
    Planned: PROJECT_AMENITIES.filter(a => a.status === 'Planned').length,
  };

  return (
    <section id="amenities-section" className="py-20 sm:py-28 scroll-mt-20 bg-white border-t border-brand-border/40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <div ref={headerRef} className="reveal max-w-2xl mx-auto text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-gold-dark">
            Infrastructure &amp; Lifestyle
          </span>
          <h2 className="mt-3 font-serif heading-section text-3xl font-bold text-brand-green sm:text-4xl">
            Township Amenities
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-brand-dark-muted">
            Every feature is categorized by its factual delivery status — distinguishing what&apos;s on-site from what&apos;s upcoming.
          </p>

          {/* Filter Tabs */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-1.5 rounded-lg bg-brand-cream-surface p-1">
            {(['All', 'Existing', 'Under Development', 'Planned'] as const).map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setFilter(status)}
                className={`rounded-md px-4 py-2 text-xs font-semibold transition-all ${
                  filter === status
                    ? 'bg-white text-brand-green shadow-sm'
                    : 'text-brand-dark-muted hover:text-brand-dark'
                }`}
              >
                {status === 'All' ? `All (${PROJECT_AMENITIES.length})` : `${status} (${statusCounts[status]})`}
              </button>
            ))}
          </div>
        </div>

        {/* Amenities Grid */}
        <div ref={gridRef} className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, idx) => (
            <div
              key={item.id}
              className={`reveal reveal-delay-${Math.min(idx + 1, 4)} group rounded-xl border border-brand-border/70 bg-brand-cream p-6 hover:border-brand-green/30 transition-all`}
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-brand-dark-muted/70">
                  {item.category}
                </span>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                    item.status === 'Existing'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                      : item.status === 'Under Development'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200/60'
                      : 'bg-blue-50 text-blue-700 border border-blue-200/60'
                  }`}
                >
                  {item.status === 'Existing' ? (
                    <CheckCircle2 className="h-2.5 w-2.5" />
                  ) : item.status === 'Under Development' ? (
                    <Clock className="h-2.5 w-2.5" />
                  ) : (
                    <Sparkles className="h-2.5 w-2.5" />
                  )}
                  {item.status}
                </span>
              </div>

              <h3 className="font-serif text-base font-bold text-brand-green leading-snug">
                {item.name}
              </h3>
              <p className="mt-2 text-sm text-brand-dark-muted leading-relaxed">
                {item.description}
              </p>

              <p className="mt-4 pt-3 border-t border-brand-border/30 text-[11px] text-brand-dark-muted/60">
                <span className="font-semibold text-brand-dark-muted/80">Source:</span> {item.evidenceNotes}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
