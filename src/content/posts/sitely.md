---
title: 'Sitely: AI Website Generation for Czech Businesses'
createdAt: '2026-05-16'
updatedAt: '2026-07-05'
category: 'Portfolio'
readTime: '12'
excerpt: 'A platform that scrapes Czech businesses without websites from Google Maps, enriches and lead-scores them, then auto-generates and deploys AI-built Czech websites with Claude. In production, actively developed.'
coverImage: 'bf274b2f-1ac2-4304-f423-6b0162672500'
coverImageAlt: 'Sitely — AI website generation platform for Czech businesses'
metaKeywords: 'SvelteKit, Svelte 5, Claude AI, Anthropic, website generator, lead scraping, Google Maps, Google Places API, ARES, lead scoring, Stripe, Cloudflare Pages, Cloudflare R2, PostgreSQL, Czech, GrapesJS'
metaDescription: 'Sitely finds Czech businesses without websites, scores them as leads, and auto-generates AI-built websites deployed to Cloudflare Pages. Built with SvelteKit, Claude, and a 100+ block generation engine.'
tags: ['SaaS', 'Svelte', 'AI', 'Automation']
githubLink: 'https://github.com/niro58/sitely-app'
appLink: 'https://www.sitely.cz'
---

## Overview

Sitely is a platform built around a specific market observation: a large number of small Czech businesses — restaurants, hair salons, auto repair shops, bakeries — have a Google Maps listing and an active customer base but no website of their own. Sitely finds those businesses programmatically, evaluates how likely each one is to want a website, generates a complete Czech-language site for the promising ones using Claude, and deploys it to a live URL before the business owner has even been contacted.

The result is a product that reverses the usual funnel. Instead of asking a business owner to describe what they want and build from a blank canvas, Sitely presents a finished, category-appropriate website preview that the owner can claim, adjust, and publish. The same generation engine also powers self-service flows — a wizard, a template gallery, and a "redesign my existing site" path — so the platform serves both cold-outreach leads and users who arrive directly.

