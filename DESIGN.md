# Portfolio Design System

## Direction

Quiet, precise, and workmanlike. The site should feel like a well-edited product portfolio, not a developer-themed poster. Content and project evidence lead; decoration stays secondary.

## Physical scene

A recruiter reviews the portfolio on a bright laptop between meetings and needs to understand the person, work, and contact path within a minute.

## Typography

- Primary family: Onest, a humanist variable sans designed for clear information and wayfinding.
- Fallback: ui-sans-serif, system-ui, sans-serif.
- Display: 600–700 weight, tight but readable tracking, sentence case.
- Body: 400–500 weight, 1.65 line height, maximum 68ch.
- Labels: 500–600 weight, normal case. Avoid all-caps except very short status labels.

## Color

Strategy: restrained. Tinted paper neutrals carry the interface and cobalt is reserved for actions, links, focus, and selected states.

### Light

- Canvas: `oklch(0.985 0.004 255)`
- Surface: `oklch(0.998 0.002 255)`
- Ink: `oklch(0.205 0.018 258)`
- Muted ink: `oklch(0.48 0.018 258)`
- Border: `oklch(0.88 0.012 258)`
- Accent: `oklch(0.55 0.19 258)`
- Accent soft: `oklch(0.955 0.025 258)`

### Dark

- Canvas: `oklch(0.16 0.014 258)`
- Surface: `oklch(0.20 0.014 258)`
- Ink: `oklch(0.94 0.008 258)`
- Muted ink: `oklch(0.70 0.014 258)`
- Border: `oklch(0.31 0.016 258)`
- Accent: `oklch(0.70 0.15 258)`
- Accent soft: `oklch(0.25 0.05 258)`

## Layout

- Content width: 1120px, with 24px mobile gutters and 32px desktop gutters.
- Reading width: 68ch.
- Section spacing: `clamp(5rem, 10vw, 8.5rem)`.
- Use open rows and ruled groups before cards. Cards are reserved for the contact form and contained status feedback.
- Desktop sections can use a 4/8 or 5/7 split. Mobile collapses naturally to one column.

## Shape and elevation

- Radius scale: 8px controls, 12px contained surfaces, pill only for compact tags/status.
- Borders: 1px neutral rules.
- Shadows: one quiet elevation for floating navigation and form surfaces; no decorative glow.

## Interaction

- Primary transitions: 180–260ms with `cubic-bezier(0.22, 1, 0.36, 1)`.
- Hover feedback changes color and moves an arrow by at most 3px.
- Entrance motion is limited to short opacity/translate reveals.
- Respect `prefers-reduced-motion` globally.
- Every interactive target is at least 44px tall and has a visible focus ring.
