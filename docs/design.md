# DWAI Consulting — Site Design

## Overview
DWAI Consulting is an insurance referral and small-business benefits consultancy based in Illinois, serving clients nationwide. The new site replaces the GoDaddy Website Builder product while preserving SEO and existing lead channels.

## Stakeholders (UX / DX / AX)
Every decision serves three audiences:
- **User experience**: Business owners seeking health-insurance guidance or buy-sell planning help.
- **Developer experience**: Clean layout, predictable CSS classes, documented component boundaries.
- **Agent experience (AX)**: Machine-readable content for future AI-driven editing and updates.

## Architecture
- Framework: vinext (Vite + React Server Components on Cloudflare Workers).
- Content source: static JSON in `lib/content.ts` for service pages; `content/blog.json` for blog articles.
- Routing: App Router (`app/page.tsx` for homepage, `app/[slug]/page.tsx` for service pages, `app/blog/page.tsx` for blog index, `app/blog/f/[slug]/page.tsx` for individual articles).
- Deploy target: Cloudflare Workers Static Assets (account ID `86a92d3f5ed4b3313381515ca4208ae7`).

## Component Model
| Component | Location | Responsibility |
|---|---|---|
| `Header` | `components/site.tsx` | Navigation links + Request-a-review CTA |
| `Footer` | `components/site.tsx` | Brand summary + footer nav + legal link |
| `PageHero` | `components/site.tsx` | Eyebrow, title, intro for any page |
| `SectionList` | `components/site.tsx` | Renders sections with headings, paragraphs, bullet lists |
| `Cta` | `components/site.tsx` | Call-to-action banner at page bottom |

Each service page maps to a data object in `servicePages` containing: `eyebrow`, `title`, `intro`, `sections[]`, and optional `cta` text.

## Content Model
### Service Pages
```typescript
type Section = { heading: string; body?: string; bullets?: string[] };
type ServicePage = {
  slug: string; eyebrow: string; title: string; intro: string;
  sections: Section[]; cta?: string;
};
```

### Blog Posts
Source file: `content/blog.json` (exported from GoDaddy editor via window._BLOG_DATA). Each post has: `slug`, `title`, `description`, `date`, `image`, `source`, `blocks[]`. Block types: `unstyled`, `header-two`, `header-three`, `header-four`, `unordered-list-item`, `ordered-list-item`, `blockquote`.

### Adding new content
1. Add a new object to `servicePages` in `lib/content.ts` with matching slug for routing.
2. For blog posts, add entries to `content/blog.json` following the existing block structure.
3. Run `npm run build` — static params detect all slugs automatically.

## Styling Approach
- Tailwind CSS v4 via `@tailwindcss/postcss` and Vite PostCSS plugin.
- Global styles live in `app/globals.css` with CSS custom properties for color tokens.
- Utility-first classes applied directly in JSX components.

## SEO & Analytics
- `Metadata` objects on every route set `title`, `description`, `openGraph` fields.
- GA4 measurement ID `G-T6WJ6JJ992` will be injected in `<head>` via the root layout.
- `sitemap.xml` dynamically includes all service-page slugs and blog-post URLs.
- `robots.txt` allows all user-agents.

## Deployment Flow
1. Push to main branch → CI triggers build.
2. `vinext build` produces Worker bundle + static assets.
3. `cf deploy` publishes to Cloudflare Workers Static Assets environment.
4. DNS A/AAAA record at GoDaddy points to `dwaiconsulting.com.cdn.cloudflarecard.com` (existing configuration).
5. Verification: visit each route, check prerender counts match expected totals.

## Transition Plan
- New site deploys first without changing DNS.
- Existing GoDaddy site remains live at `dwaiconsulting.com` until verification passes.
- Once confirmed: update GoDaddy domain's nameservers or web-forward to point to Cloudflare.
- Owner transfers eventual Cloudflare ownership when ready.
