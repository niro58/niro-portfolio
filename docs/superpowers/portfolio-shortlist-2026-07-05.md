# Portfolio Documentation Shortlist — 2026-07-05

Scanned ~26 undocumented dirs in `~/projects/`. Already-documented projects (via existing posts) and their components/backends were excluded. Live-URL column reflects a reachability check for cover-screenshot feasibility.

## Tier 1 — recommended (strong standalone products/case studies)

| # | Project | Slug | What it is | Stack (short) | Live? | Cover source |
|---|---------|------|------------|---------------|-------|--------------|
| 1 | **Sitely** | `sitely` | SaaS that scrapes Czech businesses w/o sites, lead-scores them, and auto-generates + deploys AI-built websites | SvelteKit 5, PG, Redis, Claude, CF Pages/R2, Stripe | ✅ sitely.cz (200) | live screenshot |
| 2 | **Fixr** | `fixr` | Mobile-first on-demand home-services marketplace (CZ): booking, bidding, chat, payouts | SvelteKit 5, PG, Stripe, GoPay, MapLibre, Capacitor | ⚠️ fixr.cz (000) | local run / asset |
| 3 | **Road Transportation Marketplace** | `road-transportation-marketplace` | Bolt/Uber-style bus-carrier marketplace: seats, parcels, live GPS, 8-lang SEO (~8.4k URLs) | SvelteKit 5, PG, Stripe Connect, Twilio, Leaflet, Capacitor | ❌ none | local run / asset |
| 4 | **SailoRent** | `sailorent` | Commercial vehicle (truck/trailer) rental catalog + inquiry, admin panel | SvelteKit 5, PG, Redis, i18n, CF R2, k8s | ⚠️ sailorent.cz (401 auth) | local run / asset |
| 5 | **Stock Manager** | `stock-manager` | AI stock-research app: watchlists, live Finnhub quotes, Claude news sentiment, earnings | SvelteKit 5, PG, Redis, Finnhub, Claude, Caddy | ❌ none | local run / asset |
| 6 | **Socials Manager** | `socials-manager` | Unified social platform (FB/IG/TikTok/YT) + Remotion ad engine, AI content, analytics | SvelteKit 5, PG, Anthropic, Remotion, Stripe | ❌ none | local run / asset |
| 7 | **FormulaWise** | `formulawise` | AI spreadsheet-formula generator (Excel/Sheets/SQL) w/ native Office add-in plugins | SvelteKit 5, PG, Gemini, Stripe | ❌ none | local run / asset |
| 8 | **nero-steam** | `nero-steam` | CS2 skin marketplace arbitrage: multi-source scrape, float resolve, live SSE scoring feed, extensions | Go, SvelteKit, Python, TS, PG, k8s | ⚠️ neroweb.nichita-r.com (000) | local run / asset |
| 9 | **Apotheosis** | `apotheosis` | 2D twin-stick roguelike (Godot 4.6) where gods are bosses; fed by an LLM pipeline curating 341 gods | Godot, GDScript, Python pipeline, LLM gateway | ❌ native game | in-game capture |

## Tier 2 — maybe (niche, in-progress, or infra)

| Project | Slug | Note |
|---------|------|------|
| Voxhorde | `voxhorde` | Godot voxel arena roguelite; playable but in-progress. Game-dev case study. |
| niro-management | `niro-management` | Self-hosted AI DevOps panel (runs code reviews/Sentry triage across repos). Internal infra, no public UI. |
| niro-apps | `niro-apps-platform` | Multi-app Capacitor platform (schema-per-app); impressive scaffold but 3 apps still in-progress. |
| niro-ads (ads-manager) | `niro-ads` | Multi-brand ad-production pipeline (Remotion + Playwright → Meta/Google). Cross-cuts documented brands; document as internal tool, not a product. |
| Online Food Eshop | `online-food-eshop` | E-commerce + admin; reads half-template/half-product. |
| Gonka Implementation | `gonka-implementation` | Decentralized-AI inference client/gateway/router. Niche infra. |
| mailer-go | `mailer-go` | Go multi-tenant SMTP microservice w/ worker pool + Prometheus. Backend, no UI. |

## Flagged — attribution / proprietary (need your call before publishing)

| Project | Note |
|---------|------|
| **driver_bot** | Full internal fleet-mgmt product (Telegram + FastAPI admin), BUT git remote is a **different owner** (`daniaaa48-op`) — likely client/collaborator work, Russian README, handles PII. Confirm you can publish it as your own before documenting. |
| **Letuška (Asiana)** | Professional **employer** work (~17 private GitLab repos, `letuska.cz`). Good experience case study, but proprietary client code — can only be described at a high level, not shown. |

## Excluded (documented, stubs, or components)

- `good-map` = **Meridia** (already documented) · `canvas-chat` = **Pixract** (documented) · `openapi-viewer` = Pixract derivative · `video-creator` = Niro3D marketing asset · `contact-api` = Everest backend · `invoice-maker` = Lucky Autoservis utility · `yodeck-alternative` = empty stub · `subscription-manager` = empty stub

## Open decision: covers for non-live projects

Only Sitely has a cleanly public live site. For the rest, cover options are: (a) spin each repo up locally and screenshot (heavy — most are monorepos needing DB/Redis/env), (b) reuse existing screenshots/README images from each repo, (c) generate branded placeholder covers, (d) supply real IDs later (use the site's default fallback image meanwhile). To be decided at approval.
