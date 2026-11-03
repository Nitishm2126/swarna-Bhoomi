import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { generateWhatsAppEnquiryUrl, getPhoneCallHref } from '@/lib/whatsapp';
import {
  Phone,
  MessageCircle,
  MapPin,
  Mail,
  ShieldCheck,
  Building2,
  ExternalLink
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-brand-border bg-brand-green-dark text-brand-cream/80 text-xs">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 sm:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Col 1: Brand & Identity */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gold/20 text-brand-gold">
                <svg
                  className="h-6 w-6 text-brand-gold"
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
              <div>
                <span className="font-serif text-xl font-bold tracking-tight text-white block">
                  {siteConfig.name}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-brand-gold block font-medium">
                  {siteConfig.descriptor}
                </span>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-brand-cream/70 max-w-sm">
              A premium master-planned residential plotted township in Krishnapuram, near Thiruvallur. Offering verified clear title plots, blacktop internal avenues, and strategic national highway frontage.
            </p>

            <div className="pt-2 text-[11px] text-brand-cream/60">
              Developer Partner: <strong>MCP Promoters</strong> (Pending confirmation)
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-gold">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
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
                  About the Project
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-brand-gold transition-colors">
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Project Contact */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-gold">
              Site Office &amp; Advisory
            </h4>
            <ul className="space-y-2.5 text-xs text-brand-cream/80">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-brand-gold shrink-0 mt-0.5" />
                <span>
                  Krishnapuram, Near Thiruvallur, Chennai–Tirupati National Highway (NH 716), Tamil Nadu.
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand-gold shrink-0" />
                <a href={getPhoneCallHref()} className="hover:text-brand-gold font-medium">
                  +91 7339652776
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-brand-gold shrink-0" />
                <a
                  href={generateWhatsAppEnquiryUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-gold font-medium"
                >
                  WhatsApp: +91 7339652776
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand-gold shrink-0" />
                <span>contact@swarnabhoomi.in</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory Governance Statement & Disclaimer */}
        <div className="mt-12 border-t border-brand-green/30 pt-6 text-[11px] leading-relaxed text-brand-cream/50 space-y-2">
          <p>
            <strong>Regulatory &amp; Commercial Transparency:</strong> The information contained on this website is for informational guidance regarding Swarna Bhoomi Residential Township. Pricing stated as &ldquo;Starting from ₹7 Lakhs*&rdquo; reflects indicative base plot sizes subject to terms and client confirmation. Layout numbers and amenities are derived from project promotional blueprints and audited on-site records. Prospective buyers are encouraged to verify DTCP order documents, title deeds, and on-ground markers prior to formal registration.
          </p>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-brand-green/20 text-brand-cream/60">
            <div>
              &copy; {new Date().getFullYear()} Swarna Bhoomi Residential Township. All rights reserved.
            </div>
            <div>
              Planned Domain: <span className="text-brand-gold">www.swarnabhoomi.in</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
