# Swarna Bhoomi — Premium Real Estate Township Platform

A production-grade, full-stack real estate platform for **Swarna Bhoomi Residential Township**, located in Krishnapuram, near Thiruvallur, along the Chennai–Tirupati National Highway (NH 716) corridor.

Built from scratch using Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, and Supabase PostgreSQL with Row Level Security (RLS).

---

## 1. Project Overview & Architecture

### Stack
- **Frontend Framework:** Next.js 14.2 (App Router, Server Components by default)
- **UI & Styling:** Tailwind CSS, Custom Token Architecture (Forest Green, Warm Gold, Ivory Cream), Lucide React
- **Database & Backend:** Supabase PostgreSQL with RLS, Isomorphic Data Service
- **Interactive Layout Simulator:** Pure SVG-based Township Master Plan with Pan, Zoom, Reset, and Bidirectional Selection
- **Lead Generation:** WhatsApp Click-to-Chat (+91 7339652776) with URL-encoded plot statements & Direct Phone Calls
- **Hosting Target:** Vercel (Frontend) + Supabase (Backend)
- **Planned Domain:** `www.swarnabhoomi.in`

### Primary Customer Journey
1. **Discover:** Visitor enters Swarna Bhoomi and explores verified township concepts and infrastructure.
2. **Search:** Enters desired square footage (e.g., `700 sq.ft.`) with search modes (*Exact Match*, *Nearby Area with configurable ±50 sqft tolerance*, or *Minimum Area*).
3. **Filter:** Refines by Facing (East, West, North, South), Phase (Phase 1, 2, or 3), Dimensions, and Availability.
4. **Simulate:** Clicks "View on Layout" or any plot polygon on the SVG simulator to inspect geometry, road width, and neighboring amenities.
5. **Convert:** Clicks WhatsApp Enquiry to launch WhatsApp with a pre-filled message addressed to `+91 7339652776` specifying Plot Number, Area, Facing, Dimensions, and Phase.

---

## 2. Directory Structure

```text
swarna-bhoomi/
├── src/
│   ├── app/
│   │   ├── layout.tsx                     # Root HTML shell, SEO defaults & font variables
│   │   ├── page.tsx                       # Master Homepage (Hero, Plot Finder, Simulator, Concepts, Amenities, Location)
│   │   ├── about/page.tsx                 # Detailed Project Vision & MCP Promoters Profile
│   │   ├── amenities/page.tsx             # 10 Amenities with 3-tier status (Existing, In-Progress, Planned)
│   │   ├── location/page.tsx              # Google Maps embed, Route directions & Landmarks
│   │   ├── contact/page.tsx               # Dedicated enquiry form & site visit scheduler
│   │   ├── admin/page.tsx                 # Protected Administrative Console (Inventory, Import/Export, Enquiries)
│   │   ├── sitemap.ts                     # Dynamic Next.js sitemap
│   │   ├── robots.ts                      # Robots.txt with protected admin exclusions
│   │   └── globals.css                    # Design tokens & base layer
│   ├── components/
│   │   ├── hero/HeroSection.tsx           # Brand lotus emblem, headline & conversion CTAs
│   │   ├── plots/
│   │   │   ├── PlotFinder.tsx             # Exact, Nearby (±tolerance), and Min Area filtering console
│   │   │   └── PlotCard.tsx               # High-contrast plot card with WhatsApp CTA & View on Layout
│   │   ├── simulator/
│   │   │   └── PlotLayoutSimulator.tsx    # SVG Master Plan with pan, zoom, touch, and accessible table toggle
│   │   ├── home/TownshipConcepts.tsx      # 6 Brochure lifestyle concepts
│   │   ├── amenities/AmenitiesSection.tsx # Amenities with delivery status filter
│   │   ├── location/LocationSection.tsx   # Verified NH 716 connectivity & map
│   │   ├── enquiry/MoreDetailsSection.tsx # "Let's Find the Right Plot for You" lead section
│   │   └── layout/
│   │       ├── Header.tsx                 # Responsive navigation with WhatsApp CTA & mobile drawer
│   │       ├── Footer.tsx                 # Brand disclaimer, site office details & navigation
│   │       └── FloatingMobileBar.tsx      # Sticky mobile bottom bar (Call, WhatsApp, Find Plots)
│   ├── services/
│   │   ├── plots.service.ts               # Primary search, CRUD, and CSV import logic
│   │   ├── plots.data.ts                  # Audited brochure seed inventory (Phases 1, 2, 3)
│   │   ├── projects.service.ts            # Amenities, concepts, and landmarks dataset
│   │   └── enquiries.service.ts           # Public enquiry submission & retrieval
│   ├── lib/
│   │   ├── whatsapp.ts                    # WhatsApp URL generator with exact required template
│   │   ├── utils.ts                       # Class names utility
│   │   └── supabase/client.ts             # Supabase client with safe fallback
│   ├── types/
│   │   └── plot.ts                        # Strict TypeScript interfaces
│   └── config/
│       └── site.ts                        # Single source of truth configuration
├── supabase/
│   ├── migrations/
│   │   └── 001_initial_schema.sql         # PostgreSQL tables, constraints, indexes & RLS policies
│   └── seed/
│       └── seed_data.sql                  # Project foundation & verified plot records
├── scripts/
│   └── test-business-logic.ts             # 10 automated test suites for business logic
├── .env.example                           # Environment variables template
├── tailwind.config.ts                     # Brand color extensions
└── tsconfig.json                          # Strict TypeScript configuration
```

