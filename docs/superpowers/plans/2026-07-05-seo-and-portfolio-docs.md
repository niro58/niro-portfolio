# SEO Improvement + New Project Documentation — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Audit the live portfolio site with the `claude-seo` plugin and implement the high/medium-value fixes, then add curated, SEO-ready posts for undocumented `~/projects/` with auto-generated + uploaded cover images.

**Architecture:** Two sequenced phases on one branch (`worktree-seo-and-portfolio-docs`), two logical commits, one PR. Phase 1 (SEO) is agent-audited then hand-implemented in shared `seo.ts`/config. Phase 2 (content) is a user-approved shortlist, then file-disjoint post writing fanned out via a Workflow, with a Cloudflare Images upload pipeline for covers.

**Tech Stack:** SvelteKit 2 (static adapter, Svelte 5 runes), mdsvex markdown posts, `svelte-sitemap`, Cloudflare Images (delivery hash `7WKcVsmsOjoGLZ6M5TFPXA`), Playwright (screenshots), `claude-seo` plugin.

## Global Constraints

- Work only inside the worktree `.claude/worktrees/seo-and-portfolio-docs`; never edit the shared main checkout directly; never push to `main` — PR only.
- No test runner exists in this repo. Per-task verification gate = `pnpm check` (svelte-check) **and** `pnpm lint` (prettier + eslint) **and** `pnpm build`, all clean, plus the task-specific render/schema check.
- Posts live in `src/content/posts/*.md` and are auto-discovered — no routing/config edits needed to add one.
- `coverImage` frontmatter is a bare Cloudflare Images **ID** (e.g. `e331e6d2-2c1d-4808-e3f5-e304075c9800`), never a URL. The site builds URLs via `createCloudflareImageUrl`.
- SEO delivery hash is `7WKcVsmsOjoGLZ6M5TFPXA` (`AppConfig.publicImageCdn`). Any uploaded image ID must resolve under this hash or it 404s on the live CDN.
- New-post voice = the newer structured style (`meridia`/`subowl`): `## Overview` + sections, third-person, "under active development" only where true.
- Site base URL: `https://www.nichita-r.com`.
- Do not `git stash` bare (shared stack); use WIP commits.

---

## Phase 0 — Baseline

### Task 0: Commit in-flight work as a clean baseline

The worktree was branched fresh from `origin/main`; the uncommitted in-flight changes (3 new posts `autoplakaty`/`meridia`/`subowl`, 3 modified posts `ev-sol`/`lucky-auto`/`niro3d`, and the blog tag-styling tweak in `src/routes/blog/[post]/+page.svelte`) live only in the shared main checkout. Bring them onto this branch as one baseline commit without disturbing the shared checkout.

**Files:**
- Modify (bring in): `src/content/posts/{ev-sol,lucky-auto,niro3d}.md`, `src/routes/blog/[post]/+page.svelte`
- Create (bring in): `src/content/posts/{autoplakaty,meridia,subowl}.md`

- [ ] **Step 1: Capture the in-flight diff from the shared checkout as a patch**

Run (main checkout path is the repo root, not the worktree):
```bash
MAIN=/home/niro/projects/niro-portfolio
git -C "$MAIN" add -A -N src/content/posts src/routes/blog
git -C "$MAIN" diff HEAD -- src/content/posts src/routes/blog > /tmp/claude-1000/-home-niro-projects-niro-portfolio/f8c77986-8c8f-4e50-97a0-94ef2eb01905/scratchpad/inflight.patch
git -C "$MAIN" ls-files --others --exclude-standard src/content/posts >> /tmp/claude-1000/-home-niro-projects-niro-portfolio/f8c77986-8c8f-4e50-97a0-94ef2eb01905/scratchpad/inflight-untracked.txt
```
Expected: `inflight.patch` non-empty (tracked-file changes for ev-sol/lucky-auto/niro3d + blog svelte); untracked list names autoplakaty/meridia/subowl.

- [ ] **Step 2: Apply tracked changes into the worktree**

Run from the worktree root:
```bash
git apply /tmp/claude-1000/-home-niro-projects-niro-portfolio/f8c77986-8c8f-4e50-97a0-94ef2eb01905/scratchpad/inflight.patch
```
Expected: applies cleanly (worktree is at same `origin/main` base). If it rejects, stop and reconcile manually — do NOT force.

- [ ] **Step 3: Copy the untracked new posts into the worktree**

Run:
```bash
for f in autoplakaty meridia subowl; do cp "$MAIN/src/content/posts/$f.md" src/content/posts/$f.md; done
```
Expected: three new files present in worktree `src/content/posts/`.

