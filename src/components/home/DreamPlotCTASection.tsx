'use client';

import React from 'react';
import Link from 'next/link';
import { useScrollReveal } from '@/lib/useScrollReveal';
import {
  Sparkles,
  ArrowRight,
  Compass,
  CheckCircle2,
  PhoneCall,
  ShieldCheck,
  Maximize2,
} from 'lucide-react';
import { getPhoneCallHref } from '@/lib/whatsapp';

export function DreamPlotCTASection() {
  const containerRef = useScrollReveal<HTMLDivElement>();

  return (
    <section className="py-20 sm:py-28 bg-brand-cream-surface/60 border-b border-brand-border/60">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div
          ref={containerRef}
          className="reveal relative overflow-hidden rounded-3xl border border-brand-border bg-white p-8 sm:p-12 lg:p-16 shadow-sm"
        >
          {/* Subtle Background Accent Pattern */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 h-96 w-96 rounded-full bg-brand-green/5 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 h-96 w-96 rounded-full bg-brand-gold/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/15 bg-brand-green/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-green">
              <Sparkles className="h-3.5 w-3.5 text-brand-gold-dark" />
              <span>Smart Plot Matching</span>
            </div>

            {/* Heading */}
            <h2 className="font-serif heading-display text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-green">
              Find Your Dream Plot
            </h2>

            {/* Subtitle */}
            <p className="text-base sm:text-lg leading-relaxed text-brand-dark-muted font-normal max-w-2xl mx-auto">
              Tell us your preferred size, budget, and facing orientation. Our smart plot discovery system matches you with verified, DTCP-approved residential plots in seconds.
            </p>

            {/* 4 Feature Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 pb-2 text-left">
              <div className="rounded-xl border border-brand-border/60 bg-brand-cream/60 p-4">
                <Maximize2 className="h-4 w-4 text-brand-gold-dark mb-1.5" />
                <span className="text-[10px] uppercase font-bold text-brand-dark-muted block">
                  Plot Sizes
                </span>
                <strong className="text-xs sm:text-sm font-bold text-brand-green">
                  517 – 1,600 Sq.Ft.
                </strong>
              </div>

              <div className="rounded-xl border border-brand-border/60 bg-brand-cream/60 p-4">
                <Sparkles className="h-4 w-4 text-brand-gold-dark mb-1.5" />
                <span className="text-[10px] uppercase font-bold text-brand-dark-muted block">
                  Starting Price
                </span>
                <strong className="text-xs sm:text-sm font-bold text-brand-green">
                  ₹7 Lakhs*
                </strong>
              </div>

              <div className="rounded-xl border border-brand-border/60 bg-brand-cream/60 p-4">
                <Compass className="h-4 w-4 text-brand-gold-dark mb-1.5" />
                <span className="text-[10px] uppercase font-bold text-brand-dark-muted block">
                  Orientations
                </span>
                <strong className="text-xs sm:text-sm font-bold text-brand-green">
                  East, North &amp; Corner
                </strong>
              </div>

              <div className="rounded-xl border border-brand-border/60 bg-brand-cream/60 p-4">
                <ShieldCheck className="h-4 w-4 text-brand-gold-dark mb-1.5" />
                <span className="text-[10px] uppercase font-bold text-brand-dark-muted block">
                  Approvals
                </span>
                <strong className="text-xs sm:text-sm font-bold text-brand-green">
                  DTCP No: 92/2026
                </strong>
              </div>
            </div>

            {/* ONE Prominent Primary CTA */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/plots"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-brand-green px-9 py-4 text-base font-bold text-white shadow-md hover:bg-brand-green-surface hover:shadow-lg active:scale-[0.99] transition-all"
              >
                <span>Find Your Dream Plot</span>
                <ArrowRight className="h-4 w-4 text-brand-gold" />
              </Link>

              <a
                href={getPhoneCallHref()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-brand-border bg-white px-6 py-4 text-sm font-bold text-brand-dark hover:border-brand-green hover:text-brand-green transition-colors"
              >
                <PhoneCall className="h-4 w-4 text-brand-gold-dark" />
                <span>Call Advisory Desk</span>
              </a>
            </div>

            <p className="text-xs text-brand-dark-muted/70">
              Zero registration fee &bull; Instant WhatsApp enquiry &bull; Free site visit pickup
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

