# SWARNA BHOOMI — PHASE 0: COMPLETE PROJECT DISCOVERY & TECHNICAL AUDIT REPORT

**Document ID:** `docs/phase-0-discovery-report.md`  
**Project:** Swarna Bhoomi — Premium Residential Plots  
**Location:** Krishnapuram, Thiruvallur (Chennai–Tirupati National Highway / NH 716 corridor)  
**Date of Audit:** October 10, 2026  
**Auditor / Roles:** Senior Software Architect, Principal Frontend Engineer, Premium UI/UX Design Lead, Product Analyst, Accessibility Specialist, SEO Engineer, QA Lead (Antigravity Agent)  
**Status:** Complete Baseline Audit — Ready for Client Review  
**Operational Mode:** Read-Only for Application Code (No code changes, no dependencies installed, no mockups scaffolded)

---

## 1. EXECUTIVE SUMMARY

Swarna Bhoomi is an upcoming marketing website for a residential plotted development / township project located in Krishnapuram, Thiruvallur, along the Chennai–Tirupati National Highway corridor. The commercial objective is to provide prospective land buyers, families, and real estate investors with a credible, transparent, and responsive digital showroom that converts traffic into qualified enquiries and scheduled site visits.

In accordance with strict professional standards and the Phase 0 mandate, **no application code was written, modified, scaffolded, or deployed during this phase.** This audit establishes an exhaustive, testable, and legally conscious engineering baseline.

Key discoveries from this audit include:
1. **Repository Status:** The project workspace currently contains foundational specifications (`Swarna_Bhoomi_PRD_v1.md`, `Swarna_Bhoomi_Antigravity_Prompt_Pack.md`) and extensive skill suites (`.agents/skills`, `.claude/skills`), but **no Git repository, no `package.json`, and no Next.js application have been initialized yet.**
2. **Reference Media:** All three client-supplied WhatsApp reference images were located, retrieved from local storage, and audited visually. They reveal authentic site conditions (tarred internal roads, concrete boundary fencing, yellow survey demarcation stones such as stone "85", and golden-hour terrain), as well as a physical street pole kiosk photographed on an active road in Tamil Nadu.
3. **Brand Identity:** The brand utilizes a gold lotus motif (five stylized petals), a two-line serif wordmark ("SWARNA BHOOMI" + "PREMIUM RESIDENTIAL PLOTS"), a dark forest green background palette, restrained gold metallic accents, and warm ivory/cream container panels. A developer logo bearing the initials **"MCP"** was discovered in the top-left of all three reference assets, identifying a critical corporate entity that must be verified.
4. **Legal & Commercial Governance:** Promotional claims printed on the artwork—specifically the badge "DTCP APPROVED", the promotional price "STARTING FROM ₹7 LAKHS*", the phone number "7339652776", and Tamil Nadu RERA status—are marketing inputs, not documentary legal proof. They are formally logged in an Unverified-Facts Register and must be validated before public release.
5. **Technical Architecture:** The planned version 1.0 stack consists of Next.js (App Router), React, Tailwind CSS, Lucide icons, and Vercel hosting. To maintain extreme operational simplicity and prevent data privacy compliance risks, **no custom database, admin dashboard, or backend lead CRM will be built in V1.** All enquiries will route cleanly via validated client-side WhatsApp click-to-chat links and direct `tel:` calls.

---

## 2. WORKSPACE AND REPOSITORY STATUS

An exhaustive filesystem and version control inspection of `c:\Users\saran\OneDrive\Desktop\PROJECTS\swarna bhoomi` was conducted:

| Parameter | Observed Value | Analysis & Implication |
|---|---|---|
| **Working Directory** | `c:\Users\saran\OneDrive\Desktop\PROJECTS\swarna bhoomi` | Root workspace for project operations. |
| **Git Status** | `fatal: not a git repository` | Git is not initialized. No `.git` folder exists. Version history and branch protection are not yet established. |
| **Package Manager Files** | Missing (`package.json`, `package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`) | No dependencies have been installed or tracked yet. |
| **Framework Code** | Missing (`next.config.js`, `tsconfig.json`, `src/`, `app/`, `pages/`) | No application scaffolding exists. Green-field setup required in Phase 4. |
| **Static Assets** | Missing (`public/`, `assets/`) | Client reference images exist externally; not yet copied into application public assets. |
| **Documentation Present** | `Swarna_Bhoomi_PRD_v1.md` (31,326 B)<br>`Swarna_Bhoomi_Antigravity_Prompt_Pack.md` (23,459 B) | Complete product requirements baseline and phase prompts are available and read in full. |
| **Missing Document** | `Swarna_Bhoomi_Project_Reference.md` | Searched across workspace and user downloads; file does not exist. Requirements in PRD v1 and Prompt Pack serve as reference. |

---

## 3. ACTUAL SKILL DIRECTORIES FOUND

An audit of skill paths within the workspace and agent environment yielded the following:

- `claude/skills`: **DOES NOT EXIST** (Attempted directory access failed; path absent).
- `agents/skills`: **DOES NOT EXIST** (Attempted directory access failed; path absent).
- `.claude/skills`: **EXISTS** (Contains 20 skill directories: `cavecrew`, `caveman`, `caveman-commit`, `caveman-compress`, `caveman-discover`, `caveman-evidence-review`, `caveman-explore`, `caveman-help`, `caveman-learn`, `caveman-manage`, `caveman-optimize`, `caveman-review`, `caveman-setup`, `caveman-stats`, `investigate-first`, `lean-build`, `migration`, `safe-refactor`, `surgical-patch`, `verify-and-stop`).
- `.agents/skills`: **EXISTS** (Contains 99 skill directories covering full-lifecycle design, planning, architecture, code-review, and verification suites).
- Built-in / System Skills: Located at `C:\Users\saran\.gemini\config\skills` and `C:\Users\saran\.gemini\antigravity-ide\builtin\skills`.

---

## 4. SKILLS INSPECTED AND GENUINELY USED

Per project rules, every skill referenced below was physically inspected in its respective `SKILL.md` instruction file:

