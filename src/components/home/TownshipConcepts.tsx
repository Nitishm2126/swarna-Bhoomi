'use client';

import React from 'react';
import Image from 'next/image';
import { TOWNSHIP_CONCEPTS } from '@/services/projects.service';
import { useStaggerReveal, useScrollReveal } from '@/lib/useScrollReveal';
import {
  Building2,
  HeartHandshake,
  Trees,
  Sprout,
  Compass,
  Palmtree,
} from 'lucide-react';

const conceptIcons: Record<string, React.ReactNode> = {
  'concept-township': <Building2 className="h-5 w-5" />,
  'concept-retirement': <HeartHandshake className="h-5 w-5" />,
  'concept-namma-gramam': <Trees className="h-5 w-5" />,
  'concept-farmland': <Sprout className="h-5 w-5" />,
  'concept-adventure': <Compass className="h-5 w-5" />,
  'concept-resort-spa': <Palmtree className="h-5 w-5" />,
};

const conceptNumbers = ['01', '02', '03', '04', '05', '06'];

export function TownshipConcepts() {
  const headerRef = useScrollReveal<HTMLDivElement>();
  const imageRef = useScrollReveal<HTMLDivElement>();
  const gridRef = useStaggerReveal<HTMLDivElement>();

  return (
    <section id="township-concepts-section" className="py-20 sm:py-28 scroll-mt-20 bg-white border-t border-brand-border/40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <div ref={headerRef} className="reveal max-w-2xl">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-gold-dark">
            Township Vision
          </span>
          <h2 className="mt-3 font-serif heading-section text-3xl font-bold text-brand-green sm:text-4xl">
            Six Integrated Living<br className="hidden sm:inline" /> Concepts, One Destination
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-brand-dark-muted max-w-xl">
            Swarna Bhoomi brings together curated living zones — balancing quiet residential sanctuaries with leisure, community culture, and nature.
          </p>
        </div>

        {/* Concepts Image (from brochure) */}
        <div ref={imageRef} className="reveal mt-12 overflow-hidden rounded-2xl border border-brand-border/60">
          <Image
            src="/assets/site/concepts.jpg"
            alt="Swarna Bhoomi 6 Concepts 1 Destination — Residential Township, Retirement Community, Namma Gramam, Adventure Sports, Holiday Resort and Spa, Farmland"
            width={1280}
            height={720}
            className="w-full h-auto"
            sizes="(max-width: 768px) 100vw, 1200px"
            quality={80}
          />
        </div>

        {/* Concept Cards Grid */}
        <div ref={gridRef} className="mt-14 grid gap-px sm:grid-cols-2 lg:grid-cols-3 bg-brand-border/40 rounded-xl overflow-hidden border border-brand-border/40">
          {TOWNSHIP_CONCEPTS.map((concept, idx) => (
            <div
              key={concept.id}
              className={`reveal reveal-delay-${Math.min(idx + 1, 4)} bg-brand-cream p-7 sm:p-8 flex flex-col`}
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-green/5 text-brand-green">
                  {conceptIcons[concept.id]}
                </div>
                <span className="font-serif text-3xl font-bold text-brand-border/80">
                  {conceptNumbers[idx]}
                </span>
              </div>

              <h3 className="mt-5 font-serif text-lg font-bold text-brand-green leading-snug">
                {concept.title}
              </h3>
              <p className="mt-1 text-xs font-medium text-brand-gold-dark">
                {concept.subtitle}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-brand-dark-muted flex-1">
                {concept.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