Sitely is in production at [www.sitely.cz](https://www.sitely.cz) and under active development. The repository shows a mature, still-growing codebase: a pnpm monorepo with seven workspace packages and four backend services, over 100 SQL migrations, an extensive changelog, and a large feature backlog.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | SvelteKit 2, Svelte 5 (runes), TypeScript, Tailwind CSS 4 |
| UI | shadcn-svelte (bits-ui), Lucide icons, layerchart |
| Visual Editor | GrapesJS (drag-and-drop page editor) |
| Data Fetching | SvelteKit Remote Functions (`.remote.ts` — query / command / form) |
| Validation | Zod 4 (Standard Schema) |
| Database | PostgreSQL 17 (with pgcrypto) |
| Cache | Redis 7 |
| Auth | Custom session-based (Base32 tokens, SHA-256 hashed) + Google OAuth (Arctic) |
| Payments | Stripe — per-site subscriptions, three tiers, add-ons, domain line items |
| AI | Claude Sonnet 4.6 (site generation) + Claude Haiku 4.5 (lightweight tasks) |
| Scraping | Google Maps Places API (New) |
| Business Registry | ARES (Czech IČO lookup) |
| Storage / CDN | Cloudflare R2 + a Cloudflare Worker asset server |
| Hosting (generated sites) | Cloudflare Pages |
| DNS / Domains | Cloudflare API (DNS records, registrar) |
| Analytics | Google Search Console API |
| Email | Python mailer service (SMTP queue) |
| Screenshots | Playwright (Chromium) |
| i18n | Czech, English, Russian (app UI) |
| Monorepo | pnpm workspaces + Turbo |

---

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                     SvelteKit Apps                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────────┐  │
│  │  Public  │  │   User   │  │  Admin   │  │   Agency    │  │
│  │  + Claim │  │Dashboard │  │  Panel   │  │   Portal    │  │
│  │ + Wizard │  │ + Editor │  │+ Outreach│  │  (referral) │  │
│  └──────────┘  └──────────┘  └──────────┘  └─────────────┘  │
└───────────────────────────┬──────────────────────────────────┘
                            │
     ┌──────────────┬───────┴────────┬───────────────┐
     ▼              ▼                ▼               ▼
┌─────────┐   ┌───────────┐   ┌───────────┐   ┌───────────┐
│PostgreSQL│  │  Redis 7  │   │  Stripe   │   │ Claude AI │
│   17     │  │  (cache + │   │ (billing) │   │Sonnet 4.6 │
│(pgcrypto)│  │   queue)  │   │           │   │ Haiku 4.5 │
└─────────┘   └───────────┘   └───────────┘   └───────────┘
     │
     │  shared @sitely/generation + @sitely/blocks
     ▼
┌──────────────────────────────────────────────────────────────┐
│                      Backend Services                         │
│  ┌────────────┐  ┌─────────────┐  ┌───────────┐  ┌────────┐  │
│  │  Scraper   │  │Build Worker │  │Screenshots│  │ Mailer │  │
│  │    CLI     │─▶│ queue→build │  │ Playwright│  │(Python)│  │
│  │ scrape/    │  │ →CF Pages   │  │  →R2      │  │  SMTP  │  │
│  │ enrich/    │  └──────┬──────┘  └───────────┘  └────────┘  │
│  │ score/gen  │         │                                    │
│  └────────────┘         ▼                                    │
│              ┌──────────────────────┐   ┌────────────────┐   │
│              │  Cloudflare Pages    │   │ Cloudflare R2  │   │
│              │  {slug}.sitely.cz    │   │ + CDN Worker   │   │
│              └──────────────────────┘   └────────────────┘   │
└──────────────────────────────────────────────────────────────┘
```

The scraper CLI, build worker, and both SvelteKit apps all consume the same two shared packages: `@sitely/blocks` (the rendered component library) and `@sitely/generation` (the AI orchestration, prompts, and quality gates). This is deliberate — every path that can produce a site, whether a batch scraper run or a user in the wizard, funnels into one generation contract and one build pipeline.

---

## Core Features

### Grid-Based Lead Discovery

The scraper does not simply query Google Places once per city. It divides each city into a coordinate grid — Prague, for example, is covered by a 1.5 km grid step over an 8 km radius, each cell issuing its own Places search with a bounded radius. This works around the Places API's result cap per query: dense city centres would otherwise return only the top handful of businesses, and the grid ensures coverage down to the neighbourhood level.

Discovery is organised across seven Czech cities and a catalogue of roughly thirty business categories, each tagged with a priority tier (1 = high-density, high-conversion categories like restaurants, cafés, hair salons, and auto repair; 3 = long-tail). Priority drives which categories are scraped and scored first.

### Multi-Source Enrichment

A raw Google Maps listing is thin. Sitely's enrichment layer thickens each lead from a wide set of Czech and international sources, each implemented as a discrete, individually tested module in the scraper service:

- **ARES** — the Czech business registry, matched by IČO to confirm a legitimate, registered entity and to recover owner information
- **Firmy.cz** — the Czech business directory
- **Social profiles** — Facebook, Instagram, and LinkedIn enrichers
- **Email discovery and verification** — finding a contact address and validating deliverability against a blocklist
- **Financial and insolvency data** — including an insolvency check that disqualifies businesses in active proceedings
- **Website maturity signals** — a SEO checker, domain-age lookup, and Google Business Profile quality and review-recency scoring
- **Competitor density and travel-platform presence** for market context

Photos and logos are downloaded and cached to R2, with a stock-image fallback for listings that lack usable imagery.

### Lead Scoring (0–100)

The lead scorer — on its fourth iteration in the codebase — computes a 0–100 score that answers a deliberately narrow question: *does this business need our product?* A thriving business that already runs a modern, well-ranked website scores **low**, because it is a poor sales target.

That principle produces a scoring model with **bidirectional signals**. Google reviews, ratings, contactability (phone and email), category demand, an ARES match, and city tier all push the score up. But website quality, visual modernity, SEO visibility, and Google Business Profile health are scored *against* the lead — a modern, professional existing website applies a maturity penalty of up to −45, and active insolvency is an automatic disqualification. The score is stored with a full per-signal breakdown so a human reviewer can see exactly why a lead ranked where it did.

### AI Site Generation

Generation is the heart of the platform, and it is not a single prompt. The `@sitely/generation` package defines a unified `GenerationInput → SiteBlueprint` pipeline shared by three modes:

- **Wizard** — a user enters a business name, category, and city, and a complete site is generated live in the browser flow
- **Scraper** — batch generation from the rich, database-enriched lead record
- **Redesign** — a user pastes an existing website URL, which is audited and reimagined

Content is generated by Claude Sonnet 4.6, with Haiku 4.5 handling lightweight tasks like colour suggestions and metadata. Sites are assembled from a component library of over 100 block types spanning several hundred design variants, organised into six categories (essential, content, marketing, advanced, forms, specialized). On top of the blocks sit **eight named design-system presets** — Editorial Nordic, Luxury Onyx, Industrial Grid, Organic Warm, and others — each of which owns a complete visual language (typography stack, colour treatment, decoration vocabulary, motion profile, spacing rhythm, dividers). Swapping a site's entire look is a single field change, not a regeneration.

### Build and Deploy Pipeline

Every creation path converges on a shared `finalizeSiteCreation()` step — create the subscription, seed the pages, wire up forms — and then enqueues a build. A standalone **build worker** polls the queue, renders the site's blocks to static HTML, and deploys to Cloudflare Pages, resolving the actual Pages subdomain (Cloudflare may append a random suffix to avoid collisions) and mapping the site to `{slug}.sitely.cz`. A separate **screenshots service** drives Playwright to capture site and template previews into R2, and a small **Cloudflare Worker** serves cached R2 assets with a one-year TTL.

### Claim and Outreach Flow

For scraped leads, the loop closes through outreach. An admin approves a generated preview, a personalised email goes out through the Python mailer, and the business owner lands on a `/claim/{slug}` preview of their finished site. Claiming supports a passwordless path — the owner verifies control of the business email via a one-time code, and an account is created on the spot. This removes the single biggest friction point in cold outreach: the recipient sees the actual product, already built for their business, before committing to anything.

### Billing and Add-Ons

Sitely uses a per-site subscription model on Stripe, in three tiers — **Starter (499 CZK/mo), Business (999 CZK/mo), and Premium (1,999 CZK/mo)** — each with monthly and yearly options and EUR pricing alongside CZK. Tiers gate features through a matrix (blog, analytics, content collections, localization, and pro AI unlock progressively) and carry a monthly **AI credit allowance** (50 / 300 / 1,500), with one-time credit packs available for overage. Domain registration is handled as a Stripe line item, with `.cz`, `.eu`, and `.com` pricing and Czech VAT applied, and DNS provisioned automatically through the Cloudflare API.

### Dashboard, Editor, and Admin

Once claimed, a site is managed from the user dashboard: a GrapesJS visual editor for drag-and-drop page editing, per-page SEO settings with a live SERP preview, domain management, add-on toggles, content collections, and a built-in support ticket system where the admin side can draft replies with Claude over an SSE stream. A separate **admin** application manages businesses, scrape jobs, and outreach campaigns, and an **agency** package adds a referral-tracking portal with member roles and permissions.

---

## Technical Highlights

### Fighting the "AI website" look

The hardest problem in mass website generation is not producing a site — it is producing sites that do not all look like each other. A naive LLM pipeline converges on the same safe hero-features-testimonials-CTA skeleton every time. Sitely attacks this on two fronts.

First, a **Design DNA** layer randomises across eleven creative dimensions (with five to twenty options each) to produce, on the order of, a trillion possible combinations. The DNA is generated once per site and injected into the prompt to *guide* rather than dictate the design, so two salons in the same city receive genuinely different layouts.

Second, a battery of **post-generation quality gates** runs after the model returns, each targeting a specific failure mode:

- **Anti-template detection** breaks up banned section sequences, deduplicates adjacent blocks, and fixes background-colour monotony
- **A diversity enforcer** shuffles the eligible variant pool per site so the same variant is not reused across pages
- **A content-uniqueness validator** uses 3-gram shingling and Jaccard similarity to flag AI text that is too close to recently generated sites
- **A coherence validator** checks that content and design stay consistent across every page of a multi-page site
- **A responsive validator** statically analyses the generated HTML/CSS for patterns known to break at tablet (768px) and mobile (375px) widths
- **A post-generation audit** scores contrast, imagery, service coverage, fonts, and overall content quality into an actionable report

These gates are backed by a labelled set of visual-content-quality checks (referenced throughout the code as VCQ cases), turning "does this look good?" from a subjective judgement into a repeatable, testable pipeline stage.

### One generation contract, many entry points

A recurring risk in a platform with six ways to create a site is drift — each path slowly growing its own subtly different generation logic until a fix in one place silently regresses another. Sitely avoids this by pushing all of the shared substance (input types, prompt fragments, post-processing, validation) into `@sitely/generation`, and keeping only the actual AI call at the edges. The scraper and the app can therefore make the call in their own runtime while producing identical, validated blueprints.

### A resilient Anthropic wrapper

Because generation is central and runs at volume, every Claude call goes through a single centralised client rather than the SDK directly. The wrapper adds exponential backoff on 529 "overloaded" errors (2s → 4s → 8s, up to three retries) and automatically retries once with 1.5× the token budget when a response is truncated by `max_tokens` (capped at 8192). Concentrating this logic in one place means transient API pressure and occasional truncation degrade gracefully instead of surfacing as failed site builds.

---

## Where Things Stand

The full pipeline — grid scraping, multi-source enrichment, lead scoring, AI generation, the quality-gate suite, build-and-deploy to Cloudflare Pages, the claim and outreach loop, and three-tier Stripe billing — is implemented and running in production at sitely.cz. The self-service wizard, template gallery, redesign flow, GrapesJS editor, and add-on system round out the user-facing side, alongside the admin and agency portals.

Development remains active: the migration history runs past a hundred files, the changelog is dense, and the backlog is substantial. Recent movement in the repository points at continued investment in the generation quality gates and the design-system layer — the parts of the product where the difference between "a website" and "a website worth paying for" is actually won.
