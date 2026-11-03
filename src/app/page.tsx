import React from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingMobileBar } from '@/components/layout/FloatingMobileBar';
import { HeroSection } from '@/components/hero/HeroSection';
import { PlotFinder } from '@/components/plots/PlotFinder';
import { TownshipConcepts } from '@/components/home/TownshipConcepts';
import { MoreDetailsSection } from '@/components/enquiry/MoreDetailsSection';
import { AmenitiesSection } from '@/components/amenities/AmenitiesSection';
import { LocationSection } from '@/components/location/LocationSection';
import { INITIAL_PLOTS } from '@/services/plots.data';
import {
  ShieldCheck,
  CheckCircle2,
  TreePine,
  MapPin,
  Sparkles,
  Milestone,
  Building2,
  ArrowRight
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

        {/* 2. Project Foundations & Audited Highlights */}
        <section className="border-b border-brand-border/60 bg-white py-10 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-green/5 text-brand-green border border-brand-green/10">
                  <Milestone className="h-5 w-5 text-brand-gold" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-green">
                    National Highway (NH 716)
                  </h3>
                  <p className="mt-1 text-xs text-brand-dark-muted leading-relaxed">
                    Direct access on Chennai–Tirupati corridor at Krishnapuram, Thiruvallur.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-green/5 text-brand-green border border-brand-green/10">
                  <TreePine className="h-5 w-5 text-brand-gold" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-green">
                    Internal Blacktop Roads
                  </h3>
                  <p className="mt-1 text-xs text-brand-dark-muted leading-relaxed">
                    Well-developed 30ft and 40ft internal tar roads with boundary kerbstones laid.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-green/5 text-brand-green border border-brand-green/10">
                  <ShieldCheck className="h-5 w-5 text-brand-gold" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-green">
                    Clear Title &amp; Demarcation
                  </h3>
                  <p className="mt-1 text-xs text-brand-dark-muted leading-relaxed">
                    Numbered survey boundary stones and concrete perimeter fencing installed.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-green/5 text-brand-green border border-brand-green/10">
                  <Sparkles className="h-5 w-5 text-brand-gold" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-green">
                    Starting from ₹7 Lakhs*
                  </h3>
                  <p className="mt-1 text-xs text-brand-dark-muted leading-relaxed">
                    Compact 517 to 1,600 sq.ft. residential plots ideal for building or investment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Primary Business Feature: Plot Finder & Interactive Simulator */}
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <PlotFinder initialPlots={INITIAL_PLOTS} />
        </div>

        {/* 4. Township Concepts Section */}
        <TownshipConcepts />

        {/* 5. More Details & Conversion Section */}
        <MoreDetailsSection />

        {/* 6. Amenities Section */}
        <AmenitiesSection />

        {/* 7. Location Section */}
        <LocationSection />
      </main>

      <Footer />
      <FloatingMobileBar />
    </>
  );
}
