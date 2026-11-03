import React from 'react';
import { TOWNSHIP_CONCEPTS } from '@/services/projects.service';
import {
  Building2,
  HeartHandshake,
  Trees,
  Sprout,
  Compass,
  Palmtree,
  CheckCircle
} from 'lucide-react';

const conceptIcons: Record<string, React.ReactNode> = {
  'concept-township': <Building2 className="h-6 w-6 text-brand-gold" />,
  'concept-retirement': <HeartHandshake className="h-6 w-6 text-brand-gold" />,
  'concept-namma-gramam': <Trees className="h-6 w-6 text-brand-gold" />,
  'concept-farmland': <Sprout className="h-6 w-6 text-brand-gold" />,
  'concept-adventure': <Compass className="h-6 w-6 text-brand-gold" />,
  'concept-resort-spa': <Palmtree className="h-6 w-6 text-brand-gold" />,
};

export function TownshipConcepts() {
  return (
    <section id="township-concepts-section" className="py-16 sm:py-20 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">
            Township Master Blueprint
          </span>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-brand-green sm:text-4xl">
            A Multidimensional Lifestyle Township
          </h2>
          <p className="text-sm leading-relaxed text-brand-dark-muted sm:text-base">
            Swarna Bhoomi brings together curated living zones featured in the project vision — balancing quiet residential sanctuaries with leisure, community culture, and nature.
          </p>
        </div>

        {/* 6 Editorial Concept Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TOWNSHIP_CONCEPTS.map((concept) => (
            <div
              key={concept.id}
              className="flex flex-col justify-between rounded-xl border border-brand-border bg-white p-6 shadow-xs hover:border-brand-green/40 hover:shadow-md transition-all"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-green/5 border border-brand-green/10 mb-4">
                  {conceptIcons[concept.id]}
                </div>
                <h3 className="font-serif text-lg font-bold text-brand-green">
                  {concept.title}
                </h3>
                <p className="mt-1 text-xs font-semibold text-brand-gold">
                  {concept.subtitle}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-brand-dark-muted sm:text-sm">
                  {concept.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-brand-border/40 flex items-center gap-1.5 text-[11px] font-medium text-brand-green">
                <CheckCircle className="h-3.5 w-3.5 text-brand-gold" />
                <span>Concept Blueprint</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
