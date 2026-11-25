#!/usr/bin/env node
// Blog content, both directions.
//
//   node scripts/content.mjs export   blog.json -> content/blog/*.md
//   node scripts/content.mjs build    content/blog/*.md -> blog.json
//
// Markdown is the source a human edits. blog.json is the generated artifact the
// app imports, so the build regenerates it before vite runs. `export` exists so
// the markdown and the JSON cannot drift: run it, then `build`, then confirm
// blog.json is unchanged.
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const JSON_PATH = join(ROOT, "content/blog.json");
const MD_DIR = join(ROOT, "content/blog");

const HEADING = { "header-two": "## ", "header-three": "### ", "header-four": "#### ", "header-five": "##### ", "header-six": "###### " };

// A plain paragraph that starts with a markdown marker would come back as a
// heading or a list. Escape the first character so the round trip is lossless.
const MARKER = /^(#{1,6} |[-*+] |> |\d+\. )/;
const escapeText = (text) => text.replace(MARKER, (m) => "\\" + m);
const indent = (s, n) => s.split("\n").map((line, i) => (i ? " ".repeat(n) + line : line)).join("\n");
const unescapeText = (text) => text.replace(/^\\(#{1,6} |[-*+] |> |\d+\. )/, (m) => m.slice(1));

function toMarkdown(post) {
  const front = [
    "---",
    `title: ${JSON.stringify(post.title)}`,
    `description: ${JSON.stringify(post.description)}`,
    `date: ${post.date}`,
    `image: ${JSON.stringify(post.image ?? "")}`,
    `source: ${JSON.stringify(post.source ?? "")}`,
    `order: ${post.order ?? 0}`,
    "---",
    "",
    "",
  ].join("\n");

  let n = 0;
  const body = post.blocks.map((block) => {
    // Numbered markers restart at each run, like the reader expects.
    if (block.type === "ordered-list-item") n += 1;
    else n = 0;
    // A list item whose text wraps keeps the break, indented so markdown reads
    // it as one item and the parser can join it back.
    if (block.type === "unordered-list-item") return indent("- " + escapeText(block.text), 2);
    if (block.type === "ordered-list-item") return indent(`${n}. ` + escapeText(block.text), 3);
    if (block.type === "blockquote") return indent("> " + escapeText(block.text), 2);
    const head = HEADING[block.type];
    if (head) return head + block.text;
    return escapeText(block.text);
  });

  // Blocks are separated by a blank line. Consecutive list items of the same
  // kind stay in one run so the reader sees a real list, not loose lines.
  const out = [];
  for (const chunk of body) {
    const prev = out[out.length - 1];
    const isList = (s) => s && /^(- |1\. )/.test(s);
    if (isList(chunk) && isList(prev) && chunk.slice(0, 2) === prev.slice(0, 2)) out.push(chunk);
    else { if (out.length) out.push(""); out.push(chunk); }
  }
  return front + out.join("\n") + "\n";
}

function parseFront(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error("missing frontmatter");
  const meta = {};
  for (const line of m[1].split("\n")) {
    if (!line.trim()) continue;
    const at = line.indexOf(":");
    const key = line.slice(0, at).trim();
    let value = line.slice(at + 1).trim();
    if (value.startsWith('"')) value = JSON.parse(value);
    meta[key] = value;
  }
  return { meta, body: m[2] };
}

function fromMarkdown(raw, slug) {
  const { meta, body } = parseFront(raw);
  const blocks = [];
  for (const chunk of body.split(/\n\s*\n/)) {
    const text = chunk.replace(/^\n+|\n+$/g, "");
    if (!text.trim()) continue;
    const lines = text.split("\n");
    const push = (type, t) => blocks.push({ type, text: unescapeText(t) });
    if (/^###### /.test(lines[0])) { lines.map((l) => l.replace(/^###### /, "")).forEach((t) => push("header-six", t)); continue; }
    if (/^##### /.test(lines[0])) { lines.map((l) => l.replace(/^##### /, "")).forEach((t) => push("header-five", t)); continue; }
    if (/^#### /.test(lines[0])) { lines.map((l) => l.replace(/^#### /, "")).forEach((t) => push("header-four", t)); continue; }
    if (/^### /.test(lines[0])) { lines.map((l) => l.replace(/^### /, "")).forEach((t) => push("header-three", t)); continue; }
    if (/^## /.test(lines[0])) { lines.map((l) => l.replace(/^## /, "")).forEach((t) => push("header-two", t)); continue; }
    const items = (prefix, type) => {
      const out = [];
      for (const line of lines) {
        if (line.startsWith(prefix)) out.push(unescapeText(line.slice(prefix.length)));
        else if (out.length) out[out.length - 1] += "\n" + line.replace(/^ {2}/, "");
      }
      out.forEach((t) => blocks.push({ type, text: t }));
    };
    if (/^- /.test(lines[0])) { items("- ", "unordered-list-item"); continue; }
    if (/^\d+\. /.test(lines[0])) {
      const out = [];
      for (const line of lines) {
        const m = line.match(/^\d+\. (.*)$/);
        if (m) out.push(unescapeText(m[1]));
        else if (out.length) out[out.length - 1] += "\n" + line.replace(/^ {3}/, "");
      }
      out.forEach((t) => blocks.push({ type: "ordered-list-item", text: t }));
      continue;
    }
    if (/^> /.test(lines[0])) { items("> ", "blockquote"); continue; }
    push("unstyled", text);
  }
  return {
    slug,
    title: meta.title ?? "",
    description: meta.description ?? "",
    date: meta.date ?? "",
    image: meta.image ?? "",
    source: meta.source ?? "",
    order: Number(meta.order ?? 0),
    blocks,
  };
}

const mode = process.argv[2];

// `check` proves the committed blog.json equals what the markdown produces.
// CI runs it, so a stale artifact fails loudly instead of shipping old copy.
if (mode === "check") {
  const files = readdirSync(MD_DIR).filter((f) => f.endsWith(".md")).sort();
  const rebuilt = files.map((file) => fromMarkdown(readFileSync(join(MD_DIR, file), "utf8"), file.replace(/\.md$/, "")));
  rebuilt.sort((a, b) => a.order - b.order);
  const expected = JSON.stringify(rebuilt.map(({ order, ...rest }) => rest), null, 2);
  const actual = readFileSync(JSON_PATH, "utf8");
  if (expected !== actual) {
    console.error("content/blog.json is out of date. Run: npm run content:build");
    process.exit(1);
  }
  console.log(`content check passed (${rebuilt.length} posts)`);
  process.exit(0);
}

if (mode === "export") {
  const posts = JSON.parse(readFileSync(JSON_PATH, "utf8"));
  mkdirSync(MD_DIR, { recursive: true });
  posts.forEach((post, i) => {
    writeFileSync(join(MD_DIR, `${post.slug}.md`), toMarkdown({ ...post, order: i }));
  });
  console.log(`exported ${posts.length} posts to content/blog/`);
} else if (mode === "build") {
  const files = readdirSync(MD_DIR).filter((f) => f.endsWith(".md")).sort();
  const posts = files.map((file) => fromMarkdown(readFileSync(join(MD_DIR, file), "utf8"), file.replace(/\.md$/, "")));
  posts.sort((a, b) => a.order - b.order);
  const clean = posts.map(({ order, ...rest }) => rest);
  writeFileSync(JSON_PATH, JSON.stringify(clean, null, 2));
  console.log(`built ${clean.length} posts into content/blog.json`);
} else {
  console.error("usage: node scripts/content.mjs export|build");
  process.exit(1);
}
