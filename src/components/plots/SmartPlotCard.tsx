'use client';

import React from 'react';
import Link from 'next/link';
import { Plot } from '@/types/plot';
import { formatINR, formatINRLakhs, formatPlotDimensions } from '@/lib/formatters';
import { generateWhatsAppEnquiryUrl } from '@/lib/whatsapp';
import {
  Compass,
  Maximize2,
  Sparkles,
  ArrowRight,
  MessageCircle,
  CheckCircle,
  Clock,
  Ban,
} from 'lucide-react';

interface SmartPlotCardProps {
  plot: Plot;
  className?: string;
}

export function SmartPlotCard({ plot, className = '' }: SmartPlotCardProps) {
  const isAvailable = plot.availability === 'Available';
  const isReserved = plot.availability === 'Reserved';

  const priceText = formatINR(plot.price);
  const lakhsText = formatINRLakhs(plot.price);
  const dimensionsText = formatPlotDimensions(plot.widthFeet, plot.lengthFeet);

  const plotUrl = `/plots/${plot.id}`;

  return (
    <article
      className={`group relative flex flex-col justify-between rounded-2xl border border-brand-border bg-white p-6 shadow-xs hover:border-brand-green/35 hover:shadow-md transition-all duration-300 ${className}`}
    >
      <div>
        {/* Top Header: Plot Number & Availability Badge */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-2xl font-bold tracking-tight text-brand-green">
                Plot #{plot.plotNumber}
              </h3>
              {plot.isCorner && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold text-amber-800 border border-amber-200/80">
                  <Sparkles className="h-2.5 w-2.5 text-amber-600" />
                  Corner
                </span>
              )}
            </div>
            <p className="mt-0.5 text-xs font-medium text-brand-dark-muted">
              {plot.phaseName || `Phase ${plot.phaseNumber}`}
            </p>
          </div>

          {/* Availability Status Badge */}
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
              isAvailable
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/70'
                : isReserved
                ? 'bg-amber-50 text-amber-800 border border-amber-200/70'
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

        {/* Pricing & Area Highlight Bar */}
        <div className="mt-5 rounded-xl bg-brand-cream/70 p-4 border border-brand-border/60">
          <div className="flex items-baseline justify-between gap-2">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-brand-dark-muted font-bold block">
                Total Price
              </span>
              <span className="font-serif text-xl sm:text-2xl font-bold text-brand-green">
                {priceText}
              </span>
              <span className="ml-1.5 text-xs font-medium text-brand-gold-dark">
                ({lakhsText})
              </span>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider text-brand-dark-muted font-bold block">
                Plot Area
              </span>
              <span className="font-serif text-lg font-bold text-brand-dark">
                {plot.areaSqft}{' '}
                <span className="text-xs font-sans font-normal text-brand-dark-muted">
                  Sq.Ft.
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Essential Specs Grid */}
        <dl className="mt-4 grid grid-cols-2 gap-3 text-xs text-brand-dark-muted border-t border-brand-border/40 pt-3.5">
          <div className="flex items-center gap-2">
            <Compass className="h-4 w-4 text-brand-gold-dark shrink-0" />
            <div>
              <span className="text-[10px] text-brand-dark-muted block">Facing</span>
              <strong className="text-brand-dark font-semibold">
                {plot.facing ? `${plot.facing} Facing` : 'East Facing'}
              </strong>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Maximize2 className="h-4 w-4 text-brand-gold-dark shrink-0" />
            <div>
              <span className="text-[10px] text-brand-dark-muted block">Dimensions</span>
              <strong className="text-brand-dark font-semibold">
                {dimensionsText}
              </strong>
            </div>
          </div>
        </dl>
      </div>

      {/* Card Actions: Primary Details CTA + WhatsApp */}
      <div className="mt-6 flex items-center gap-2.5 pt-3 border-t border-brand-border/50">
        <Link
          href={plotUrl}
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand-green px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-brand-green-surface transition-all group-hover:shadow-sm"
        >
          <span>See More Details</span>
          <ArrowRight className="h-3.5 w-3.5 text-brand-gold transition-transform group-hover:translate-x-0.5" />
        </Link>

        <a
          href={generateWhatsAppEnquiryUrl(plot, {
            topic: `Interest in Plot #${plot.plotNumber} (${plot.phaseName})`,
          })}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-brand-border bg-white text-brand-green hover:border-brand-green hover:bg-brand-cream-surface transition-colors"
          title={`WhatsApp enquiry for Plot #${plot.plotNumber}`}
          aria-label={`WhatsApp enquiry for Plot #${plot.plotNumber}`}
        >
          <MessageCircle className="h-4 w-4 text-brand-gold-dark" />
        </a>
      </div>
    </article>
  );
}

