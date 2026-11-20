import Link from "next/link";
import { Cta } from "../components/site";
import { CostGap } from "../components/cost-gap";

const reviewPoints = ["Current plan costs and renewal increases", "Employee contributions, networks, and plan design", "Level-funded options when they fit", "Owner protection and business continuity"];
const audiences = [["Technology firms", "/tech-firms", "Compete for talent without overspending."], ["Contractors and trades", "/trades", "Build benefits around field-based teams."], ["Owner-led businesses", "/about", "Make decisions with the whole business in view."]];

export default function Home() {
  return <>
    <section className="editorial-hero grain"><div className="shell editorial-hero-inner"><div className="hero-kicker">Independent benefits guidance for Illinois and nationwide teams</div><h1>Make benefits work harder for your business.</h1><p className="hero-intro">DWAI helps owner-led companies make confident decisions about health insurance, employee benefits, and long-term protection.</p><div className="hero-actions"><Link className="button" href="/#review">Start with a review</Link><Link className="text-link" href="#approach">See how we work</Link></div><div className="hero-proof"><p>Clear advice for the decision in front of you, not a sales pitch for the next plan.</p></div></div></section>
    <section className="approach-section" id="approach"><div className="shell approach-inner"><div className="approach-meta"><span>What a review covers</span></div><div className="approach-copy"><h2>A useful review makes the tradeoffs visible.</h2><p>We look at cost, employee experience, risk, and long-term fit together. That gives you a better basis for the decision ahead.</p></div><ul className="review-list">{reviewPoints.map((point, index) => <li key={point}><strong>{point}</strong></li>)}</ul></div></section>
    <section className="fit-section" id="fit"><div className="shell"><div className="fit-heading"><h2>Clear guidance for owner-led businesses.</h2></div><div className="audience-grid">{audiences.map(([title, href, body], index) => <Link className="audience-card" href={href} key={href}><h3>{title}</h3><p>{body}</p></Link>)}</div></div></section>
    <CostGap />
    <div className="shell"><Cta /></div>
  </>;
}
