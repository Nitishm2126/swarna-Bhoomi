'use client';

import React from 'react';
import { generateWhatsAppEnquiryUrl, getPhoneCallHref } from '@/lib/whatsapp';
import { Phone, MessageCircle, Search } from 'lucide-react';

export function FloatingMobileBar() {
  const handleScrollToPlots = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('plot-finder-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 block sm:hidden border-t border-brand-border bg-white/95 p-2 backdrop-blur-md shadow-lg">
      <div className="grid grid-cols-3 gap-2">
        {/* Call CTA */}
        <a
          href={getPhoneCallHref()}
          className="flex h-11 items-center justify-center gap-1.5 rounded-lg border border-brand-border bg-brand-cream-surface text-xs font-semibold text-brand-dark active:bg-brand-cream-muted"
        >
          <Phone className="h-4 w-4 text-brand-gold" />
          <span>Call</span>
        </a>

        {/* WhatsApp CTA */}
        <a
          href={generateWhatsAppEnquiryUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 items-center justify-center gap-1.5 rounded-lg bg-brand-green text-xs font-semibold text-white shadow-xs active:bg-brand-green-dark"
        >
          <MessageCircle className="h-4 w-4 text-brand-gold" />
          <span>WhatsApp</span>
        </a>

        {/* Explore Plots CTA */}
        <a
          href="#plot-finder-section"
          onClick={handleScrollToPlots}
          className="flex h-11 items-center justify-center gap-1.5 rounded-lg border border-brand-green/30 bg-brand-green/5 text-xs font-semibold text-brand-green active:bg-brand-green/15"
        >
          <Search className="h-4 w-4 text-brand-gold" />
          <span>Find Plots</span>
        </a>
      </div>
    </div>
  );
}
