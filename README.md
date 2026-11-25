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

## Editing content

Blog articles are markdown in `content/blog/`. `content/blog.json` is generated
from them at build time (`npm run content:build`) and checked in CI
(`npm run content:check`), so the two cannot drift. `npm run content:export`
regenerates the markdown from the JSON. See `EDIT-GUIDE.md`, which is written for
Steve and for his agent.

## Deploy

The normal path is a push. `.github/workflows/deploy.yml` builds and deploys on
every push to `main`, in about a minute. It needs the repo secret
`CLOUDFLARE_API_TOKEN` for account `86a92d3f5ed4b3313381515ca4208ae7`.

That secret holds an account-owned token named `dwaiconsulting-ci`, which carries
the *Edit Cloudflare Workers* template: Workers Scripts Read and Write, Workers KV
Storage Write, Account Settings Read, Workers Routes Write, Workers Tail Read,
Workers R2 Storage Write, Pages Write, Workers CI Write, CF Agents Write, Workers
Observability Write, Workers Containers Write. It does not expire.

To replace it, create a fresh token in the dashboard under **Manage Account ->
API Tokens -> Create Token -> Edit Cloudflare Workers**, then:

```bash
tr -d '\n' < token.txt | gh secret set CLOUDFLARE_API_TOKEN -R armchairfuturist-code/dwaiconsulting-site
```

The value is shown once and cannot be read back. `wrangler`'s OAuth session can
push a deploy from this machine, but it cannot mint an API token, and it expires;
the repo secret does not.

Before this secret existed the workflow printed a warning and skipped the deploy
while still reporting success, so pushes looked healthy but never shipped. The
workflow still skips rather than fails when the secret is missing. Check the run
log for `Deployed dwaiconsulting-site` and a `Current Version ID`, not just a green
tick.

To deploy by hand from this machine:

```bash
npm run deploy
```

`scripts/deploy.sh` builds, stages the bundle and assets into `.deploy`, and runs
`wrangler deploy`. It is a script rather than a plain `wrangler` call because
`wrangler` refuses to run beside `.cloudflare/output`. `SKIP_BUILD=1` reuses an
existing build. The staging directory is recreated on each run and removed on
exit; if a run is killed it can be left behind, and it is safe to delete.

Its default `SITE_URL` is the temporary workers.dev origin, so canonical links
match the host that serves them. For the `dwaiconsulting.com` cutover, set
`SITE_URL=https://dwaiconsulting.com`.

Cloudflare Workers Builds was considered and is not in use. It would need the
Cloudflare GitHub App installed on the repository, which was not done. Do not
follow that path unless you also delete the workflow, or both will fire.

Its default `SITE_URL` is the temporary workers.dev origin, so canonical links
match the host that serves them. For the `dwaiconsulting.com` cutover, set
`SITE_URL=https://dwaiconsulting.com`.

## Contact form

The form on every page posts to `POST /api/contact`, which validates with
`lib/contact.ts` and sends the lead through Resend.

Set the API key once per Worker (it is a secret, not a var). Run this from the
repository root:

```bash
npx wrangler secret put RESEND_API_KEY --name dwaiconsulting-site
```

No worker secrets are set at the moment, so the contact form is not delivering
mail yet. The route answers 503 and the page tells the visitor to email or call,
which is the intended failure. Setting this key is the last step before the
contact form takes leads.

`CONTACT_TO` and `CONTACT_FROM` are set in `scripts/deploy.sh`. Without
`RESEND_API_KEY` the route answers 503 and the form tells the visitor to email or
call. It never pretends to have accepted a lead.

## Layout

```text
app/            routes, layout, globals.css
components/     header, footer, contact form, cost gap table, motion helpers
lib/            content, site config, contact validation
public/         favicon and the intake checklist CSV
scripts/        deploy.sh, content.mjs
DESIGN.md       design system spec
EDIT-GUIDE.md   how Steve edits the site, no tools needed
```

---

# What the rebuild covers

A plain-English summary of what this site does that the GoDaddy site could not.
Written for Steve and for any agent that has to change the site later.

## 1. Hosting: GoDaddy to Cloudflare