---

## 3. Step-by-Step Setup Guide

### 3.1 Local Development Setup
1. Clone the repository and navigate to the project directory:
   ```bash
   cd swarna-bhoomi
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the local development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

*Note: The platform is built with an isomorphic in-memory fallback. You can search, filter plots, view the simulator, test WhatsApp links, and manage inventory in the admin dashboard immediately, even before configuring Supabase.*

---

### 3.2 Supabase Project Creation & Database Setup
To connect a live PostgreSQL database:

1. Create a new project on [Supabase](https://supabase.com).
2. Go to **Project Settings** → **API** and copy:
   - `Project URL`
   - `anon` / `public` API key
3. In your local project, copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
4. Update `.env.local`:
   ```ini
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key
   ```
5. In Supabase Dashboard, navigate to **SQL Editor** and execute:
   - `supabase/migrations/001_initial_schema.sql` (Creates tables, enums, indexes, and Row Level Security policies)
   - `supabase/seed/seed_data.sql` (Populates verified Phase 1, Phase 2, and Phase 3 plots)

---

### 3.3 Row Level Security (RLS) Policies
The database enforces strict security boundaries:
- **Public Visitors:**
  - Can read `projects`, `phases`, and `plots`.
  - Can insert `enquiries` via the lead form.
  - Cannot read other customers' enquiries.
  - Cannot update or delete plots.
- **Authenticated Administrators:**
  - Full CRUD operations on `plots`.
  - Full read access to `enquiries`.
  - Authorized via `profiles.role = 'admin'`.

---

### 3.4 Admin Console & Plot Data Import
1. Navigate to `/admin` in your browser.
2. Enter the administrator passcode: `admin` (or `swarna@admin2026`).
3. **Inventory Tab:**
   - Search plots by plot number or square footage.
   - Edit plot dimensions, area, facing, or phase.
   - Quick toggle availability (*Available*, *Reserved*, *Sold*).
   - Add new plots with duplicate validation.
4. **Data Import Tab:**
   - Paste CSV records formatted as:
     ```csv
     Plot,Phase,Area,Facing,Width,Length,Status
     101,1,600,North,20,30,Available
     102,1,700,East,20,35,Available
     103,2,1200,North,30,40,Reserved
     ```
   - Click **Validate & Import Records**. The validator detects duplicate plot numbers, non-positive areas, and invalid facings.
5. **Export Tab:**
   - Download the entire verified plot inventory as CSV at any time.

---

### 3.5 Automated Business Logic Testing
Run the test suite to verify search logic, nearby area tolerance, and WhatsApp URLs:
```bash
npx tsx scripts/test-business-logic.ts
```

Tests cover:
- Exact Match area queries (e.g., 700 sq.ft.)
- Nearby Area tolerance bounds (e.g., 700 ± 50 sq.ft. returns 650 to 750)
- Minimum Area queries (e.g., >= 1200 sq.ft.)
- Facing direction filtering
- Phase identification
- Availability enforcement (never showing reserved or sold plots as available)
- Dimension filtering
- WhatsApp URL generation for Plot 42 with verified details
- Duplicate and invalid CSV import prevention

---

### 3.6 Vercel Deployment
1. Push the code to a GitHub repository:
   ```bash
   git add .
   git commit -m "feat: complete Swarna Bhoomi real estate platform"
   git push origin main
   ```
2. Import the project in [Vercel](https://vercel.com).
3. Add the environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL`: `https://www.swarnabhoomi.in`
4. Click **Deploy**.

---

### 3.7 Custom Domain Configuration (`www.swarnabhoomi.in`)
1. In the Vercel Project Dashboard, navigate to **Settings** → **Domains**.
2. Add `swarnabhoomi.in` and `www.swarnabhoomi.in`.
3. In your DNS provider (e.g., GoDaddy, Namecheap, Cloudflare), configure:
   - **A Record:** `@` points to `76.76.21.21`
   - **CNAME Record:** `www` points to `cname.vercel-dns.com`
4. Once DNS propagates, Vercel will automatically provision SSL certificates.

---

## 4. Current Status & Governance Notice

- **Database:** Fully structured with migrations in `supabase/migrations/` and seed data in `supabase/seed/`. Active in local storage mode for instant preview; connects to Supabase as soon as credentials are provided.
- **Commercial Pricing:** Base pricing is stated as *"Starting from ₹7 Lakhs\*"* with explicit terms-and-conditions notes.
- **Approvals & Governance:** DTCP approval orders and RERA certificates are marked for client verification before final legal execution.
- **Contacts:** Active phone desk and WhatsApp routing directed to `+91 7339652776`.
