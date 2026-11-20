import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cta, Faq, PageHero, SectionList } from "../../components/site";
import { faqs, servicePages } from "../../lib/content";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return Object.keys(servicePages).map((slug) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const page = servicePages[(await params).slug]; return page ? { title: page.title, description: page.intro, alternates: { canonical: `/${(await params).slug}` } } : {}; }
export default async function ContentPage({ params }: Props) { const page = servicePages[(await params).slug]; if (!page) notFound(); const faq = faqs[page.slug] ?? []; return <><div className="shell"><PageHero title={page.title} intro={page.intro} /><div className="page-layout"><article><SectionList sections={page.sections} /></article><aside className="side-note"><p>Every business has a different workforce, budget, and risk profile. Start with the facts that matter to yours.</p><a className="text-link" href="mailto:steve@dwaiconsulting.com?subject=DWAI%20Consulting%20review">Talk with Steve</a></aside></div>{faq.length > 0 && <Faq items={faq} />}<Cta>{page.cta ?? "Start with a structured review"}</Cta>{faq.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) }} />}</div></>;
}
