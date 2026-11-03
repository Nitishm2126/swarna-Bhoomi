import React from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingMobileBar } from '@/components/layout/FloatingMobileBar';
import { HeroSection } from '@/components/hero/HeroSection';
import { PlotFinder } from '@/components/plots/PlotFinder';
import { ProjectGallerySection } from '@/components/gallery/ProjectGallerySection';
import { TownshipConcepts } from '@/components/home/TownshipConcepts';
import { MoreDetailsSection } from '@/components/enquiry/MoreDetailsSection';
import { AmenitiesSection } from '@/components/amenities/AmenitiesSection';
import { LocationSection } from '@/components/location/LocationSection';
import { INITIAL_PLOTS } from '@/services/plots.data';
import {
  ShieldCheck,
  TreePine,
  Sparkles,
  Milestone,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Swarna Bhoomi | Premium Residential Plots in Krishnapuram, Thiruvallur',
  description: 'Swarna Bhoomi Residential Township in Krishnapuram, Thiruvallur, along Chennai–Tirupati Highway. Search 600, 700, 800, 1000, 1200 sq.ft. plots with interactive layout plan and WhatsApp enquiry.',
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-brand-cream text-brand-dark">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Editorial Highlights Bar */}
        <section className="border-b border-brand-border/60 bg-white py-12 sm:py-14">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-green/5 text-brand-green border border-brand-green/10">
                  <Milestone className="h-5 w-5 text-brand-gold-dark" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-green">
                    National Highway Frontage
                  </h3>
                  <p className="mt-1 text-xs text-brand-dark-muted leading-relaxed">
                    Direct access on Chennai–Tirupati NH 716 at Krishnapuram, near Thiruvallur.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-green/5 text-brand-green border border-brand-green/10">
                  <TreePine className="h-5 w-5 text-brand-gold-dark" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-green">
                    30ft &amp; 40ft Internal Roads
                  </h3>
                  <p className="mt-1 text-xs text-brand-dark-muted leading-relaxed">
                    Well-laid tar roads with concrete boundary kerbstones and avenue trees.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-green/5 text-brand-green border border-brand-green/10">
                  <ShieldCheck className="h-5 w-5 text-brand-gold-dark" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-green">
                    DTCP Approved: 92/2026
                  </h3>
                  <p className="mt-1 text-xs text-brand-dark-muted leading-relaxed">
                    Survey No: 143/1A1B with clear title documentation and stone demarcation.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-green/5 text-brand-green border border-brand-green/10">
                  <Sparkles className="h-5 w-5 text-brand-gold-dark" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-green">
                    Starting from ₹7 Lakhs*
                  </h3>
                  <p className="mt-1 text-xs text-brand-dark-muted leading-relaxed">
                    517 to 1,600 sq.ft. residential plots with 80% nationalized bank loan assistance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Primary Business Feature: Plot Finder & Simulator */}
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
          <PlotFinder initialPlots={INITIAL_PLOTS} />
        </div>

        {/* 4. Official Documentation & Blueprint Gallery */}
        <ProjectGallerySection />

        {/* 5. Township Concepts Section */}
        <TownshipConcepts />

        {/* 6. Amenities Section */}
        <AmenitiesSection />

        {/* 7. Location Section */}
        <LocationSection />

        {/* 8. Conversion & Enquiry Section */}
        <MoreDetailsSection />
      </main>

      <Footer />
      <FloatingMobileBar />
    </>
  );
}
