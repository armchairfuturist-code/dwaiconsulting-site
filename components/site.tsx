import Link from "next/link";
import { ContactForm } from "./contact-form";
import { BUSINESS } from "../lib/site";
import type { ReactNode } from "react";
import type { Section } from "../lib/content";
import { MobileNav } from "./mobile-nav";

const nav = [["Level-Funded", "/level-funded"], ["Benefits", "/benefits"], ["Buy-Sell", "/buy-sell-1"], ["Insights", "/blog"], ["About", "/about"]] as const;

export function Header() { return <header className="site-header"><div className="shell header-inner"><Link className="brand" href="/" aria-label="DWAI Consulting home"><img src="/dwai3.jpg" alt="DWAI Consulting" width={870} height={574} /></Link><nav className="main-nav" aria-label="Main navigation">{nav.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</nav><a className="header-phone" href="tel:+1-773-203-6104">{BUSINESS.phoneDisplay}</a><Link className="button button-small header-cta" href="/#review">Get a review</Link><MobileNav /></div></header>; }

export function Footer() { return <footer className="site-footer"><div className="shell footer-grid"><div><Link className="brand brand-footer" href="/"><img src="/dwai3.jpg" alt="DWAI Consulting" width={870} height={574} /></Link><p>Practical benefits guidance for owner-led businesses.</p></div><div><p className="footer-label">Explore</p><Link href="/level-funded">Level-funded plans</Link><Link href="/benefits">Employee benefits</Link><Link href="/buy-sell-1">Buy-sell planning</Link><Link href="/first-health-plan-guide">First health plan guide</Link><Link href="/blog">Benefits insights</Link></div><div><p className="footer-label">Who we serve</p><Link href="/tech-firms">Technology firms</Link><Link href="/trades">Contractors and trades</Link><Link href="/texas-benefits">Texas businesses</Link><Link href="/illinois-benefits">Illinois businesses</Link></div><div><p className="footer-label">Contact</p><a href="mailto:steve@dwaiconsulting.com">steve@dwaiconsulting.com</a><a href="tel:+1-773-203-6104">{BUSINESS.phoneDisplay}</a><a href="https://wa.me/17732036104" rel="noopener noreferrer" target="_blank">WhatsApp</a><p>Sioux Falls, SD.<br />Serving clients nationwide.</p><div className="footer-social"><a href="https://www.linkedin.com/company/dwai-consulting" rel="noopener noreferrer" target="_blank" aria-label="DWAI Consulting on LinkedIn">LinkedIn</a><a href="https://www.facebook.com/427712543767688" rel="noopener noreferrer" target="_blank" aria-label="DWAI Consulting on Facebook">Facebook</a></div></div></div><div className="shell footer-bottom"><span>© {new Date().getFullYear()} DWAI Consulting, LLC</span><Link href="/privacy-and-terms">Privacy and terms</Link></div></footer>; }

export function Cta({ children = "Start with a structured review" }: { children?: ReactNode }) { return <section className="cta-band" id="review"><div><h2>More than a quote spreadsheet.</h2><p>Review your current plan, your workforce, and your options before renewal pressure takes over.</p></div><div><p>Call <a href="tel:+1-773-203-6104">773-203-6104</a> or email <a href="mailto:steve@dwaiconsulting.com">steve@dwaiconsulting.com</a>. {children}</p></div><div className="cta-contact"><ContactForm /></div></section>; }

export function SectionList({ sections }: { sections: Section[] }) { return <div className="section-list">{sections.map((section) => <section className="content-section" key={section.heading}><h2>{section.heading}</h2>{section.body && <p>{section.body}</p>}{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</section>)}</div>; }

export function PageHero({ title, intro }: { title: string; intro: string }) { return <div className="page-hero"><h1>{title}</h1><p className="hero-intro">{intro}</p></div>; }

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  if (!items.length) return null;
  return <section className="faq" aria-labelledby="faq-heading"><h2 id="faq-heading">Questions owners ask before they call.</h2><div className="faq-list">{items.map((item, i) => <details className="faq-item" key={item.q} open={i === 0}><summary><span className="faq-index">{String(i + 1).padStart(2, "0")}</span><span className="faq-q">{item.q}</span></summary><div className="faq-a"><p>{item.a}</p></div></details>)}</div></section>;
}
