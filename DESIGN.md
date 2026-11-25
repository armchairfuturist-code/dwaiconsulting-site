---
version: alpha
name: DWAI Editorial
description: Editorial trust system for DWAI Consulting, small business benefits guidance.
colors:
  primary: "#0c2431"
  ink: "#0c2431"
  ink-deep: "#071922"
  ink-hover: "#1b4152"
  paper: "#f0f1ed"
  paper-raise: "#fafaf7"
  surface: "#e3e5df"
  accent: "#19624c"
  accent-deep: "#124b3b"
  accent-tint: "#a7cfbc"
  body-text: "#22333d"
  muted-strong: "#3d525d"
  muted: "#4f636d"
  subtle: "#59676e"
  body-on-dark: "#b6c3c6"
  border: "#c8ccc6"
  border-strong: "#b3b9b3"
  border-dark: "#3e5a66"
typography:
  display-hero:
    fontFamily: Fraunces
    fontSize: 6.2rem
    fontWeight: 500
    lineHeight: 0.95
    letterSpacing: -0.045em
  display-page:
    fontFamily: Fraunces
    fontSize: 3.6rem
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: -0.04em
  heading:
    fontFamily: Fraunces
    fontSize: 1.9rem
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: -0.03em
  body:
    fontFamily: DM Sans
    fontSize: 1.0625rem
    fontWeight: 400
    lineHeight: 1.65
  body-small:
    fontFamily: DM Sans
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
rounded:
  none: 0px
  plate: 2px
  pill: 999px
spacing:
  xs: 0.5rem
  sm: 1rem
  md: 1.5rem
  lg: 2.5rem
  xl: 4rem
  xxl: 6rem
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.body-small}"
    rounded: "{rounded.pill}"
    padding: 12px
  button-primary-hover:
    backgroundColor: "{colors.ink-hover}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
  button-light:
    backgroundColor: "{colors.accent-tint}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
  text-link:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body-small}"
  text-link-hover:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.accent}"
  nav-link:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body-small}"
  nav-link-hover:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.accent}"
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
  data-band:
    backgroundColor: "{colors.ink-deep}"
    textColor: "{colors.paper}"
    padding: 48px
  footer:
    backgroundColor: "{colors.ink-deep}"
    textColor: "{colors.body-on-dark}"
  accent-rule:
    backgroundColor: "{colors.accent-deep}"
    textColor: "{colors.paper}"
  article-meta:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.subtle}"
    typography: "{typography.body-small}"
  card-copy:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.muted}"
    typography: "{typography.body}"
  article-body-text:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.body-text}"
    typography: "{typography.body}"
  article-standfirst:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.muted-strong}"
    typography: "{typography.body}"
  band-heading:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.heading}"
  band-body:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.body-on-dark}"
    typography: "{typography.body}"
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
broadsheet: generous white space, one serif voice for claims, careful hairline
structure instead of boxes, and a single green accent that marks structure and the
one action worth taking.

Two typefaces carry two jobs, and no third is introduced. Fraunces speaks as the
publication: headlines, card and item titles, figures. DM Sans speaks as the
advisor: body copy, navigation, labels, buttons.

Every token in this file is defined in `app/globals.css`. Change the stylesheet and
this document together, or `npm run lint:design` reports drift.

## Colors

The palette is paper, ink and one green accent.

- **Ink (#0c2431):** Body text on paper, and the ground of the argument bands.
- **Ink deep (#071922):** The data band and the footer, one step darker than ink.
- **Paper (#f0f1ed):** The page. Never pure white; `paper-raise` is the lighter
  surface used inside a contact card.
- **Accent (#19624c):** Structural green. List markers, hover states, focus rings,
  the reading progress bar, the rule above a pull quote.
- **Accent tint (#a7cfbc):** Accent lifted for dark grounds. The only accent that
  may appear on ink.

Accent never fills a block. Tint never appears on paper. There is no second accent
colour: no coral, no lime, no peach.

Contrast is a constraint, not a preference. Every text pair meets WCAG AA, and
`subtle` is held above 4.5:1 on both paper and surface so metadata stays legible.

## Typography

Three body sizes, one display ladder, and nothing between them.

- **Display (Fraunces, weight 500):** Negative tracking, line height at or below
  1.0. The home headline, page titles and article titles each draw from one clamp,
  so the ladder is continuous rather than stepped.
- **Body (DM Sans, 1.0625rem):** The reading size for paragraphs, list items and
  form fields.
- **Small (DM Sans, 0.875rem):** Navigation, buttons, metadata, captions and
  footer text. Nothing on the site is set below 0.875rem.

Headings are never bold and never uppercase. There is no letter-spaced label
style: where a section needs a name, the heading does the work. Measure is capped
near 41rem for articles, 62ch for prose inside sections and 34rem for hero intro
copy.

## Layout

A 72rem outer measure with 1.25rem gutters on small screens and 2rem from 768px.
Section rhythm is one token, `--band`: 3.5rem rising to 6rem with the viewport.
Two-column editorial splits collapse to one under 900px for service pages and
700px for the home bands.

Structure is drawn with hairlines, not containers. A grid of subjects is a
1px-gap grid over a rule colour, so the separators are the layout. Bands stack
paper, ink and ink-deep; adjacent bands are separated by their own value, without
shadows or rounded corners.

## Shapes

Rectangular by default, echoing print. Bands and contact cards use a 2px radius
so they read as plates. Interactive controls are pills at 999px. The favicon and
the hairline bullets are circles. Nothing else is rounded.

## Motion & Micro-interaction

Motion is short, directional and physical, and only transform and opacity animate.

One orchestrated entrance: the four hero elements rise 14px in sequence over
620ms, staggered 60 to 300ms. It runs only when JavaScript has loaded, and
`prefers-reduced-motion` removes it entirely rather than compressing it.

Everything else is feedback. Transitions run 160 to 180ms on a custom ease-out
curve. Links shift their arrow 3px on hover. Buttons compress to 0.97 on press.
The FAQ answer fades in over 240ms. The mobile menu staggers its links 30ms apart.

## Voice & Content Strategy

Plain, specific and unhedged. Sentences stay under twenty words. The advisor
addresses a business owner who is overpaying and does not know why. No jargon
without definition, no fear-based framing, no exclamation marks.

## Accessibility

Body copy is 1.0625rem and never smaller than 0.875rem. Every interactive row
reaches 44px on touch devices. Focus is always visible: a 2px accent outline with
a 1px offset. The menu toggle reports its state, the skip link appears on focus,
and the reading progress bar is decorative only.

## Components

- **button-primary:** Ink pill, paper text. Compresses on press.
- **button-light:** Accent-tint pill with ink text, for dark bands only.
- **text-link:** Small DM Sans with a 1px underline that thickens on accent hover.
- **nav-link:** Small DM Sans, pill hover on surface, accent text.
- **audience-card:** Paper panel in a hairline grid, title in Fraunces, arrow in
  accent that shifts on hover.
- **approach-band:** Full-bleed ink section holding the review framework.
- **data-band:** Deepest ink, one figure in Fraunces, bars in paper and tint.
- **footer:** Ink-deep, muted blue text, tint labels, paper on hover.

## Do's and Don'ts

- Do keep one accent per view. Don't add a second hue.
- Do set body text at 1.0625rem. Don't set reading copy below 1rem.
- Do keep line height at 1.65 or above for paragraphs. Don't set dense text.
- Do use hairlines and space to group content. Don't nest a bordered card inside a
  bordered card.
- Do use the pill shape for controls only. Don't round content plates.
- Don't introduce a third typeface.
- Don't bring back uppercase kickers or eyebrows above headings.
