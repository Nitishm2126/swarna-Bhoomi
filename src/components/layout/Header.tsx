'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import { generateWhatsAppEnquiryUrl, getPhoneCallHref } from '@/lib/whatsapp';
import {
  Menu,
  X,
  Phone,
  MessageCircle,
} from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  const navLinks = [
    { label: 'Plots', href: '/#plot-finder-section' },
    { label: 'Township', href: '/#township-concepts-section' },
    { label: 'Amenities', href: '/#amenities-section' },
    { label: 'Location', href: '/#location-section' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-brand-border/50'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8 lg:px-10">
        {/* Logo */}
        <Link href="/" className="relative flex items-center gap-3 shrink-0" aria-label="Swarna Bhoomi Home">
          <Image
            src="/assets/branding/logo.png"
            alt="MCP Logo"
            width={44}
            height={44}
            className="rounded-full"
            priority
          />
          <div className="hidden sm:block">
            <span className={`block font-serif text-lg font-bold leading-tight tracking-tight transition-colors ${scrolled ? 'text-brand-green' : 'text-white'}`}>
              {siteConfig.name}
            </span>
            <span className={`block text-[10px] font-medium uppercase tracking-[0.18em] transition-colors ${scrolled ? 'text-brand-gold-dark' : 'text-brand-gold-light'}`}>
              Residential Township
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`px-3.5 py-2 text-[13px] font-medium tracking-wide transition-colors rounded-md ${
                scrolled
                  ? 'text-brand-dark-muted hover:text-brand-green hover:bg-brand-cream-surface'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-2.5">
          <a
            href={getPhoneCallHref()}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all ${
              scrolled
                ? 'text-brand-green hover:bg-brand-cream-surface border border-brand-border'
                : 'text-white/90 hover:text-white hover:bg-white/10 border border-white/20'
            }`}
          >
            <Phone className="h-3.5 w-3.5" />
            <span>Call</span>
          </a>
          <a
            href={generateWhatsAppEnquiryUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand-green px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-brand-green-surface transition-colors"
          >
            <MessageCircle className="h-3.5 w-3.5 text-brand-gold" />
            <span>Enquire</span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`lg:hidden flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
            scrolled
              ? 'text-brand-dark hover:bg-brand-cream-surface'
              : 'text-white hover:bg-white/10'
          }`}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-brand-border/50 bg-white px-5 py-6 shadow-xl">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={closeMobileMenu}
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-brand-dark hover:bg-brand-cream-surface hover:text-brand-green transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 mt-2 border-t border-brand-border/60 flex flex-col gap-2.5">
              <a
                href={generateWhatsAppEnquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
                className="flex items-center justify-center gap-2 rounded-lg bg-brand-green px-4 py-3 text-sm font-semibold text-white"
              >
                <MessageCircle className="h-4 w-4 text-brand-gold" />
                <span>WhatsApp Enquiry</span>
              </a>
              <a
                href={getPhoneCallHref()}
                onClick={closeMobileMenu}
                className="flex items-center justify-center gap-2 rounded-lg border border-brand-border bg-white px-4 py-3 text-sm font-semibold text-brand-dark"
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
