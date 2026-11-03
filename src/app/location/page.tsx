import React from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingMobileBar } from '@/components/layout/FloatingMobileBar';
import { LocationSection } from '@/components/location/LocationSection';
import { MoreDetailsSection } from '@/components/enquiry/MoreDetailsSection';

export const metadata: Metadata = {
  title: 'Location & Directions | Swarna Bhoomi Residential Township',
  description: 'Interactive map, route guidance, and landmark distances for Swarna Bhoomi plots in Krishnapuram, Thiruvallur, along the Chennai–Tirupati National Highway.',
};

export default function LocationPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-brand-cream text-brand-dark">
        {/* Banner */}
        <section className="bg-brand-green py-16 text-white text-center px-4">
          <div className="mx-auto max-w-3xl space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold">
              Strategic Highway Corridor
            </span>
            <h1 className="font-serif text-3xl font-bold sm:text-4xl md:text-5xl">
              Location &amp; Connectivity
            </h1>
            <p className="text-sm sm:text-base text-brand-cream/80 max-w-xl mx-auto">
              Find your route to Krishnapuram along Chennai–Tirupati National Highway (NH 716) near Thiruvallur.
            </p>
          </div>
        </section>

        <LocationSection />
        <MoreDetailsSection />
      </main>
      <Footer />
      <FloatingMobileBar />
    </>
  );
}
