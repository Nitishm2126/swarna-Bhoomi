'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { generateWhatsAppEnquiryUrl, getPhoneCallHref } from '@/lib/whatsapp';
import {
  Menu,
  X,
  Phone,
  MessageCircle,
  MapPin,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Plot Finder', href: '/#plot-finder-section' },
    { label: 'Township Concepts', href: '/#township-concepts-section' },
    { label: 'Amenities', href: '/#amenities-section' },
    { label: 'Location', href: '/#location-section' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Admin', href: '/admin' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-brand-border/70 bg-brand-cream/95 backdrop-blur-md">
      {/* Top micro bar for phone & location */}
      <div className="hidden border-b border-brand-border/40 bg-brand-green px-4 py-1.5 text-xs text-brand-cream sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium">
              <MapPin className="h-3.5 w-3.5 text-brand-gold" />
              {siteConfig.location.village}, Near {siteConfig.location.taluk} &bull; {siteConfig.location.corridor}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={getPhoneCallHref()}
              className="flex items-center gap-1.5 font-medium hover:text-brand-gold transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-brand-gold" />
              <span>Call Desk: {siteConfig.contact.phoneDisplay.value}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand Logo & Wordmark */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green text-brand-gold shadow-xs group-hover:scale-105 transition-transform">
            <svg
              className="h-6 w-6 text-brand-gold"
              viewBox="0 0 100 100"
              fill="currentColor"
              aria-hidden="true"
            >
              {/* Lotus mark */}
              <path d="M50 15 C52 35 48 45 50 65 C52 45 48 35 50 15 Z" />
              <path d="M50 65 C40 45 25 35 15 45 C25 60 40 62 50 65 Z" />
              <path d="M50 65 C60 45 75 35 85 45 C75 60 60 62 50 65 Z" />
              <path d="M50 65 C35 55 20 58 10 70 C25 78 40 70 50 65 Z" />
              <path d="M50 65 C65 55 80 58 90 70 C75 78 60 70 50 65 Z" />
            </svg>
          </div>
          <div>
            <span className="font-serif text-xl font-bold tracking-tight text-brand-green sm:text-2xl block leading-tight">
              {siteConfig.name}
            </span>
            <span className="text-[10px] sm:text-xs font-medium uppercase tracking-widest text-brand-gold block">
              Residential Township
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-brand-dark-muted">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`hover:text-brand-green transition-colors ${
                pathname === link.href ? 'text-brand-green font-bold' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Header Right Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={getPhoneCallHref()}
            className="inline-flex items-center gap-1.5 rounded-lg border border-brand-border bg-white px-3.5 py-2 text-xs font-semibold text-brand-dark hover:border-brand-green hover:text-brand-green transition-colors"
          >
            <Phone className="h-3.5 w-3.5 text-brand-gold" />
            <span>Call</span>
          </a>

          <a
            href={generateWhatsAppEnquiryUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand-green px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-brand-green-surface transition-colors"
          >
            <MessageCircle className="h-3.5 w-3.5 text-brand-gold" />
            <span>WhatsApp Enquiry</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden rounded-lg border border-brand-border p-2 text-brand-dark hover:bg-brand-cream-surface transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-brand-border bg-brand-cream px-4 py-6 shadow-xl animate-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-brand-dark hover:bg-brand-cream-surface hover:text-brand-green transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-brand-border/60 flex flex-col gap-2.5">
              <a
                href={generateWhatsAppEnquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-lg bg-brand-green px-4 py-2.5 text-xs font-semibold text-white shadow-xs"
              >
                <MessageCircle className="h-4 w-4 text-brand-gold" />
                <span>WhatsApp Enquiry</span>
              </a>
              <a
                href={getPhoneCallHref()}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-lg border border-brand-border bg-white px-4 py-2.5 text-xs font-semibold text-brand-dark"
              >
                <Phone className="h-4 w-4 text-brand-gold" />
                <span>Call +91 7339652776</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
