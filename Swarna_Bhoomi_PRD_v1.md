# Product Requirements Document (PRD)
## Swarna Bhoomi — Residential Plots Website

| Document field | Details |
|---|---|
| Product | Swarna Bhoomi marketing website |
| Document type | Product Requirements Document (PRD) |
| Version | 1.0 — Initial requirements baseline |
| Status | Draft — pending client verification and asset review |
| Prepared for | Swarna Bhoomi project stakeholders |
| Delivery approach | Phased implementation with Antigravity as coding agent |
| Proposed stack | Next.js, React, Tailwind CSS, Vercel |
| Primary conversion | Qualified enquiry initiated through WhatsApp |

> **Important:** This PRD records the requirements supplied so far. Any unconfirmed price, inventory, approval, amenity, location, contact, or legal claim must be verified with the client before publication. This document is not a substitute for approval or legal documentation.

---

## 1. Executive summary

Swarna Bhoomi requires a professional, mobile-first website for a residential plots / township project associated in the brief with Thiruvallur, Krishnapuram, and the Chennai–Tirupati National Highway. The website should communicate the project clearly, establish trust through genuine project information and imagery, help prospective buyers understand the plots and location, and make it easy to enquire or arrange a site visit.

The first release will be a lightweight marketing website. Enquiries will be initiated through WhatsApp using a pre-filled message. The website will not maintain a lead database and will not include an admin dashboard or backend in version one.

The product will be delivered in phases: discovery and verification, repository audit, information architecture, visual direction, foundation, page implementation, lead-flow validation, quality assurance, and deployment/handover.

## 2. Problem statement

Prospective plot buyers need a clear, trustworthy way to learn about Swarna Bhoomi, view real site conditions, understand the available plot sizes and amenities, evaluate the location, and contact the project team.

The website must reduce uncertainty and friction by:
- presenting verified project information in a clear hierarchy;
- using authentic site photos and an approved layout where available;
- distinguishing existing facilities from planned or under-development amenities;
- making phone, WhatsApp, and site-visit actions easy to find, especially on mobile;
- avoiding unsupported claims that could damage trust or mislead buyers.

## 3. Product vision

Create a polished, credible, fast, responsive project website that helps prospective buyers move from discovery to a meaningful enquiry with minimal friction.

### Product principles
1. **Trust over hype:** use verified information and real project assets.
2. **Conversion with clarity:** every primary call to action has an understandable purpose.
3. **Mobile-first usability:** core content and contact actions work comfortably on small screens.
4. **Honest representation:** never present planned amenities as completed or unverified approvals as confirmed.
5. **Lean first release:** avoid backend complexity until automatic lead storage or administration is genuinely required.
6. **Maintainable implementation:** reusable components, clear conventions, and documented deployment.

## 4. Goals and success criteria

### 4.1 Business goals
- Generate genuine enquiries from prospective plot buyers.
- Encourage site-visit requests.
- Present the project professionally and build confidence.
- Provide a foundation that can be extended later without rebuilding the entire website.

### 4.2 User goals
- Understand what Swarna Bhoomi is and where it is located.
- View authentic photos and layout information where available.
- Find plot-size and price information once verified.
- Understand which amenities are existing, in progress, or planned.
- Contact the project team quickly by WhatsApp or phone.
- Request information or a site visit with minimal effort.

### 4.3 Release acceptance indicators
The initial release is acceptable when:
- all six required pages are implemented and responsive;
- every displayed project claim has been verified or clearly withheld;
- enquiry form inputs produce the correct pre-filled WhatsApp message;
- phone, WhatsApp, navigation, map, and site-visit actions work as intended;
- no critical layout, build, or runtime errors remain;
- core metadata and sitemap configuration are present;
- the deployed site has been checked on mobile and desktop;
- the client has reviewed and approved the production content and launch.

Traffic and conversion targets should be set only after the client provides a baseline or business target. Do not invent numerical KPIs.

## 5. Target audiences and user needs

### Primary audience: Prospective plot buyers
Needs clear information about plot sizes, price, location, project status, documents, and how to visit the site.

### Secondary audience: Family members / co-decision-makers
Needs credible visual information, location context, transparent project details, and a simple way to share or enquire.

### Tertiary audience: Returning leads
Needs direct access to phone/WhatsApp contact and updated project information.

Audience demographics, buyer budgets, preferred languages, and geographic targeting remain to be confirmed by the client.

## 6. Scope

