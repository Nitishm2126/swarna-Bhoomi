import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import { generateWhatsAppEnquiryUrl, getPhoneCallHref } from '@/lib/whatsapp';
import {
  Phone,
  MessageCircle,
  MapPin,
  Mail,
  ShieldCheck,
  Building2,
  ExternalLink,
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-brand-border/40 bg-brand-green-dark text-white/80 text-xs">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 sm:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Col 1: Brand & Identity */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3.5">
              <Image
                src="/assets/branding/logo.png"
                alt="MCP Logo"
                width={48}
                height={48}
                className="rounded-full shrink-0 ring-1 ring-brand-gold/30"
              />
              <div>
                <span className="font-serif text-xl font-bold tracking-tight text-white block">
                  {siteConfig.name}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold-light block font-semibold">
                  {siteConfig.descriptor}
                </span>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-white/70 max-w-sm">
              A master-planned residential plotted township in Krishnapuram, near Thiruvallur along NH 716. Clear title plots, blacktop internal avenues, and strategic highway connectivity.
            </p>

            <div className="pt-2 text-[11px] text-white/50">
              Marketing &amp; Development: <strong>Madras City Properties (MCP)</strong>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-white/75">
              <li>
                <Link href="/" className="hover:text-brand-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#plot-finder-section" className="hover:text-brand-gold transition-colors">
                  Plot Finder &amp; Search
                </Link>
              </li>
              <li>
                <Link href="/#township-concepts-section" className="hover:text-brand-gold transition-colors">
                  Township Concepts
                </Link>
              </li>
              <li>
                <Link href="/#amenities-section" className="hover:text-brand-gold transition-colors">
                  Amenities &amp; Delivery Status
                </Link>
              </li>
              <li>
                <Link href="/#location-section" className="hover:text-brand-gold transition-colors">
                  Location &amp; Directions
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-gold transition-colors">
                  About Swarna Bhoomi
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-gold transition-colors">
                  Contact &amp; Enquiry
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Project Contact */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">
              Site Office &amp; Advisory
            </h4>
            <ul className="space-y-3 text-xs text-white/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-brand-gold shrink-0 mt-0.5" />
                <span>
                  Krishnapuram, Near Thiruvallur, Chennai–Tirupati National Highway (NH 716), Tamil Nadu.
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-brand-gold shrink-0" />
                <a href={getPhoneCallHref()} className="hover:text-brand-gold font-medium transition-colors">
                  +91 7339652776
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="h-4 w-4 text-brand-gold shrink-0" />
                <a
                  href={generateWhatsAppEnquiryUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-gold font-medium transition-colors"
                >
                  WhatsApp: +91 7339652776
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-brand-gold shrink-0" />
                <span>contact@swarnabhoomi.in</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory Governance Statement & Disclaimer */}
        <div className="mt-12 border-t border-white/10 pt-6 text-[11px] leading-relaxed text-white/50 space-y-2">
          <p>
            <strong>Regulatory &amp; Commercial Information:</strong> Pricing stated as &ldquo;Starting from ₹7 Lakhs*&rdquo; reflects indicative base plot sizes subject to terms and client confirmation. Layout numbers and amenities are derived from project promotional blueprints and audited on-site records. Prospective buyers are encouraged to verify DTCP order documents (DTCP Approved No: 92/2026, Survey 143/1A1B), title deeds, and on-ground markers prior to formal registration.
          </p>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 text-white/60">
            <div>
              &copy; {new Date().getFullYear()} Swarna Bhoomi Residential Township. All rights reserved.
            </div>
            <div>
              Website: <span className="text-brand-gold">www.swarnabhoomi.in</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
