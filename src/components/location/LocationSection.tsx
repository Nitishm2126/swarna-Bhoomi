'use client';

import React from 'react';
import { siteConfig } from '@/config/site';
import { CONNECTIVITY_LANDMARKS } from '@/services/projects.service';
import { generateWhatsAppEnquiryUrl } from '@/lib/whatsapp';
import { useScrollReveal } from '@/lib/useScrollReveal';
import {
  MapPin,
  Navigation,
  MessageCircle,
  Milestone,
  CheckCircle2,
} from 'lucide-react';

export function LocationSection() {
  const headerRef = useScrollReveal<HTMLDivElement>();
  const mapRef = useScrollReveal<HTMLDivElement>();
  const highlightsRef = useScrollReveal<HTMLDivElement>();

  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    'Krishnapuram, Thiruvallur, Tamil Nadu, India'
  )}`;

  return (
    <section id="location-section" className="py-20 sm:py-28 bg-brand-cream-surface/50 border-t border-brand-border/50 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div ref={headerRef} className="reveal max-w-2xl mx-auto text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-gold-dark">
            Strategic Location
          </span>
          <h2 className="mt-3 font-serif heading-section text-3xl font-bold text-brand-green sm:text-4xl">
            Prime National Highway Frontage
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-brand-dark-muted">
            Located in Krishnapuram along the Chennai–Tirupati National Highway (NH 716) corridor near Thiruvallur town hub.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Interactive Map Frame */}
          <div ref={mapRef} className="reveal lg:col-span-7 space-y-4">
            <div className="relative overflow-hidden rounded-2xl border border-brand-border bg-white shadow-sm">
              <div className="relative h-[360px] sm:h-[420px] w-full bg-slate-100">
                <iframe
                  title="Swarna Bhoomi Project Location Map"
                  src="https://maps.google.com/maps?q=Krishnapuram,%20Thiruvallur,%20Tamil%20Nadu&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  allowFullScreen
                />
              </div>

              {/* Map Footer Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-brand-border p-4 sm:p-5 bg-white">
                <div className="flex items-center gap-2 text-xs text-brand-dark-muted">
                  <MapPin className="h-4 w-4 text-brand-gold-dark shrink-0" />
                  <span className="font-semibold text-brand-dark">
                    {siteConfig.location.village}, {siteConfig.location.taluk}
                  </span>
                  <span>&bull; NH 716 Corridor</span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-brand-green px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-brand-green-surface transition-colors"
                  >
                    <Navigation className="h-3.5 w-3.5 text-brand-gold" />
                    <span>Get Directions</span>
                  </a>

                  <a
                    href={generateWhatsAppEnquiryUrl(null, { topic: 'Location & Route Assistance' })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-brand-border bg-brand-cream-surface/70 px-4 py-2.5 text-xs font-semibold text-brand-dark hover:border-brand-green hover:text-brand-green transition-colors"
                  >
                    <MessageCircle className="h-3.5 w-3.5 text-brand-gold-dark" />
                    <span>Route Help</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Verified Corridor & Landmarks Matrix */}
          <div ref={highlightsRef} className="reveal lg:col-span-5 space-y-5">
            <div className="rounded-2xl border border-brand-border bg-white p-6 sm:p-7 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-brand-green flex items-center gap-2">
                <Milestone className="h-5 w-5 text-brand-gold-dark" />
                <span>Connectivity Highlights</span>
              </h3>
              <p className="mt-1 text-xs text-brand-dark-muted">
                Key transport arteries and junctions verified against district geography.
              </p>

              <div className="mt-5 divide-y divide-brand-border/60 text-xs">
                {CONNECTIVITY_LANDMARKS.map((landmark, idx) => (
                  <div key={idx} className="py-3.5 flex items-start justify-between gap-3 first:pt-0 last:pb-0">
                    <div>
                      <span className="font-semibold text-brand-dark block text-[13px]">
                        {landmark.name}
                      </span>
                      <span className="text-[11px] text-brand-dark-muted">
                        {landmark.type}
                      </span>
                    </div>
                    <span className="shrink-0 font-medium text-brand-green text-right">
                      {landmark.distance}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Travel Guidance Note */}
            <div className="rounded-xl border border-brand-gold/30 bg-brand-gold/8 p-5 text-xs text-brand-dark-muted leading-relaxed">
              <p className="font-semibold text-brand-green flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-brand-gold-dark" />
                Free Site Visit Pick-Up &amp; Drop
              </p>
              <p className="mt-1.5 text-xs">
                Chauffeur-driven inspection transport available from Thiruvallur Railway Station &amp; Bus Terminus with prior booking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