- [ ] **Step 4: Verify the baseline builds**

Run: `pnpm check && pnpm lint && pnpm build`
Expected: all clean. (Empty `coverImage` on the 3 new posts is acceptable here — covers are backfilled in Task 12.)

- [ ] **Step 5: Commit the baseline**

```bash
git add src/content/posts src/routes/blog/\[post\]/+page.svelte
git commit -m "chore: baseline in-flight posts and blog tag styling"
```

> After this task, tell the user the in-flight work is safely committed on the branch and they may discard it from the shared main checkout at their convenience (do not discard it for them).

---

## Phase 1 — SEO (audit → implement → verify)

### Task 1: Run the SEO audit and produce a prioritized findings doc

**Files:**
- Create: `docs/superpowers/seo-audit-2026-07-05.md`

- [ ] **Step 1: Run the full-site audit**

Invoke the plugin skill: `/seo audit https://www.nichita-r.com`
Expected: an SEO Health Score + per-category findings (technical, content, schema, sitemap, performance, visual, geo, sxo).

- [ ] **Step 2: Run targeted passes on representative route types**

Invoke each and capture output:
```
/seo page https://www.nichita-r.com/
/seo page https://www.nichita-r.com/blog/readvault
/seo technical https://www.nichita-r.com
/seo geo https://www.nichita-r.com
/seo schema https://www.nichita-r.com/blog/readvault
```
Expected: page-level findings for home, a post, a tools page equivalent, plus GEO/schema detail.

- [ ] **Step 3: Write the findings doc**

Create `docs/superpowers/seo-audit-2026-07-05.md` with a table: each finding = `{severity: High|Med|Low, area, page(s), issue, recommended fix, effort, expected impact}`. Group by severity. This doc is the source of truth for Task 2's scope.

- [ ] **Step 4: Commit the findings**

```bash
git add docs/superpowers/seo-audit-2026-07-05.md
git commit -m "docs: SEO audit findings for nichita-r.com"
```

---

### Task 2: Implement High + Medium fixes

Scope = every High and Medium finding from Task 1's doc. The sub-steps below are the **candidate concrete fixes** already evident from the codebase; confirm each against the findings doc, drop any the audit says are non-issues, and add any High/Med finding not listed here as its own sub-step. Every finding must end either implemented or explicitly marked "deferred: <reason>" in the findings doc.

**Files (expected):**
- Modify: `src/lib/modules/seo.ts`
- Modify: `src/routes/blog/[post]/+page.svelte` (and other route `+page.svelte` that build SEO props)
- Create: `static/llms.txt`
- Modify: `package.json` (postbuild sitemap flags) and/or a sitemap post-processing step
- Modify: individual `src/content/posts/*.md` frontmatter where meta is thin/duplicated

- [ ] **Step 1: Add BreadcrumbList to post pages**

The `[post]` route currently calls `generateSeoProps(seoPage, page.url)` with no `parts`. `generateSeoProps` already accepts a `SeoPagePart | SeoPagePart[]` third arg and `generateJsonLdPagePart` already emits `BreadcrumbList`. In `src/routes/blog/[post]/+page.svelte`, pass a breadcrumb part:
```ts
generateSeoProps(seoPage, page.url, {
	type: 'BreadcrumbList',
	items: [
		{ position: 1, name: 'Home', item: '/' },
		{ position: 2, name: 'Blog', item: '/blog/' },
		{ position: 3, name: data.meta.title, item: `/blog/${data.meta.slug}/` }
	]
})
```
Verify the rendered page's JSON-LD `@graph` now contains a `BreadcrumbList`.

- [ ] **Step 2: Add `static/llms.txt` for GEO/AI-citability**

Create `static/llms.txt` listing the site, its purpose, and key URLs (home, /blog, /portfolio, /tools, top posts) in the llms.txt format. Verify it is served at `/llms.txt` after build (`ls build/llms.txt`).

- [ ] **Step 3: Apply the remaining confirmed schema/meta/sitemap/OG/internal-link fixes**

For each remaining High/Med finding, implement the recommended fix in the file named above. Common ones: fill/deduplicate thin `metaDescription`/`metaKeywords` in post frontmatter; ensure every indexable page has an OG image; add `SoftwareApplication`/`WebApplication` schema for `/tools` pages if the audit flags it; tune the `svelte-sitemap` postbuild (exclude non-indexable routes, add lastmod/priority if supported); add contextual internal links between related posts. Implement one finding per commit-sized chunk.

- [ ] **Step 4: Validate structured data**

