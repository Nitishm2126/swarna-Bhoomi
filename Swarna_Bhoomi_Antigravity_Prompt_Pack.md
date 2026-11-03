# Swarna Bhoomi — Antigravity Phase Prompt Pack

**Project:** Swarna Bhoomi residential plots website  
**Coding agent:** Antigravity  
**Reference:** `Swarna_Bhoomi_PRD_v1.md`  
**Status:** Prompt templates — run one phase at a time, only after the previous phase passes its gate.

## Mandatory instruction for every phase

At the beginning of every phase:
1. Read `Swarna_Bhoomi_PRD_v1.md` and any project-specific reference notes.
2. Inspect the available `claude/skills`, `agents/skills`, `.claude/skills`, `.agents/skills`, or equivalent skill locations in this workspace. Use the relevant skills that actually exist for frontend design, accessibility, SEO, performance, image handling, testing, or code review. If a path or skill is absent, report that honestly and continue with sound engineering practices; do not fabricate skill names or claim skills were used when they were not.
3. Inspect the available tools and use the ones that materially improve the phase: repository search, terminal/build commands, image inspection/optimization, browser preview, responsive testing, Playwright or equivalent interaction testing, and Lighthouse or equivalent auditing where available. Do not install a tool or dependency without first checking whether it is already available and explaining why it is needed.
4. Do not invent client facts. The price ₹7 lakhs, DTCP approval claims, plot inventory, amenities, exact location, and displayed phone number require confirmation before publication.
5. Work only within the current phase scope. Do not jump ahead or make broad unrelated edits.
6. At the end, report: files inspected/changed, decisions, commands and tests actually run with results, screenshots or preview evidence where useful, remaining issues, and whether the phase exit criteria pass. Never claim an unrun test passed.

## Phase 0 — Full requirements, assets, tools, and functionality audit

**Requirement:** Establish a complete, traceable baseline before implementation. Phase 0 must cover every user-facing function in the original brief, all six pages, brand/image inputs, technical constraints, available skills/tools, and every unverified fact. Do not treat this as an image-only review.

**Prompt to Antigravity:**

You are auditing the Swarna Bhoomi website project before implementation. Read `Swarna_Bhoomi_PRD_v1.md`, this prompt pack, all project reference documents, and the original requirements supplied by the project owner. Inspect the current workspace and any supplied assets. This phase is **discovery and planning only**: do not implement pages, modify application code, overwrite assets, install packages, deploy, register domains, change DNS, or make destructive changes.

### A. Skill and tool discovery — do this first
Inspect whether these skill locations exist and list their actual contents where accessible:
- `claude/skills`
- `agents/skills`
- `.claude/skills`
- `.agents/skills`
- any documented equivalent skill directories in the workspace

Use only relevant skills that actually exist and can be read. Look for skills related to product/requirements analysis, UI/UX, frontend architecture, Next.js/React, Tailwind, accessibility, SEO, performance, image optimization, animation, browser testing, and code review. If a path or skill is missing, state that plainly. Do not fabricate skill names, claim a skill was used if it was not, or copy/install arbitrary skill packs.

Inventory available tools and capabilities, including:
- repository/file search and source inspection;
- terminal and package-manager commands;
- current framework and dependency inspection;
- development server and browser preview;
- browser devtools / responsive viewport testing;
- Playwright or another browser automation tool, if already available;
- Lighthouse or another performance/a11y audit tool, if available;
- image inspection and image optimization tools;
- lint, type-check, test, and production-build scripts;
- Git status/diff and repository history inspection.

For each tool, report whether it is available, how it would be used, and any limitation. Do not install tools or dependencies in Phase 0. Recommend additions only if there is a clear need, with rationale.

### B. Review all requirements and preserve every requested function
Create a traceability matrix linking each requirement to a planned page/component and a future verification method. Include at minimum:

