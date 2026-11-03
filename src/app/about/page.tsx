import React from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingMobileBar } from '@/components/layout/FloatingMobileBar';
import { siteConfig } from '@/config/site';
import { generateWhatsAppEnquiryUrl, getPhoneCallHref } from '@/lib/whatsapp';
import {
  ShieldCheck,
  Building2,
  TreePine,
  Compass,
  CheckCircle2,
  MessageCircle,
  FileCheck,
  AlertTriangle
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
        {/* Page Banner */}
        <section className="bg-brand-green py-16 text-white text-center px-4">
          <div className="mx-auto max-w-3xl space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold">
              Project Credibility &amp; Vision
            </span>
            <h1 className="font-serif text-3xl font-bold sm:text-4xl md:text-5xl">
              About Swarna Bhoomi
            </h1>
            <p className="text-sm sm:text-base text-brand-cream/80 max-w-xl mx-auto">
              A thoughtfully engineered residential enclave combining serene country life with high-velocity highway appreciation.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 space-y-16">
            {/* Master Concept Overview */}
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                  Master Concept
                </span>
                <h2 className="font-serif text-2xl font-bold text-brand-green sm:text-3xl">
                  Built for Security, Serenity, and Long-Term Value
                </h2>
                <p className="text-xs sm:text-sm leading-relaxed text-brand-dark-muted">
                  Swarna Bhoomi is situated in Krishnapuram, near Thiruvallur, along the thriving Chennai–Tirupati National Highway corridor. The township is envisioned as a secure haven for families, retirees, and discerning land investors seeking pristine environment, dependable groundwater, and clear title legal assurance.
                </p>
                <div className="space-y-2 pt-2 text-xs font-medium text-brand-green">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand-gold" />
                    <span>30ft and 40ft wide internal blacktop roads already laid on-site</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand-gold" />
                    <span>Perimeter concrete boundary fencing with security entrance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand-gold" />
                    <span>Individual survey boundary stones planted for every plot</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-brand-border bg-brand-cream-surface/70 p-6 space-y-4">
                <h3 className="font-serif text-lg font-bold text-brand-green flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-brand-gold" />
                  <span>Developer Profile</span>
                </h3>
                <p className="text-xs text-brand-dark-muted leading-relaxed">
                  The project features the mark of <strong>MCP Promoters</strong> (discovered in Phase 0 audit), an established regional land development team focused on clear title properties across the Chennai peripheral corridor.
                </p>
                <div className="rounded-xl border border-brand-border bg-white p-4 text-xs space-y-1.5">
                  <span className="text-brand-dark-muted block">Legal Governance Status:</span>
                  <span className="font-semibold text-brand-dark block">
                    MCP Promoters (Pending formal registration documentation upload)
                  </span>
                </div>
              </div>
            </div>

            {/* Regulatory Approvals Statement */}
            <div className="rounded-2xl border border-brand-border bg-white p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-brand-green">
                <FileCheck className="h-6 w-6 text-brand-gold" />
                <h3 className="font-serif text-xl font-bold">
                  Regulatory Transparency &amp; Title Verification
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-brand-dark-muted leading-relaxed">
                Swarna Bhoomi promotional materials feature a &ldquo;DTCP APPROVED&rdquo; endorsement. In compliance with strict professional real estate transparency standards:
              </p>
              <ul className="list-disc pl-5 text-xs text-brand-dark-muted space-y-1.5 leading-relaxed">
                <li>Prospective buyers are welcome to inspect official DTCP layout approval orders and parent title deeds at the project office.</li>
                <li>Encumbrance certificates (EC) covering 30+ years are available for legal verification.</li>
                <li>RERA registration status or exemption notifications will be provided upon formal request.</li>
              </ul>
              <div className="pt-2">
                <a
                  href={generateWhatsAppEnquiryUrl(null, { topic: 'Request Official Approval Documents & Title Deed' })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-brand-green px-4 py-2 text-xs font-semibold text-white hover:bg-brand-green-surface"
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
