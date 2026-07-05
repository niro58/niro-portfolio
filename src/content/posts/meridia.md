---
title: 'Meridia: A Living Atlas of Positive News'
createdAt: '2026-04-22'
updatedAt: '2026-04-22'
category: 'Portfolio'
readTime: '10'
excerpt: 'An interactive world map of positive news, powered by automated RSS ingestion, AI-driven categorisation and geocoding, and community features. Actively developed.'
coverImage: 'aba3a68f-9aaf-4f34-1f86-0461fe5d4b00'
coverImageAlt: 'Meridia — positive news atlas'
metaKeywords: 'SvelteKit, MapLibre, Supercluster, Claude AI, RSS ingestion, PostgreSQL, Redis, positive news, interactive map, community'
metaDescription: 'Meridia is a living atlas of positive news from around the world — an interactive MapLibre map with AI-driven categorisation, RSS ingestion from hundreds of sources, and community engagement features. Under active development.'
tags: ['SaaS', 'Svelte', 'AI', 'Maps']
appLink: 'https://www.meridia.news'
---

## Overview

Meridia is a platform built around a single premise: the world produces a significant volume of genuinely positive news, and none of the existing platforms make it easy to find or explore. The project maps positive events geographically, clusters them by category, and presents them as a browsable, interactive atlas rather than a traditional feed.

The platform is under active development across four roadmap phases, with content pipelines, community features, social publishing, and research digest capabilities being added in iterations.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | SvelteKit 2, Svelte 5 Runes, TypeScript, TailwindCSS 4 |
| UI | shadcn-svelte (bits-ui), Lucide icons |
| Map | MapLibre GL with Supercluster for client-side clustering |
| Database | PostgreSQL 17 |
| Cache | Redis 7 (with graceful degradation) |
| Auth | Session-based + Google OAuth (Arctic) |
| AI | Claude (Anthropic) — categorisation, geocoding, summarisation |
| Email | Python mailer service (SMTP queue) |
| SEO | Dynamic sitemaps, JSON-LD structured data, OG images |
| Monorepo | pnpm workspaces |

---

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                     SvelteKit App                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────────┐  │
│  │Interactive│  │  Blog /  │  │Community │  │  Dashboard  │  │
│  │  Map      │  │ Insights │  │ Features │  │  & Admin    │  │
│  └──────────┘  └──────────┘  └──────────┘  └─────────────┘  │
└──────────────────────────────────────────────────────────────┘
                          │
         ┌────────────────┴───────────────┐
         ▼                                ▼
  PostgreSQL 17 + Redis              AI Processing
  (articles, pins, users,            (Claude — classify,
   community, blog posts)             geocode, summarise)
         │
         ▼
  RSS Ingestion Pipeline
  (100+ positive news sources,
   automated discovery + scraping)