### 6.1 In scope — version one
- Six public-facing pages:
  1. Home
  2. About the Project
  3. Gallery
  4. Amenities
  5. Location
  6. Contact & Enquiry
- Shared site header, navigation, footer, and consistent design system.
- Authentic project photography and supplied brand assets.
- Verified project highlights, starting price, plot sizes, developer information, location, and approvals when supplied and approved.
- Enquiry form that opens WhatsApp with a pre-filled message.
- Click-to-call phone links.
- Site-visit enquiry action.
- Mobile sticky Call / WhatsApp / Site Visit actions, implemented without covering content or controls.
- Responsive layouts for mobile, tablet, laptop, and desktop.
- Basic technical SEO: page titles, descriptions, Open Graph metadata, sitemap, robots configuration, semantic structure, and image alt text.
- Deployment to Vercel and connection of the intended domain, subject to domain availability, ownership, and client authorization.
- Functional, responsive, and production-build testing.

### 6.2 Explicitly out of scope — version one
- Admin dashboard.
- Automatic lead storage or lead-management CRM.
- Database or custom backend.
- User accounts or authentication.
- Online plot booking, payments, or transaction processing.
- Automated WhatsApp messaging without visitor action.
- Claims of guaranteed returns, legal status, approvals, or availability without evidence.
- Third-party analytics or tracking tools unless agreed with the client.
- Additional pages or features not approved in the scope.

### 6.3 Possible future enhancements — not committed
- Automatic lead storage and CRM integration.
- Analytics and conversion tracking with appropriate consent/privacy handling.
- Multilingual content.
- Inventory or availability updates from a managed source.
- Additional project or legal-document downloads.
- More advanced SEO content.

These are future options, not requirements for the first release.

## 7. Information architecture and page requirements

### 7.1 Home
**Purpose:** Explain the project quickly and encourage an enquiry.

Required content:
- Premium hero section with clear project identity and primary enquiry CTA.
- Short project introduction.
- Key project highlights based only on verified information.
- Starting price only after current price and conditions are confirmed.
- Authentic site photography.
- Amenities preview with accurate status labels.
- Location preview and map/directions CTA.
- Clear WhatsApp, call, and site-visit actions.

Acceptance criteria:
- The project identity and primary CTA are immediately understandable.
- Any price or factual highlight is supported by client confirmation.
- Hero imagery is authentic or explicitly approved for use.
- Layout remains usable on narrow screens and does not hide the main CTA.

### 7.2 About the Project
**Purpose:** Explain the project concept and establish credibility.

Required content:
- Project overview and residential township concept.
- Vision or positioning approved by the client.
- Developer information using the correct legal/business name.
- Approval details only where verified documentation is provided.

Acceptance criteria:
- No fabricated developer history, awards, approvals, or claims.
- Any approval statement matches the documentation and approved wording.

### 7.3 Gallery
**Purpose:** Let prospective buyers inspect the actual project visually.

Potential content, if supplied:
- Actual site photographs.
- Road development and entrance.
- Plot markers or plot views.
- Approved layout/master plan.

Acceptance criteria:
- Images are approved for publication and represent the project accurately.
- Layout/master plan is not described as approved unless evidence supports that claim.
- Images have suitable sizing, responsive behavior, and descriptive alternative text where meaningful.

### 7.4 Amenities
**Purpose:** Explain infrastructure and community facilities transparently.

Required behavior:
- Organize facilities clearly.
- Label items as **Existing**, **Under development**, or **Planned**, where applicable.
- Do not imply future amenities are currently available.

Acceptance criteria:
- Each listed amenity has client confirmation and a correct status.
- Unsupported facilities are omitted rather than guessed.

### 7.5 Location
**Purpose:** Help users understand where the project is and how to reach it.

Required content:
- Confirmed Google Maps pin or approved map link.
- Directions and site-visit CTA.
- Chennai–Tirupati National Highway context if confirmed.
- Nearby landmarks only when names, distances, and route claims have been checked.

Acceptance criteria:
- The map points to the actual site.
- Directions and landmark details are accurate to the extent claimed.
- No unsupported distance or travel-time promises appear.

### 7.6 Contact & Enquiry
**Purpose:** Convert visitor interest into an actionable enquiry.

Required features:
- Enquiry form.
- WhatsApp enquiry.
- Click-to-call.
- Site-visit request.

Acceptance criteria:
- Required fields show understandable validation messages.
- The visitor can correct invalid input without losing all entered information.
- WhatsApp opens with a correctly encoded, readable pre-filled message.
- The visitor is told that the message is not sent until they send it in WhatsApp.
- The page remains usable on mobile and keyboard navigation.

