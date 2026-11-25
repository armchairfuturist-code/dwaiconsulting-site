# How to Edit the DWAI Website

Steve (Chrixander), here's how to make changes to the website.

## Quick Summary

1. Go to GitHub → open `content/blog/` folder
2. Click on any `.md` file (like `benefits-us-workers-expect-vs-global-norms.md`)
3. Click the pencil icon (edit)
4. Make your changes
5. Scroll down and click **Commit changes**
6. Wait about a minute for the site to rebuild

That's it. No commands, no tools needed.

## What You Can Edit

### Blog Posts (`content/blog/*.md`)
Each blog post is one markdown file. To edit:
- Change the text between the title and closing `---` for metadata (title, date, image URL)
- Edit anything below the second `---` — that's the article body
- Use standard markdown formatting: `# Heading`, `- bullet list`, `1. numbered list`, `> quote`

### Add New Posts
1. Copy an existing `.md` file in `content/blog/`
2. Rename it to a URL-friendly name (e.g., `new-health-insurance-guide.md`)
3. Update the frontmatter at the top (title, date, etc.)
4. Write your article below the `---` separator

### Service Pages (Advanced)
Service page content lives in `lib/content.ts`. This requires more careful editing. Contact me if you need changes here.

## Automatic Processes

When you save changes to markdown files:
- The site automatically converts them to JSON format (`blog.json`)
- Builds the website
- Deploys to Cloudflare Workers (about a minute)
- Your changes appear live at `https://dwaiconsulting-site.armchairfuturist.workers.dev`

No manual steps required. Just commit the markdown file.

## Important Notes

- Do not edit `content/blog.json` directly — it gets overwritten automatically
- All markdown files are lossless round-trips with the JSON
- The repo owner is `armchairfuturist-code`, but you have write access as collaborator
- Changes go to the `main` branch automatically when you commit via GitHub web UI

## Troubleshooting

If changes don't appear after a few minutes:
1. Check GitHub Actions tab for any error messages
2. Verify you saved the commit (not just the preview)
3. Each build takes about a minute; re-check the Actions tab

For problems beyond markdown editing, let me know immediately.
