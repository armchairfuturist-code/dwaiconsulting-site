# Editing the website

Everything on this site is a text file in the GitHub repository. You change a file, save it, and the site rebuilds itself.

## The one rule

**Edit the markdown files in `content/blog/`. Never edit `content/blog.json`.**

The `.json` file is generated from the markdown when the site builds. If you edit it directly, your change is overwritten on the next build.

## Blog posts

Each article is one file in `content/blog/`, named after its address. For example `benefits-us-workers-expect-vs-global-norms.md` is served at `/blog/f/benefits-us-workers-expect-vs-global-norms`.

At the top, between the two `---` lines, is the information about the article:

```
---
title: "Benefits U.S. Workers Expect vs. Global Norms"
description: "The summary shown on the blog index and in search results."
date: 2025-06-05
image: "https://..."
source: "https://dwaiconsulting.com/blog/f/..."
order: 25
---
```

- `title` — the headline. Keep the quotes.
- `description` — the one or two sentences under the headline. Keep the quotes.
- `date` — `YYYY-MM-DD`.
- `image` — a picture address, or `""` for none.
- `source` — where the article came from originally. Leave it alone.
- `order` — controls the position on the blog page. Lower numbers come first. The first post is the large featured one.

Below the second `---` is the article itself, in plain markdown:

- `## Heading` or `#### Heading` makes a heading.
- `- item` makes a bullet.
- `1. item` makes a numbered item.
- `> text` makes a quote.
- A blank line starts a new paragraph.

To add a post, copy an existing file, rename it to the new address, and change the top matter. Give it a new `order` value.

## Page text

The service pages, the home page, and the FAQ answers live in `lib/content.ts`. This is code, so change only the words inside quotes. Do not touch braces, commas, or `import` lines.

## Making the change

1. Open the file on GitHub.
2. Click the pencil icon.
3. Change the text.
4. Scroll down and click **Commit changes**.
5. Wait about three minutes. The site rebuilds and the live page updates.

You can check progress under the **Actions** tab, or **Workers & Pages** in the Cloudflare dashboard.

## If you use an AI assistant

Point it at `content/blog/`. Tell it: edit the markdown file, keep the `---` block intact, do not touch `content/blog.json`.

## What not to edit

- `content/blog.json` — generated, overwritten on every build.
- `package.json`, `.github/`, `scripts/` — the build machinery.
- `content-source.json` — the original import. Nothing reads it.
