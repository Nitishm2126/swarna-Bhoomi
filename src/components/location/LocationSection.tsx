import React from 'react';
import { siteConfig } from '@/config/site';
import { CONNECTIVITY_LANDMARKS } from '@/services/projects.service';
import { generateWhatsAppEnquiryUrl } from '@/lib/whatsapp';
import {
  MapPin,
  Navigation,
  Compass,
  MessageCircle,
  ExternalLink,
  Milestone,
  CheckCircle2
} from 'lucide-react';

export function LocationSection() {
  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    'Krishnapuram, Thiruvallur, Tamil Nadu, India'
  )}`;

  return (
    <section id="location-section" className="py-16 sm:py-24 bg-brand-cream-surface/50 border-t border-brand-border/60 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">
            Strategic Connectivity
          </span>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-brand-green sm:text-4xl">
            Prime National Highway Location
          </h2>
          <p className="text-sm leading-relaxed text-brand-dark-muted sm:text-base">
            Located in Krishnapuram, along the rapidly appreciating Chennai–Tirupati National Highway (NH 716) corridor near Thiruvallur town.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Interactive Map Frame & Directions */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative overflow-hidden rounded-2xl border border-brand-border bg-white shadow-sm">
              {/* Google Maps Embed iframe */}
              <div className="relative h-[340px] sm:h-[400px] w-full bg-slate-100">
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
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-brand-border p-4 bg-white">
                <div className="flex items-center gap-2 text-xs text-brand-dark-muted">
                  <MapPin className="h-4 w-4 text-brand-gold shrink-0" />
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
                    className="inline-flex items-center gap-1.5 rounded-lg bg-brand-green px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-brand-green-surface transition-colors"
                  >
                    <Navigation className="h-3.5 w-3.5 text-brand-gold" />
                    <span>Get Directions</span>
                  </a>

                  <a
                    href={generateWhatsAppEnquiryUrl(null, { topic: 'Location & Site Visit Route Assistance' })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-brand-border bg-brand-cream-surface/60 px-3.5 py-2 text-xs font-semibold text-brand-dark hover:border-brand-green hover:text-brand-green transition-colors"
                  >
                    <MessageCircle className="h-3.5 w-3.5 text-brand-gold" />
                    <span>Location Help</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Verified Corridor & Landmarks Matrix */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl border border-brand-border bg-white p-6 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-brand-green flex items-center gap-2">
                <Milestone className="h-5 w-5 text-brand-gold" />
                <span>Connectivity Highlights</span>
              </h3>
              <p className="mt-1 text-xs text-brand-dark-muted">
                Key junctions and arterial connections verified against local district geography.
              </p>

              <div className="mt-5 divide-y divide-brand-border/50 text-xs">
                {CONNECTIVITY_LANDMARKS.map((landmark, idx) => (
                  <div key={idx} className="py-3 flex items-start justify-between gap-3 first:pt-0 last:pb-0">
                    <div>
                      <span className="font-semibold text-brand-dark block">
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
            <div className="rounded-xl border border-brand-gold/30 bg-brand-gold/5 p-4 text-xs text-brand-dark-muted leading-relaxed">
              <p className="font-semibold text-brand-green flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-brand-gold" />
                Free Site Visit Pick-Up &amp; Drop:
              </p>
              <p className="mt-1">
                Complementary chauffeur-driven inspection vehicles available from Thiruvallur Railway Station &amp; Bus Terminus upon prior scheduling.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
