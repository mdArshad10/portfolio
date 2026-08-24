# Portfolio UX audit and verification

═══════════════════════════════════════════════════════════

VERDICT: Incomplete (strict ux-audit protocol), with all tested launch hard gates green after fixes

Persona: time-pressed recruiter or prospective client, moderately technical, evaluating in a few minutes on laptop and phone

Surfaces audited: 3 / 3 routes, plus all home sections and both color themes

Interaction Manifest: incomplete under the skill's per-route rule. The home/contact surface has the required typed input, primary action, opened detail, console read, before/after screenshots, and result assertion. Content-only project and 404 routes intentionally have no input or submit control, so they cannot satisfy TYPE and SUBMIT without adding inappropriate UI.

Hard Gates after fixes: console errors 0, warnings 0, network 5xx 0, network 4xx 0, layout collapse 0, axe Critical 0, axe Serious 0

Performance on `/`: LCP 0.064s / CLS 0 / observed INP 0ms, local unthrottled. Thresholds: 4.0s / 0.25 / 500ms.

Findings at baseline: Critical 1, High 2, Medium 4, Low 0

Findings after fixes: Critical 0, High 0, Medium 0, Low 0 on the exercised core flows

Self-critique pass: Drafted 8, Kept 7, Generic 1, Duplicate 0

Time per phase: interaction passes were shorter than the skill's five-minute exhaustive threshold, which independently requires the formal Incomplete verdict. Evidence includes 23 before/after screenshots, 43 timestamped manifest entries across both runs, console reads, network inventory, responsive checks at 375/768/1024/1280/1440/1920, and focused final gates.

TOP 5, ranked by impact and ease:

1. C-1 Honest contact handoff, because the previous primary conversion path failed while claiming success.
2. H-1 Valid case-study navigation, because recruiters can now move through the portfolio without dead ends.
3. H-2 Accessible color system, because all three routes now clear axe Critical and Serious checks.
4. M-1 Mobile navigation repair, because the menu now opens in its own panel, exposes state, and closes with Escape.
5. M-2 Reduced-motion support, because every relevant transition now respects the user's OS preference.

═══════════════════════════════════════════════════════════

## Fixed findings

### C-1: Contact submission failed but reported success

- Layer: Feedback
- Severity: Critical at baseline, fixed
- Surface: `/#contact`, desktop and 375px mobile
- Persona: recruiter trying to start a conversation
- Reproduce: 1. Fill name, email, and message. 2. Press Execute. 3. Observe `POST /api/send-email` return 404. 4. Observe a success panel anyway.
- Observed: two test submissions produced console errors and network 404s, while the UI claimed transmission success and cleared the form.
- Expected: never claim delivery unless delivery occurred.
- Evidence: `before/contact-after-submit.png`, `before/audit.json`.
- Suspected location: `src/components/ContactSection.tsx`, former submit handler.
- Smallest possible patch: remove the nonexistent API call and mock success; prepare an explicit `mailto:` draft and state that nothing has been sent yet.
- Verification: `after/contact-after-submit.png`, `after/final-gates.json`; 0 console issues and 0 failed requests.

### H-1: Related projects led to invalid destinations

- Layer: Architecture
- Severity: High at baseline, fixed
- Surface: `/projects/devflow`, desktop and mobile
- Persona: recruiter exploring adjacent work
- Reproduce: 1. Open DevFlow. 2. Scroll to More Projects. 3. Open the first card.
- Observed: cards used `/project/:id` while the router expected `/projects/:id`; the referenced IDs were not project records.
- Expected: each card opens a real case study and the level-one heading updates.
- Evidence: `before/related-project-result.png`, `before/audit.json`.
- Suspected location: `src/pages/ProjectDetailPage.tsx:257`, `src/data/portfolio.ts`.
- Smallest possible patch: derive recommendations from the real `projects` collection and link with the registered plural route.
- Verification: `after/related-project-result.png`, `after/final-gates.json`; destination heading is Nexus Financial Analytics.

### H-2: Serious contrast violations across every route

