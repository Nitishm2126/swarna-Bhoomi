'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { generateWhatsAppEnquiryUrl, getPhoneCallHref } from '@/lib/whatsapp';
import { useScrollReveal } from '@/lib/useScrollReveal';
import {
  MapPin,
  ArrowRight,
  MessageCircle,
  PhoneCall,
} from 'lucide-react';

export function HeroSection() {
  const headingRef = useScrollReveal<HTMLDivElement>();

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-brand-green">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/assets/site/hero-banner.jpg"
          alt="Swarna Bhoomi Residential Township"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={85}
        />
        {/* Multi-layer gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-green-dark/80 via-brand-green/60 to-brand-green-dark/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-green-dark/40 via-transparent to-brand-green-dark/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10 pt-28 pb-20 sm:pt-32 sm:pb-24">
        <div ref={headingRef} className="reveal max-w-2xl">
          {/* Location Tag */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1.5 backdrop-blur-sm">
            <MapPin className="h-3.5 w-3.5 text-brand-gold" />
            <span className="text-xs font-medium text-white/80 tracking-wide">
              {siteConfig.location.village}, {siteConfig.location.taluk} &bull; NH&nbsp;716
            </span>
          </div>

          {/* Brand Name — large editorial type */}
          <h1 className="font-serif heading-display text-5xl font-bold text-white sm:text-6xl lg:text-7xl">
            {siteConfig.name}
          </h1>

          {/* Tagline */}
          <p className="mt-4 font-serif text-xl font-normal text-brand-gold-light sm:text-2xl lg:text-[1.65rem] leading-snug">
            A Perfect Place to Build Your Dream Home
          </p>

          {/* Supporting Copy */}
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/70">
            DTCP-approved residential plots starting from 517 sq.ft. across three planned phases in Krishnapuram, near Thiruvallur. Wide internal roads, clear title, and direct national highway access.
          </p>

          {/* Key Value Indicators */}
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-white/90">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
              DTCP Approved: 92/2026
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
              3 Phases &bull; 128+ Plots
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
              Starting ₹7 Lakhs*
            </span>
          </div>

          {/* CTAs: Primary "Find Your Dream Plot" navigates to /plots */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/plots"
              className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-brand-gold px-7 py-3.5 text-sm font-bold text-brand-green-dark shadow-lg hover:bg-brand-gold-hover transition-colors"
            >
              <span>Find Your Dream Plot</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href={generateWhatsAppEnquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-lg border border-white/25 bg-white/8 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/15 transition-colors"
            >
              <MessageCircle className="h-4 w-4 text-brand-gold" />
              <span>WhatsApp Enquiry</span>
            </a>

            <a
              href={getPhoneCallHref()}
              className="inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3.5 text-sm font-medium text-white/80 hover:text-white transition-colors sm:ml-1"
            >
              <PhoneCall className="h-4 w-4 text-brand-gold" />
              <span>Call Now</span>
            </a>
          </div>

          {/* Disclaimer */}
          <p className="mt-8 text-[11px] text-white/40 max-w-lg leading-relaxed">
            * Terms and conditions apply. Registration, stamp duty, and taxes extra. All project details subject to verification.
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2 text-white/40">
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <div className="h-8 w-px bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
}
