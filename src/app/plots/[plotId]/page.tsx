import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingMobileBar } from '@/components/layout/FloatingMobileBar';
import { MoreDetailsSection } from '@/components/enquiry/MoreDetailsSection';
import { getPlotById } from '@/services/plots.service';
import { formatINR, formatINRLakhs, formatPlotDimensions } from '@/lib/formatters';
import { getPhoneCallHref } from '@/lib/whatsapp';
import { siteConfig } from '@/config/site';
import {
  ArrowLeft,
  MessageCircle,
  Phone,
  Compass,
  Maximize2,
  Sparkles,
  CheckCircle2,
  Clock,
  Ban,
  ShieldCheck,
  Building2,
  Milestone,
  MapPin,
  FileCheck2,
  Share2,
} from 'lucide-react';

interface PlotDetailsPageProps {
  params: {
    plotId: string;
  };
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: PlotDetailsPageProps): Promise<Metadata> {
  const plot = getPlotById(params.plotId);
  if (!plot) {
    return {
      title: 'Plot Not Found | Swarna Bhoomi',
    };
  }

  const priceFormatted = formatINR(plot.price);
  return {
    title: `Plot #${plot.plotNumber} — ${plot.areaSqft} Sq.Ft. (${plot.phaseName}) | Swarna Bhoomi`,
    description: `Inspect Plot #${plot.plotNumber} at Swarna Bhoomi in Krishnapuram, Thiruvallur. Area: ${plot.areaSqft} sq.ft., ${plot.facing || 'East'} facing, price: ${priceFormatted}. DTCP Approved No: 92/2026.`,
  };
}