## 8. Lead-generation specification

### 8.1 Form fields
1. **Full name** — required.
2. **Mobile number** — required; validate sensible length and accepted characters without rejecting legitimate numbers unnecessarily.
3. **Preferred plot size** — required selection:
   - 517–800 sq.ft.
   - 801–1,200 sq.ft.
   - 1,201–1,600 sq.ft.
   - Not sure yet
4. **What would you like to know?** — required selection:
   - Price details
   - Available plots
   - Book a site visit
   - Approval and documents
5. **Submit action:** Send Enquiry via WhatsApp.

The plot-size options and availability must be reconfirmed against current inventory before launch.

### 8.2 WhatsApp interaction
On valid submission:
- Compose a message containing the entered name, mobile number, preferred plot size, and enquiry topic.
- Encode the message safely for a WhatsApp click-to-chat URL.
- Open WhatsApp using the confirmed business number, including the appropriate country code.
- Use a suitable new-tab or platform-appropriate navigation behavior.
- Do not transmit form data to an unapproved service or claim the enquiry has been saved.

Suggested message template:

“Hello Swarna Bhoomi team,
I would like to enquire about the project.

Name: [visitor name]
Mobile: [visitor mobile]
Preferred plot size: [selected size]
Enquiry: [selected topic]

Please share more details. Thank you.”

### 8.3 Privacy and disclosure
Display a concise disclosure near the form explaining:
- submission opens WhatsApp with a pre-filled message;
- the website does not store the enquiry in a database;
- the visitor must send the message within WhatsApp.

Do not collect unnecessary personal data. Any additional privacy notice required by the client must be reviewed before launch.

### 8.4 Contact actions
- Use `tel:` links for confirmed phone numbers.
- Use the confirmed business WhatsApp number for all WhatsApp actions.
- Ensure mobile sticky actions do not obscure form buttons, consent text, navigation, or page content.
- Provide accessible labels and visible focus states.

## 9. UX and visual design requirements

The final art direction must be informed by the actual logo, photography, client preferences, and any reference sites. Do not finalize a palette or visual style before reviewing those materials.

Expected quality:
- Premium, credible real-estate presentation.
- Clear typography and hierarchy.
- Consistent spacing, grids, buttons, cards, form states, and image treatment.
- Strong readability and contrast.
- Authentic photography prioritized over generic stock imagery.
- Purposeful motion only; support reduced-motion preferences.
- Consistent mobile, tablet, and desktop behavior.
- No fake counters, fake testimonials, invented ratings, fabricated urgency, or decorative features that distract from the buyer journey.

## 10. Technical requirements

### 10.1 Proposed stack
- Next.js
- React
- Tailwind CSS
- Vercel hosting
- WhatsApp click-to-chat for enquiries
- No custom backend or database in version one

The exact framework and package versions must be selected after the repository audit, using a compatible, currently supported set. If a repository already exists, inspect it before changing its stack.

### 10.2 Engineering standards
- Use reusable components and a clear separation of layout, page content, and shared UI.
- Keep dependencies minimal and justify additions.
- Follow the existing project conventions where appropriate.
- Use semantic HTML and accessible form controls.
- Avoid exposing credentials, private keys, or client secrets in client-side code or source control.
- Avoid adding services that collect visitor data unless approved.
- Ensure production build and required project checks complete successfully.

### 10.3 Responsive requirements
Verify at representative narrow mobile, larger mobile, tablet, laptop, and desktop widths. The exact test matrix can be finalized during implementation.

Required:
- No horizontal overflow caused by the site layout.
- Readable text and usable tap targets.
- Responsive image sizing and sensible cropping.
- Navigation and sticky actions work without blocking content.
- Forms can be completed on mobile.

### 10.4 Performance and reliability
- Optimize supplied images and use appropriate responsive image handling.
- Avoid unnecessary large dependencies and excessive animations.
- Prevent avoidable layout shifts.
- Test the production build and inspect browser console errors.
- Do not promise a particular performance score until measured on the deployed site.

## 11. SEO requirements

- Unique, descriptive title and meta description for each page.
- Project and location keywords used naturally, not stuffed.
- Open Graph metadata and an approved social-sharing image.
- Sitemap and robots configuration.
- Semantic headings and descriptive link text.
- Meaningful alt text for informative images; decorative images should not create noisy screen-reader output.
- Canonical URL after the final domain is confirmed.
- Favicon and consistent branding.
- Verify the live site's metadata and sitemap after deployment.

