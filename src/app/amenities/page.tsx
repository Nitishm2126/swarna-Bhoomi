import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingMobileBar } from '@/components/layout/FloatingMobileBar';
import { AmenitiesSection } from '@/components/amenities/AmenitiesSection';
import { MoreDetailsSection } from '@/components/enquiry/MoreDetailsSection';

export const metadata: Metadata = {
  title: 'Amenities & Infrastructure | Swarna Bhoomi Residential Township',
  description: 'Explore community amenities and infrastructure features at Swarna Bhoomi, classified by factual delivery status: Existing, Under Development, and Planned.',
};

export default function AmenitiesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-brand-cream text-brand-dark">
        <section className="relative overflow-hidden bg-brand-green py-24 sm:py-32 text-white text-center px-5">
          <div className="absolute inset-0 opacity-20">
            <Image
              src="/assets/site/concepts.jpg"
              alt="Swarna Bhoomi Amenities"
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-green via-brand-green/80 to-brand-green/90" />

          <div className="relative z-10 mx-auto max-w-3xl space-y-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-gold-light">
              Infrastructure &amp; Recreation
            </span>
            <h1 className="font-serif heading-display text-4xl font-bold sm:text-5xl md:text-6xl text-white">
              Township Amenities
            </h1>
            <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto leading-relaxed">
              Transparent breakdown of existing on-site infrastructure and upcoming lifestyle facilities.
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
