import type { MetadataRoute } from "next";
import { blogPosts, servicePages } from "../lib/content";
export default function sitemap(): MetadataRoute.Sitemap { const base = "https://dwaiconsulting.com"; const pages = ["", ...Object.keys(servicePages), "blog"].map((path) => ({ url: `${base}/${path}`, lastModified: new Date() })); const posts = blogPosts.map((post) => ({ url: `${base}/blog/f/${post.slug}`, lastModified: new Date(`${post.date}T12:00:00`) })); return [...pages, ...posts]; }
