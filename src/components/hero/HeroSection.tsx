'use client';

import React from 'react';
import { siteConfig } from '@/config/site';
import { generateWhatsAppEnquiryUrl, getPhoneCallHref } from '@/lib/whatsapp';
import {
  Compass,
  MapPin,
  MessageCircle,
  ArrowDown,
  ShieldCheck,
  CheckCircle2,
  TreePine,
  PhoneCall
} from 'lucide-react';

export function HeroSection() {
  const handleExplorePlots = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('plot-finder-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-brand-green py-16 sm:py-24 text-white">
      {/* Decorative Subtle Background Map/Grid Vector */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="h-full w-full" viewBox="0 0 1000 600" fill="none">
          <circle cx="500" cy="300" r="280" stroke="#d9a721" strokeWidth="1.5" strokeDasharray="6 6" />
          <circle cx="500" cy="300" r="420" stroke="#d9a721" strokeWidth="1" />
          <line x1="100" y1="300" x2="900" y2="300" stroke="#ffffff" strokeWidth="0.8" />
          <line x1="500" y1="50" x2="500" y2="550" stroke="#ffffff" strokeWidth="0.8" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Brand Lotus Symbol */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-gold/15 text-brand-gold ring-1 ring-brand-gold/30">
            <svg
              className="h-10 w-10 text-brand-gold"
              viewBox="0 0 100 100"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M50 15 C52 35 48 45 50 65 C52 45 48 35 50 15 Z" />
              <path d="M50 65 C40 45 25 35 15 45 C25 60 40 62 50 65 Z" />
              <path d="M50 65 C60 45 75 35 85 45 C75 60 60 62 50 65 Z" />
              <path d="M50 65 C35 55 20 58 10 70 C25 78 40 70 50 65 Z" />
              <path d="M50 65 C65 55 80 58 90 70 C75 78 60 70 50 65 Z" />
            </svg>
          </div>

          {/* Location Corridor Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-1.5 text-xs font-semibold text-brand-gold">
            <MapPin className="h-3.5 w-3.5 text-brand-gold" />
            <span>{siteConfig.location.village}, Near {siteConfig.location.taluk} &bull; {siteConfig.location.corridor}</span>
          </div>

          {/* Brand Name */}
          <h1 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            {siteConfig.name.toUpperCase()}
          </h1>

          {/* Tagline from Brochure */}
          <p className="mt-4 font-serif text-xl italic font-normal text-brand-gold sm:text-2xl md:text-3xl">
            &ldquo;Discover a Place Where Life Finds Its Finest Destination&rdquo;
          </p>

          {/* Supporting Copy */}
          <p className="mt-4 text-base leading-relaxed text-brand-cream/80 sm:text-lg">
            Thoughtfully planned residential living at Krishnapuram, near Thiruvallur. Featuring wide blacktop roads, secure perimeter demarcation, and prime highway connectivity.
          </p>

          {/* Value Pillars List */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm font-medium text-brand-cream/90">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-brand-gold" /> Clear Title Documentation
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-brand-gold" /> 30ft &amp; 40ft Internal Roads Laid
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-brand-gold" /> Starting from ₹7 Lakhs*
            </span>
          </div>

          {/* Two CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#plot-finder-section"
              onClick={handleExplorePlots}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gold px-7 py-3.5 text-sm font-bold text-brand-green-dark shadow-md hover:bg-brand-gold-hover transition-colors"
            >
              <span>Explore Plots</span>
              <ArrowDown className="h-4 w-4" />
            </a>

            <a
              href={generateWhatsAppEnquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-xs hover:bg-white/20 transition-colors"
            >
              <MessageCircle className="h-4 w-4 text-brand-gold" />
              <span>WhatsApp Enquiry</span>
            </a>
          </div>

          {/* Legal / Asterisk Disclaimer Note */}
          <p className="mt-6 text-[11px] text-brand-cream/60">
            * Terms and conditions apply. Registration, stamp duty, and taxes extra. All project details are subject to client verification.
          </p>
        </div>
      </div>
    </section>
  );
}
