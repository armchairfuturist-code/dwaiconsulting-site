# vinext app

This project was created with create-vinext-app.

## Scripts

- `pnpm run dev` starts the vinext dev server.
- `pnpm run build` builds the Cloudflare Worker output.
- `pnpm run start` previews the built Worker locally.
- `pnpm run deploy` deploys the Cloudflare Worker.


## Contact form

The form on every page posts to `POST /api/contact`, which validates with `lib/contact.ts`
and sends the lead through Resend.

Set the API key once per Worker (it is a secret, not a var):

```bash
mkdir -p /tmp/dwai && cd /tmp/dwai
npx wrangler secret put RESEND_API_KEY --name dwaiconsulting-site
```

`CONTACT_TO` and `CONTACT_FROM` are set in `scripts/deploy.sh`. Without `RESEND_API_KEY`
the route answers 503 and the form tells the visitor to email or call. It never pretends
to have accepted a lead.