**Pages**
1. Home: premium hero, project highlights, verified starting price, authentic site imagery, amenities preview, enquiry CTA.
2. About the Project: project overview, vision, residential township concept, developer details, verified approvals.
3. Gallery: actual site photos, road development, entrance, plot markers where appropriate, approved layout/master plan only if supplied and verified.
4. Amenities: facilities and infrastructure, each correctly labelled Existing / Under development / Planned.
5. Location: confirmed Google Maps pin or map link, directions, verified nearby landmarks, Chennai–Tirupati National Highway context where accurate.
6. Contact & Enquiry: enquiry form, WhatsApp enquiry, click-to-call, site-visit request.

**Enquiry form**
- Full name.
- Mobile number.
- Preferred plot size: 517–800 sq.ft.; 801–1,200 sq.ft.; 1,201–1,600 sq.ft.; Not sure yet.
- Enquiry topic: Price details; Available plots; Book a site visit; Approval and documents.
- Validate required fields and mobile input.
- On valid submit, open WhatsApp with a correctly URL-encoded pre-filled message addressed to the confirmed business number.
- The visitor must send the message in WhatsApp; the site does not save leads or send the message automatically.
- No backend, database, CRM, or admin dashboard in version one.

**Global site behavior**
- Responsive mobile/tablet/desktop layout.
- Sticky/floating mobile bottom actions for Call, WhatsApp, and Site Visit; they must not cover content, inputs, keyboard focus, or safe-area controls.
- Working header navigation, footer links, CTAs, phone `tel:` links, WhatsApp links, map/directions, and site-visit flow.
- SEO titles, meta descriptions, Open Graph image, sitemap, robots configuration, semantic headings, and image alt text.
- Vercel deployment plan and intended `www.swarnabhoomi.in` domain, subject to availability, ownership, and authorization.
- Maintainable Next.js/React/Tailwind implementation, subject to repository audit and compatible versions.
- Animation and design direction must stay purposeful: forest green, gold, warm ivory, authentic project imagery, restrained glassmorphism; use Framer Motion and/or Anime.js only when justified, do not duplicate animation responsibilities, and respect reduced-motion preferences.

### C. Inspect supplied brand/reference assets
Inspect all supplied images without editing them. Record file names, dimensions, formats, visible brand elements, image quality, and likely website use. Current known reference assets:
- `WhatsApp Image 2026-10-10 at 8.16.19 PM.jpeg`
- `WhatsApp Image 2026-10-10 at 8.16.25 PM.jpeg`
- `WhatsApp Image 2026-10-10 at 8.16.25 PM (1).jpeg`

Record the visual direction inferred from the images: gold lotus/wordmark, forest green, gold, ivory/cream, premium residential plots. Identify which assets appear to be authentic site/road images versus promotional artwork. Do not replace originals, infer approvals from a badge, or treat a promotional claim as legal evidence.

### D. Create an unverified-facts register
Explicitly mark the following as unconfirmed until the project owner verifies them:
- Starting price: artwork says ₹7 lakhs; previous brief mentioned ₹6.5 lakhs or ₹7 lakhs.
- DTCP approval status, approval number, documents, and exact wording permitted.
- Any applicable RERA registration/status and evidence.
- Plot-size range and current inventory.
- Exact site pin and directions.
- Nearby landmark names, distances, and travel-time statements.
- Amenities and status of each.
- Legal developer/business name.
- Phone number 7339652776 and WhatsApp number.
- Domain availability and ownership for `www.swarnabhoomi.in`.
- Rights/permission to use photos, logo, and master plan.
- Final copy and any required privacy/legal notice.

Do not publish or silently resolve conflicting values. Put questions requiring client confirmation into a prioritized list.

### E. Inspect the repository without changing it
If a repository exists, record branch, working-tree status, framework, package manager, dependency versions, route structure, asset locations, scripts, tests, current lint/type-check/build status, and any existing UI/functionality. If there is no repository, state that clearly and propose (but do not create) a clean starting structure.

Do not run destructive Git commands, reset branches, rewrite configuration, install packages, or overwrite files.

