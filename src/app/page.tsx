import { siteConfig } from '@/config/site';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mx-auto max-w-2xl rounded-2xl border border-brand-cream-muted bg-white/80 p-8 shadow-sm backdrop-blur-sm sm:p-12">
        {/* Brand Lotus Symbol Badge */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-green/10 text-brand-gold">
          <svg
            className="h-10 w-10 text-brand-gold"
            viewBox="0 0 100 100"
            fill="currentColor"
            aria-hidden="true"
          >
            {/* Stylized 5-petal lotus motif matching brand identity */}
            <path d="M50 15 C52 35 48 45 50 65 C52 45 48 35 50 15 Z" />
            <path d="M50 65 C40 45 25 35 15 45 C25 60 40 62 50 65 Z" />
            <path d="M50 65 C60 45 75 35 85 45 C75 60 60 62 50 65 Z" />
            <path d="M50 65 C35 55 20 58 10 70 C25 78 40 70 50 65 Z" />
            <path d="M50 65 C65 55 80 58 90 70 C75 78 60 70 50 65 Z" />
          </svg>
        </div>

        {/* Brand Name & Descriptor */}
        <h1 className="font-serif text-3xl font-bold tracking-tight text-brand-green sm:text-4xl md:text-5xl">
          {siteConfig.name}
        </h1>
        <p className="mt-2 text-sm font-medium uppercase tracking-widest text-brand-gold sm:text-base">
          {siteConfig.descriptor}
        </p>

        {/* Location Corridor */}
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand-green/15 bg-brand-green/5 px-4 py-1.5 text-xs font-medium text-brand-green sm:text-sm">
          <span className="h-2 w-2 rounded-full bg-brand-gold" />
          {siteConfig.location.village}, {siteConfig.location.taluk} &bull; {siteConfig.location.corridor}
        </div>

        {/* Project Foundation Note */}
        <div className="mt-8 rounded-xl border border-brand-gold/30 bg-brand-gold/5 p-4 text-xs leading-relaxed text-brand-dark-muted sm:text-sm">
          <p className="font-semibold text-brand-green">
            Phase 1: Technical Foundation Initialized
          </p>
          <p className="mt-1">
            Next.js App Router, TypeScript, and brand token design system are configured.
            In accordance with project governance, full page implementations, commercial pricing,
            and legal approvals will be integrated in subsequent approved phases.
          </p>
        </div>
      </div>
    </main>
  );
}
