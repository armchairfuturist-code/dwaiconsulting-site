import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cta, PageHero, SectionList } from "../../components/site";
import { servicePages } from "../../lib/content";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return Object.keys(servicePages).map((slug) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const page = servicePages[(await params).slug]; return page ? { title: page.title, description: page.intro } : {}; }
export default async function ContentPage({ params }: Props) { const page = servicePages[(await params).slug]; if (!page) notFound(); return <><div className="shell"><PageHero eyebrow={page.eyebrow} title={page.title} intro={page.intro} /><div className="page-layout"><article><SectionList sections={page.sections} /></article><aside className="side-note"><p className="eyebrow">A practical starting point</p><p>Every business has a different workforce, budget, and risk profile. Start with the facts that matter to yours.</p><a className="text-link" href="mailto:steve@dwaiconsulting.com?subject=DWAI%20Consulting%20review">Talk with Steve <span>→</span></a></aside></div><Cta>{page.cta ?? "Start with a structured review"}</Cta></div></>;
}