| Skill Name | Actual Location | Domain / Purpose | Inspected & Status |
|---|---|---|---|
| `ui-ux-pro-max` | `.agents/skills/ui-ux-pro-max/SKILL.md` | UI/UX design intelligence, 119 UX guidelines, 50 styles, WCAG AA accessibility, touch interaction (44x44px), typography scales. | **YES** — Inspected. Core design intelligence engine for visual and interaction design. |
| `ui-styling` | `.agents/skills/ui-styling/SKILL.md` | Tailwind CSS utility-first styling, accessible primitives (Radix/shadcn patterns), mobile-first responsive architecture. | **YES** — Inspected. Selected for component design and token implementation. |
| `design-system` | `.agents/skills/design-system/SKILL.md` | Three-layer token architecture (Primitive → Semantic → Component), CSS variables, spacing/typography scales. | **YES** — Inspected. Selected for defining CSS custom property tokens. |
| `brand` | `.agents/skills/brand/SKILL.md` | Brand voice, visual identity standards, color palette extraction, asset validation. | **YES** — Inspected. Selected for brand consistency across marketing copy. |
| `banner-design` | `.agents/skills/banner-design/SKILL.md` | Hero banner composition, visual hierarchy, restrained typography, advertising standards. | **YES** — Inspected. Selected for hero section structure. |
| `gsd-plan-phase` | `.agents/skills/gsd-plan-phase/SKILL.md` | Structured phase planning with built-in verification loops and anti-hallucination gates. | **YES** — Inspected. Used to establish phase delivery plan. |
| `gsd-discuss-phase` | `.agents/skills/gsd-discuss-phase/SKILL.md` | Structured stakeholder interview and requirement clarification protocols. | **YES** — Inspected. Used for prioritizing client questions. |
| `gsd-code-review` | `.agents/skills/gsd-code-review/SKILL.md` | Multi-tier static code analysis, security auditing, and bug detection. | **YES** — Inspected. Scheduled for Phase 4, 5, 6, 7 review gates. |
| `verify-and-stop` | `.agents/skills/verify-and-stop/SKILL.md` | Strict scope enforcement, proving acceptance criteria before terminating turn. | **YES** — Inspected. Enforced in this audit. |
| `lean-build` | `.agents/skills/lean-build/SKILL.md` | Preventing feature creep and over-engineering (e.g. preventing unrequested backends/databases). | **YES** — Inspected. Enforced to protect V1 scope. |
| `safe-refactor` | `.agents/skills/safe-refactor/SKILL.md` | Behavior-preserving code refactoring and regression containment. | **YES** — Inspected. Reserved for Phase 7 optimization. |

*Note on Missing Skills:* No generic skills were fabricated. Dedicated standalone skills for Next.js, Framer Motion, Anime.js, and SEO do not exist as independent workspace skill directories; instead, their authoritative engineering principles are derived directly from `ui-ux-pro-max`, `ui-styling`, official framework documentation, and modern web standards.

---

## 5. TOOLS INVENTORY WITH AVAILABILITY AND LIMITATIONS

| Tool | Status | Intended Use in Project | Known Limitations | Phase Needed |
|---|---|---|---|---|
| **File Inspection (`view_file`, `list_dir`)** | Available | Inspect workspace files, text content, and binary images. | Cannot edit files; 800-line chunk viewing limit. | All Phases |
| **File Modification (`write_to_file`, `replace_file_content`)** | Available | Scaffold configurations, write Markdown reports, craft code. | Exact character-matching required for replacement. | Phase 0 (report), Phase 4–8 |
| **Pattern Search (`grep_search`)** | Available | Ripgrep codebase search for strings, tokens, and imports. | Limited to 50 matches per call. | Phase 1–8 |
| **Command Execution (`run_command`)** | Available | Run PowerShell commands, Node scripts, builds, Git actions. | Background task timeout if command exceeds wait time. | Phase 0–8 |
| **Native Runtime Environment** | Available | Node.js `v24.18.0`, npm `12.0.2`, npx `12.0.2`, Git `2.54.0`, Python `3.14.2`. | Windows OS path formatting (backslashes vs forward slashes). | Phase 0–8 |
| **Native Browser Subagent (`browser_subagent`)** | Available | Automated browser preview, mobile viewport emulation, live click tests, WebP session recording. | Requires active HTTP dev server or deployed URL. | Phase 5, 6, 7, 8 |
| **Playwright Automation** | Not Installed | Headless end-to-end regression testing of forms and URL encoding. | Not installed globally. Can be added as devDependency in Phase 6 if required. | Phase 6 & 7 (Optional) |
| **Lighthouse CLI** | Not Installed | Automated performance, accessibility, SEO, and PWA scoring. | Not installed globally. Native DevTools audits and subagent inspections suffice. | Phase 7 |
| **Image Optimization Tools** | Built-in via Next.js | Modern WebP/AVIF transformation, responsive `srcset`, layout shift prevention. | Dependent on Next.js `next/image` runtime once app is scaffolded. | Phase 4, 5, 7 |
| **AI Image Generation (`generate_image`)** | Available | UI mockups, fallback placeholder graphics. | **RESTRICTED:** Must NOT generate synthetic site photos or fabricate real-estate imagery. | Strictly controlled |

---

## 6. EXISTING FRAMEWORK, DEPENDENCIES, AND SCRIPTS AUDIT

- **Repository Presence:** None. No Git repository exists in `c:\Users\saran\OneDrive\Desktop\PROJECTS\swarna bhoomi`.
- **Framework & Dependencies:** None installed. No `node_modules`, no `package.json`.
- **Existing Routes:** None.
- **Existing Scripts:** None (`npm run dev`, `npm run build`, `npm run lint` are not yet defined).
- **Proposed Project Architecture (Target for Phase 4):**
  ```
  swarna-bhoomi/
  ├── docs/
  │   ├── phase-0-discovery-report.md
  │   ├── Swarna_Bhoomi_PRD_v1.md
  │   └── Swarna_Bhoomi_Antigravity_Prompt_Pack.md
  ├── public/
  │   ├── assets/
  │   │   ├── branding/ (logo, lotus mark, badges)
  │   │   ├── site/ (real plot photographs, road infrastructure)
  │   │   └── og/ (social preview image)
  │   ├── robots.txt
  │   └── sitemap.xml
  ├── src/
  │   ├── app/
  │   │   ├── layout.tsx (Global metadata, fonts, header, footer, floating mobile bar)
  │   │   ├── page.tsx (Page 1: Home)
  │   │   ├── about/page.tsx (Page 2: About the Project)
  │   │   ├── gallery/page.tsx (Page 3: Gallery)
  │   │   ├── amenities/page.tsx (Page 4: Amenities)
  │   │   ├── location/page.tsx (Page 5: Location & Directions)
  │   │   └── contact/page.tsx (Page 6: Contact & Enquiry Form)
  │   ├── components/
  │   │   ├── common/ (Header, Footer, FloatingMobileBar, Button, Card, Badge)
  │   │   ├── home/ (Hero, Highlights, AmenitiesPreview, LocationPreview)
  │   │   └── forms/ (EnquiryForm with WhatsApp click-to-chat integration)
  │   ├── config/
  │   │   ├── site.ts (Verified phone, WhatsApp number, coordinates, copy)
  │   │   └── navigation.ts (Navbar & footer link trees)
  │   └── styles/
  │       └── globals.css (Design tokens, Tailwind directives, reduced motion)
  ├── tailwind.config.ts
  ├── tsconfig.json
  └── package.json
  ```