### F. Deliverables
Create a Phase 0 report, preferably `docs/phase-0-discovery-report.md` if a project repository exists; otherwise return the report in the response. The report must include:
1. Requirements traceability matrix: requirement, planned page/component, dependency/unknown, and future test method.
2. Asset inventory.
3. Skills discovered and actually used (with paths), plus missing skills.
4. Tools inventory with availability and limitations.
5. Repository audit or explicit “no repository found.”
6. Unverified-facts register.
7. Client questions, prioritized as blockers vs can be answered later.
8. Recommended phase sequence and phase exit gates.
9. Risks, assumptions, and out-of-scope items.
10. Confirmation that no implementation changes were made.

### G. Stop condition
Stop after delivering the report. Do not begin Phase 1 or implement anything until the project owner reviews the Phase 0 findings and approves the next step.

**Acceptance criteria:** Every requirement and function above is accounted for; tools and skills are honestly inventoried; unknown claims are flagged; current repo/assets are documented; report includes a future verification method for each functional requirement; no files or application code were changed except the Phase 0 report if creating that report is possible without altering existing files.

---

## Phase 1 — Repository reconnaissance

**Requirement:** Understand the existing codebase before changing it.

**Prompt to Antigravity:**

Read the PRD and perform a read-only audit of the current Swarna Bhoomi workspace. Inspect available `claude/skills` and `agents/skills` (and equivalent paths) and use relevant installed skills for repository analysis, Next.js architecture, dependency review, and code quality if present. Use repository search and terminal inspection tools. Record the current branch, package manager, framework/dependency versions, route structure, asset structure, existing scripts, lint/type-check/build commands, and the current state of tests/build. If browser preview or project diagnostics are available, use them only to observe the existing app.

Do not modify files, install dependencies, change the stack, reset branches, or overwrite existing work. If no repository exists, report that and propose a clean structure without scaffolding yet.

Return:
1. current-state summary;
2. issues and risks;
3. recommended implementation plan;
4. commands run and exact outcomes;
5. phase-gate recommendation.

**Acceptance criteria:** Read-only audit; no destructive changes; all findings grounded in actual repository evidence.

---

## Phase 2 — Information architecture and conversion journey

**Requirement:** Plan the six required pages and make enquiry paths clear before detailed UI implementation.

**Prompt to Antigravity:**

Using the approved PRD, create a page-by-page information architecture for Home, About the Project, Gallery, Amenities, Location, and Contact & Enquiry. Inspect and use relevant available `claude/skills` and `agents/skills` for UX architecture, conversion-focused content hierarchy, responsive design, and accessibility. Use a diagram or markdown outline if a diagramming tool is available, but do not add a dependency solely to make a diagram.

Define:
- shared header, navigation, footer, and mobile navigation;
- section order and purpose for each page;
- primary and secondary CTA hierarchy;
- WhatsApp enquiry flow and required form fields;
- mobile sticky Call / WhatsApp / Site Visit bar behavior, including how it avoids covering content or form controls;
- empty/missing-content behavior when photos, approval information, or amenities are not yet supplied.

Do not invent content, prices, testimonials, stats, approval claims, distances, or amenities. Mark unconfirmed items as content dependencies. Do not implement the pages yet.

**Acceptance criteria:** Each page has a purpose, section outline, CTA, and explicit content dependencies; mobile conversion path is documented.

---

## Phase 3 — Visual direction and design system

**Requirement:** Create a distinct, premium Swarna Bhoomi identity based on the supplied brand materials rather than generic AI-style design.

**Prompt to Antigravity:**

Review the supplied Swarna Bhoomi images and the approved information architecture. Inspect and use relevant installed `claude/skills` and `agents/skills` for visual design, frontend UI quality, typography, accessibility, and responsive design. Use image inspection tools to understand source assets; do not replace the real project imagery with generated or unrelated stock images.

Propose a restrained design system:
- forest green, warm gold, ivory/cream, white, and legible dark neutrals;
- elegant but readable typography;
- consistent spacing, grid, buttons, form controls, icon style, borders, and image treatment;
- clear desktop and mobile layouts;
- a floating or glassmorphic enquiry card only where it improves usability and preserves contrast;
- a floating mobile Call / WhatsApp / Site Visit bar that respects safe areas and never blocks content;
- purposeful, subtle motion with reduced-motion support.

