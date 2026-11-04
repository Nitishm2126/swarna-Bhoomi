'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useScrollReveal } from '@/lib/useScrollReveal';
import {
  Maximize2,
  X,
  FileCheck2,
  Map,
  Compass,
  Building,
  Sparkles,
} from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  src: string;
  description: string;
  badge?: string;
  aspect: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'dtcp-layout',
    title: 'DTCP Approved Layout Plan',
    category: 'Regulatory Blueprint',
    src: '/assets/site/layout-plan.jpg',
    description: 'Official layout map showing Phase III sector layout, 30ft & 40ft blacktop roads, kids play area, and parks under DTCP Approved No: 92/2026 (Survey No: 143/1A1B, Krishnapuram).',
    badge: 'DTCP No: 92/2026',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'township-concepts',
    title: '6 Concepts Under 1 Roof Masterplan',
    category: 'Township Vision',
    src: '/assets/site/concepts.jpg',
    description: 'Multidimensional living layout highlighting the 6 zones: Residential Township, Retirement Community, Namma Gramam, Adventure Sports, Holiday Resort & Spa, and Farmlands.',
    badge: 'Master Blueprint',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'area-statement',
    title: 'Phase I & II Plot Area Statement',
    category: 'Verified Schedule',
    src: '/assets/site/plot-details.jpg',
    description: 'Complete plot area schedule for Phase I and Phase II with DTCP and RERA registration documentation and 80% nationalized bank loan approvals.',
    badge: '80% Bank Loan Approved',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'entrance-rendering',
    title: 'Township Grand Entrance Arch',
    category: 'Architectural Gateway',
    src: '/assets/site/hero-banner.jpg',
    description: 'Monumental gateway facing the Chennai–Tirupati National Highway with 24/7 security cabin, avenue plantations, and illuminated access roads.',
    badge: 'NH 716 Frontage',
    aspect: 'aspect-[4/3]',
  },
];

export function ProjectGallerySection() {
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);
  const headerRef = useScrollReveal<HTMLDivElement>();
  const galleryRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="project-gallery-section" className="py-20 sm:py-28 bg-white border-t border-brand-border/40 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <div ref={headerRef} className="reveal max-w-2xl mx-auto text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-gold-dark">
            Verified Project Documentation
          </span>
          <h2 className="mt-3 font-serif heading-section text-3xl font-bold text-brand-green sm:text-4xl">
            Official Blueprints &amp; Project Gallery
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-brand-dark-muted">
            Inspect authentic layout approvals, sector boundaries, and official plot statements released for Swarna Bhoomi.
          </p>
        </div>

        {/* Gallery Grid */}
        <div ref={galleryRef} className="reveal mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveModalItem(item)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-brand-border bg-brand-cream transition-all duration-300 hover:border-brand-green/40 hover:shadow-md"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-cream-surface">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Badge Overlay */}
                {item.badge && (
                  <div className="absolute top-3 left-3 rounded-full bg-brand-green/90 px-3 py-1 text-[11px] font-semibold text-brand-gold-light backdrop-blur-xs">
                    {item.badge}
                  </div>
                )}

                {/* Expand Pill */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg bg-black/60 px-3 py-1.5 text-xs font-medium text-white opacity-90 transition-opacity backdrop-blur-xs group-hover:bg-brand-green">
                  <Maximize2 className="h-3.5 w-3.5" />
                  <span>Enlarge</span>
                </div>
              </div>

              {/* Caption */}
              <div className="p-5 sm:p-6">
                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-brand-gold-dark">
                  {item.category}
                </span>
                <h3 className="mt-1 font-serif text-lg font-bold text-brand-green">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-brand-dark-muted">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeModalItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-6 backdrop-blur-sm animate-fade-in"
          onClick={() => setActiveModalItem(null)}
        >
          <div
            className="relative flex max-h-[92vh] max-w-5xl w-full flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-brand-border/60 px-5 py-4 bg-brand-cream-surface">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-gold-dark">
                  {activeModalItem.category}
                </span>
                <h3 className="font-serif text-lg font-bold text-brand-green">
                  {activeModalItem.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setActiveModalItem(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-dark hover:bg-brand-cream-muted transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Image Body with scroll for high-res maps */}
            <div className="relative max-h-[70vh] overflow-auto p-2 bg-slate-900 flex items-center justify-center">
              <div className="relative w-full min-h-[400px] h-[65vh]">
                <Image
                  src={activeModalItem.src}
                  alt={activeModalItem.title}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  quality={95}
                />
              </div>
            </div>

            {/* Modal Description Footer */}
            <div className="p-4 sm:p-5 bg-white text-xs text-brand-dark-muted leading-relaxed border-t border-brand-border/40">
              <p>{activeModalItem.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

