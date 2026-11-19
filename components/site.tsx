import Link from "next/link";
import type { ReactNode } from "react";
import type { Section } from "../lib/content";

const nav = [["Level-Funded", "/level-funded"], ["Benefits", "/benefits"], ["Buy-Sell", "/buy-sell-1"], ["Insights", "/blog"], ["About", "/about"]] as const;

export function Header() { return <header className="site-header"><div className="shell header-inner"><Link className="brand" href="/" aria-label="DWAI Consulting home"><img src="/dwai3.jpg" alt="DWAI Consulting" /></Link><nav className="main-nav" aria-label="Main navigation">{nav.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</nav><Link className="button button-small" href="/#review">Get a review</Link></div></header>; }

export function Footer() { return <footer className="site-footer"><div className="shell footer-grid"><div><Link className="brand brand-footer" href="/"><img src="/dwai3.jpg" alt="DWAI Consulting" /></Link><p>Practical benefits guidance for owner-led businesses.</p></div><div><p className="footer-label">Explore</p><Link href="/level-funded">Level-funded plans</Link><Link href="/benefits">Employee benefits</Link><Link href="/buy-sell-1">Buy-sell planning</Link><Link href="/blog">Benefits insights</Link></div><div><p className="footer-label">Contact</p><a href="mailto:steve@dwaiconsulting.com">steve@dwaiconsulting.com</a><p>Based in Illinois.<br />Serving clients nationwide.</p></div></div><div className="shell footer-bottom"><span>© {new Date().getFullYear()} DWAI Consulting, LLC</span><Link href="/privacy-and-terms">Privacy and terms</Link></div></footer>; }

export function Cta({ children = "Start with a structured review" }: { children?: ReactNode }) { return <section className="cta-band" id="review"><div><p className="eyebrow">Make the next decision clearer</p><h2>More than a quote spreadsheet.</h2><p>Review your current plan, your workforce, and your options before renewal pressure takes over.</p></div><a className="button button-light" href="mailto:steve@dwaiconsulting.com?subject=Benefits%20review%20request">{children}</a></section>; }

export function SectionList({ sections }: { sections: Section[] }) { return <div className="section-list">{sections.map((section) => <section className="content-section" key={section.heading}><h2>{section.heading}</h2>{section.body && <p>{section.body}</p>}{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</section>)}</div>; }

export function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) { return <div className="page-hero"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="hero-intro">{intro}</p></div>; }
