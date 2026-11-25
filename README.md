# DWAI Consulting site

Site for DWAI Consulting: employee benefits guidance for owner-led companies.
Static pages rendered by vinext and served from a Cloudflare Worker.

Live: https://dwaiconsulting-site.armchairfuturist.workers.dev

## Stack

- **vinext** on Vite, React 19, with the Cloudflare Vite plugin. The build emits a
  Worker bundle plus static assets into `.cloudflare/output`.
- **Tailwind CSS v4** via `@tailwindcss/postcss`, used only for its preflight. The
  design system is hand-written CSS in `app/globals.css`.
- **Fraunces** and **DM Sans** from Google Fonts.

## Scripts

Run everything with `npm` (the repo pins `npm@12.2.3`).

- `npm run dev` starts the vinext dev server.
- `npm run build` builds the Cloudflare Worker output.
- `npm run start` previews the built Worker locally.
- `npm run deploy` builds and deploys the Worker. See below.
- `npm run lint:design` lints `DESIGN.md` against the design-token schema.

## Design system

`DESIGN.md` is the spec: palette, type scale, spacing, shapes, motion. The values
there mirror the custom properties at the top of `app/globals.css`. There is no
generator between the two, so **change both together** or the spec drifts from the
site. `npm run lint:design` catches schema errors in the spec, not drift from the
stylesheet.

Rules that are easy to break by accident:

- Three body sizes only: `--text-body` (1.0625rem), `--text-sm` (0.875rem), and
  `--text-display` for headlines. Nothing else.
- One accent, `--accent`. It marks structure and hover; it never fills a block.
- Structure comes from hairlines and space. Do not nest a bordered card inside a
  bordered card.
- No uppercase kickers or eyebrows above headings.
- Animate `transform` and `opacity` only, and respect `prefers-reduced-motion`.

## Deploy

Deploy is manual and goes straight to the Worker.

```bash
npm run deploy
```

`scripts/deploy.sh` builds, stages the bundle and assets into `.deploy`, and runs
`wrangler deploy`. It is a script rather than a plain `wrangler` call because
`wrangler` refuses to run beside `.cloudflare/output`.

The script sets `SITE_URL` to the workers.dev origin by default, so canonical links
match the preview host. For a cutover to the real domain, override it:

```bash
SITE_URL=https://dwaiconsulting.com npm run deploy
```

There is no CI workflow. Pushing to `main` does not deploy.

## Contact form

The form on every page posts to `POST /api/contact`, which validates with
`lib/contact.ts` and sends the lead through Resend.

Set the API key once per Worker (it is a secret, not a var):

```bash
mkdir -p /tmp/dwai && cd /tmp/dwai
npx wrangler secret put RESEND_API_KEY --name dwaiconsulting-site
```

`CONTACT_TO` and `CONTACT_FROM` are set in `scripts/deploy.sh`. Without
`RESEND_API_KEY` the route answers 503 and the form tells the visitor to email or
call. It never pretends to have accepted a lead.

## Layout

```text
app/            routes, layout, globals.css
components/     header, footer, contact form, cost gap table, motion helpers
lib/            content, site config, contact validation
public/         favicon and the intake checklist CSV
scripts/        deploy.sh
DESIGN.md       design system spec
```
