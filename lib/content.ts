import blogExport from "../content/blog.json";

export type Section = { heading: string; body?: string; bullets?: string[] };
export type ServicePage = { slug: string; eyebrow: string; title: string; intro: string; sections: Section[]; cta?: string };
export type BlogBlock = { type: string; text: string };
export type BlogPost = { slug: string; title: string; description: string; date: string; image: string; source: string; blocks: BlogBlock[] };

export const blogPosts = blogExport as BlogPost[];

const reviewSections: Section[] = [
  { heading: "A better renewal conversation", body: "A renewal is more than a new premium. We help owners understand what changed, what employees will experience, and whether the current plan still fits.", bullets: ["Current costs, renewal increases, and employer contributions", "Deductibles, copays, out-of-pocket limits, and plan design", "Provider networks, prescriptions, and employee impact", "Funding options and the practical tradeoffs of changing plans"] },
  { heading: "Benefits built for the business", body: "Health insurance is usually the largest benefit cost. Dental, vision, life, disability, and supplemental benefits may complete the package when they fit the company and employees." },
  { heading: "Owner protection belongs in the conversation", body: "Employee benefits are only part of a business continuity plan. We also help owners evaluate buy-sell funding, key person coverage, and business-owned life insurance strategies." },
];

export const servicePages: Record<string, ServicePage> = {
  "level-funded": {
    slug: "level-funded", eyebrow: "Funding strategy", title: "Level-funded health plans for growing businesses",
    intro: "Traditional fully insured plans may not always be the best fit. DWAI helps small businesses evaluate level-funded options based on cost, plan design, workforce demographics, participation, and renewal strategy.",
    sections: [
      { heading: "What level-funded means", body: "A level-funded plan combines a predictable monthly payment with claims funding, administrative costs, and stop-loss protection. It can feel like regular group insurance while offering a clearer view of how the plan performs." },
      { heading: "Who may be a good fit", body: "A review may be useful for businesses with rising renewals, stable participation, ten or more employees, or a workforce profile that insurers value. It is not right for every company.", bullets: ["Rising health insurance renewals", "Strong or improving employee participation", "A need to understand claims and renewal risk", "Owners willing to compare more than the headline premium"] },
      { heading: "A strategic evaluation", body: "We compare the funding approach, network, underwriting, employee costs, risk protection, and long-term fit before recommending a change. The goal is not to move plans simply to move plans." },
    ],
  },
  benefits: { slug: "benefits", eyebrow: "Employee benefits", title: "Employee benefits for small businesses", intro: "DWAI helps owner-led companies review benefit options without turning the process into a confusing quote exercise. The focus stays on cost, value, employee impact, and long-term fit.", sections: reviewSections },
  about: {
    slug: "about", eyebrow: "About DWAI Consulting", title: "Benefits guidance for businesses that need more than quotes", intro: "Based in Illinois and serving clients nationwide, DWAI helps small businesses review health insurance, employee benefits, level-funded options, and owner protection strategies.",
    sections: [
      { heading: "Practical guidance for owner-led companies", body: "Our goal is not to push every business into the same solution. We help owners understand their options, avoid unnecessary waste, and build a strategy that fits the company, the employees, and the people who own the business." },
      { heading: "A clear process", body: "We start with the business, workforce, budget, renewal timeline, and goals. Then we identify which options deserve attention and which do not.", bullets: ["Understand the current plan", "Identify the real decision", "Compare relevant options", "Make the next step easier to explain"] },
    ],
  },
  "buy-sell-1": {
    slug: "buy-sell-1", eyebrow: "Business continuity", title: "Buy-sell agreement funding for business owners", intro: "An unexpected death, disability, retirement, or departure can create uncertainty for owners and families. DWAI helps businesses evaluate funding strategies that support ownership continuity.",
    sections: [
      { heading: "What a buy-sell agreement does", body: "A buy-sell agreement establishes what happens to an ownership interest when an owner exits. It can define transition procedures, valuation methods, and the rights of the remaining owners." },
      { heading: "Common structures", body: "In a cross-purchase arrangement, surviving owners purchase the departing owner’s interest. In an entity-purchase arrangement, the business makes the purchase. The right structure depends on ownership, valuation, funding, and legal and tax advice.", bullets: ["Cross-purchase agreements", "Entity-purchase agreements", "Customized or hybrid approaches"] },
      { heading: "How life insurance can help", body: "Life insurance is commonly used to create liquidity when an owner dies. It may help fund a buyout, support surviving owners, and reduce financial disruption. Coverage must match the agreement and the business plan." },
    ],
  },
  "tech-firms": {
    slug: "tech-firms", eyebrow: "Industry focus", title: "Employee benefits for technology firms", intro: "Small technology firms need benefits that compete for talent without wasting money on plans that no longer fit. DWAI reviews health insurance, level-funded options, employee benefits, and owner protection strategies.",
    sections: [
      { heading: "Benefits are part of the talent conversation", body: "Employees may care about provider networks, payroll deductions, deductibles, prescriptions, and whether the plan feels competitive. Owners care about renewal increases, cash flow, and sustainable growth." },
      { heading: "When a deeper review may help", body: "A review may be useful for firms with rising renewals, ten or more employees, strong participation, remote or multi-location teams, or key people who are difficult to replace.", bullets: ["Review funding and renewal risk", "Evaluate network and employee costs", "Consider dental, vision, life, and disability", "Connect benefits with key person and buy-sell planning"] },
    ],
  },
  trades: {
    slug: "trades", eyebrow: "Industry focus", title: "Employee benefits for contractors and trades", intro: "Trade businesses need benefits that are practical, affordable, and built around how the company actually operates. DWAI helps contractors review health insurance, funding options, and owner protection.",
    sections: [
      { heading: "Field-based businesses have different needs", body: "Employees may work across job sites, have different income levels, or value different parts of the benefits package. Owners also balance hiring, retention, cash flow, and bids." },
      { heading: "What we review", body: "We look at renewal increases, employee contributions, plan design, participation, and whether the plan fits the workforce. Dental, vision, life, and disability benefits may also matter.", bullets: ["Field crews and multiple locations", "Competition for skilled workers", "Key owners, foremen, and project leaders", "A need to offer benefits without overspending"] },
    ],
  },
  "illinois-benefits": { slug: "illinois-benefits", eyebrow: "Illinois employers", title: "Illinois small business health and benefits guidance", intro: "DWAI helps Illinois employers review health insurance costs, level-funded options, employee benefits, and owner protection strategies. We also serve clients nationwide.", sections: [...reviewSections, { heading: "Built for Illinois owner-led businesses", body: "We work especially well with Illinois technology firms, trade businesses, professional firms, and privately held companies that need practical benefits guidance." }] },
  "texas-benefits": { slug: "texas-benefits", eyebrow: "Texas employers", title: "Texas small business health and benefits guidance", intro: "If your Texas business faces another renewal increase, the answer may not be a lower quote. DWAI helps owners review the plan, employees, network, contribution strategy, and funding approach.", sections: [...reviewSections, { heading: "Built for Texas owner-led businesses", body: "Our health insurance work is generally best suited for businesses with ten or more employees. We help technology firms, trade businesses, professional firms, and privately held companies make clearer renewal decisions." }] },
  "first-health-plan-guide": {
    slug: "first-health-plan-guide", eyebrow: "Resource", title: "First health plan starter guide", intro: "Before you ask for quotes, understand the decision you are about to make. This practical guide helps first-time employers think through budget, employee interest, contributions, setup, and broker selection.",
    sections: [
      { heading: "Why this guide exists", body: "Setting up a first health plan is a compensation, budgeting, employee satisfaction, and business-planning decision. Starting with rates can create weeks of comparison without answering the real question: what can the business afford to offer?" },
      { heading: "What you will learn", bullets: ["First-plan budgeting and contribution strategy", "Employee interest and participation questions", "Information needed for quoting and setup", "Broker selection and administrative expectations", "Cash-flow and implementation considerations"] },
      { heading: "What it does not include", body: "The guide is educational. It does not include custom quotes, plan recommendations, legal, tax, payroll, HR, or compliance advice, employee meetings, applications, or implementation." },
    ], cta: "Ask about the First Health Plan Starter Guide",
  },
  "free-cost-audit": {
    slug: "free-cost-audit", eyebrow: "Free resource", title: "Cut health insurance waste without cutting benefits", intro: "Get the free eBook and a complimentary, no-obligation cost audit of your current plan. The audit is not available to businesses with 100 or more employees.",
    sections: [
      { heading: "What you will learn", bullets: ["Why technology firms routinely overpay for coverage", "How to align plan costs with your workforce", "How to act before the next renewal", "How to look for savings without frustrating employees"] },
      { heading: "About the resource", body: "The eBook is written by Steve Wilson, President of DWAI Consulting. It is educational and does not guarantee savings, carrier approval, or a specific outcome." },
    ], cta: "Request the free eBook and cost audit",
  },
  "free-ebook-download": { slug: "free-ebook-download", eyebrow: "Free resource", title: "Access your free eBook", intro: "Cutting Health Insurance Waste: A Playbook for Tech Leaders helps small businesses learn how to reduce waste without cutting benefits.", sections: [{ heading: "A practical starting point", body: "Use the guide to understand plan costs, workforce fit, renewal decisions, and the questions worth asking before making a change." }], cta: "Request the free eBook" },
  "privacy-and-terms": {
    slug: "privacy-and-terms", eyebrow: "Legal", title: "Privacy policy, terms of use, and website disclaimer", intro: "This page explains the information DWAI collects, how it is used, and the terms that apply to this website.",
    sections: [
      { heading: "Information we collect", body: "We may collect information you voluntarily submit through website forms or direct communications. Please do not submit medical records, Social Security numbers, detailed health information, payroll records, or tax documents through a basic website form." },
      { heading: "How we use information", body: "We may use submitted information to respond to requests, communicate about services, evaluate fit, improve the website, analyze traffic, and meet legal or business obligations. We do not sell personal information." },
      { heading: "No professional advice", body: "Website information is general and educational. It is not legal, tax, accounting, human resources, compliance, financial, medical, or individualized insurance advice. Carrier materials and formal agreements control." },
      { heading: "No guarantee of results", body: "DWAI does not guarantee savings, pricing, underwriting, carrier approval, coverage, renewal results, tax results, compliance results, or any specific business outcome." },
    ],
  },
};

export function getBlogPost(slug: string) { return blogPosts.find((post) => post.slug === slug); }
export function formatDate(date: string) { return new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(new Date(`${date}T12:00:00`)); }
