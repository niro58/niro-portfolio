# SEO Improvement + New Project Documentation — Design

**Date:** 2026-07-05
**Site:** https://www.nichita-r.com (static SvelteKit portfolio)
**Branch/worktree:** `worktree-seo-and-portfolio-docs`

## Summary

Two sequenced sub-projects delivered on one branch:

1. **SEO** — audit the live site with the `claude-seo` plugin, then implement the high/medium-value fixes in code and verify.
2. **New portfolio content** — scan `~/projects/`, get user approval on a shortlist, write accurate posts for the approved set (matching the newer structured voice), and generate + upload cover images.

The portfolio's "projects" are markdown posts in `src/content/posts/*.md`, rendered through `src/routes/blog/[post]/+page.svelte`. SEO metadata is produced by `src/lib/modules/seo.ts` (JSON-LD `WebSite`/`Article`/`Product`, `BreadcrumbList`, `FAQPage`, Open Graph, Twitter, canonical) with a `svelte-sitemap` postbuild step.

## Goals

- Measurably improve on-site + technical + GEO SEO for the existing pages, implemented (not just reported).
- Add curated, accurate, SEO-ready portfolio posts for undocumented projects.
- Ship cover images for new posts (and backfill the 3 in-flight posts with empty `coverImage`).

## Non-goals

- No unrelated refactoring of the site.
- No off-site SEO / link-building campaigns.
- No documenting throwaway experiments — the shortlist is curated and user-approved.

## Decisions (confirmed with user)

- **SEO deliverable:** audit **and** implement fixes (not report-only).
- **Project selection:** I scan and recommend a ranked shortlist; **user approves the set** before any post is written.
- **In-flight work:** commit the existing uncommitted changes **as-is** first as a clean baseline, then build on top.
- **Cover images:** user provides a Cloudflare API token with `Images: Edit`; pipeline = Playwright-screenshot live site → upload via Cloudflare Images REST API → set returned ID as `coverImage`.
- **New-post voice:** the newer **structured** style (like `meridia`/`subowl`: `## Overview` + sectioned, third-person, "under active development" where true), not the older casual first-person style.
- **Delivery:** both phases on one branch, as two logical commits → one PR.

## Phase 0 — Baseline

- Work in the dedicated worktree; never push to `main`; PR at the end.
- Commit the in-flight uncommitted work **as-is**: 3 new posts (`autoplakaty`, `meridia`, `subowl`), 3 updated posts (`ev-sol`, `lucky-auto`, `niro3d`), and the blog tag-styling tweak in `src/routes/blog/[post]/+page.svelte`.
- **Constraint to resolve at implementation time:** the worktree was branched fresh from `origin/main`, so the in-flight changes currently live only in the shared main checkout. The baseline commit must capture them (e.g. commit them from a branch based on the dirty `HEAD`, or migrate the diff into the working branch) before Phase 1 begins. Do not clobber the shared checkout.

## Phase 1 — SEO (audit → implement → verify)

### 1. Audit
- `/seo audit https://www.nichita-r.com` (orchestrates parallel sub-agents: technical, content, schema, sitemap, performance, visual, geo, sxo…).
- Targeted passes on representative route types: home `/`, `/blog`, `/portfolio`, a representative blog post, a `/tools` page — via `/seo page`, `/seo technical`, `/seo content`, `/seo geo`, `/seo schema` as warranted.

### 2. Findings doc
- Prioritized findings (High/Med/Low), each with effort estimate + expected impact, saved under `docs/superpowers/`.

### 3. Implement High + Medium fixes
Exact set is **driven by the audit**, not pre-committed. Likely candidates given the current code:
- Schema completeness/coverage in `seo.ts` — per-post `Article` + `BreadcrumbList`, evaluate `SoftwareApplication`/`WebApplication` for `/tools` pages.
- Per-post meta quality (titles, descriptions, keywords) where thin or duplicated.
- Sitemap quality — `svelte-sitemap` config, `lastmod`/`priority`, exclude non-indexable routes.
- GEO / AI-citability — e.g. `llms.txt`, passage/heading structure for citation readiness.
- Open Graph image coverage for all indexable pages.
- Canonical/robots correctness; internal linking between related posts.

### 4. Verify
- Re-run relevant `/seo page` / `/seo technical` on changed pages; confirm no regressions.
- `pnpm check` + `pnpm lint` + build must be clean.

## Phase 2 — New portfolio content

### 1. Scan & shortlist (approval gate)
- Explore every dir in `~/projects/`; classify substance / recency / portfolio value.
- Deliver a ranked shortlist with a one-line pitch + proposed slug per candidate.
- **User approves the final set before any writing.**

### 2. Write posts
- For each approved project: read README/code for **accurate** content; write in the newer structured voice.
- Frontmatter wired for SEO from the start: `title`, `excerpt`, `metaDescription`, `metaKeywords`, `tags`, `category`, `createdAt`/`updatedAt`, `githubLink`/`appLink` where applicable.

### 3. Cover images
- Playwright-screenshot the live site (or a local run / representative asset when no live URL).
- Upload to Cloudflare Images via REST API using the user-provided `Images:Edit` token; set returned image ID as `coverImage`.
- Backfill the 3 in-flight posts' empty `coverImage` the same way.
- **Pre-flight checks:** confirm the token's account matches the delivery hash `7WKcVsmsOjoGLZ6M5TFPXA` referenced in `AppConfig.publicImageCdn`; verify one upload round-trips and renders before batch-processing.

### 4. Wire & verify
- Register routes/config if a post type needs it; verify each post renders.
- `pnpm check` + `pnpm lint` + build must be clean.

## Execution model

- Phase 2 post-writing is file-disjoint → fan out with a **Workflow**, one post per `isolation: "worktree"` lane (implement → read-only review), then integrate conflict-free lane branches and run one final full check/lint/build.
- Phase 1 audit is agent-parallel via `claude-seo`; the code fixes are done coherently in-session because they converge on shared `seo.ts`.
- Two logical commits (Phase 1, Phase 2) on one branch → one PR. Never push to `main`.

## Risks / open items

- **Images token/account mismatch** — if the provided token's account differs from delivery hash `7WKcVsmsOjoGLZ6M5TFPXA`, uploaded IDs won't resolve on the live CDN; must confirm before batch upload.
- **Live-site screenshots** — projects without a public URL need a local run or a representative asset; note any that can't be auto-captured.
- **Audit-driven scope** — the concrete Phase 1 fix list is only known after the audit; High/Med selection keeps it bounded.