export default async function PlotDetailsPage({ params }: PlotDetailsPageProps) {
  const plot = getPlotById(params.plotId);

  if (!plot) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-brand-cream text-brand-dark pt-32 pb-20 px-5">
          <div className="mx-auto max-w-lg rounded-3xl border border-brand-border bg-white p-10 text-center space-y-4">
            <h1 className="font-serif text-3xl font-bold text-brand-green">Plot Not Found</h1>
            <p className="text-sm text-brand-dark-muted">
              We couldn&apos;t find a plot with identifier &ldquo;{params.plotId}&rdquo; in the current inventory. It may have been updated or reassigned.
            </p>
            <div className="pt-2">
              <Link
                href="/plots"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-green px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-brand-green-surface"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Matching Plots</span>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
        <FloatingMobileBar />
      </>
    );
  }

  const isAvailable = plot.availability === 'Available';
  const isReserved = plot.availability === 'Reserved';

  const priceText = formatINR(plot.price);
  const lakhsText = formatINRLakhs(plot.price);
  const dimensionsText = formatPlotDimensions(plot.widthFeet, plot.lengthFeet);

  // Exact requested WhatsApp message format:
  // "Hi, I am interested in Plot #12 in Phase 1 of Swarna Bhoomi. Please share more details."
  const whatsAppNumber = siteConfig.contact.phoneRaw;
  const whatsAppText = `Hi, I am interested in Plot #${plot.plotNumber} in ${plot.phaseName || `Phase ${plot.phaseNumber}`} of Swarna Bhoomi. Please share more details.`;
  const whatsAppUrl = `https://wa.me/91${whatsAppNumber}?text=${encodeURIComponent(whatsAppText)}`;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-brand-cream text-brand-dark pt-28 sm:pt-32 pb-20 px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-5xl space-y-10">
          {/* Back Navigation Bar */}
          <div className="flex items-center justify-between">
            <Link
              href="/plots"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-green hover:text-brand-gold-dark transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Matching Plots</span>
            </Link>

            <span className="text-xs text-brand-dark-muted">
              Inventory ID: <strong className="text-brand-dark">{plot.id}</strong>
            </span>
          </div>

          {/* Top Hero Banner Card */}
          <div className="rounded-3xl border border-brand-border bg-white p-7 sm:p-10 shadow-sm space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="font-serif heading-display text-4xl sm:text-5xl font-bold text-brand-green">
                    Plot #{plot.plotNumber}
                  </h1>
                  {plot.isCorner && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800 border border-amber-200">
                      <Sparkles className="h-3 w-3 text-amber-600" />
                      Corner Plot
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm font-medium text-brand-gold-dark">
                  {plot.phaseName || `Phase ${plot.phaseNumber}`} &bull; Swarna Bhoomi Township
                </p>
              </div>

              {/* Status Badge */}
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold ${
                  isAvailable
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : isReserved
                    ? 'bg-amber-50 text-amber-800 border border-amber-200'
                    : 'bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                {isAvailable ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                ) : isReserved ? (
                  <Clock className="h-3.5 w-3.5 text-amber-600" />
                ) : (
                  <Ban className="h-3.5 w-3.5 text-slate-400" />
                )}
                <span>{plot.availability}</span>
              </span>
            </div>

            {/* Price & Primary Specs Bar */}
            <div className="grid gap-4 sm:grid-cols-3 rounded-2xl bg-brand-cream/80 p-5 sm:p-6 border border-brand-border/60">
              {/* Total Price */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-dark-muted block">
                  Total Price
                </span>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-brand-green block mt-1">
                  {priceText}
                </span>
                <span className="text-xs font-medium text-brand-gold-dark">
                  {lakhsText} (Base Price)
                </span>
              </div>

              {/* Area & Rate */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-dark-muted block">
                  Plot Area
                </span>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark block mt-1">
                  {plot.areaSqft}{' '}
                  <span className="text-sm font-sans font-normal text-brand-dark-muted">
                    Sq.Ft.
                  </span>
                </span>
                {plot.pricePerSqft && (
                  <span className="text-xs font-medium text-brand-dark-muted">
                    approx. ₹{plot.pricePerSqft.toLocaleString('en-IN')} / sq.ft.
                  </span>
                )}
              </div>

              {/* Facing & Dimensions */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-dark-muted block">
                  Orientation &amp; Size
                </span>
                <span className="font-serif text-xl sm:text-2xl font-bold text-brand-green block mt-1">
                  {plot.facing ? `${plot.facing} Facing` : 'East Facing'}
                </span>
                <span className="text-xs font-medium text-brand-dark-muted">
                  {dimensionsText}
                </span>
              </div>
            </div>

            {/* Corner position or adjoining roads note */}
            {plot.cornerPosition && (
              <div className="rounded-xl border border-amber-200/80 bg-amber-50/70 p-4 text-xs font-medium text-amber-900 flex items-start gap-2.5">
                <Sparkles className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Corner Location:</strong> {plot.cornerPosition}
                </div>
              </div>
            )}

            {/* Description */}
            {plot.description && (
              <p className="text-sm text-brand-dark-muted leading-relaxed">
                {plot.description}
              </p>
            )}

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-3 border-t border-brand-border/60">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-2.5 rounded-xl bg-brand-green px-6 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-brand-green-surface transition-all cursor-pointer"
              >
                <MessageCircle className="h-4 w-4 text-brand-gold" />
                <span>WhatsApp Enquiry</span>
              </a>

              <a
                href={getPhoneCallHref()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-brand-border bg-white px-6 py-3.5 text-sm font-bold text-brand-dark hover:border-brand-green hover:text-brand-green transition-colors"
              >
                <Phone className="h-4 w-4 text-brand-gold-dark" />
                <span>Call +91 7339652776</span>
              </a>

              <a
                href="#plot-enquiry-form"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gold px-6 py-3.5 text-sm font-bold text-brand-green-dark shadow-xs hover:bg-brand-gold-hover transition-colors"
              >
                <span>Enquire About This Plot</span>
              </a>
            </div>
          </div>

          {/* Technical Specifications Grid */}
          <div className="rounded-3xl border border-brand-border bg-white p-7 sm:p-9 shadow-sm space-y-6">
            <div className="flex items-center gap-2.5">
              <FileCheck2 className="h-6 w-6 text-brand-gold-dark" />
              <h2 className="font-serif text-2xl font-bold text-brand-green">
                Plot Specifications &amp; Approval Data
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-brand-border/60 bg-brand-cream/50 p-4 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-dark-muted block">
                  Regulatory Approval
                </span>
                <strong className="text-sm font-bold text-brand-green block">
                  DTCP Approved No: 92/2026
                </strong>
                <span className="text-xs text-brand-dark-muted">
                  Official layout order for Survey No: 143/1A1B, Krishnapuram
                </span>
              </div>

              <div className="rounded-xl border border-brand-border/60 bg-brand-cream/50 p-4 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-dark-muted block">
                  Bank Finance
                </span>
                <strong className="text-sm font-bold text-brand-green block">
                  80% Bank Loan Approved
                </strong>
                <span className="text-xs text-brand-dark-muted">
                  Pre-approved documentation with nationalized and scheduled banks
                </span>
              </div>

              <div className="rounded-xl border border-brand-border/60 bg-brand-cream/50 p-4 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-dark-muted block">
                  Road Access
                </span>
                <strong className="text-sm font-bold text-brand-green block">
                  {plot.roadWidthFeet || 30}ft Internal Blacktop Road
                </strong>
                <span className="text-xs text-brand-dark-muted">
                  Tar avenue with concrete boundary kerbstones laid
                </span>
              </div>

              <div className="rounded-xl border border-brand-border/60 bg-brand-cream/50 p-4 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-dark-muted block">
                  Title &amp; Demarcation
                </span>
                <strong className="text-sm font-bold text-brand-green block">
                  Clear Title &amp; Numbered Stone Placed
                </strong>
                <span className="text-xs text-brand-dark-muted">
                  Perimeter fenced layout ready for immediate registration &amp; construction
                </span>
              </div>
            </div>

            {/* Additional specifications if recorded */}
            {plot.additionalSpecifications && (
              <div className="pt-4 border-t border-brand-border/60">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-green mb-3">
                  Key Layout Attributes
                </h3>
                <dl className="grid gap-2.5 sm:grid-cols-2 text-xs">
                  {Object.entries(plot.additionalSpecifications).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between rounded-lg bg-brand-cream-surface/70 px-3.5 py-2"
                    >
                      <dt className="text-brand-dark-muted font-medium">{key}</dt>
                      <dd className="font-semibold text-brand-dark">{String(value)}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>

          {/* Master Layout Reference */}
          <div className="rounded-3xl border border-brand-border bg-white p-7 sm:p-9 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-gold-dark">
                  Master Blueprint Reference
                </span>
                <h2 className="font-serif text-2xl font-bold text-brand-green">
                  Township Sector Layout
                </h2>
              </div>
              <span className="text-xs text-brand-dark-muted hidden sm:inline">
                Survey No: 143/1A1B
              </span>
            </div>

            <p className="text-xs sm:text-sm text-brand-dark-muted leading-relaxed">
              Plot #{plot.plotNumber} is part of the approved layout blueprint with wide road frontage and direct connection to the Chennai–Tirupati National Highway (NH 716).
            </p>

            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-brand-border bg-slate-900">
              <Image
                src="/assets/site/layout-plan.jpg"
                alt={`Layout plan showing location of Plot #${plot.plotNumber}`}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 900px"
              />
            </div>
          </div>

          {/* On-Page Lead Enquiry Form pre-wired with this plot */}
          <div id="plot-enquiry-form">
            <MoreDetailsSection selectedPlot={plot} />
          </div>
        </div>
      </main>
      <Footer />
      <FloatingMobileBar />
    </>
  );
}

