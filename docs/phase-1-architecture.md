# SWARNA BHOOMI — PHASE 1: TECHNICAL ARCHITECTURE SPECIFICATION

**Document ID:** `docs/phase-1-architecture.md`  
**Project:** Swarna Bhoomi — Premium Residential Plots  
**Date:** October 10, 2026  
**Status:** Approved Technical Architecture Baseline  
**Author:** Principal Software Architect & Next.js Lead (Antigravity Agent)

---

## 1. Selected Framework & Compatible Dependency Matrix

Following the Phase 0 audit and local runtime verification (Node.js `v24.18.0`, npm `12.0.2`, Windows 64-bit), the following stable, production-grade dependency suite has been established:

| Package | Version | Justification & Architectural Responsibility |
|---|---|---|
| **`next`** | `^14.2.24` (resolved `14.2.35`) | Enterprise-grade Next.js App Router. Guarantees stable React Server Component (RSC) streaming, robust static page generation, native Font optimization (`next/font/google`), and zero-config Vercel deployment. |
| **`react`** | `^18.3.1` | Battle-tested React runtime with stable concurrent features and total ecosystem compatibility across form libraries and icons. |
| **`react-dom`** | `^18.3.1` | Stable DOM renderer matching React 18. |
| **`typescript`** | `^5.6.3` | Type safety, strict compilation, and path alias mapping (`@/*`). |
| **`tailwindcss`** | `^3.4.14` | High-performance utility styling. Version 3.4 is selected to ensure complete compatibility with custom theme extensions, `@tailwind` directives, and future accessible UI primitives. |
| **`postcss`** | `^8.4.47` | CSS build-time preprocessing engine. |
| **`autoprefixer`** | `^10.4.20` | Automatic vendor prefix injection for cross-browser CSS support. |
| **`lucide-react`** | `^1.55.0` | Feather-derived crisp SVG icons with tree-shaking and zero emoji dependencies. |
| **`eslint-config-next`** | `14.2.24` | Core Web Vitals and React hook rule validation. |

### Deliberate Omissions:
- **No Backend / Database Packages:** (No Prisma, Mongoose, PostgreSQL, SQLite, or Server Actions for database writing). Version 1.0 strictly avoids lead storage complexity.
- **No Heavy Animation Libraries in Foundation:** (No Framer Motion or Anime.js installed in Phase 1). CSS transitions handle hover and focus micro-interactions. Framer Motion will only be evaluated in Phase 3/5 if layout transitions genuinely require it.

---

## 2. Directory Structure & Component Boundaries

The established structure strictly separates concerns:

```text
swarna-bhoomi/
├── docs/                                  # Specifications, architecture, and phase audit reports
│   ├── phase-0-discovery-report.md       # Phase 0 discovery and unverified facts register
│   ├── phase-1-architecture.md           # This architecture document
│   ├── phase-1-report.md                 # Phase 1 verification and sign-off report
│   ├── Swarna_Bhoomi_PRD_v1.md           # Product Requirements Document
│   └── Swarna_Bhoomi_Antigravity_Prompt_Pack.md # Antigravity phase instructions
├── public/                               # Static assets served from domain root
│   └── assets/
│       ├── branding/                     # Vector lotus logo, wordmarks, approval badges
│       ├── site/                         # Raw, uncompressed plot and road photography
│       └── og/                           # OpenGraph social share card (1200x630)
├── src/
│   ├── app/                              # Next.js App Router tree
│   │   ├── layout.tsx                    # Root document layout (fonts, metadata, shell)
│   │   ├── page.tsx                      # Page 1: Home
│   │   ├── about/page.tsx                # Page 2: About the Project (Phase 5)
│   │   ├── gallery/page.tsx              # Page 3: Gallery (Phase 5)
│   │   ├── amenities/page.tsx            # Page 4: Amenities (Phase 5)
│   │   ├── location/page.tsx             # Page 5: Location & Directions (Phase 5)
│   │   ├── contact/page.tsx              # Page 6: Contact & Enquiry Form (Phase 5)
│   │   └── globals.css                   # Global styling and design token definitions
│   ├── components/                       # Component Layer
│   │   ├── layout/                       # Header, Footer, FloatingMobileBar
│   │   ├── home/                         # HeroSection, HighlightsGrid, SitePreview
│   │   ├── forms/                        # EnquiryForm with client validation
│   │   └── ui/                           # Primitive buttons, badges, cards
│   ├── config/
│   │   └── site.ts                       # Single source of truth configuration
│   └── lib/
│       └── utils.ts                      # Shared helper utilities (cn)
├── .eslintrc.json                        # ESLint configuration (next/core-web-vitals)
├── .gitignore                            # Security-conscious Git exclusions
├── next.config.mjs                       # Next.js runtime configuration
├── package.json                          # Package manifest and NPM scripts
├── postcss.config.mjs                    # PostCSS configuration
├── tailwind.config.ts                    # Brand color tokens & typography mapping
├── tsconfig.json                         # TypeScript configuration with path aliases
└── README.md                             # Developer and deployment manual
```

