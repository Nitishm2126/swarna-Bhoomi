'use client';

import React, { useState } from 'react';
import { PROJECT_AMENITIES } from '@/services/projects.service';
import {
  CheckCircle2,
  Clock,
  Sparkles,
  Layers,
  ShieldCheck,
  Building,
  Dumbbell,
  Waves,
  Trees,
  Gamepad2
} from 'lucide-react';

export function AmenitiesSection() {
  const [filter, setFilter] = useState<'All' | 'Existing' | 'Under Development' | 'Planned'>('All');

  const filtered = PROJECT_AMENITIES.filter((a) => {
    if (filter === 'All') return true;
    return a.status === filter;
  });

  return (
    <section id="amenities-section" className="py-16 sm:py-24 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">
            Township Infrastructure &amp; Lifestyle
          </span>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-brand-green sm:text-4xl">
            Thoughtfully Planned Community Amenities
          </h2>
          <p className="text-sm leading-relaxed text-brand-dark-muted sm:text-base">
            Every feature is categorized by its factual delivery status — distinguishing on-site infrastructure from upcoming community facilities.
          </p>

          {/* Status Filter Segmented Control */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            {(['All', 'Existing', 'Under Development', 'Planned'] as const).map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setFilter(status)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  filter === status
                    ? 'bg-brand-green text-white shadow-xs'
                    : 'bg-white border border-brand-border text-brand-dark-muted hover:text-brand-dark hover:border-brand-green'
                }`}
              >
                {status === 'All' ? 'All Amenities' : status}
              </button>
            ))}
          </div>
        </div>

        {/* Amenities Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-xl border border-brand-border bg-white p-6 shadow-xs hover:border-brand-green/30 hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-dark-muted">
                    {item.category}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-semibold ${
                      item.status === 'Existing'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : item.status === 'Under Development'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'bg-blue-50 text-blue-800 border border-blue-200'
                    }`}
                  >
                    {item.status === 'Existing' ? (
                      <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                    ) : item.status === 'Under Development' ? (
                      <Clock className="h-3 w-3 text-amber-600" />
                    ) : (
                      <Sparkles className="h-3 w-3 text-blue-600" />
                    )}
                    <span>{item.status}</span>
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-brand-green">
                  {item.name}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-brand-dark-muted leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-brand-border/40 text-[11px] text-brand-dark-muted/80">
                <span className="font-semibold text-brand-dark">Audit note:</span> {item.evidenceNotes}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