Potential keywords supplied in the brief:
- Swarna Bhoomi Thiruvallur
- DTCP approved plots in Thiruvallur
- Residential plots in Krishnapuram
- Plots near Chennai–Tirupati National Highway
- Residential township in Thiruvallur
- Swarna Bhoomi plot price
- Plots starting from ₹7 lakhs — only after the current offer and terms are confirmed

**Compliance rule:** Do not publish “DTCP approved,” RERA registration claims, “approved layout,” or similar statements until the client supplies the relevant evidence and approves the wording. Confirm applicability of any registration requirement rather than assuming it.

## 12. Domain and deployment

Desired domain: `www.swarnabhoomi.in`

Requirements:
- Check availability and current ownership; do not assume the domain is available.
- Obtain client authorization before registering, transferring, or changing DNS.
- Deploy a review build to Vercel.
- Obtain client review and approval before production launch.
- Configure the custom domain only after access and ownership are confirmed.
- Verify HTTPS, canonical-domain behavior, redirects, metadata, sitemap, and all contact actions on the live site.

## 13. Content and claim governance

The following must be confirmed before publishing:
- Current starting price and any conditions.
- Available plot sizes and current inventory.
- Correct legal developer/business name.
- Approval number and applicable registration details.
- Exact site location and directions.
- Nearby landmark names and any stated distances.
- Amenity list and delivery status.
- Business phone and WhatsApp number.
- Rights/permission to use supplied photos, logo, and layout.
- Final copy and any required legal/privacy wording.

If an item remains unconfirmed at launch, omit it or label it as pending in the internal project workflow. Do not publish placeholder claims to make a page appear complete.

## 14. Non-functional requirements

| Area | Requirement |
|---|---|
| Usability | Visitors can find project information and contact actions without unnecessary friction. |
| Responsiveness | Core pages and actions work on mobile, tablet, and desktop. |
| Accessibility | Semantic structure, keyboard access, visible focus, labels, and readable contrast. |
| Performance | Optimized assets and minimal unnecessary client-side work. |
| Reliability | No broken primary links or critical runtime/build errors at launch. |
| Maintainability | Reusable components and understandable project structure. |
| Privacy | No unapproved collection or storage of enquiry data. |
| SEO | Page metadata, sitemap, robots configuration, semantic content, and suitable social preview. |
| Accuracy | Commercial, location, amenity, and approval claims are verified before publication. |

## 15. Analytics and measurement

No analytics platform is confirmed. Do not add tracking scripts by default.

After client discussion, optional measures may include:
- WhatsApp CTA clicks.
- Click-to-call interactions.
- Site-visit CTA clicks.
- Enquiry form validation failures.
- Traffic by landing page.

Any analytics implementation requires client approval and appropriate privacy handling. Since version one does not store leads, a WhatsApp click must not be reported as a confirmed or completed enquiry.

## 16. Delivery plan and phase gates

### Phase 0 — Discovery and assets
**Work:** Collect brief, logo, real photos, layout/master plan, reference sites, business details, price, inventory, location, approvals, and amenities status.  
**Deliverable:** Confirmed facts list, asset inventory, and open questions.  
**Gate:** Missing or unverified claims are explicitly recorded.

### Phase 1 — Repository audit
**Work:** Antigravity inspects repository, branch, package manager, framework, dependencies, routes, assets, scripts, and current build/test status. If no repo exists, propose the initial structure.  
**Deliverable:** Read-only technical audit and implementation plan.  
**Gate:** Plan reviewed before broad code edits or stack changes.

### Phase 2 — Information architecture
**Work:** Define page sections, navigation, shared layout, CTA hierarchy, and user journey.  
**Deliverable:** Approved page-by-page content outline.  
**Gate:** Each page has a clear purpose and conversion action.

### Phase 3 — Visual direction
**Work:** Review assets and references; define typography, color tokens, spacing, components, imagery, and responsive patterns.  
**Deliverable:** Approved homepage direction and reusable design system.  
**Gate:** Visual direction approved before building every page.

### Phase 4 — Foundation
**Work:** Configure compatible stack, layout, routes, shared components, metadata defaults, and scripts.  
**Deliverable:** Maintainable foundation with a successful build.  
**Gate:** No unresolved foundation-level errors.

### Phase 5 — Page implementation
**Work:** Build and review the six pages in manageable increments using approved content and assets.  
**Deliverable:** Complete responsive website.  
**Gate:** Page content and primary interactions are reviewed.

