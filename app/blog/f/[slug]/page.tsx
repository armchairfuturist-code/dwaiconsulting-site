import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Cta } from "../../../../components/site";
import { getBlogPost, formatDate, blogPosts, type BlogBlock } from "../../../../lib/content";

type Props = { params: Promise<{ slug: string }> };

const SITE = "https://dwaiconsulting-site.armchairfuturist.workers.dev";

function renderBlocks(blocks: BlogBlock[]): ReactNode[] {
  const out: ReactNode[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;
  const flush = () => {
    if (!list) return;
    const items = list.items.map((text, i) => <li key={i}>{text}</li>);
    const key = `list-${out.length}`;
    out.push(list.ordered ? <ol key={key}>{items}</ol> : <ul key={key}>{items}</ul>);
    list = null;
  };
  blocks.forEach((block, i) => {
    const text = (block.text ?? "").trim();
    if (!text) return;
    if (block.type === "unordered-list-item" || block.type === "ordered-list-item") {
      const ordered = block.type === "ordered-list-item";
      if (list && list.ordered !== ordered) flush();
      if (!list) list = { ordered, items: [] };
      list.items.push(text);
      return;
    }
    flush();
    switch (block.type) {
      case "header-two": out.push(<h2 key={i}>{text}</h2>); break;
      case "header-three": out.push(<h3 key={i}>{text}</h3>); break;
      case "header-four": out.push(<h4 key={i}>{text}</h4>); break;
      case "header-five": out.push(<h5 key={i}>{text}</h5>); break;
      case "blockquote": out.push(<blockquote key={i}>{text}</blockquote>); break;
      default: out.push(<p key={i}>{text}</p>);
    }
  });
  flush();
  return out;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  const url = `${SITE}/blog/f/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/f/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.description, url, publishedTime: post.date, siteName: "DWAI Consulting" },
    twitter: { card: "summary_large_image", title: post.title, description: post.description },
  };
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  const body = renderBlocks(post.blocks);
  const words = post.blocks.reduce((n, b) => n + (b.text ?? "").split(/\s+/).filter(Boolean).length, 0);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: "DWAI Consulting" },
    publisher: { "@type": "Organization", name: "DWAI Consulting" },
    mainEntityOfPage: `${SITE}/blog/f/${post.slug}`,
  };
  return (
    <article className="article-shell">
      <div className="article-head">
        <Link className="article-back" href="/blog">← All insights</Link>
        <p className="hero-kicker">Executive benefits insights</p>
        <h1>{post.title}</h1>
        {post.description ? <p className="article-standfirst">{post.description}</p> : null}
        <p className="article-meta">
          <span>{formatDate(post.date)}</span>
          <span aria-hidden="true">·</span>
          <span>{Math.max(1, Math.round(words / 220))} min read</span>
        </p>
      </div>
      <div className="article-body">{body.length ? body : <p className="article-empty">This article is being restored from the original archive.</p>}</div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Cta />
    </article>
  );
}