Motion library rule: use CSS for simple states; use Framer Motion for React entrance/layout transitions where appropriate; use Anime.js only for a specific timeline or fine-grained effect that Framer Motion/CSS does not handle well. Do not use both libraries for the same animation, and do not add both dependencies just for decoration. Avoid excessive gradients, glow, parallax, animated counters, fake social proof, glassmorphism everywhere, and oversized decorative text.

Implement only a representative homepage visual prototype or approved design tokens/components, depending on the repository. Do not build all six pages in this phase. Do not publish unverified prices or approvals; use clearly identified development placeholders that cannot be mistaken for approved content, or omit those claims.

**Acceptance criteria:** Brand-consistent, legible, responsive visual direction; no fabricated claims; animation is restrained and can be reduced/disabled; review evidence supplied.

---

## Phase 4 — Technical foundation and shared components

**Requirement:** Establish a clean, maintainable Next.js / React / Tailwind foundation that fits the audited repository.

**Prompt to Antigravity:**

Use the approved PRD, repository audit, and visual direction. Inspect and use relevant available `claude/skills` and `agents/skills` for Next.js, React, Tailwind, accessibility, code quality, and testing. Check the installed versions and scripts before editing. Do not upgrade or replace the framework without a documented compatibility reason and approval.

Implement only the agreed foundation:
- shared layout, header, footer, navigation, and reusable buttons/form primitives;
- design tokens and consistent responsive conventions;
- route structure for the six pages;
- sensible metadata defaults and image conventions;
- accessible focus states and reduced-motion handling;
- clean scripts and lint/type-check/build compatibility.

Keep dependencies minimal. Use the current project conventions if a repository exists. Do not introduce a backend, database, admin dashboard, authentication, analytics, or unrelated refactors. Do not expose secrets.

Run the relevant available lint, type-check, and production build commands. Report exact outcomes and any unresolved issue.

**Acceptance criteria:** Shared foundation works, routes are structurally ready, project checks pass or remaining blockers are clearly documented.

---

## Phase 5 — Implement the six pages

**Requirement:** Build all required page content using the approved structure and real, authorized assets.

**Prompt to Antigravity:**

Implement the pages in small reviewable increments: Home first, then About, Gallery, Amenities, Location, and Contact & Enquiry. Before each increment, inspect relevant installed `claude/skills` and `agents/skills` for frontend implementation, responsive UI, image optimization, accessibility, and SEO; use only skills that are actually available. Use the browser preview and responsive inspection tools where available.

Use the approved brand system: forest green, restrained gold, warm ivory, authentic photography, editorial spacing, and purposeful glassmorphism only where useful. Use the supplied project photos without misleading edits. Optimize image delivery while preserving the originals. Do not invent copy, testimonials, amenities, price, inventory, approval status, distances, or location details.

Requirements by page:
- Home: hero, project introduction, verified highlights, genuine photography, amenities preview, location preview, enquiry CTA.
- About: project overview, vision, developer details, verified approval details.
- Gallery: actual site photos and approved layout/master plan if supplied.
- Amenities: clearly label Existing / Under development / Planned.
- Location: confirmed map pin, directions, and verified landmarks.
- Contact & Enquiry: form, phone, WhatsApp, and site-visit actions.

Keep navigation and CTAs consistent. Do not add unrequested pages or backend features. After each page or logical group, run relevant checks and provide a preview/report before continuing.

**Acceptance criteria:** All six pages are responsive, consistent, factual, and navigable; no broken primary links or invented project claims.

---

## Phase 6 — WhatsApp lead flow and floating action bar

**Requirement:** A visitor can fill the enquiry form and intentionally send a pre-filled message through WhatsApp; no backend is required.

**Prompt to Antigravity:**

