'use client';

import React, { useState } from 'react';
import { Plot } from '@/types/plot';
import { siteConfig } from '@/config/site';
import { generateWhatsAppEnquiryUrl, getPhoneCallHref } from '@/lib/whatsapp';
import { submitEnquiry } from '@/services/enquiries.service';
import {
  MessageCircle,
  Phone,
  CalendarCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  MapPin,
  Clock
} from 'lucide-react';

interface MoreDetailsSectionProps {
  selectedPlot?: Plot | null;
  className?: string;
}

export function MoreDetailsSection({ selectedPlot, className = '' }: MoreDetailsSectionProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredSize, setPreferredSize] = useState('700-1000');
  const [topic, setTopic] = useState('Price Details & Availability');
  const [siteVisitDate, setSiteVisitDate] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    // Submit to service
    await submitEnquiry({
      customerName: name,
      phone: cleanPhone,
      preferredPlotSize: selectedPlot ? `${selectedPlot.areaSqft} sqft` : preferredSize,
      enquiryTopic: topic,
      message: siteVisitDate ? `Preferred site visit date: ${siteVisitDate}` : undefined,
      plotId: selectedPlot?.id,
      plotNumber: selectedPlot?.plotNumber,
      source: 'web_form',
    });

    setFormSubmitted(true);

    // Open WhatsApp pre-filled
    const url = generateWhatsAppEnquiryUrl(selectedPlot, {
      name,
      phone: cleanPhone,
      topic: siteVisitDate ? `${topic} (Date: ${siteVisitDate})` : topic,
      preferredPlotSize: selectedPlot ? `${selectedPlot.areaSqft} sq.ft. (Plot #${selectedPlot.plotNumber})` : preferredSize,
    });

    window.open(url, '_blank');
  };

  return (
    <section id="more-details-section" className={`py-16 sm:py-24 bg-brand-cream-surface/70 border-y border-brand-border/60 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Direct Call, WhatsApp & Site Visit Action Cards */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                Direct Project Advisory
              </span>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-brand-green sm:text-4xl">
                Let&rsquo;s Find the Right Plot for You
              </h2>
              <p className="text-sm leading-relaxed text-brand-dark-muted sm:text-base">
                Connect with our team to explore plot availability, pricing, and site visits.
              </p>
            </div>

            {/* Selected Plot Context Banner if applicable */}
            {selectedPlot && (
              <div className="rounded-xl border border-brand-gold/40 bg-brand-gold/10 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-brand-green">
                  <Sparkles className="h-4 w-4 text-brand-gold" />
                  <span>Plot Selected for Enquiry:</span>
                </div>
                <p className="mt-1 font-serif text-base font-bold text-brand-green">
                  Plot #{selectedPlot.plotNumber} &bull; {selectedPlot.areaSqft} Sq.Ft. ({selectedPlot.facing || 'East'} Facing) &bull; {selectedPlot.phaseName}
                </p>
              </div>
            )}

            {/* 3 Core Contact Actions */}
            <div className="grid gap-4 sm:grid-cols-3">
              {/* WhatsApp Action */}
              <a
                href={generateWhatsAppEnquiryUrl(selectedPlot)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center rounded-xl bg-brand-green p-4 text-center text-white shadow-xs hover:bg-brand-green-surface transition-all group"
              >
                <MessageCircle className="h-6 w-6 text-brand-gold mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold">WhatsApp Enquiry</span>
                <span className="text-[10px] text-brand-cream/70 mt-0.5">Instant chat</span>
              </a>

              {/* Call Now Action */}
              <a
                href={getPhoneCallHref()}
                className="flex flex-col items-center justify-center rounded-xl border border-brand-border bg-white p-4 text-center text-brand-dark shadow-xs hover:border-brand-green hover:text-brand-green transition-all group"
              >
                <Phone className="h-6 w-6 text-brand-gold mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold">Call Now</span>
                <span className="text-[10px] text-brand-dark-muted mt-0.5">+91 7339652776</span>
              </a>

              {/* Site Visit Action */}
              <a
                href="#enquiry-form-card"
                className="flex flex-col items-center justify-center rounded-xl border border-brand-border bg-white p-4 text-center text-brand-dark shadow-xs hover:border-brand-green hover:text-brand-green transition-all group"
              >
                <CalendarCheck className="h-6 w-6 text-brand-gold mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold">Book Site Visit</span>
                <span className="text-[10px] text-brand-dark-muted mt-0.5">Free inspection</span>
              </a>
            </div>

            {/* Project Site Office & Contact Note */}
            <div className="rounded-xl border border-brand-border bg-white p-5 space-y-3 text-xs text-brand-dark-muted">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="text-brand-dark block">Site Location:</strong>
                  Krishnapuram, Near Thiruvallur, Chennai–Tirupati National Highway (NH 716), Tamil Nadu.
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="h-4 w-4 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="text-brand-dark block">Site Visit Assistance:</strong>
                  Monday to Sunday: 9:00 AM – 6:00 PM (Prior appointment recommended).
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Lead Enquiry Form */}
          <div id="enquiry-form-card" className="lg:col-span-6">
            <div className="rounded-2xl border border-brand-border bg-white p-6 shadow-sm sm:p-8">
              <h3 className="font-serif text-xl font-bold text-brand-green sm:text-2xl">
                Request Plot Details &amp; Pricing
              </h3>
              <p className="mt-1 text-xs text-brand-dark-muted">
                Receive pricing statements, DTCP documentation details, and schedule your guided site inspection.
              </p>

              {formSubmitted ? (
                <div className="mt-6 rounded-xl bg-emerald-50 border border-emerald-200 p-6 text-center space-y-3">
                  <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
                  <h4 className="font-serif text-lg font-bold text-emerald-900">
                    Enquiry Prepared!
                  </h4>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Your details have been pre-filled into WhatsApp. If WhatsApp did not open automatically, click the button below to send your enquiry directly to +91 7339652776.
                  </p>
                  <a
                    href={generateWhatsAppEnquiryUrl(selectedPlot, { name, phone, topic, preferredPlotSize: preferredSize })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-5 py-2.5 text-xs font-semibold text-white hover:bg-emerald-800"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Open in WhatsApp</span>
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  {errorMessage && (
                    <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-xs font-medium text-red-700 border border-red-200">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="lead-name" className="block text-xs font-bold uppercase tracking-wider text-brand-green">
                      Full Name *
                    </label>
                    <input
                      id="lead-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full rounded-xl border border-brand-border bg-brand-cream-surface/40 px-3.5 py-2.5 text-sm font-medium text-brand-dark focus:border-brand-gold focus:bg-white focus:outline-hidden"
                    />
                  </div>

                  {/* Mobile Number */}
                  <div className="space-y-1.5">
                    <label htmlFor="lead-phone" className="block text-xs font-bold uppercase tracking-wider text-brand-green">
                      Mobile Number (10 Digits) *
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center rounded-l-xl border border-r-0 border-brand-border bg-brand-cream-surface px-3 text-xs font-semibold text-brand-dark-muted">
                        +91
                      </span>
                      <input
                        id="lead-phone"
                        type="tel"
                        required
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="7339652776"
                        className="w-full rounded-r-xl border border-brand-border bg-brand-cream-surface/40 px-3.5 py-2.5 text-sm font-medium text-brand-dark focus:border-brand-gold focus:bg-white focus:outline-hidden"
                      />
                    </div>
                  </div>

                  {/* Preferred Plot Size if no plot pre-selected */}
                  {!selectedPlot && (
                    <div className="space-y-1.5">
                      <label htmlFor="preferred-size" className="block text-xs font-bold uppercase tracking-wider text-brand-green">
                        Preferred Plot Size
                      </label>
                      <select
                        id="preferred-size"
                        value={preferredSize}
                        onChange={(e) => setPreferredSize(e.target.value)}
                        className="w-full rounded-xl border border-brand-border bg-brand-cream-surface/40 px-3.5 py-2.5 text-xs font-semibold text-brand-dark focus:border-brand-gold focus:bg-white focus:outline-hidden"
                      >
                        <option value="517 – 800 sq.ft.">517 – 800 sq.ft. (Compact / Investment)</option>
                        <option value="801 – 1,200 sq.ft.">801 – 1,200 sq.ft. (Standard Villa)</option>
                        <option value="1,201 – 1,600 sq.ft.">1,201 – 1,600 sq.ft. (Premium Horizon)</option>
                        <option value="Not sure yet">Not sure yet (Explore all options)</option>
                      </select>
                    </div>
                  )}

                  {/* Enquiry Topic */}
                  <div className="space-y-1.5">
                    <label htmlFor="enquiry-topic" className="block text-xs font-bold uppercase tracking-wider text-brand-green">
                      What Would You Like to Know?
                    </label>
                    <select
                      id="enquiry-topic"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full rounded-xl border border-brand-border bg-brand-cream-surface/40 px-3.5 py-2.5 text-xs font-semibold text-brand-dark focus:border-brand-gold focus:bg-white focus:outline-hidden"
                    >
                      <option value="Price Details & Payment Schedule">Price Details &amp; Payment Schedule</option>
                      <option value="Available Plots & Layout Map">Available Plots &amp; Master Layout Map</option>
                      <option value="Book a Free Site Visit">Book a Free Site Visit with Guided Inspection</option>
                      <option value="Approval Documents & Title Deed">Approval Documents &amp; Title Verification</option>
                    </select>
                  </div>

                  {/* Preferred Date if Booking Site Visit */}
                  {topic.includes('Site Visit') && (
                    <div className="space-y-1.5 animate-in fade-in-50">
                      <label htmlFor="visit-date" className="block text-xs font-bold uppercase tracking-wider text-brand-green">
                        Preferred Site Visit Date
                      </label>
                      <input
                        id="visit-date"
                        type="date"
                        value={siteVisitDate}
                        onChange={(e) => setSiteVisitDate(e.target.value)}
                        className="w-full rounded-xl border border-brand-border bg-brand-cream-surface/40 px-3.5 py-2 text-xs font-medium text-brand-dark focus:border-brand-gold focus:outline-hidden"
                      />
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-green px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-brand-green-surface transition-colors cursor-pointer"
                  >
                    <MessageCircle className="h-4 w-4 text-brand-gold" />
                    <span>Send Enquiry via WhatsApp</span>
                  </button>

                  <p className="text-[11px] text-center text-brand-dark-muted leading-tight">
                    Submission opens WhatsApp with your pre-filled inquiry. You can review the details before clicking send.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
