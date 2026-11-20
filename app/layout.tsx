import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Footer, Header } from "../components/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://dwaiconsulting.com"),
  title: { default: "DWAI Consulting | Small Business Benefits Guidance", template: "%s | DWAI Consulting" },
  description: "Practical health insurance, employee benefits, level-funded plan, and owner protection guidance for small businesses.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "DWAI Consulting", title: "DWAI Consulting | Small Business Benefits Guidance", description: "Practical benefits guidance for owner-led businesses." },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,500;9..144,600&display=swap"
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
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
