// Single source of truth for the site origin.
// Preview builds pass SITE_URL (see scripts/deploy.sh) so canonicals self-reference
// the deployed host; the production build falls back to the live domain, so the DNS
// cutover needs no code change.
declare const __SITE_URL__: string;
export const SITE_URL: string = __SITE_URL__;

export const BUSINESS = {
  name: "DWAI Consulting",
  legalName: "DWAI Consulting, LLC",
  email: "steve@dwaiconsulting.com",
  phone: "+1-773-203-6104",
  phoneDisplay: "773-203-6104",
  city: "Sioux Falls",
  region: "SD",
  country: "US",
  description:
    "Health insurance, employee benefits, level-funded plan, and buy-sell planning guidance for owner-led businesses with ten or more employees.",
} as const;