For each page whose schema changed, extract the JSON-LD from the built HTML and validate it parses and has required fields (e.g. `Article` needs `headline`, `datePublished`, `author`, `image`; `BreadcrumbList` needs ordered `itemListElement`). Run: `pnpm build` then grep the built HTML in `build/` for the `application/ld+json` blocks and confirm shape.

- [ ] **Step 5: Verify gate**

Run: `pnpm check && pnpm lint && pnpm build`
Expected: all clean.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(seo): implement high/medium audit fixes (schema, GEO, sitemap, meta)"
```

---

### Task 3: Re-verify SEO on changed pages

- [ ] **Step 1: Re-run page-level audits on changed pages**

Invoke `/seo page` (and `/seo schema` where schema changed) on each URL whose page was modified. Expected: the specific findings from Task 1 now resolved, no new High findings introduced.

- [ ] **Step 2: Record verification outcome**

Append a "Post-fix verification" section to `docs/superpowers/seo-audit-2026-07-05.md` mapping each addressed finding → resolved/deferred. Commit:
```bash
git add docs/superpowers/seo-audit-2026-07-05.md
git commit -m "docs: SEO post-fix verification"
```

---

## Phase 2 — New portfolio content

### Task 4: Scan `~/projects/` and produce a shortlist — USER APPROVAL GATE

**Files:**
- Create: `docs/superpowers/portfolio-shortlist-2026-07-05.md`

- [ ] **Step 1: Enumerate and triage candidates**

For each dir in `~/projects/` not already documented (existing posts: api-spammer, blockaid, niro-map, readvault, rehop, tivoku-image-resizer, qr-code-generator, pixract, niro3d, lucky-auto, autoplakaty, ev-sol, meridia, subowl), read its `README.md` + `package.json`/manifest + top-level structure to judge substance, recency, and portfolio value. Skip forks/experiments/throwaways.

- [ ] **Step 2: Write the ranked shortlist**

Create `docs/superpowers/portfolio-shortlist-2026-07-05.md`: ranked table of `{project dir, proposed slug, one-line pitch, has live URL?, has GitHub?, recommended tags/category, include? (default yes/no)}`.

- [ ] **Step 3: GATE — present shortlist to user and get explicit approval**

Present the shortlist. **Do not write any post until the user approves the final set.** Record the approved set (and any exclusions) in the doc. Commit:
```bash
git add docs/superpowers/portfolio-shortlist-2026-07-05.md
git commit -m "docs: portfolio documentation shortlist"
```

---

### Task 5: Stand up and smoke-test the cover-image pipeline

Prove one image round-trips before batch work. Requires the user's Cloudflare `Images:Edit` token in env var `CF_IMAGES_TOKEN` and the account id in `CF_ACCOUNT_ID`.

**Files:**
- Create: `scratchpad/upload-cover.sh` (helper; scratchpad, not committed)

- [ ] **Step 1: Confirm token + account are present**

Run:
```bash
test -n "$CF_IMAGES_TOKEN" && test -n "$CF_ACCOUNT_ID" && echo "creds present"
```
Expected: `creds present`. If missing, stop and ask the user for the token/account.

- [ ] **Step 2: Capture one test screenshot**

Use Playwright to screenshot one live site (e.g. an approved project's URL, or `https://www.niro3d.cz`) at 1280×720 and save to scratchpad as `test-cover.png`. Verify the file exists and is a valid PNG (`file test-cover.png`).

- [ ] **Step 3: Upload it to Cloudflare Images**

Run:
```bash
curl -sf -X POST \
  "https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT_ID/images/v1" \
  -H "Authorization: Bearer $CF_IMAGES_TOKEN" \
  -F file=@test-cover.png | tee /dev/stderr | grep -o '"id":"[^"]*"'
```
Expected: JSON `success:true` with a `result.id`. If `403`/`10000`, the token lacks Images:Edit or the account is wrong — stop and report.

- [ ] **Step 4: Confirm it resolves on the production delivery hash**

Take the returned `<id>` and run:
```bash
curl -s -o /dev/null -w "%{http_code}\n" \
  "https://imagedelivery.net/7WKcVsmsOjoGLZ6M5TFPXA/<id>/public"
```
Expected: `200`. **If not 200, the token's account does not own delivery hash `7WKcVsmsOjoGLZ6M5TFPXA`** — stop and reconcile with the user before any batch upload (covers would 404 on the live site).

---

### Task 6: Write approved posts + attach covers (Workflow fan-out)

One post per approved project. These are file-disjoint (one `.md` each) → fan out with a Workflow, one `isolation: "worktree"` lane per post: read the project → write the post → screenshot+upload cover → set `coverImage`. Then integrate lane branches.

