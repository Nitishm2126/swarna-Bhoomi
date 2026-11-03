'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import { generateWhatsAppEnquiryUrl, getPhoneCallHref } from '@/lib/whatsapp';
import { useScrollReveal, useStaggerReveal } from '@/lib/useScrollReveal';
import {
  MessageCircle,
  Phone,
  CalendarCheck,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Clock,
} from 'lucide-react';
import { Plot } from '@/types/plot';
import { submitEnquiry } from '@/services/enquiries.service';

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

  const sectionRef = useScrollReveal<HTMLElement>();
  const formRef = useScrollReveal<HTMLDivElement>();

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

    const url = generateWhatsAppEnquiryUrl(selectedPlot, {
      name,
      phone: cleanPhone,
      topic: siteVisitDate ? `${topic} (Date: ${siteVisitDate})` : topic,
      preferredPlotSize: selectedPlot ? `${selectedPlot.areaSqft} sq.ft. (Plot #${selectedPlot.plotNumber})` : preferredSize,
    });

    window.open(url, '_blank');
  };

  return (
    <section
      ref={sectionRef}
      id="more-details-section"
      className={`reveal py-20 sm:py-28 bg-brand-cream-surface/60 border-y border-brand-border/50 ${className}`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
          {/* Left Column: Direct Contact Actions */}
          <div className="space-y-8">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-gold-dark">
                Get in Touch
              </span>
              <h2 className="mt-3 font-serif heading-section text-3xl font-bold text-brand-green sm:text-4xl">
                Let&rsquo;s Find the Right<br className="hidden sm:inline" /> Plot for You
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-brand-dark-muted max-w-md">
                Connect with our team to explore plot availability, pricing, and arrange a free guided site visit.
              </p>
            </div>

            {/* Selected Plot Banner */}
            {selectedPlot && (
              <div className="rounded-xl border border-brand-gold/30 bg-brand-gold/8 p-4">
                <p className="text-xs font-semibold text-brand-green">Selected for Enquiry</p>
                <p className="mt-1 font-serif text-base font-bold text-brand-green">
                  Plot #{selectedPlot.plotNumber} &bull; {selectedPlot.areaSqft} Sq.Ft. &bull; {selectedPlot.phaseName}
                </p>
              </div>
            )}

            {/* Contact Cards */}
            <div className="grid gap-3 sm:grid-cols-3">
              <a
                href={generateWhatsAppEnquiryUrl(selectedPlot)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center rounded-xl bg-brand-green p-5 text-center text-white hover:bg-brand-green-surface transition-colors"
              >
                <MessageCircle className="h-6 w-6 text-brand-gold mb-2.5 group-hover:scale-105 transition-transform" />
                <span className="text-sm font-semibold">WhatsApp</span>
                <span className="text-[11px] text-white/60 mt-0.5">Instant chat</span>
              </a>

              <a
                href={getPhoneCallHref()}
                className="group flex flex-col items-center justify-center rounded-xl border border-brand-border bg-white p-5 text-center text-brand-dark hover:border-brand-green hover:text-brand-green transition-colors"
              >
                <Phone className="h-6 w-6 text-brand-gold mb-2.5 group-hover:scale-105 transition-transform" />
                <span className="text-sm font-semibold">Call Now</span>
                <span className="text-[11px] text-brand-dark-muted mt-0.5">+91 7339652776</span>
              </a>

              <a
                href="#enquiry-form-card"
                className="group flex flex-col items-center justify-center rounded-xl border border-brand-border bg-white p-5 text-center text-brand-dark hover:border-brand-green hover:text-brand-green transition-colors"
              >
                <CalendarCheck className="h-6 w-6 text-brand-gold mb-2.5 group-hover:scale-105 transition-transform" />
                <span className="text-sm font-semibold">Site Visit</span>
                <span className="text-[11px] text-brand-dark-muted mt-0.5">Free inspection</span>
              </a>
            </div>

            {/* Info Box */}
            <div className="rounded-xl border border-brand-border bg-white p-5 space-y-3">
              <div className="flex items-start gap-3 text-sm text-brand-dark-muted">
                <MapPin className="h-4 w-4 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="text-brand-dark block text-[13px]">Site Location</strong>
                  <span className="text-xs">Krishnapuram, Near Thiruvallur, NH 716, Tamil Nadu</span>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm text-brand-dark-muted">
                <Clock className="h-4 w-4 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="text-brand-dark block text-[13px]">Visiting Hours</strong>
                  <span className="text-xs">Mon – Sun: 9:00 AM – 6:00 PM (Appointment recommended)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Enquiry Form */}
          <div ref={formRef} id="enquiry-form-card" className="reveal">
            <div className="rounded-2xl border border-brand-border bg-white p-7 shadow-sm sm:p-9">
              <h3 className="font-serif text-xl font-bold text-brand-green sm:text-2xl">
                Request Plot Details
              </h3>
              <p className="mt-1.5 text-sm text-brand-dark-muted">
                Get pricing, documentation details, and schedule your guided inspection.
              </p>

              {formSubmitted ? (
                <div className="mt-8 rounded-xl bg-emerald-50 border border-emerald-200 p-7 text-center space-y-3">
                  <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
                  <h4 className="font-serif text-lg font-bold text-emerald-900">Enquiry Prepared!</h4>
                  <p className="text-sm text-emerald-800">
                    If WhatsApp did not open automatically, click below.
                  </p>
                  <a
                    href={generateWhatsAppEnquiryUrl(selectedPlot, { name, phone, topic, preferredPlotSize: preferredSize })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Open in WhatsApp</span>
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                  {errorMessage && (
                    <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3.5 text-sm font-medium text-red-700 border border-red-200">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label htmlFor="lead-name" className="block text-xs font-semibold uppercase tracking-wider text-brand-green">
                      Full Name *
                    </label>
                    <input
                      id="lead-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full rounded-lg border border-brand-border bg-brand-cream/60 px-4 py-3 text-sm text-brand-dark placeholder:text-brand-dark-muted/50 focus:border-brand-gold focus:bg-white focus:outline-hidden transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="lead-phone" className="block text-xs font-semibold uppercase tracking-wider text-brand-green">
                      Mobile Number *
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center rounded-l-lg border border-r-0 border-brand-border bg-brand-cream-surface px-3.5 text-sm font-medium text-brand-dark-muted">
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
                        className="w-full rounded-r-lg border border-brand-border bg-brand-cream/60 px-4 py-3 text-sm text-brand-dark placeholder:text-brand-dark-muted/50 focus:border-brand-gold focus:bg-white focus:outline-hidden transition-colors"
                      />
                    </div>
                  </div>

                  {!selectedPlot && (
                    <div className="space-y-1.5">
                      <label htmlFor="preferred-size" className="block text-xs font-semibold uppercase tracking-wider text-brand-green">
                        Preferred Plot Size
                      </label>
                      <select
                        id="preferred-size"
                        value={preferredSize}
                        onChange={(e) => setPreferredSize(e.target.value)}
                        className="w-full rounded-lg border border-brand-border bg-brand-cream/60 px-4 py-3 text-sm text-brand-dark focus:border-brand-gold focus:bg-white focus:outline-hidden transition-colors"
                      >
                        <option value="517 – 800 sq.ft.">517 – 800 sq.ft. (Compact / Investment)</option>
                        <option value="801 – 1,200 sq.ft.">801 – 1,200 sq.ft. (Standard Villa)</option>
                        <option value="1,201 – 1,600 sq.ft.">1,201 – 1,600 sq.ft. (Premium)</option>
                        <option value="Not sure yet">Not sure yet</option>
                      </select>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label htmlFor="enquiry-topic" className="block text-xs font-semibold uppercase tracking-wider text-brand-green">
                      Enquiry Type
                    </label>
                    <select
                      id="enquiry-topic"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full rounded-lg border border-brand-border bg-brand-cream/60 px-4 py-3 text-sm text-brand-dark focus:border-brand-gold focus:bg-white focus:outline-hidden transition-colors"
                    >
                      <option value="Price Details & Payment Schedule">Price Details &amp; Payment Schedule</option>
                      <option value="Available Plots & Layout Map">Available Plots &amp; Layout Map</option>
                      <option value="Book a Free Site Visit">Book a Free Site Visit</option>
                      <option value="Approval Documents & Title Deed">Approval Documents &amp; Title Deed</option>
                    </select>
                  </div>

                  {topic.includes('Site Visit') && (
                    <div className="space-y-1.5">
                      <label htmlFor="visit-date" className="block text-xs font-semibold uppercase tracking-wider text-brand-green">
                        Preferred Visit Date
                      </label>
                      <input
                        id="visit-date"
                        type="date"
                        value={siteVisitDate}
                        onChange={(e) => setSiteVisitDate(e.target.value)}
                        className="w-full rounded-lg border border-brand-border bg-brand-cream/60 px-4 py-3 text-sm text-brand-dark focus:border-brand-gold focus:outline-hidden transition-colors"
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2.5 rounded-lg bg-brand-green px-5 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-brand-green-surface transition-colors cursor-pointer"
                  >
                    <MessageCircle className="h-4 w-4 text-brand-gold" />
                    <span>Send Enquiry via WhatsApp</span>
                  </button>

                  <p className="text-xs text-center text-brand-dark-muted/70">
                    Opens WhatsApp with your pre-filled enquiry. Review before sending.
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