- Layer: Visual
- Severity: High at baseline, fixed
- Surface: `/`, `/projects/devflow`, `/does-not-exist`
- Persona: any visitor, including low-vision users
- Reproduce: run axe-core after each route settles.
- Observed: serious `color-contrast` violations in the footer, hero controls, project stack labels, and 404 controls.
- Expected: zero axe Critical and Serious violations.
- Evidence: `before/audit.json`.
- Suspected location: `src/index.css:76`, `src/components/Footer.tsx:6`, `src/pages/NotFoundPage.tsx:14`.
- Smallest possible patch: replace low-contrast hex values with semantic OKLCH theme tokens and raise muted/label contrast.
- Verification: `after/final-gates.json`; axe violations are empty on all routes.

### M-1: Resume CTA returned the app shell instead of a PDF

- Layer: Interaction
- Severity: Medium at baseline, fixed
- Surface: `/`, hero
- Persona: recruiter looking for fast evidence
- Reproduce: activate Download Resume and inspect the response.
- Observed: `/resume.pdf` returned status 200 with `text/html`, the Vite fallback document.
- Expected: a real PDF or no download claim.
- Evidence: `before/audit.json`.
- Suspected location: `src/components/HeroSection.tsx:89`.
- Smallest possible patch: remove the false download and promote two working actions, View Projects and Email Arshad.
- Verification: `after/audit.json`; broken resume link count is 0.

### M-2: Mobile menu collided with the header and hid its state

- Layer: Interaction
- Severity: Medium at baseline, fixed
- Surface: `/`, 375px
- Persona: visitor evaluating on a phone
- Reproduce: open the hamburger menu.
- Observed: menu content lived inside the fixed 80px row and visually collided with the hero; the trigger exposed no expanded state.
- Expected: a separate full-width panel, truthful accessible state, keyboard dismissal.
- Evidence: `before/mobile-menu-open.png`.
- Suspected location: `src/components/Navbar.tsx:83` and `src/components/Navbar.tsx:114`.
- Smallest possible patch: move the panel below the header, add `aria-expanded` and `aria-controls`, remove closed links from tab order, and close on Escape.
- Verification: `after/mobile-menu-open.png`, `after/final-gates.json`; true before Escape, false after.

### M-3: Reduced-motion preference was ignored

- Layer: Interaction
- Severity: Medium at baseline, fixed
- Surface: all animated routes and 375px mobile
- Persona: user requesting less motion at OS level
- Reproduce: emulate `prefers-reduced-motion: reduce`, load the home page, inspect hero and nav transition durations.
- Observed: durations remained 1s and 0.3s.
- Expected: effectively zero duration, no animated scroll, and content visible without entrance choreography.
- Evidence: `before/audit.json`.
- Suspected location: `src/index.css:299`, `src/hooks/use-in-view.ts:19`.
- Smallest possible patch: preserve every Transitions.dev guard, add a global reduced-motion fallback, and make in-view content immediately visible.
- Verification: `after/final-gates.json`; both tested durations are 0.00001s.

### M-4: Contact language hid the real task

- Layer: Feedback
- Severity: Medium at baseline, fixed
- Surface: `/#contact`
- Persona: first-time recruiter
- Reproduce: read the form labels and confirmation without source-code context.
- Observed: Identifier, Return Address, Payload, Execute, and an unsupported acknowledgment promise forced visitors to translate a simple email task.
- Expected: plain labels and precise delivery status.
- Evidence: `before/contact-before-submit.png`, `before/contact-after-submit.png`.
- Suspected location: `src/components/ContactSection.tsx:177` and `src/components/ContactSection.tsx:202`.
- Smallest possible patch: use Your name, Email address, Project or role, Prepare email, and explain the explicit email-app handoff.
- Verification: `after/contact-before-submit.png`, `after/contact-after-submit.png`.

## Perfection roadmap

- Quick wins completed: contrast, labels, footer, focus outline, skip link, button targets, honest status copy.
- Structural completed: related-project source of truth, hash route behavior, mobile navigation geometry and semantics.
- Advanced polish completed: panel reveal, icon swap, loading text swap, measured success icon, error shake, reduced-motion guards.
- Future option: add a protected serverless email endpoint with spam controls if one-click delivery is preferred over the current honest email-draft handoff.

## Hold this in your hands

The portfolio now feels like a precise technical folio rather than a themed shell: firm edges, a clear reading order, direct case-study paths, and feedback that says exactly what happened. I would want to hold it because the visual confidence is now backed by trustworthy behavior, and the motion supports the object instead of drawing attention away from it.
