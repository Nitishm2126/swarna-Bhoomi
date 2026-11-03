'use client';

import React from 'react';
import { Plot } from '@/types/plot';
import { generateWhatsAppEnquiryUrl } from '@/lib/whatsapp';
import {
  Compass,
  Maximize2,
  MapPin,
  MessageCircle,
  Eye,
  Sparkles,
  CheckCircle,
  Clock,
  Ban,
} from 'lucide-react';

interface PlotCardProps {
  plot: Plot;
  isSelected?: boolean;
  onSelect: (plot: Plot) => void;
  onViewOnLayout: (plot: Plot) => void;
}

export function PlotCard({
  plot,
  isSelected = false,
  onSelect,
  onViewOnLayout,
}: PlotCardProps) {
  const isAvailable = plot.availability === 'Available';
  const isReserved = plot.availability === 'Reserved';

  const dimensions =
    plot.widthFeet && plot.lengthFeet
      ? `${plot.widthFeet} × ${plot.lengthFeet} ft`
      : 'On request';

  return (
    <div
      onClick={() => onSelect(plot)}
      className={`group relative flex flex-col justify-between rounded-xl border p-5 transition-all duration-200 cursor-pointer ${
        isSelected
          ? 'border-brand-gold bg-brand-gold/8 shadow-md ring-1 ring-brand-gold'
          : 'border-brand-border bg-white hover:border-brand-green/30 hover:shadow-sm'
      }`}
    >
      <div>
        {/* Top Header: Plot Number & Availability */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-bold tracking-tight text-brand-green">
                Plot #{plot.plotNumber}
              </span>
              {plot.isCorner && (
                <span className="inline-flex items-center gap-1 rounded bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-800 border border-amber-200/60">
                  <Sparkles className="h-2.5 w-2.5 text-amber-600" />
                  Corner
                </span>
              )}
            </div>
            <p className="mt-0.5 text-xs text-brand-dark-muted">
              {plot.phaseName}
            </p>
          </div>

          {/* Status Badge */}
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
              isAvailable
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                : isReserved
                ? 'bg-amber-50 text-amber-700 border border-amber-200/60'
                : 'bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            {isAvailable ? (
              <CheckCircle className="h-3 w-3 text-emerald-600" />
            ) : isReserved ? (
              <Clock className="h-3 w-3 text-amber-600" />
            ) : (
              <Ban className="h-3 w-3 text-slate-400" />
            )}
            <span>{plot.availability}</span>
          </span>
        </div>

        {/* Primary Spec: Area Display */}
        <div className="mt-4 rounded-lg bg-brand-cream-surface/70 p-3 border border-brand-border/40">
          <div className="flex items-baseline justify-between">
            <span className="text-[11px] uppercase tracking-wider text-brand-dark-muted font-medium">
              Area
            </span>
            <span className="font-serif text-xl font-bold text-brand-green">
              {plot.areaSqft}{' '}
              <span className="text-xs font-sans font-normal text-brand-dark-muted">Sq.Ft.</span>
            </span>
          </div>
        </div>

        {/* Specs List */}
        <dl className="mt-3.5 space-y-2 text-xs text-brand-dark-muted">
          <div className="flex items-center justify-between border-b border-brand-border/40 pb-1.5">
            <dt className="flex items-center gap-1.5 text-brand-dark-muted">
              <Compass className="h-3.5 w-3.5 text-brand-gold-dark" />
              <span>Facing</span>
            </dt>
            <dd className="font-semibold text-brand-dark">
              {plot.facing ? `${plot.facing}` : 'Standard'}
            </dd>
          </div>

          <div className="flex items-center justify-between border-b border-brand-border/40 pb-1.5">
            <dt className="flex items-center gap-1.5 text-brand-dark-muted">
              <Maximize2 className="h-3.5 w-3.5 text-brand-gold-dark" />
              <span>Dimensions</span>
            </dt>
            <dd className="font-semibold text-brand-dark">{dimensions}</dd>
          </div>

          <div className="flex items-center justify-between pt-0.5">
            <dt className="flex items-center gap-1.5 text-brand-dark-muted">
              <MapPin className="h-3.5 w-3.5 text-brand-gold-dark" />
              <span>Sector</span>
            </dt>
            <dd className="font-semibold text-brand-dark">Phase {plot.phaseNumber}</dd>
          </div>
        </dl>
      </div>

      {/* Actions */}
      <div className="mt-5 flex items-center gap-2 pt-2 border-t border-brand-border/50">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onViewOnLayout(plot);
          }}
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-brand-border bg-brand-cream px-3 py-2 text-xs font-semibold text-brand-dark hover:border-brand-green hover:text-brand-green transition-colors"
        >
          <Eye className="h-3.5 w-3.5 text-brand-gold-dark" />
          <span>Layout</span>
        </button>

        <a
          href={generateWhatsAppEnquiryUrl(plot)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-green px-3 py-2 text-xs font-semibold text-white shadow-xs hover:bg-brand-green-surface transition-colors"
        >
          <MessageCircle className="h-3.5 w-3.5 text-brand-gold" />
          <span>Enquire</span>
        </a>
      </div>
    </div>
  );
}
