#!/usr/bin/env bash
# Deploy the vinext build to Cloudflare Workers.
# `cf deploy` needs an API token this box does not have; wrangler refuses to run
# beside .cloudflare/output, so stage bundle+assets into a clean dir and deploy there.
set -euo pipefail
cd "$(dirname "$0")/.."
export CLOUDFLARE_ACCOUNT_ID="${CLOUDFLARE_ACCOUNT_ID:-86a92d3f5ed4b3313381515ca4208ae7}"

# Canonicals must name the host that serves them. Preview deploys self-reference the
# workers.dev origin; a cutover deploy sets SITE_URL=https://dwaiconsulting.com.
export SITE_URL="${SITE_URL:-https://dwaiconsulting-site.armchairfuturist.workers.dev}"
if [ "${SKIP_BUILD:-0}" = "1" ]; then
  echo "SKIP_BUILD=1 - reusing existing .cloudflare/output"
else
  echo "building with SITE_URL=$SITE_URL"
  npm run build
fi

SRC=.cloudflare/output/v1/workers/default
STAGE=.deploy
trap 'rm -rf "$STAGE"' EXIT
rm -rf "$STAGE"
mkdir -p "$STAGE"
cp -r "$SRC/bundle" "$STAGE/bundle"
cp -r "$SRC/assets" "$STAGE/assets"

cat > "$STAGE/wrangler.jsonc" <<'JSON'
{
  "name": "dwaiconsulting-site",
  "main": "bundle/index.js",
  "compatibility_date": "2026-11-19",
  "compatibility_flags": ["nodejs_compat"],
  "assets": {
    "directory": "assets",
    "binding": "ASSETS",
    "html_handling": "none",
    "not_found_handling": "none",
    "run_worker_first": ["/*", "!/_next/static/*", "!/*/_next/static/*"]
  },
  "workers_dev": true,
  "preview_urls": false,
  "observability": { "enabled": true },
  "vars": {
    "CONTACT_TO": "steve@dwaiconsulting.com",
    "CONTACT_FROM": "DWAI Website <website@dwaiconsulting.com>"
  }
}
JSON

cd "$STAGE"
npx --yes wrangler@4 deploy