**Files (per project):**
- Create: `src/content/posts/<slug>.md`

- [ ] **Step 1: Per-post — author the markdown**

For each approved project, write `src/content/posts/<slug>.md` in the structured voice with complete SEO frontmatter mirroring `meridia`/`subowl`:
```
---
title: '<Name>: <Concise descriptor>'
createdAt: 'YYYY-MM-DD'
updatedAt: '2026-07-05'
category: 'Portfolio'
readTime: '<n>'
excerpt: '<1–2 sentence hook>'
coverImage: ''            # filled in Step 2
coverImageAlt: '<descriptive alt>'
metaKeywords: '<comma,separated,real,tech,and,domain,terms>'
metaDescription: '<= 160 chars, distinct from excerpt where possible>'
tags: [<real stack/domain tags>]
githubLink: '<url or omit>'
appLink: '<url or omit>'
---

## Overview
<accurate, third-person, grounded in the repo — no invented features>
```
Content must be accurate to the repo (features, stack, status). Mark "under active development" only if true.

- [ ] **Step 2: Per-post — generate and attach the cover**

If the project has a live URL: Playwright-screenshot it (1280×720). Else run it locally or use a representative asset from the repo. Upload via the Task 5 curl. Put the returned ID into that post's `coverImage`.

- [ ] **Step 3: Per-post — verify render**

Run: `pnpm check` and `pnpm build`; confirm the post appears in the built blog/portfolio listing (grep `build/` for the slug) and the cover ID resolves (Task 5 Step 4 check).

- [ ] **Step 4: Integrate lanes and full verify**

Merge the conflict-free per-post branches into the working branch. Run: `pnpm check && pnpm lint && pnpm build`. Expected: clean; sitemap regenerated with new URLs (`grep <slug> build/sitemap.xml`).

- [ ] **Step 5: Commit**

```bash
git add src/content/posts
git commit -m "content: document <N> new portfolio projects with covers"
```

---

### Task 7: Backfill covers for the 3 in-flight posts

**Files:**
- Modify: `src/content/posts/{autoplakaty,meridia,subowl}.md`

- [ ] **Step 1: Generate + upload covers**

For each of autoplakaty (`autoplakaty.cz`), meridia (`meridia.news`), subowl (`subowl.co`): Playwright-screenshot the live site, upload via the Task 5 curl, capture the IDs.

- [ ] **Step 2: Set `coverImage`**

Replace the empty `coverImage: ''` in each of the three posts with its uploaded ID. Verify each ID resolves (Task 5 Step 4).

- [ ] **Step 3: Verify gate + commit**

Run: `pnpm check && pnpm lint && pnpm build` (clean).
```bash
git add src/content/posts/autoplakaty.md src/content/posts/meridia.md src/content/posts/subowl.md
git commit -m "content: backfill cover images for autoplakaty, meridia, subowl"
```

---

### Task 8: Open the PR

- [ ] **Step 1: Final full verification**

Run: `pnpm check && pnpm lint && pnpm build`. Expected: all clean.

- [ ] **Step 2: Push branch and open PR**

```bash
git push -u origin worktree-seo-and-portfolio-docs
gh pr create --base main --title "SEO improvements + new portfolio project docs" --body "<summary of Phase 1 SEO fixes and Phase 2 new posts; link the audit + shortlist docs>"
```
Expected: PR created against `main` (never pushed directly to main).

---

## Self-Review (completed by plan author)

**Spec coverage:** Phase 0 → Task 0. Phase 1 audit → Task 1; implement → Task 2; verify → Task 3. Phase 2 shortlist/approval → Task 4; cover pipeline → Task 5; write posts + covers → Task 6; in-flight backfill → Task 7. Execution model (Workflow fan-out) → Task 6. Delivery (one PR) → Task 8. Risks (token/account mismatch → Task 5 Step 4 gate; no-live-URL projects → Task 6 Step 2; audit-driven scope → Task 2 preamble). All spec sections mapped.

**Placeholder scan:** No "TBD/TODO". The two intentionally open elements — Task 2's exact fix set and Task 4/6's project list — are explicitly gated (audit output; user approval), not placeholders; each has concrete acceptance criteria and concrete candidate content.

**Consistency:** `coverImage` = bare CF Images ID throughout; delivery hash `7WKcVsmsOjoGLZ6M5TFPXA` used identically in Tasks 5/6/7; verification gate (`pnpm check && pnpm lint && pnpm build`) uniform; env vars `CF_IMAGES_TOKEN`/`CF_ACCOUNT_ID` consistent across Tasks 5–7.