Implement and test the lead-generation flow against the PRD. Inspect and use relevant available `claude/skills` and `agents/skills` for form UX, validation, accessibility, privacy, URL handling, and interaction testing. Use browser testing and Playwright or an equivalent test tool if already available; do not add a dependency without checking the current setup.

Form fields:
- full name;
- mobile number;
- preferred plot size (517–800 sq.ft.; 801–1,200 sq.ft.; 1,201–1,600 sq.ft.; not sure yet);
- enquiry topic (price details, available plots, book a site visit, approval and documents).

Validate required fields and reasonable mobile-number input. Build a safely URL-encoded message and open WhatsApp to the confirmed business number. The number shown in supplied artwork is 7339652776; treat it as pending confirmation until the project owner verifies it. Make clear near the form that the website does not store or send the message automatically: the visitor must send it in WhatsApp.

Implement working `tel:` links for the confirmed number and a mobile sticky bar with Call, WhatsApp, and Site Visit. Ensure the bar respects mobile safe areas and does not obscure form controls, page content, or keyboard focus. Do not add database storage, a backend, or admin dashboard.

Test valid and invalid submissions, special characters in form values, message encoding, WhatsApp destination, phone links, keyboard operation, and mobile layout. Report what was actually tested.

**Acceptance criteria:** Correct pre-filled message and destination; validation and disclosure work; sticky actions remain usable; no false claim of lead storage.

---

## Phase 7 — QA, accessibility, SEO, and performance

**Requirement:** Catch functional, responsive, accessibility, SEO, and performance problems before client review.

**Prompt to Antigravity:**

Perform a focused quality audit of the completed website. Inspect and use available `claude/skills` and `agents/skills` relevant to accessibility, SEO, performance, test automation, and code review. Use the existing lint/type-check/build scripts, browser devtools, responsive viewport checks, Playwright or equivalent if available, and Lighthouse or an equivalent audit if available. Do not claim unavailable tools were used; do not install tools without explaining the benefit and getting approval where appropriate.

Check:
- all six routes and navigation;
- mobile, tablet, and desktop layouts;
- overflow, text wrapping, sticky action bar, and form usability;
- keyboard access, visible focus, labels, contrast, and reduced motion;
- all CTA destinations, WhatsApp message generation, and phone links;
- image dimensions/loading and missing assets;
- title/description metadata, Open Graph, sitemap, robots, canonical URL if domain confirmed;
- console/runtime errors and broken links;
- factual accuracy of price, approval claims, amenities status, location, and phone number;
- lint, type-check, and production build.

Fix issues within scope. Do not rewrite unrelated parts of the project to chase a score. Return a prioritized QA report with evidence, exact commands and results, and remaining issues.

**Acceptance criteria:** No critical functional/build issues; key interactions tested; factual and content dependencies disclosed; remaining issues documented.

---

## Phase 8 — Vercel deployment and handover

**Requirement:** Deliver a client-approved live site safely.

**Prompt to Antigravity:**

Prepare a deployment checklist and review build. Inspect and use available `claude/skills` and `agents/skills` relevant to deployment, Next.js/Vercel configuration, SEO, and release checks. Inspect the current Vercel setup and environment requirements before changing settings. Do not deploy to an account, register a domain, change DNS, or expose credentials without explicit authorization from the project owner.

Deploy a review build to the authorized Vercel project. Request client review and approval before production launch. The desired domain is `www.swarnabhoomi.in`, but availability and ownership are not confirmed. After authorization and access are provided, configure the domain and verify HTTPS, redirects/canonical behavior, metadata, sitemap, and all contact actions on the live site.

Provide a handover summary covering repository location, deployment target, domain configuration, how to update photos and content, how to change the WhatsApp number, tests run, and any known limitations. Do not include secrets in the handover.

**Acceptance criteria:** Client-approved production site; authorized domain connection; live actions and SEO basics verified; concise handover delivered.

---

## Prompt execution rule

Run only one phase prompt at a time. Do not paste all phases into Antigravity as one instruction. Review the output and evidence, approve the phase gate, then proceed. If an acceptance criterion fails, fix it before moving on.