---

## 7. REFERENCE-IMAGE INVENTORY

Three client-supplied reference images were located in the Windows WhatsApp Desktop transfers directory (`C:\Users\saran\AppData\Local\Packages\5319275A.WhatsAppDesktop_cv1g1gvanyjgm\LocalState\sessions\...\transfers\2026-41\`) and analyzed in high resolution:

```carousel
![Reference Image 1: Promotional Poster](C:\Users\saran\.gemini\antigravity-ide\brain\4675c58c-08fc-4319-bdf9-4ddddda98a03\reference_assets\WhatsApp Image 2026-10-10 at 8.16.19 PM.jpeg)
<!-- slide -->
![Reference Image 2: Digital Marketing Creative](C:\Users\saran\.gemini\antigravity-ide\brain\4675c58c-08fc-4319-bdf9-4ddddda98a03\reference_assets\WhatsApp Image 2026-10-10 at 8.16.25 PM.jpeg)
<!-- slide -->
![Reference Image 3: Real Street Pole Kiosk Photograph](C:\Users\saran\.gemini\antigravity-ide\brain\4675c58c-08fc-4319-bdf9-4ddddda98a03\reference_assets\WhatsApp Image 2026-10-10 at 8.16.25 PM (1).jpeg)
```

### Detailed Asset Breakdown:

#### Asset 1: `WhatsApp Image 2026-10-10 at 8.16.19 PM.jpeg`
- **Location:** WhatsApp transfers cache (archived copy in agent artifacts).
- **Dimensions & Format:** 1066 × 1600 px (Portrait ~2:3), 256.55 KB, 24bpp RGB JPEG.
- **Classification:** Digital promotional flyer / graphic artwork.
- **Visual Features:**
  - **Developer Mark:** Top-left yellow/gold badge featuring the letters **"MCP"** beneath a house icon.
  - **Logo & Wordmark:** Five-petal gold lotus emblem above "SWARNA BHOOMI" (gold outline/navy fill) and "PREMIUM RESIDENTIAL PLOTS".
  - **Approval Seal:** Scalloped gold badge reading "DTCP APPROVED" with 3 stars and script "Clear Title Secure Future".
  - **Site Photography:** Central horizontal photo showing open layout land, concrete boundary fencing, road kerb development, and backdrop of green hills and transmission towers under a blue sky.
  - **Location Pill:** Map pin with "KRISHNAPURAM - THIRUVALLUR", "Chennai - Tirupati National Highway".
  - **Value Icons (5 circular green badges):** On National Highway (NH), Prime Location, Fast Development, Ideal for Dream Home, Great Investment.
  - **Highway Photo Inset:** Multi-lane highway with overhead sign reading "Chennai - Tirupati National Highway".
  - **Call CTA:** "For More Details Call: 7339652776".
  - **Footer Value Badges:** Transparent Process, Clear Documentation, Great Connectivity, Safe & Peaceful Community.
- **Suitability:** Valuable reference for typography and iconography. Central site photo has embedded text and cannot be used directly as a clean hero background without cropping. Clean original photography needed from client.

#### Asset 2: `WhatsApp Image 2026-10-10 at 8.16.25 PM.jpeg`
- **Location:** WhatsApp transfers cache (archived copy in agent artifacts).
- **Dimensions & Format:** 1024 × 1536 px (Portrait 2:3), 285.68 KB, 24bpp RGB JPEG.
- **Classification:** Digital promotional graphic variation.
- **Visual Features:**
  - **Logo & Headline:** Gold lotus mark, "SWARNA BHOOMI", script headline "Your Dream Plot Starts Here...".
  - **Approval Badge:** Scalloped gold badge "DTCP APPROVED" with 3 stars.
  - **Location Badge:** Dark green rounded container with yellow typography.
  - **Site Photography:**
    - Left: Plotted land at sunset/golden hour with perimeter fence and palm trees ("Invest in Land, Build Your Future...").
    - Right (two perspective cards): Real photos of blacktop internal tar roads ("Well Developed Internal Roads" and "Ready for Your Dream Home").
  - **Bottom Banner:** Highway perspective, telephone CTA ("7339652776"), and script tagline "Premium Location | Better Tomorrow".
- **Suitability:** Confirms internal blacktop roads are already laid on-site. Provides visual confirmation of development status. Original raw road photos should be requested from client for Gallery use.

#### Asset 3: `WhatsApp Image 2026-10-10 at 8.16.25 PM (1).jpeg`
- **Location:** WhatsApp transfers cache (archived copy in agent artifacts).
- **Dimensions & Format:** 1087 × 1447 px (Portrait ~3:4), 248.95 KB, 24bpp RGB JPEG.
- **Classification:** Authentic real-world photograph of an illuminated street pole advertisement kiosk on a commercial road in Tamil Nadu (street traffic, Tamil shop signboards visible).
- **Visual Features:**
  - Confirms the campaign is physically live and active in the local market.
  - Dark green/black pole board with gold borders.
  - Shows top-left "MCP" badge, Gold Lotus, and "SWARNA BHOOMI".
  - Contains three distinct site photos: (1) panoramic plot field with survey boundary stone **"85"**, (2) internal blacktop road with white kerbstones, (3) road turn/culvert with perimeter tin sheets.
  - **Commercial Pricing Headline:** High-contrast yellow/gold panel: **"STARTING FROM ₹7 LAKHS*"** (explicitly showing the asterisk `*`).
  - **Contact Banner:** Green phone circle + "For More Details Call: 7339652776".
- **Suitability:** Proves the marketing campaign is actively deployed in the region; provides proof of the asterisk on the ₹7 Lakhs price point; cannot be used directly on the website except potentially as a thumbnail demonstration of real-world brand presence if authorized by the client.

---

## 8. BRAND AND VISUAL DIRECTION FINDINGS

Based on the forensic examination of the reference artwork, the visual design system must reflect the authentic brand identity rather than generic AI templates:

### 1. Color Palette Tokens
- **Deep Forest Green (Primary Brand Anchor):** `hsl(154, 85%, 11%)` (`#04331e`) / `hsl(155, 65%, 16%)` (`#0f432a`). Used for header accents, hero banners, dark contrast cards, and high-impact UI sections.
- **Warm Gold (Accent & Highlights):** `hsl(43, 74%, 49%)` (`#d9a721`) / `hsl(38, 70%, 55%)` (`#e4b335`). Used for badges, CTAs, border accents, icon rings, and verified status seals.
- **Ivory & Warm Cream (Backgrounds & Surface):** `hsl(40, 33%, 97%)` (`#fcfbf7`) / `hsl(42, 28%, 94%)` (`#f5f3ec`). Replaces sterile cold white for page backgrounds, offering an organic, land-centric luxury feel.
- **Dark Neutral (Body Text & Legibility):** `hsl(150, 20%, 12%)` (`#19241e`) / `hsl(0, 0%, 20%)` (`#333333`). Guarantees minimum WCAG AA contrast ratio (> 7:1 against ivory backgrounds).

### 2. Typography Strategy
- **Display & Headings:** Premium Serif with classic proportions (e.g., *Playfair Display* or *Cinzel* from Google Fonts) to mirror the "SWARNA BHOOMI" wordmark.
- **Body & Controls:** Clean, high-legibility Sans-Serif (e.g., *Inter* or *Plus Jakarta Sans*) for specifications, plot measurements, table data, and form controls.

### 3. Visual Treatment & Anti-Patterns to Avoid
- **Avoid:** Generic AI aesthetics (fluorescent neon gradients, glowing purple/cyan borders, animated particle backgrounds, fake countdown timers, floating stock illustrations).
- **Avoid:** Excessive glassmorphism across every card.
- **Allow:** Restrained, functional glassmorphism strictly on floating action bars or mobile sticky navigation with high-opacity backdrop blurs (`backdrop-blur-md bg-white/90` or `bg-[#04331e]/90`) ensuring contrast is never compromised.
- **Authenticity:** Prioritize authentic, unaltered site photography over generic stock photos of Western houses or manicured European suburban lawns.

---

## 9. COMPLETE SIX-PAGE REQUIREMENTS MATRIX

| Page | Business Purpose | Required Content & Sections | Key Components | Dependencies on Client Info | Future Test Method | Acceptance Criteria |
|---|---|---|---|---|---|---|
| **1. Home** | Instant value proposition, brand establishment, primary lead conversion. | • Premium Hero with lotus mark & primary CTA<br>• Project Overview summary<br>• Verified Highlights grid (5 pillars)<br>• Verified Starting Price (or "Contact for Price")<br>• Real Site Photo showcase<br>• Amenities preview with status badges<br>• Location preview with distance highlights<br>• Final conversion enquiry CTA | `HeroSection`<br>`HighlightsGrid`<br>`SitePhotoPreview`<br>`AmenitiesSnapshot`<br>`LocationSnapshot`<br>`EnquiryCTASection` | • Confirmation of ₹7 Lakhs starting price<br>• Approved hero background image<br>• Confirmed phone & WhatsApp numbers | • Visual regression testing<br>• Viewport responsive tests (360px to 1920px)<br>• Hero CTA click-to-scroll test | Clear brand hierarchy; no broken assets; main CTA immediately actionable without scrolling on mobile. |
| **2. About the Project** | Build buyer trust, explain township concept, present developer background. | • Project Vision and master concept<br>• Plotted layout features (roads, fencing, clear title)<br>• Developer Profile (clarifying "MCP" branding)<br>• Legal & Approval transparency statement<br>• Direct Site-Visit Request banner | `TownshipConcept`<br>`DeveloperProfileCard`<br>`ApprovalTransparencyPanel`<br>`SiteVisitBanner` | • Legal developer entity name<br>• Official DTCP approval number<br>• Permitted wording for approvals | • Heading hierarchy audit (Single H1, H2s)<br>• Screen reader flow check<br>• Text contrast verification | Zero unverified claims; no fabricated awards or historical timelines. |
| **3. Gallery** | Visual verification of land condition, road laying, and demarcations. | • Filterable photo grid (Site, Roads, Demarcations)<br>• Authentic layout photography<br>• Approved Master Layout Plan (if supplied)<br>• Lightbox image inspection<br>• Note on photographic authenticity | `GalleryGrid`<br>`CategoryFilterTabs`<br>`ImageLightbox`<br>`LayoutPlanViewer` | • Raw, uncompressed site photos without graphic text overlays<br>• High-res copy of master layout plan | • Image load time & WebP verification<br>• Keyboard escape and focus trap in lightbox<br>• Alt-text screen reader audit | Every photo represents real project grounds; no stock substitution; responsive grid without layout shift. |
| **4. Amenities** | Honest breakdown of community infrastructure and utilities. | • Three-Tier Status Architecture:<br>  - **Existing:** Blacktop internal roads, kerbstones, perimeter fence, boundary stones<br>  - **Under Development:** Avenue trees, streetlights, entrance arch<br>  - **Planned:** Water connections, security post<br>• Status badge legend | `AmenityCard`<br>`StatusBadge` (Existing, In-Progress, Planned)<br>`InfrastructureSummary` | • Verification of exact status for every single amenity listed | • Filter by status check<br>• Accessible badge contrast check<br>• Mobile card stacking verification | Never represent a planned facility as completed; every facility backed by client sign-off. |
| **5. Location** | Guide buyers to site, demonstrate connectivity to NH 716 and Thiruvallur. | • Confirmed Google Maps interactive embed<br>• One-click "Get Directions" navigation link<br>• Highway connectivity context (Chennai–Tirupati NH)<br>• Nearby Landmarks table with verified travel times<br>• Site visit pickup / scheduling CTA | `GoogleMapEmbed`<br>`DirectionsButton`<br>`LandmarksTable`<br>`SiteVisitPickupCTA` | • Exact Google Maps GPS coordinates / Plus Code<br>• Verified landmark names and real travel times | • External Google Maps URL redirection test<br>• Coordinates validation against Thiruvallur<br>• Mobile map touch-scroll guard | Map accurately drops pin on project grounds; directions open Google Maps navigation directly. |
| **6. Contact & Enquiry** | High-conversion enquiry capture with zero data loss and direct WhatsApp routing. | • Interactive Lead Form (Name, Mobile, Plot Size, Topic)<br>• Direct WhatsApp Chat Action<br>• Click-to-call direct telephone button<br>• Site Visit Booking request<br>• Office address & operational hours<br>• Privacy & WhatsApp pre-fill disclosure | `EnquiryForm`<br>`WhatsAppActionCard`<br>`PhoneCallCard`<br>`SiteVisitSchedulerCard`<br>`PrivacyDisclosureNote` | • Confirmed WhatsApp number with country code (+91)<br>• Confirmed incoming telephone number<br>• Physical office address | • Form validation tests (empty, invalid mobile)<br>• URL encoding integrity test<br>• Safe submission handling (no data loss on error) | Form validates cleanly; opens WhatsApp with full details pre-filled; clearly discloses visitor sends message. |

---

## 10. AUDIT OF ENQUIRY FORM & WHATSAPP INTERACTION

### Form Field Architecture

```
+-------------------------------------------------------------+
|                     ENQUIRE ABOUT SWARNA BHOOMI             |
+-------------------------------------------------------------+
| Full Name *                                                 |
| [ Enter your full name                                    ] |
+-------------------------------------------------------------+
| Mobile Number *                                             |
| [ +91 | Enter 10-digit mobile number                      ] |
+-------------------------------------------------------------+
| Preferred Plot Size *                                       |
| (o) 517 – 800 sq.ft.      (o) 801 – 1,200 sq.ft.            |
| (o) 1,201 – 1,600 sq.ft.  (o) Not sure yet                  |
+-------------------------------------------------------------+
| What would you like to know? *                              |
| [ Select enquiry topic                                  v ] |
|   - Price details & Payment Schedule                        |
|   - Available Plots & Layout Map                            |
|   - Book a Free Site Visit                                  |
|   - Approval Documents & Title Deed                         |
+-------------------------------------------------------------+
| [ ] I understand this opens WhatsApp to send my enquiry.    |
|                                                             |
| [   SEND ENQUIRY VIA WHATSAPP   [WhatsApp Icon]           ] |
+-------------------------------------------------------------+
| Disclosure: We do not store your information on a server.   |
| Clicking opens WhatsApp where you can review and send.     |
+-------------------------------------------------------------+
```

### Detailed Validation Rules:
1. **Full Name:**
   - Required.
   - Minimum 2 characters, maximum 60 characters.
   - Trimmed string; rejects purely whitespace submissions.
2. **Mobile Number:**
   - Required.
   - Standard Indian mobile format validation (`^[6-9]\d{9}$`).
   - Accommodates optional `+91` or leading `0` without rejecting legitimate visitors.
3. **Preferred Plot Size:**
   - Single-select radio / pill group.
   - Options: `517–800 sq.ft.`, `801–1,200 sq.ft.`, `1,201–1,600 sq.ft.`, `Not sure yet`.
   - Client inventory check required prior to final release.
4. **Enquiry Topic:**
   - Accessible `<select>` or custom combobox.
   - Options: `Price details`, `Available plots`, `Book a site visit`, `Approval and documents`.

### Expected WhatsApp Routing Behavior:
1. **Pre-Filled Message Template:**
   ```text
   Hello Swarna Bhoomi team,
   I would like to enquire about the project.

   *Name:* [Full Name]
   *Mobile:* [Mobile Number]
   *Preferred Plot Size:* [Selected Plot Size]
   *Enquiry Topic:* [Selected Topic]

   Please share more details. Thank you!
   ```
2. **Safe URL Construction Algorithm:**
   ```typescript
   const phone = "917339652776"; // Confirmed international format without '+' or special characters
   const message = `Hello Swarna Bhoomi team,\nI would like to enquire about the project.\n\n*Name:* ${name.trim()}\n*Mobile:* ${mobile.trim()}\n*Preferred Plot Size:* ${plotSize}\n*Enquiry Topic:* ${topic}\n\nPlease share more details. Thank you!`;
   const encodedMessage = encodeURIComponent(message);
   const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
   window.open(whatsappUrl, "_blank", "noopener,noreferrer");
   ```
3. **Strict Compliance & Privacy Guardrails:**
   - The website will **NOT** display a fake "Enquiry Sent Successfully!" message upon clicking the button.
   - The UI will explicitly display: *"Redirecting you to WhatsApp to send your message..."*
   - The website will **NOT** create a backend database, SQLite/PostgreSQL instance, or CRM sync in Version 1.
   - If validation fails, error messages will render inline adjacent to the invalid input, and already-typed valid inputs will be strictly preserved.

---

## 11. GLOBAL INTERACTIONS & FLOATING MOBILE ACTION BAR

### Header Navigation
- **Desktop:** Sticky backdrop-blur header featuring Swarna Bhoomi lotus logo, primary links (`Home`, `About`, `Gallery`, `Amenities`, `Location`, `Contact`), and gold CTA button: **"Enquire Now"**.
- **Mobile:** Accessible hamburger menu drawer with smooth slide-over, focus trapping, and `aria-expanded` toggle.

### Persistent Floating Mobile Action Bar
On viewports `< 768px`, a bottom sticky action bar will provide direct conversion channels:

```
+-------------------------------------------------------------+
|  [Phone Icon]       [WhatsApp Icon]       [Calendar Icon]   |
|     Call               WhatsApp              Site Visit     |
+-------------------------------------------------------------+
```

### Engineering Guardrails for Floating Bar:
1. **Mobile Safe Area Insets:** Must implement `padding-bottom: env(safe-area-inset-bottom, 16px)` to avoid overlapping native home indicator bars on iOS and Android devices.
2. **Page Content Clearance:** The global page layout must append a bottom spacer (`pb-20` / `80px`) so that the floating bar never obstructs footer links, copyright notices, or bottom submit buttons.
3. **Keyboard Avoidance:** The floating bar must automatically hide or shift when a form input receives focus, preventing virtual keyboards from pushing the action bar over form fields.
4. **Accessible Touch Targets:** Every button must strictly meet WCAG 2.5.5 touch target criteria (minimum 44 × 44 px).
5. **Desktop Breakpoint:** Strictly hidden on viewports `>= 768px` (`md:hidden`).

---

## 12. TECHNICAL, SEO, ACCESSIBILITY, AND DEPLOYMENT REQUIREMENTS

### 1. Technical Architecture
- **Framework:** Next.js (App Router) for static export and server rendering efficiency.
- **Language:** TypeScript for strict type safety across props, navigation, and form data.
- **Styling:** Tailwind CSS with centralized design tokens defined in `globals.css` and `tailwind.config.ts`.
- **Icons:** `lucide-react` for crisp, accessible SVG icons (strictly no emoji as icons).

### 2. Responsive Breakpoint Plan
- **Mobile Narrow:** 320px – 375px (iPhone SE, older Androids — verify no horizontal overflow).
- **Mobile Standard:** 375px – 430px (iPhone 14/15/16, modern flagships).
- **Tablet / iPad:** 768px – 1024px (2-column grids, collapsed navigation transition).
- **Laptop / Desktop:** 1280px – 1536px (Full container max-width 1280px, spacious typography).
- **Wide Desktop:** 1920px+ (Constrained container margins, prevents unreadable line lengths).

### 3. Accessibility Standards (WCAG 2.1 AA)
- **Contrast:** Strict 4.5:1 ratio for normal body text, 3:1 for large display headers.
- **Focus Rings:** Visible, high-contrast focus rings (`focus-visible:ring-2 focus-visible:ring-[#d9a721]`) on all interactive buttons, links, and form inputs.
- **Semantic Structure:** Exactly one `<h1>` per page; logical heading progression (`h2` -> `h3`).
- **Screen Reader Support:** Informative images have descriptive `alt` tags (e.g., `"Internal 30-foot tarred road with kerbstones at Swarna Bhoomi site"`). Decorative elements marked `aria-hidden="true"`.
- **Keyboard Trapping:** Drawers and lightboxes trap tab focus and release cleanly on `Escape`.

### 4. SEO & Metadata
- **Metadata:** Unique title (`<title>Swarna Bhoomi | DTCP Approved Plots in Thiruvallur</title>`) and `<meta name="description">` per page.
- **Open Graph / Twitter Cards:** Standard 1200 × 630 px social share banner featuring the Swarna Bhoomi gold lotus branding.
- **Robots & Sitemap:** `robots.txt` allowing crawler indexing and dynamic `sitemap.xml` listing all 6 canonical URLs.
- **Structured Data:** JSON-LD RealEstateListing / Place schema linking the site to Krishnapuram, Thiruvallur.

### 5. Animation & Motion Design
- **CSS Transitions:** Primary choice for hover, focus, and micro-interactions (durations 150ms – 250ms with `cubic-bezier(0.4, 0, 0.2, 1)`).
- **Framer Motion:** Reserved exclusively for React component scroll-reveal entrances and page transitions.
- **Anime.js:** Omitted unless a specialized multi-stage SVG logo stroke animation is explicitly commissioned.
- **Reduced Motion:** Mandatory `@media (prefers-reduced-motion: reduce)` override to disable all non-essential motion.

### 6. Deployment & Domain Strategy
- **Hosting Platform:** Vercel (Production tier with global CDN and automatic SSL certificate generation).
- **Target Domain:** `www.swarnabhoomi.in` (Subject to client ownership verification; DNS records `CNAME` and `A` will require client authorization).

---

## 13. REQUIREMENT-TO-COMPONENT-TO-TEST TRACEABILITY MATRIX

| Req ID | Requirement Description | Planned Component | File Path | Future Verification / Test Method | Phase |
|---|---|---|---|---|---|
| **REQ-01** | Brand Hero Section with Gold Lotus & Tagline | `HeroSection` | `src/components/home/HeroSection.tsx` | Visual regression test; Responsive check at 360px & 1440px. | Phase 5 |
| **REQ-02** | 5 Key Project Highlights Grid | `HighlightsGrid` | `src/components/home/HighlightsGrid.tsx` | Screen reader readout check; Contrast ratio validation (>4.5:1). | Phase 5 |
| **REQ-03** | Verified Starting Price Display | `PriceHighlightBadge` | `src/components/common/PriceBadge.tsx` | Verification against client confirmation; verify asterisk disclaimers. | Phase 5 |
| **REQ-04** | Township Concept & Vision Narrative | `TownshipOverview` | `src/components/about/TownshipOverview.tsx` | Content audit against PRD v1; heading hierarchy audit. | Phase 5 |
| **REQ-05** | Developer Identity & Legal Representation | `DeveloperCard` | `src/components/about/DeveloperCard.tsx` | Validation against client business registration ("MCP" entity). | Phase 5 |
| **REQ-06** | Real Site Photography Gallery & Lightbox | `GalleryGrid`, `Lightbox` | `src/components/gallery/GalleryGrid.tsx` | Image optimization test (WebP formats); Keyboard `Esc` navigation test. | Phase 5 |
| **REQ-07** | Three-Tier Status Amenities Display | `AmenitiesList` | `src/components/amenities/AmenitiesList.tsx` | Verify badge labels (Existing vs In-Progress vs Planned); No false claims. | Phase 5 |
| **REQ-08** | Google Maps Location Embed & Route Guide | `MapSection` | `src/components/location/MapSection.tsx` | Interactive map pin test; Directions link opens external Google Maps. | Phase 5 |
| **REQ-09** | Verified Nearby Landmarks Table | `LandmarksTable` | `src/components/location/LandmarksTable.tsx` | Verification of landmark names and distance claims against Google Maps. | Phase 5 |
| **REQ-10** | Four-Field Enquiry Form with Validation | `EnquiryForm` | `src/components/forms/EnquiryForm.tsx` | Test empty submit (errors shown); Test invalid phone (rejected); Test valid input. | Phase 6 |
| **REQ-11** | WhatsApp Pre-Filled Message URL Generator | `useWhatsAppLead` | `src/hooks/useWhatsAppLead.ts` | Unit test URL encoding; Validate message string on mobile WhatsApp. | Phase 6 |
| **REQ-12** | Direct Telephone Calling (`tel:`) Action | `PhoneCallButton` | `src/components/common/PhoneButton.tsx` | Click test verifying `tel:7339652776` triggers dialer. | Phase 6 |
| **REQ-13** | Persistent Floating Mobile Bottom Action Bar | `FloatingMobileBar` | `src/components/common/FloatingMobileBar.tsx` | Viewport test on iOS/Android; Verify bar hides on desktop (`md:hidden`). | Phase 6 |
| **REQ-14** | Mobile Safe Area & Input Overlap Prevention | `Layout` / `globals.css` | `src/app/layout.tsx` | Virtual keyboard open test; Verify submit button not obscured. | Phase 6 |
| **REQ-15** | Technical SEO Metadata, Sitemap & Robots | `generateMetadata` | `src/app/**/page.tsx` | Inspect `<head>` tags; Test `robots.txt` and `sitemap.xml` route outputs. | Phase 7 |
| **REQ-16** | WCAG 2.1 AA Keyboard & Focus Navigation | Global UI Primitives | `src/components/ui/**` | Keyboard-only Tab pass through all 6 pages; verify visible focus rings. | Phase 7 |
| **REQ-17** | Production Build & Zero Console Errors | Next.js Build Pipeline | Terminal (`npm run build`) | Execute `next build`; verify zero build errors, zero TypeScript errors. | Phase 7 |
| **REQ-18** | Vercel Deployment & Live SSL Handover | Vercel Platform | Production URL | HTTP 200 checks across all routes; verify live WhatsApp redirection. | Phase 8 |

---

## 14. REGISTER OF UNVERIFIED FACTS

The following 13 items were discovered during research and promotional artwork inspection. **None of them are legally confirmed by artwork alone.**

| Item ID | Fact / Parameter | Supplied Artwork Value | Verification Status | Documentary Evidence Required | Confirmation Authority | Impact if Left Unresolved | Gate Status |
|---|---|---|---|---|---|---|---|
| **FACT-01** | **Starting Price** | "₹7 LAKHS*" (artwork); "₹6.5 Lakhs" (earlier brief) | **UNVERIFIED / CONFLICTING** | Official pricing sheet, plot breakdown, and asterisk disclaimer terms. | Project Owner / Client | Misleading pricing, buyer friction, legal liability under consumer protection. | **BLOCKS PUBLICATION** |
| **FACT-02** | **DTCP Approval Status** | "DTCP APPROVED" badge with 3 stars | **UNVERIFIED** | Official DTCP Approval Order copy & approved layout number (e.g. `DTCP No. XX/202X`). | Project Owner / Client | Major legal/regulatory violation under Tamil Nadu Town & Country Planning Act. | **BLOCKS PUBLICATION** |
| **FACT-03** | **TNRERA Registration** | Not displayed on artwork | **UNVERIFIED** | TNRERA registration certificate OR formal legal confirmation of exemption. | Project Owner / Client | Heavy statutory penalties if non-exempt layout advertised without RERA number. | **BLOCKS PUBLICATION** |
| **FACT-04** | **Available Plot Sizes & Inventory** | 517–800, 801–1200, 1201–1600 sq.ft. | **UNVERIFIED** | Current master layout plan with available vs booked plot numbers. | Project Owner / Client | Leads request unavailable sizes; poor customer experience. | **BLOCKS CONTENT APPROVAL** |
| **FACT-05** | **Exact Site GPS Coordinates** | "Krishnapuram - Thiruvallur, Chennai - Tirupati NH" | **UNVERIFIED** | Exact Google Maps dropped pin / Plus Code. | Project Owner / Client | Visitors travel to wrong village or cannot locate site entrance. | **BLOCKS PUBLICATION** |
| **FACT-06** | **Nearby Landmarks & Distances** | Not enumerated on artwork | **UNVERIFIED** | List of landmarks with verified road kilometer distances. | Project Owner / Client | Inaccurate travel promises damage developer credibility. | **BLOCKS CONTENT APPROVAL** |
| **FACT-07** | **Amenities Delivery Status** | Roads, fencing, water, electricity | **UNVERIFIED** | Current site audit status (Existing vs Under Construction vs Planned). | Project Owner / Client | Misleading representation of infrastructure progress. | **BLOCKS CONTENT APPROVAL** |
| **FACT-08** | **Legal Developer Name ("MCP")** | "MCP" logo displayed on all artwork | **UNVERIFIED** | Registered company/promoter name (e.g., "MCP Promoters", "MCP Housing"). | Project Owner / Client | Inability to draft legitimate footer copyright and legal notices. | **BLOCKS CONTENT APPROVAL** |
| **FACT-09** | **Primary Telephone Number** | `7339652776` | **UNVERIFIED** | Confirmation that this number is actively manned and operational. | Project Owner / Client | Inbound sales phone calls fail to connect. | **BLOCKS PUBLICATION** |
| **FACT-10** | **Business WhatsApp Number** | Assumed `7339652776` | **UNVERIFIED** | Confirmation of active WhatsApp Business account with country code (`+91`). | Project Owner / Client | Complete failure of primary lead conversion channel. | **BLOCKS PUBLICATION** |
| **FACT-11** | **Domain Ownership & Access** | `www.swarnabhoomi.in` | **UNVERIFIED** | WHOIS check, registrar access credentials, or DNS management authority. | Project Owner / Client | Inability to bind domain to Vercel production deployment. | **BLOCKS PUBLICATION** |
| **FACT-12** | **Media Rights & Original Assets** | 3 WhatsApp JPEG images | **UNVERIFIED** | Written confirmation of rights to publish; uncompressed original files. | Project Owner / Client | Low visual quality; potential copyright/ownership disputes. | **BLOCKS CONTENT APPROVAL** |
| **FACT-13** | **Legal Disclaimers & Privacy Text** | None supplied | **UNVERIFIED** | Approved disclaimer copy covering real estate marketing norms. | Project Owner / Client | Exposure to regulatory complaints. | **BLOCKS PUBLICATION** |

---

## 15. PRIORITIZED QUESTIONS FOR THE CLIENT

To ensure a smooth delivery path, client clarifications are organized into three distinct tiers:

### Tier 1: Blocking Before Design & Content Approval
1. **Developer Legal Identity:** What is the full legal company name represented by the "MCP" logo shown on the reference artwork?
2. **Current Plot Sizes:** Are the plot sizes `517–800 sq.ft.`, `801–1,200 sq.ft.`, and `1,201–1,600 sq.ft.` accurate to current layout availability?
3. **Amenities Breakdown:** Which amenities are 100% completed today (e.g. tar road, boundary fence), and which are under development or planned?
4. **Key Landmarks:** What are the exact landmark locations and approved travel times/distances to be highlighted on the Location page?
5. **High-Resolution Assets:** Can the client provide the original vector logo (`.svg` or high-res `.png` with transparent background) and uncompressed site photographs without graphic text overlays?

### Tier 2: Blocking Before Publishing / Going Live
1. **Pricing Confirmation:** What is the exact starting price and pricing model (is it ₹7 Lakhs onwards with conditions, or ₹6.5 Lakhs)? What specific conditions apply to the asterisk?
2. **Approval Credentials:** What is the official DTCP approval order number? Is there a TNRERA registration number or exemption certificate?
3. **Exact Site Pin:** What are the exact GPS coordinates or Google Maps link for the site entrance in Krishnapuram, Thiruvallur?
4. **Confirmed Contact Numbers:** Is `+91 7339652776` confirmed for both incoming phone calls and incoming WhatsApp leads? Who will monitor the WhatsApp enquiries?
5. **Domain Authority:** Is `www.swarnabhoomi.in` already purchased, and will the developer provide DNS access for Vercel configuration?
6. **Statutory Disclaimers:** What legal disclaimer text must appear in the footer regarding approvals and pricing validity?

### Tier 3: Can Be Resolved During Later Implementation
1. Does the client have a preferred social media presence (Facebook page, Instagram profile, YouTube site walkthrough video) to link in the footer?
2. Would the client like bilingual support (English and Tamil) in a future release?
3. Is an interactive plot layout plan with clickable plot statuses planned for a future phase?

---

## 16. MISSING ASSETS AND CONTENT

The following items are missing from the workspace and must be acquired:
1. **Isolated Transparent Logo:** Only raster images with integrated backgrounds currently exist. A transparent PNG or vector SVG of the Gold Lotus and Swarna Bhoomi wordmark is required.
2. **Master Layout Plan:** The official layout map/drawing showing plot numbering, road widths (e.g. 30-ft, 24-ft roads), park spaces, and public utility reservations.
3. **Clean Site Photography:** Uncompressed, raw JPEG/PNG photographs of the land, entrance, and internal blacktop roads without promotional badges, text overlays, or contact numbers burned into the pixels.
4. **Location GPS Pin:** Exact Google Maps URL or decimal latitude/longitude coordinates.
5. **Copywriting Text:** Approved paragraphs describing the project vision, developer background, and investment benefits.

---

## 17. TECHNICAL AND BUSINESS RISKS

| Risk Category | Risk Description | Severity | Likelihood | Impact on Project | Recommended Mitigation Strategy |
|---|---|---|---|---|---|
| **Regulatory & Legal** | Advertising "DTCP Approved" or pricing without official documentation. | **CRITICAL** | Medium | Severe statutory fines, marketing takedown notices, reputational damage. | Place unverified claims behind strict phase gates. Do not publish approval claims without written evidence. |
| **User Experience** | WhatsApp pre-filled message fails to open or gets blocked by browser pop-up blockers. | **HIGH** | Medium | Broken conversion pipeline; lost leads. | Trigger WhatsApp navigation directly on user gesture (`window.open` on click); provide fallback direct link and telephone fallback. |
| **Mobile Usability** | Floating action bar obscures form inputs or virtual keyboard covers CTA. | **HIGH** | High | Inability for mobile visitors to complete enquiries. | Implement CSS safe-area insets, bottom layout padding, and focus-event hiding logic. |
| **Brand Perception** | Over-reliance on generic AI aesthetic (excessive gradients, glow, generic stock photos). | **MEDIUM** | High | Website looks like an unauthentic template rather than an established township. | Adhere strictly to the authentic brand palette: deep forest green, restrained gold, warm ivory, and real site photos. |
| **Version Control** | Lack of Git tracking in workspace could lead to untracked regressions. | **HIGH** | High | Accidental file overwrites or inability to safely rollback. | Initialize Git repository immediately at start of Phase 1 / Phase 4. |

---

## 18. RECOMMENDED IMPLEMENTATION PHASES & PHASE-GATE CRITERIA

```
+---------------------------------------------------------------------------------------+
|  PHASE 0: Discovery & Technical Audit (CURRENT - COMPLETE)                            |
|  Gate: Baseline report approved; all unverified facts cataloged.                      |
+---------------------------------------------------------------------------------------+
                                           |
                                           v
+---------------------------------------------------------------------------------------+
|  PHASE 1: Repository Reconnaissance & Scaffolding Planning                            |
|  Gate: Workspace initialized with Git; directory structure agreed upon.               |
+---------------------------------------------------------------------------------------+
                                           |
                                           v
+---------------------------------------------------------------------------------------+
|  PHASE 2: Information Architecture & Page Content Wireframing                         |
|  Gate: All 6 page section outlines and conversion flows approved.                     |
+---------------------------------------------------------------------------------------+
                                           |
                                           v
+---------------------------------------------------------------------------------------+
|  PHASE 3: Visual Direction & Token Design System                                      |
|  Gate: Color tokens, typography, button states, and hero prototype approved.         |
+---------------------------------------------------------------------------------------+
                                           |
                                           v
+---------------------------------------------------------------------------------------+
|  PHASE 4: Technical Foundation & Reusable Components                                  |
|  Gate: Next.js + Tailwind scaffolded; shared layout builds cleanly with zero errors.  |
+---------------------------------------------------------------------------------------+
                                           |
                                           v
+---------------------------------------------------------------------------------------+
|  PHASE 5: Page Implementation (Home, About, Gallery, Amenities, Location, Contact)    |
|  Gate: All 6 pages built with responsive layouts and verified content.                |
+---------------------------------------------------------------------------------------+
                                           |
                                           v
+---------------------------------------------------------------------------------------+
|  PHASE 6: Lead Flow Implementation & Mobile Floating Bar                              |
|  Gate: Form validation, WhatsApp URL generation, and mobile action bar tested.        |
+---------------------------------------------------------------------------------------+
                                           |
                                           v
+---------------------------------------------------------------------------------------+
|  PHASE 7: Full QA, Accessibility (WCAG AA), SEO & Performance Audits                 |
|  Gate: Zero build errors, zero console errors, responsive pass across all devices.    |
+---------------------------------------------------------------------------------------+
                                           |
                                           v
+---------------------------------------------------------------------------------------+
|  PHASE 8: Vercel Production Deployment, Domain Setup & Handover                       |
|  Gate: Client sign-off, live domain verified on HTTPS, contact actions live.          |
+---------------------------------------------------------------------------------------+
```

---

## 19. PROPOSED TOOLS AND TESTING APPROACH FOR LATER PHASES

1. **Phase 4 & 5 (Scaffolding & Pages):**
   - Use `next dev` for local development.
   - Use `browser_subagent` to render live pages and verify responsive layouts across 375px (mobile), 768px (tablet), and 1440px (desktop).
2. **Phase 6 (Lead Generation Testing):**
   - Execute unit tests verifying that form values produce correctly URL-encoded query strings.
   - Test that clicking "Send Enquiry via WhatsApp" triggers the `https://wa.me/917339652776?text=...` URI.
   - Test that invalid phone numbers (e.g. `12345`) trigger immediate, visible, accessible validation alerts without wiping user inputs.
   - Test floating mobile action bar behavior on mobile viewports.
3. **Phase 7 (Comprehensive QA):**
   - Run `npm run build` to verify production compilation with zero TypeScript or ESLint errors.
   - Conduct keyboard-only navigation audits (Tab, Shift+Tab, Enter, Space, Esc) across all interactive elements.
   - Verify all Open Graph tags, Twitter card tags, `robots.txt`, and `sitemap.xml`.
4. **Phase 8 (Production Deployment):**
   - Deploy to Vercel via Vercel CLI or Git integration.
   - Perform live DNS verification for `www.swarnabhoomi.in`.

---

## 20. CLEAR STATEMENT OF WHAT WAS NOT CHANGED DURING PHASE 0

In strict adherence to Phase 0 safety protocols:
- **Zero application code was written, modified, or deleted.**
- **No package manager was executed to install dependencies.**
- **No Next.js or React project was scaffolded.**
- **No Git commands were run that modified repository state or history.**
- **No original client images or documents were altered or moved from their source.**
- **No fake client facts, fake prices, or fake legal approvals were published.**
- **No domain or DNS changes were attempted.**

This concludes the Phase 0 Discovery and Technical Audit. All baseline requirements, brand assets, technical paths, and risk factors are formally documented. **Awaiting project owner review and authorization before proceeding to Phase 1.**