### Phase 6 — Lead flow
**Work:** Implement validation, WhatsApp message generation, phone links, site-visit actions, and mobile sticky CTAs.  
**Deliverable:** Tested conversion flow.  
**Gate:** Correct destination, encoded message, and clear disclosure verified on mobile and desktop.

### Phase 7 — QA
**Work:** Run lint/type checks/build; inspect responsive layouts, accessibility basics, metadata, sitemap, links, console, and claim accuracy.  
**Deliverable:** QA report with resolved issues and any remaining limitations.  
**Gate:** No open critical issues.

### Phase 8 — Client review and launch
**Work:** Vercel review deployment, client feedback, approval, authorized domain setup, live checks, and handover.  
**Deliverable:** Client-approved live website and concise handover guide.  
**Gate:** Live website and contact actions verified.

## 17. Antigravity operating protocol

Antigravity is the coding agent. Each task prompt should contain:
1. Project context and confirmed requirements.
2. Exact files, components, or pages in scope.
3. Constraints and items that must not be changed.
4. Observable acceptance criteria.
5. Commands/tests to run.
6. A report of changed files, results, screenshots where useful, and unresolved issues.

Agent rules:
- Inspect before editing.
- Do not overwrite or restructure unrelated code without justification and approval.
- Do not invent project facts or substitute generic assets for real client assets without approval.
- Do not silently change framework versions or install unnecessary dependencies.
- Do not claim a test passed unless it was run and the result is reported.
- Stop and ask when a missing asset or business fact blocks accurate implementation.
- Review the diff and test evidence after each phase before proceeding.

## 18. Risks and mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Price or inventory is outdated | Buyer confusion and lost trust | Obtain client confirmation before publishing; keep content easy to update. |
| Approval or registration claims are unsupported | Legal and reputational risk | Verify evidence and approved wording before publication. |
| Generic or inaccurate photos are used | Reduced credibility | Prioritize actual site photos and approved project assets. |
| Planned amenities appear completed | Misleading presentation | Label status explicitly and verify every amenity. |
| Wrong map pin or contact number | Lost enquiries | Test confirmed links and phone numbers before launch. |
| WhatsApp message is malformed | Failed conversion | Test URL encoding and generated message across devices. |
| Mobile sticky buttons obscure content | Poor usability | Test small screens and safe spacing around form controls. |
| Domain ownership/access is unclear | Launch delay | Confirm owner, registration status, and authorization early. |
| Agent changes too much at once | Regressions and review difficulty | Use narrow phase prompts, review diffs, and run checks after each change. |

## 19. Open questions and pre-launch checklist

The following details remain unconfirmed in the supplied brief:

- [ ] Current starting price: ₹6.5 lakhs or ₹7 lakhs onwards, including terms.
- [ ] Current plot-size range and inventory: 517–1,600 sq.ft. or revised figures.
- [ ] Approval documents, approval number, and applicable RERA status.
- [ ] Exact Google Maps pin and directions.
- [ ] Verified nearby landmarks and any stated distances.
- [ ] Final amenity list and status for each facility.
- [ ] Legal developer/business name and approved description.
- [ ] Business phone number and WhatsApp number with country code.
- [ ] Final logo, authentic project photos, and approved layout/master plan.
- [ ] Existing website URL, if any.
- [ ] Existing repository URL/status or confirmation that the project starts from scratch.
- [ ] Domain availability/ownership and authorized account access.
- [ ] Final content, image-use permission, and required privacy/legal text.
- [ ] Client approval of visual direction and staging site.

## 20. Definition of done

The project is ready for client handover when:
- all six pages are complete and responsive;
- all published claims and media are approved and accurate;
- the enquiry form validates and opens WhatsApp with the correct pre-filled message;
- the call, map, navigation, and site-visit actions work;
- no critical responsive, runtime, or build issues remain;
- SEO basics and social metadata are present;
- production deployment and domain behavior have been verified;
- the client has approved the final website;
- repository and deployment handover details are documented.

---

## Appendix A — Current decisions

| Decision | Current status |
|---|---|
| Product | Swarna Bhoomi residential plots / township website |
| Required pages | Home, About the Project, Gallery, Amenities, Location, Contact & Enquiry |
| Primary conversion | WhatsApp enquiry |
| Backend/database | Not required for version one |
| Admin dashboard | Not required |
| Proposed frontend | Next.js + React + Tailwind CSS |
| Hosting | Vercel |
| Desired domain | `www.swarnabhoomi.in` — availability/ownership not confirmed |
| Coding agent | Antigravity |
| Starting price | Unconfirmed |
| Approval claims | Require verification |
| Visual direction | Pending review of actual logo, photos, and references |

