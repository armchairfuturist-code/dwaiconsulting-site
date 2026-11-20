import { SITE_URL } from "../lib/site";
import type { MetadataRoute } from "next";
import { blogPosts, servicePages } from "../lib/content";
export default function sitemap(): MetadataRoute.Sitemap { const base = SITE_URL; const pages = ["", ...Object.keys(servicePages), "blog"].map((path) => ({ url: `${base}/${path}`, lastModified: new Date() })); const posts = blogPosts.map((post) => ({ url: `${base}/blog/f/${post.slug}`, lastModified: new Date(`${post.date}T12:00:00`) })); return [...pages, ...posts]; }
