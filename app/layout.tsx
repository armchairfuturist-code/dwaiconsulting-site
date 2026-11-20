import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Footer, Header } from "../components/site";
import { MotionRoot } from "../components/motion";
import { BUSINESS, SITE_URL } from "../lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "DWAI Consulting | Small Business Benefits Guidance", template: "%s | DWAI Consulting" },
  description: "Practical health insurance, employee benefits, level-funded plan, and owner protection guidance for small businesses.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "DWAI Consulting", title: "DWAI Consulting | Small Business Benefits Guidance", description: "Practical benefits guidance for owner-led businesses.", images: [{ url: "/dwai3.jpg", width: 870, height: 574, alt: "DWAI Consulting" }] },
  twitter: { card: "summary_large_image", title: "DWAI Consulting | Small Business Benefits Guidance", description: "Practical benefits guidance for owner-led businesses.", images: ["/dwai3.jpg"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,500;9..144,600&display=swap"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-T6WJ6JJ992');
          `}
        </Script>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-T6WJ6JJ992`}
          strategy="afterInteractive"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: BUSINESS.name,
              legalName: BUSINESS.legalName,
              url: SITE_URL,
              description: BUSINESS.description,
              email: BUSINESS.email,
              telephone: BUSINESS.phone,
              address: { "@type": "PostalAddress", addressLocality: BUSINESS.city, addressRegion: BUSINESS.region, addressCountry: BUSINESS.country },
              contactPoint: { "@type": "ContactPoint", telephone: BUSINESS.phone, email: BUSINESS.email, contactType: "sales", areaServed: "US", availableLanguage: "English" },
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: "if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MotionRoot />
      </body>
    </html>
  );
}
