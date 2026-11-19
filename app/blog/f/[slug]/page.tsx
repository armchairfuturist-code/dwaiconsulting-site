import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Cta } from "../../../../components/site";
import { getBlogPost, formatDate } from "../../../../lib/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  return post ? { title: post.title, description: post.description } : {};
}

export function generateStaticParams() {
  const allPosts = require("../../../../content/blog.json");
  return allPosts.map((p: { slug: string }) => ({ slug: p.slug }));
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  return (
    <div className="shell">
      <Link href="/blog">← All insights</Link>
      <h1>{post.title}</h1>
      <p className="subtitle">{formatDate(post.date)}</p>
      <p>{post.description}</p>
      <Cta />
    </div>
  );
}
