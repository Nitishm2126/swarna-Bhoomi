import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
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
        <section className="relative overflow-hidden bg-brand-green py-24 sm:py-32 text-white text-center px-5">
          <div className="absolute inset-0 opacity-20">
            <Image
              src="/assets/site/hero-banner.jpg"
              alt="Swarna Bhoomi Highway Gateway"
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-green via-brand-green/80 to-brand-green/90" />

          <div className="relative z-10 mx-auto max-w-3xl space-y-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-gold-light">
              Strategic Highway Corridor
            </span>
            <h1 className="font-serif heading-display text-4xl font-bold sm:text-5xl md:text-6xl text-white">
              Location &amp; Connectivity
            </h1>
            <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto leading-relaxed">
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
