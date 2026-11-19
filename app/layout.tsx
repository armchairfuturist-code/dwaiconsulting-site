import type { Metadata } from "next";
import "./globals.css";
import { Footer, Header } from "../components/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://dwaiconsulting.com"),
  title: { default: "DWAI Consulting | Small Business Benefits Guidance", template: "%s | DWAI Consulting" },
  description: "Practical health insurance, employee benefits, level-funded plan, and owner protection guidance for small businesses.",
  openGraph: { type: "website", siteName: "DWAI Consulting", title: "DWAI Consulting | Small Business Benefits Guidance", description: "Practical benefits guidance for owner-led businesses." },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Header /><main>{children}</main><Footer /></body></html>;
}
