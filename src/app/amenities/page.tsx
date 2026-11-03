import React from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingMobileBar } from '@/components/layout/FloatingMobileBar';
import { AmenitiesSection } from '@/components/amenities/AmenitiesSection';
import { MoreDetailsSection } from '@/components/enquiry/MoreDetailsSection';

export const metadata: Metadata = {
  title: 'Amenities & Infrastructure | Swarna Bhoomi Residential Township',
  description: 'Explore the 10 community amenities and infrastructure features at Swarna Bhoomi, classified by factual delivery status: Existing, Under Development, and Planned.',
};

export default function AmenitiesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-brand-cream text-brand-dark">
        {/* Banner */}
        <section className="bg-brand-green py-16 text-white text-center px-4">
          <div className="mx-auto max-w-3xl space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold">
              Infrastructure &amp; Recreation
            </span>
            <h1 className="font-serif text-3xl font-bold sm:text-4xl md:text-5xl">
              Township Amenities
            </h1>
            <p className="text-sm sm:text-base text-brand-cream/80 max-w-xl mx-auto">
              Transparent breakdown of existing on-site infrastructure and planned lifestyle amenities.
            </p>
          </div>
        </section>

        <AmenitiesSection />
        <MoreDetailsSection />
      </main>
      <Footer />
      <FloatingMobileBar />
    </>
  );
}
