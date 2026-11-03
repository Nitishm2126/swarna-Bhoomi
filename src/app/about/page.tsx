import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingMobileBar } from '@/components/layout/FloatingMobileBar';
import { siteConfig } from '@/config/site';
import { generateWhatsAppEnquiryUrl, getPhoneCallHref } from '@/lib/whatsapp';
import {
  ShieldCheck,
  Building2,
  TreePine,
  CheckCircle2,
  MessageCircle,
  FileCheck,
  Milestone,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About the Project | Swarna Bhoomi Residential Township',
  description: 'Learn about the master planning, vision, developer background, and legal documentation for Swarna Bhoomi plots in Krishnapuram, Thiruvallur.',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-brand-cream text-brand-dark">
        {/* Page Banner with real hero artwork background */}
        <section className="relative overflow-hidden bg-brand-green py-24 sm:py-32 text-white text-center px-5">
          <div className="absolute inset-0 opacity-25">
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
              Project Credibility &amp; Vision
            </span>
            <h1 className="font-serif heading-display text-4xl font-bold sm:text-5xl md:text-6xl text-white">
              About Swarna Bhoomi
            </h1>
            <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto leading-relaxed">
              A master-planned residential plotted enclave combining serene country life with high-velocity highway appreciation.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-5 sm:px-8 space-y-16">
            {/* Master Concept Overview */}
            <div className="grid gap-12 md:grid-cols-2 items-center">
              <div className="space-y-4">
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-gold-dark">
                  Master Concept
                </span>
                <h2 className="font-serif heading-section text-2xl font-bold text-brand-green sm:text-3xl">
                  Built for Security, Serenity, and Long-Term Value
                </h2>
                <p className="text-sm leading-relaxed text-brand-dark-muted">
                  Swarna Bhoomi is situated in Krishnapuram, near Thiruvallur, along the thriving Chennai–Tirupati National Highway (NH 716) corridor. The township is envisioned as a secure sanctuary for families, retirees, and discerning land investors seeking pristine environment, dependable groundwater, and clear title legal assurance.
                </p>
                <div className="space-y-2.5 pt-2 text-xs font-semibold text-brand-green">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand-gold-dark shrink-0" />
                    <span>30ft and 40ft wide internal blacktop roads laid on-site</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand-gold-dark shrink-0" />
                    <span>Perimeter concrete boundary fencing with security gateway</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand-gold-dark shrink-0" />
                    <span>Individual numbered survey boundary stones for every plot</span>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-brand-border bg-white shadow-sm">
                <Image
                  src="/assets/site/concepts.jpg"
                  alt="Swarna Bhoomi 6 Concepts Diagram"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
                <div className="p-5 bg-brand-cream-surface/60 border-t border-brand-border/40 text-xs text-brand-dark-muted">
                  <strong className="text-brand-green block text-sm">6 Concepts Under 1 Roof</strong>
                  Integrated layout blending residential, recreational, wellness, and agrarian zones.
                </div>
              </div>
            </div>

            {/* Regulatory Approvals Statement */}
            <div className="rounded-2xl border border-brand-border bg-white p-7 sm:p-10 shadow-sm space-y-5">
              <div className="flex items-center gap-3 text-brand-green">
                <FileCheck className="h-7 w-7 text-brand-gold-dark" />
                <h3 className="font-serif text-2xl font-bold">
                  Regulatory Approvals &amp; Title Verification
                </h3>
              </div>
              <p className="text-sm text-brand-dark-muted leading-relaxed">
                Swarna Bhoomi holds formal approvals documented on official survey plans:
              </p>
              <div className="grid gap-4 sm:grid-cols-2 pt-2">
                <div className="rounded-xl border border-brand-border/60 bg-brand-cream/50 p-4 space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-brand-gold-dark font-semibold">DTCP Order</span>
                  <p className="font-serif text-base font-bold text-brand-green">Approval No: 92/2026</p>
                  <p className="text-xs text-brand-dark-muted">Survey No: 143/1A1B, Krishnapuram near Thiruvallur.</p>
                </div>
                <div className="rounded-xl border border-brand-border/60 bg-brand-cream/50 p-4 space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-brand-gold-dark font-semibold">Banking Finance</span>
                  <p className="font-serif text-base font-bold text-brand-green">80% Bank Loan Approved</p>
                  <p className="text-xs text-brand-dark-muted">Available from leading nationalized and scheduled banks.</p>
                </div>
              </div>

              <div className="pt-4 border-t border-brand-border/40 flex flex-wrap gap-3">
                <a
                  href={generateWhatsAppEnquiryUrl(null, { topic: 'Request Official Approval Documents & Title Deed' })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-brand-green px-5 py-3 text-xs font-semibold text-white hover:bg-brand-green-surface transition-colors"
                >
                  <MessageCircle className="h-4 w-4 text-brand-gold" />
                  <span>Request Title &amp; Approval Documents</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingMobileBar />
    </>
  );
}
