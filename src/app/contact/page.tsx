import React from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingMobileBar } from '@/components/layout/FloatingMobileBar';
import { MoreDetailsSection } from '@/components/enquiry/MoreDetailsSection';
import { LocationSection } from '@/components/location/LocationSection';

export const metadata: Metadata = {
  title: 'Contact Us & Site Visits | Swarna Bhoomi Residential Township',
  description: 'Reach the Swarna Bhoomi advisory desk at +91 7339652776 or connect via WhatsApp to schedule a site inspection in Krishnapuram, Thiruvallur.',
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-brand-cream text-brand-dark">
        {/* Banner */}
        <section className="bg-brand-green py-16 text-white text-center px-4">
          <div className="mx-auto max-w-3xl space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold">
              Get in Touch
            </span>
            <h1 className="font-serif text-3xl font-bold sm:text-4xl md:text-5xl">
              Contact Swarna Bhoomi
            </h1>
            <p className="text-sm sm:text-base text-brand-cream/80 max-w-xl mx-auto">
              Schedule a guided site visit, inquire about available plot inventory, or request official pricing statements.
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
