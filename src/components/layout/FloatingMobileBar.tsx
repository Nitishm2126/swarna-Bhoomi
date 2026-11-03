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
    <div className="fixed bottom-0 left-0 right-0 z-40 block sm:hidden border-t border-brand-border/60 bg-white/95 px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-md shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
      <div className="grid grid-cols-3 gap-2">
        {/* Call CTA */}
        <a
          href={getPhoneCallHref()}
          className="flex h-11 items-center justify-center gap-1.5 rounded-lg border border-brand-border bg-brand-cream-surface text-xs font-semibold text-brand-dark active:scale-[0.98] transition-transform"
        >
          <Phone className="h-4 w-4 text-brand-gold-dark" />
          <span>Call</span>
        </a>

        {/* WhatsApp CTA */}
        <a
          href={generateWhatsAppEnquiryUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 items-center justify-center gap-1.5 rounded-lg bg-brand-green text-xs font-semibold text-white shadow-xs active:scale-[0.98] transition-transform"
        >
          <MessageCircle className="h-4 w-4 text-brand-gold" />
          <span>WhatsApp</span>
        </a>

        {/* Explore Plots CTA */}
        <a
          href="#plot-finder-section"
          onClick={handleScrollToPlots}
          className="flex h-11 items-center justify-center gap-1.5 rounded-lg border border-brand-green/20 bg-brand-green/5 text-xs font-semibold text-brand-green active:scale-[0.98] transition-transform"
        >
          <Search className="h-4 w-4 text-brand-gold-dark" />
          <span>Plots</span>
        </a>
      </div>
    </div>
  );
}