## Appendix B — Change control

Any request that changes the page count, adds backend/CRM functionality, introduces payment or booking flows, adds data collection, or changes the technical stack should be recorded as a scope change and reviewed for impact on effort, cost, privacy, and delivery schedule before implementation.


## Appendix C — Brand and reference-image findings (2026-10-10)

Three client-supplied images have been received. Treat these as brand/reference assets, not as proof that every statement printed on them is current or legally verified.

### Visual direction inferred from the references
- Brand name shown: **Swarna Bhoomi**.
- Supporting descriptor: **Premium Residential Plots**.
- Logo motif: gold lotus above a two-line wordmark.
- Primary visual colors: deep forest green, warm gold, ivory/cream, and white.
- Location wording shown: Krishnapuram – Thiruvallur; Chennai–Tirupati National Highway.
- Phone number shown in the supplied artwork: 7339652776. Confirm with the client before publishing.
- The artwork contains a DTCP Approved badge and price claim of ₹7 lakhs. Both must be checked against current documentary evidence and the client's approved offer before publishing.
- The photographs appear to show plot land and road development; use the originals as supplied, and do not represent them as proof of approvals or amenities beyond what can be visibly and factually established.

### Visual design guardrails
Use the real brand palette as the starting point rather than inventing a generic AI-style palette. The intended direction is premium, restrained, and editorial:
- warm ivory / off-white for spacious content sections;
- deep forest green for brand anchors, navigation details, and selected high-contrast sections;
- gold as a selective accent for highlights, icons, borders, and primary actions;
- dark neutral text for legibility;
- real site images with careful cropping and an understated editorial layout.

Glassmorphism may be used selectively for a floating enquiry panel or small overlay only where text remains legible. Avoid glass effects on every card, excessive gradients, glowing outlines, oversized animated typography, gratuitous parallax, stock-photo substitutions, fake metrics, and generic AI-generated decoration.

### Motion guidance
Use animation only to support hierarchy and feedback. Prefer CSS transitions for simple hover/focus states. Use Framer Motion for React component entrances, shared layout transitions, and reduced-motion-aware UI transitions where needed. Use Anime.js only if a specific timeline or fine-grained animation genuinely adds value. Do not use both libraries for the same effect. Respect `prefers-reduced-motion`, keep mobile performance in mind, and ensure the site remains usable if animation is disabled.

### Reference assets received
1. `WhatsApp Image 2026-10-10 at 8.16.19 PM.jpeg`
2. `WhatsApp Image 2026-10-10 at 8.16.25 PM.jpeg`
3. `WhatsApp Image 2026-10-10 at 8.16.25 PM (1).jpeg`

### Additional requirements from the user
- Coding agent: Antigravity.
- Antigravity prompts should be phase-specific and must state the requirement, constraints, acceptance criteria, and verification steps.
- At the beginning of each phase, ask the agent to inspect the available `claude/skills` and `agents/skills` (or their actual equivalents in the workspace) and use relevant installed skills. Do not claim a skill exists if it is not installed or discoverable.
- Use tools when they materially help: repository search and inspection, image dimension/optimization tools, browser responsive testing, Playwright or equivalent interaction testing if available, and Lighthouse or equivalent performance auditing if available. Do not install tools/dependencies without explaining why and checking the current setup.


## Appendix D — Phase 0 completeness requirement

Phase 0 must audit the full requirements baseline, not just the reference images. It must inventory available Claude/agent skills and project tools, trace every page and user-facing function to a future test, inspect the repository read-only if present, list all client-confirmation blockers, and produce a discovery report before implementation begins. No broad code changes, dependency installation, deployment, domain/DNS changes, or destructive operations are allowed in Phase 0.

The original required functions that must be preserved and later tested include: all six pages; validated enquiry fields and choices; WhatsApp click-to-chat with correctly encoded pre-filled message; explicit disclosure that the visitor must send the message and that the site does not store leads; working call/WhatsApp/map/site-visit actions; responsive sticky mobile Call / WhatsApp / Site Visit controls; verified project details and amenity status; SEO metadata, Open Graph, sitemap and robots configuration; responsive behavior, accessibility basics, image performance, and Vercel deployment/domain verification subject to authorization.