| Old (GoDaddy) | New (Cloudflare) |
| --- | --- |
| ~ $600 / year | Free, charges only if traffic spikes past the free tier |
| Managed entirely by GoDaddy | Every credential is yours, no vendor lock-in |
| Hard to change anything | Push a change and it is live in about a minute |
| Pages rendered by their builder | Static HTML served from the edge |

The domain stays registered with GoDaddy. Only hosting moves.

## 2. Speed

Measured on a realistic mobile connection:

| Metric | Old site | New site | Improvement |
| --- | --- | --- | --- |
| HTML downloaded | 136 kB | 33 kB | 2x less data |
| Time to first byte | 241 ms | 115 ms | 2x faster |
| Total time to visible content | 330 ms | 116 ms | ~3x faster |

The new site shows text before half of it has downloaded.

## 3. Contact form

The GoDaddy site had a contact form on 9 of 11 pages. This one rebuilt the same
fields and improved them: name, email, phone, company, employee count range,
renewal month, notes.

- **Intake checklist.** A downloadable CSV template sits next to the form, so clients can prepare their employee census data first.
- **Spam protection.** A hidden honeypot field stops automated submissions; visitors never see it.
- **Validation before sending.** Bad emails and missing required fields get highlighted inline.
- **Delivery.** Each submission reaches steve@dwaiconsulting.com. The subject line names the company, employee range and renewal month.
- **Fallback.** If Resend is unreachable the route answers 503 and the form tells the visitor to email or call. It never silently swallows a lead.

The form appears on every service page and on the blog index. See the contact
section above for the `RESEND_API_KEY` requirement.

## 4. Search engine optimisation

| Element | Before | Now |
| --- | --- | --- |
| Canonical URLs | Pointed at GoDaddy's domain | Self-referencing, one per page |
| robots.txt | Hidden behind GoDaddy | `app/robots.ts`, allows all crawlers |
| Sitemap | Generated by GoDaddy | `app/sitemap.ts`, 53 URLs |
| Structured data | None visible | Organization, FAQPage, Article |
| Titles and descriptions | GoDaddy templates | One sentence per page, written for searcher intent |

Once DNS points at Cloudflare these signals become authoritative.

## 5. Content

39 articles under `content/blog/`, about 44,000 words. Each is a full page with
heading hierarchy, lists, blockquotes and paragraph structure. The blog index
shows one featured post plus 38 cards.

Markdown is the source. `scripts/content.mjs` generates `content/blog.json`, and
CI runs `node scripts/content.mjs check` to fail the build when the two drift.

## 6. Accessibility

Every route passes basic accessibility checks: keyboard tabbing reaches every
link, field and button; every input has an associated label; a skip-to-content
link bypasses the menu; heading order runs h1 to h2 to h3 without gaps; images
carry alt text; no meaning depends on colour alone.

## 7. Analytics

Google Analytics `G-T6WJ6JJ992` loads unchanged in `app/layout.tsx`, the same ID
the GoDaddy pages used.

## 8. AI-agent readiness

- `robots.txt` allows all bots (`Allow: /`).
- Real content is in the HTML response, not only in JavaScript.
- Structured headings, list items, and answer capsules (a question followed by a direct answer).
- The FAQ sections on `/level-funded` and `/buy-sell-1` give crawlers answers they can cite.
- No `noindex` on money pages.

## 9. Deploying

Pushes to `main` build and deploy through GitHub Actions, and the Cloudflare API
token lives in the repo secret `CLOUDFLARE_API_TOKEN`. Pointing
dwaiconsulting.com at the site needs one DNS record change at GoDaddy; no code
change.

## 10. Who can change what

The repository is public and `main` is unprotected, so a collaborator commits and
publishes with no review step. Steve (`Chrixander`) is a collaborator with **write**
access and can push to `main` directly.

Write is also the ceiling here. On a repository owned by a personal account,
GitHub refuses to grant `admin` or `maintain` to an outside collaborator, so Steve
cannot install GitHub Apps on the repository or change its settings. Anything
needing admin is done by the owner (`armchairfuturist-code`). This is why
deployment runs from a repo secret rather than from Cloudflare's Git integration.

Still open: set `RESEND_API_KEY` so the contact form delivers. No worker secret is
set today.

