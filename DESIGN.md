---
version: alpha
name: DWAI Editorial
description: Editorial trust system for DWAI Consulting, small business benefits guidance.
colors:
  primary: "#102b3d"
  ink: "#102b3d"
  ink-deep: "#0a202e"
  ink-hover: "#234c64"
  paper: "#f6f4ed"
  paper-raise: "#fffdf6"
  surface: "#ebe9e0"
  coral: "#a34b2e"
  lime: "#d9ef4a"
  lime-hover: "#c8e22d"
  body-text: "#23394a"
  muted-strong: "#41586a"
  muted: "#536675"
  subtle: "#616e75"
  border: "#c9cec9"
  border-strong: "#b7bdb9"
  border-dark: "#466171"
  accent-on-dark: "#9bc1ca"
  body-on-dark: "#b8cbd0"
typography:
  display-hero:
    fontFamily: Fraunces
    fontSize: 7.4rem
    fontWeight: 500
    lineHeight: 0.94
    letterSpacing: -0.06em
  display-h2:
    fontFamily: Fraunces
    fontSize: 4.25rem
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: -0.045em
  display-h3:
    fontFamily: Fraunces
    fontSize: 1.75rem
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: -0.03em
  body-lg:
    fontFamily: DM Sans
    fontSize: 1.18rem
    fontWeight: 400
    lineHeight: 1.5
  body-md:
    fontFamily: DM Sans
    fontSize: 1.08rem
    fontWeight: 400
    lineHeight: 1.72
  body-sm:
    fontFamily: DM Sans
    fontSize: 0.9rem
    fontWeight: 400
    lineHeight: 1.55
  label-caps:
    fontFamily: DM Mono
    fontSize: 0.68rem
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0.08em
rounded:
  none: 0px
  band: 2px
  lg: 8px
  pill: 999px
spacing:
  xs: 0.5rem
  sm: 1rem
  md: 1.5rem
  lg: 2.5rem
  xl: 4rem
  xxl: 6rem
motion:
  quick:
    duration: 150ms
    timingFunction: ease-out
  base:
    duration: 160ms
    timingFunction: cubic-bezier(0.23, 1, 0.32, 1)
  settle:
    duration: 180ms
    timingFunction: ease-out
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.pill}"
    padding: 12px
  button-primary-hover:
    backgroundColor: "{colors.ink-hover}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
  button-light:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
  button-light-hover:
    backgroundColor: "{colors.lime-hover}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
  nav-link:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label-caps}"
  nav-link-hover:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.coral}"
  audience-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    padding: 24px
  audience-card-hover:
    backgroundColor: "{colors.paper-raise}"
    textColor: "{colors.ink}"
  approach-band:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    padding: 48px
  footer:
    backgroundColor: "{colors.ink-deep}"
    textColor: "{colors.body-on-dark}"
  kicker:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.coral}"
    typography: "{typography.label-caps}"
  kicker-separator:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.subtle}"
    typography: "{typography.label-caps}"
  article-meta:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.subtle}"
    typography: "{typography.label-caps}"
  article-body-text:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.body-text}"
    typography: "{typography.body-md}"
  article-standfirst:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.muted-strong}"
  section-band-label:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.accent-on-dark}"
    typography: "{typography.label-caps}"
  section-band-body:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.body-on-dark}"
    typography: "{typography.body-md}"
  card-copy:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.muted}"
    typography: "{typography.body-sm}"
  hairline-divider:
    backgroundColor: "{colors.border}"
    textColor: "{colors.ink}"
  grid-divider:
    backgroundColor: "{colors.border-strong}"
    textColor: "{colors.ink}"
  band-divider:
    backgroundColor: "{colors.border-dark}"
    textColor: "{colors.paper}"
---

## Overview

Editorial trust, not insurance marketing. The interface reads like a considered
broadsheet: generous white space, a serif voice for claims, a monospace voice for
labels, and a single warm accent that marks the one action worth taking. Colour is
structural rather than decorative. Dark bands carry the argument; paper carries
the reading.

Three typefaces carry three jobs. Fraunces speaks as the publication. DM Sans
speaks as the advisor. DM Mono speaks as the index, numbering and labelling what
the reader is looking at. No fourth voice is introduced.

## Colors

The palette is paper and ink with one warm accent and one cold call to action.

- **Ink (#102b3d):** Primary text on paper and background of the argument bands.
- **Paper (#f6f4ed):** Warm limestone foundation, never pure white.
- **Coral (#a34b2e):** The editorial accent. Kickers, list markers, hover states.
- **Lime (#d9ef4a):** Reserved for the single high-intent action on dark grounds.
- **Surface (#ebe9e0):** Quiet recession for alternating sections and nav hover.

Accents are scarce. Coral never fills a block. Lime never appears on paper.

## Typography

- **Display (Fraunces):** Tight negative tracking, line height at or below 1.05.
  Headlines are set at optical weight 500, never bold.
- **Body (DM Sans):** Long-form reading at 1.08rem and 1.72 line height.
- **Label (DM Mono):** Uppercase, 0.08em tracking, 0.68rem. Used for kickers,
  indices and metadata only.

Measure is capped near 41rem for articles and 33rem for intro copy.

## Layout

A 72rem outer measure with 1.25rem gutters on small screens. Sections are separated
by 6rem vertical rhythm on desktop and 4rem on mobile. Two-column editorial splits
collapse to one under 700px.

## Shapes

Rectangular by default, echoing print. Bands use a 2px radius so they read as
plates, not cards. Interactive controls are pills at 999px. Nothing else is rounded.

## Motion & Micro-interaction

Motion is short and directional. Transitions run 150 to 180ms on a custom
ease-out curve. Links shift their arrow 3px on hover. Buttons compress to 0.97 on
press. Reduced-motion preferences disable all animation.

## Voice & Content Strategy

Plain, specific and unhedged. Sentences stay under twenty words. The advisor
addresses a business owner who is overpaying and does not know why. No jargon
without definition, no fear-based framing, no exclamation marks.

## Components

- **button-primary:** Ink pill, paper text. Compresses on press, lifts arrow on hover.
- **button-light:** Lime pill with ink text, for dark bands only.
- **nav-link:** Pill hover on surface, coral text, label-caps type.
- **audience-card:** Paper panel in a hairline grid, index label in coral.
- **approach-band:** Full-bleed ink section holding the review framework.
- **footer:** Deepest ink, muted blue text, lime on hover.

## Do's and Don'ts

- Do keep one accent per view. Don't stack coral on lime.
- Do set body text at 1.08rem or larger. Don't drop below 1rem for reading copy.
- Do keep line height at 1.65 or above for paragraphs. Don't set dense text.
- Do use the pill shape for controls only. Don't round content cards.
- Don't introduce a fourth typeface.