### Component Boundary Rules:
1. **Server Components by Default:** All layouts and page route files are React Server Components (`async function Page()`). They render to static HTML at build time with zero client JavaScript penalty.
2. **Client Components with `'use client'` Directive:** Restricted exclusively to interactive leaves:
   - `EnquiryForm.tsx` (handles form state, client validation, and URL redirection).
   - `FloatingMobileBar.tsx` (handles mobile scroll visibility and keyboard focus hiding).
   - `GalleryLightbox.tsx` (handles keyboard focus trapping and `Escape` key listeners).
   - Mobile navigation drawer toggle.

---

## 3. Rendering Strategy

- **Static Site Generation (SSG) / Prerendering:** All six marketing pages are purely informational and do not depend on request-time cookies or server databases. Next.js will prerender them as static HTML (`○ (Static)`), resulting in instant Time-to-First-Byte (TTFB) and minimal server hosting load.
- **Image Delivery:** Powered by Next.js `<Image />` with automatic WebP/AVIF content negotiation, responsive `srcset`, and strict layout shift (`CLS`) prevention.

---

## 4. Configuration Strategy & Data Governance

Configuration is strictly centralized in `src/config/site.ts`.

### Governance Rules for Marketing Claims:
1. **Typed Verification Wrapper:**
   ```typescript
   export interface VerificationField<T> {
     value: T;
     status: 'verified' | 'unverified';
     evidenceRequired: string;
     notes?: string;
   }
   ```
2. **Strict Public Isolation:**
   - Starting price (`siteConfig.pricing.startingPriceText`) has `showPublicPrice: false`. Until the client formally confirms pricing terms, the UI will fall back to "Contact for Price" or omit promotional rate cards.
   - Legal approvals (`dtcpApproved`, `reraRegistered`) default to `value: false` and `status: 'unverified'`. No approval claims or badges will be rendered in production without documented authorization.
   - Contact numbers (`phoneDisplay`, `whatsappNumber`) are centrally mapped so updating a single file synchronizes the entire website.

---

## 5. Planned Motion & Animation Responsibilities

To guarantee performance on low-bandwidth mobile networks and respect users with vestibular disorders:
1. **CSS Transitions:** Used for standard hover, focus, tap states, and color transitions (duration 150ms–200ms).
2. **Framer Motion:** Reserved for page-load reveals and smooth accordion/tab switches in Phase 3/5.
3. **Anime.js:** Omitted unless fine-grained SVG path drawing is explicitly required.
4. **Reduced Motion:** Mandatory `@media (prefers-reduced-motion: reduce)` block in `globals.css` instantly zeroes out all animations.

---

## 6. Testing & Quality Assurance Strategy

The following progressive test gates are established:
1. **TypeScript Type Check:** `npm run type-check` (`tsc --noEmit`) validates all types, props, and configurations.
2. **ESLint Static Analysis:** `npm run lint` enforces Next.js Core Web Vitals and hook rules.
3. **Production Compilation:** `npm run build` verifies static rendering, tree-shaking, and asset bundling.
4. **Local HTTP Verification:** Automated curl / PowerShell HTTP checks confirm `200 OK` status and valid HTML payload.
5. **Interactive Browser Subagent Testing:** In Phase 5–7, native browser subagent audits will test live clicks, form submission, and responsive layout behavior.

---

## 7. Migration Roadmap: Subsequent Phases

- **Phase 2 (Information Architecture):** Define section-by-section outlines for all six pages and mobile conversion paths.
- **Phase 3 (Visual Design System):** Finalize brand tokens, typography hierarchy, and a representative homepage visual prototype.
- **Phase 4 (Shared Foundation):** Build global header, footer, reusable UI components, and design system tokens.
- **Phase 5 (Page Implementation):** Incrementally build Home, About, Gallery, Amenities, Location, and Contact pages.
- **Phase 6 (Lead Flow & Mobile Sticky Bar):** Implement form validation, WhatsApp pre-filled URL generator, and sticky mobile action bar.
- **Phase 7 (Full QA & Audits):** End-to-end accessibility, SEO, responsive, and performance checks.
- **Phase 8 (Vercel Production Deployment):** Deploy review build, configure custom domain, and execute live handover.
