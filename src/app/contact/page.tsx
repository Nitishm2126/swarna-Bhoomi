import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingMobileBar } from '@/components/layout/FloatingMobileBar';
import { MoreDetailsSection } from '@/components/enquiry/MoreDetailsSection';
import { LocationSection } from '@/components/location/LocationSection';

export const metadata: Metadata = {
  title: 'Contact & Site Visits | Swarna Bhoomi Residential Township',
  description: 'Reach the Swarna Bhoomi advisory desk at +91 7339652776 or connect via WhatsApp to schedule a site inspection in Krishnapuram, Thiruvallur.',
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-brand-cream text-brand-dark">
        {/* Banner with real hero artwork background */}
        <section className="relative overflow-hidden bg-brand-green py-24 sm:py-32 text-white text-center px-5">
          <div className="absolute inset-0 opacity-20">
            <Image
              src="/assets/site/hero-banner.jpg"
              alt="Swarna Bhoomi Grand Gateway"
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-green via-brand-green/80 to-brand-green/90" />

          <div className="relative z-10 mx-auto max-w-3xl space-y-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-gold-light">
              Advisory Desk &amp; Site Visits
            </span>
            <h1 className="font-serif heading-display text-4xl font-bold sm:text-5xl md:text-6xl text-white">
              Contact Swarna Bhoomi
            </h1>
            <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto leading-relaxed">
              Schedule a guided site inspection, inquire about available plot inventory, or request official pricing statements.
            </p>
          </div>
        </section>

        <MoreDetailsSection />
        <LocationSection />
      </main>
      <Footer />
      <FloatingMobileBar />
    </>
  );
}