```

---

## Core Capabilities

### Interactive Map

The centrepiece of the platform is a MapLibre GL map displaying news articles as geographic pins. Articles are grouped by proximity using Supercluster for performant client-side clustering at any zoom level. Each pin carries a category colour and, when selected, expands to show the article summary, story hook, and a link to the full source.

Three geometry types are supported:
- **Point** — a specific location (city, institution, research site)
- **Zone** — a geographic area (nature reserve, protected region, nationwide policy)
- **Journey** — movement between two explicitly named locations (species relocation, repatriation, delivery)

Eleven colour-coded categories organise content across domains including environment, science, health, community, technology, and more.

### Automated Content Pipeline

Content ingestion has been automated across a growing list of positive news sources. The pipeline:

1. Fetches articles from RSS feeds on a scheduled basis
2. Filters and deduplicates against existing content
3. Passes candidates to the AI processing layer for analysis
4. Stores approved articles with geographic coordinates, geometry type, category, and summary

A sentiment scoring system (0.0–1.0) gates which articles appear on the map. Only content meeting a minimum positivity threshold reaches users.

### AI Processing Layer

Each article is analysed by Claude to produce:
- **Category** classification (primary + optional secondary from 11 categories)
- **Sentiment score** determining map eligibility
- **Geographic data** — specific location name and ISO country code, or null for non-geographic content
- **Geometry type** determination (point / zone / journey)
- **Summary** — a concise two-sentence description (max 230 chars)
- **Story hook** — a single punchy sentence leading with the most concrete statistic or fact
- **Impact keywords** — numeric statistics extracted from the article text
- **Chart data** — structured chart specifications when the article contains sufficient data points

This structured analysis enables rich article cards, map tooltips, and chart rendering without additional processing at read time.

### Blog & Research Digests

Beyond map pins, a blog layer publishes longer editorial content. Two content types are being developed:

**Research digests** are AI-generated editorial posts (1,500–3,000 words) sourced from official publications — UN reports, WHO data, NASA research, academic papers from arXiv and similar databases. These go beyond the brief summaries on the map and provide in-depth analysis with inline charts, source citations, and key facts cards.

**Insights articles** are standard blog posts covering positive trends, category roundups, and curated compilations, rendered server-side for full Google indexability.

### Community Features

A community layer covers reactions, comments, user badges, and a notification system for followed topics or geographic areas. Content moderation tooling and a newsletter integration are included in the same feature group.

### Social Auto-Publishing

An automated social publishing pipeline has been developed to distribute content to BlueSky, Twitter/X, and Mastodon. The pipeline generates branded image cards (hero cards, article highlights, weekly stats infographics, monthly trend charts) using server-side image generation, with AI-written captions and engagement analytics pulled back into the platform dashboard.

### Developer & Embed Features

An embed API allows third parties to embed individual map pins or category feeds into external sites. A developer documentation section covers available endpoints and integration options.

---

## Database Design

The schema covers several domain areas:

- **Content** — articles, map pins, source configurations, ingestion state
- **Blog** — blog posts with content type (standard / research digest), charts, citations, key facts
- **Community** — reactions, comments, badges, notification settings, moderation queue
- **Users** — accounts, sessions, preferences, personalisation signals
- **Social** — publishing queue, platform credentials, engagement metrics
- **Research** — academic paper sources, discovery queue, generated digests

Redis handles caching of hot content (trending articles, category feeds) with graceful degradation — the application continues to function if the cache layer is unavailable.

---

## Technical Challenges

### Geometry Classification at Scale

Reliably distinguishing points, zones, and journeys from unstructured news text requires careful prompt engineering. The AI prompt encodes explicit rules for each geometry type and edge cases (space launches are not journeys; global events with no Earth anchor are non-geographic). Prompt iterations were validated against a labelled test set before deployment.

### Clustering at Global Scale

MapLibre GL renders the map on the client, and clustering millions of articles at multiple zoom levels would be prohibitive without pre-computation. Supercluster runs entirely in the browser, computing clusters dynamically as the user pans and zooms, with no server round-trips for map interactions.

### Content Quality at Volume

Automated pipelines produce variable-quality content. A multi-stage quality gate — sentiment scoring, deduplication, image quality checks, and editorial scoring — filters the ingestion output before articles reach the map. Articles failing quality thresholds are stored but not published, available for manual review.

### AI Cost Management

Processing hundreds of articles per day with a large language model has meaningful cost implications. Optimisations include prompt caching to reuse the system prompt across calls, pre-filtering articles before AI processing (removing obviously negative content by title), using a smaller model for lightweight tasks (digest generation for academic papers), and batching where the API supports it.

---

## Lessons Learned

1. **Geocoding from unstructured text is harder than it looks**: News articles reference places inconsistently — "the region", "local authorities", "a hospital in northern Italy". The prompt needs explicit fallback logic and confidence thresholds to avoid placing pins inaccurately.

2. **RSS feeds are unreliable at scale**: Sources go offline, change feed URLs, or start publishing non-news content. The ingestion layer needs source health monitoring, automatic retries, and a mechanism for flagging degraded sources for review.

3. **Server-side rendering matters for SEO at scale**: The insights/blog section was initially client-rendered, making it invisible to search crawlers. Migrating to SSR with proper pagination and canonical URLs made the content indexable without structural changes to the data model.

4. **Quality gates are load-bearing**: A pipeline that publishes everything it ingests quickly produces noise that undermines user trust. Investing in quality scoring early pays dividends as the content volume grows.

---

## Where Things Stand

The core map, ingestion pipeline, and AI processing layer are in production. Work in progress covers the research digest content type, social auto-publishing, and a site architecture consolidation to streamline navigation and URL structure. The platform continues to grow in both content coverage and feature depth.
