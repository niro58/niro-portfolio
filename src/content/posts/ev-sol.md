---
title: 'Everest Solutions: Fleet Management Platform & Transport Website'
createdAt: '2025-07-26'
updatedAt: '2026-04-22'
category: 'Portfolio'
readTime: '12'
excerpt: 'A fleet management dashboard for a Czech taxi and ride-sharing operation on Uber and Bolt, paired with a multilingual marketing website for the transport company. Both applications are under active development.'
coverImage: 'a9bafa3b-f640-4b51-1108-26e4f17ced00'
coverImageAlt: 'Everest Solutions fleet management dashboard'
metaKeywords: 'fleet management, SvelteKit, Svelte 5, PostgreSQL, MapLibre, analytics, Uber, Bolt, CSV import, dashboard, TypeScript, taxi management'
metaDescription: 'Everest Solutions is a two-part project: a fleet management dashboard for a Czech taxi operation running on Uber and Bolt, and a multilingual transport company website. Built with SvelteKit 2, Svelte 5, PostgreSQL, and MapLibre. Under active development.'
tags: ['SaaS', 'Svelte', 'Dashboard', 'Analytics']
appLink: 'https://www.ev-sol.cz'
---

## Overview

EVEREST Solutions is a Czech company operating a vehicle fleet across two ride-sharing platforms. The project covers two separate applications, both under active development:

1. **Fleet Management Dashboard** — an internal tool for managing drivers, vehicles, orders, and operational analytics
2. **Marketing Website** — a multilingual public site presenting personal and cargo transportation services to potential clients

The dashboard is the more technically substantial piece. It aggregates raw data exports from both Uber and Bolt into a unified operational view, providing the business with analytics, driver management, and operational tooling that neither platform offers independently.

---

## Fleet Management Dashboard

### Tech Stack

| Layer | Technology |
|---|---|
| Framework | SvelteKit 2, Svelte 5 Runes, TypeScript 5 |
| Styling | TailwindCSS 4, shadcn-svelte (bits-ui) |
| Database | PostgreSQL with PostGIS extension |
| Maps | MapLibre GL |
| Charts | LayerChart + D3 |
| Auth | Session-based with secure password hashing |
| Notifications | Python mailer service, scheduled background jobs |
| Deployment | Docker + Kubernetes, GitHub Actions CI/CD |

---

### Architecture

```
┌────────────────────────────────────────────────────────────┐
│                  SvelteKit Admin App                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌───────────┐  │
│  │ Dashboard│  │ Drivers  │  │  Fleet   │  │  Orders   │  │
│  │Analytics │  │+ Profiles│  │+ Maps    │  │+ Timeline │  │
│  └──────────┘  └──────────┘  └──────────┘  └───────────┘  │
└────────────────────────────────────────────────────────────┘
                          │
                          ▼
            ┌─────────────────────────┐
            │   PostgreSQL + PostGIS   │
            │   (precomputed views,    │
            │    geospatial queries)   │
            └─────────────────────────┘
                          │
              ┌───────────┴──────────┐
              ▼                      ▼
      Uber data exports          Bolt data exports
      (multiple report types)    (payments + trips)
```

---

### Data Import

A core challenge of the project is that Uber and Bolt each export data in different CSV formats with differing column structures, date conventions, and naming. An import pipeline has been developed to handle both platforms:

**Uber imports** cover multiple report types — trips, payments, adjustments, promotions, and summaries. Column headers are translated from the Czech-language exports provided by the platform.

**Bolt imports** handle payments and trips reports, paired by import session based on date range matching.

Driver name variations between platforms — caused by diacritics, truncation, and middle names — are resolved through a normalisation and fuzzy matching step, with ambiguous matches flagged for manual review rather than silently auto-merged.

All monetary values are stored as integers (smallest currency unit) to eliminate floating-point rounding. Every import run is logged with row counts and validation output.

---

### Dashboard & Analytics

The main dashboard provides a real-time operational summary with configurable time filters — covering a range of preset periods and a custom date range picker — along with dynamic period comparisons (current vs. prior period).

Key metrics surfaced include total and per-driver revenue, online hours, hourly and per-kilometre profitability, and platform split between Uber and Bolt. Performance monitoring sections track drivers with notable efficiency drops or low activity levels over a given period.

Dashboard performance has been materially improved through the introduction of precomputed materialised views over the core driver activity data. These views are refreshed by a scheduled background job, shifting expensive aggregation work out of the request path entirely. Slow-loading sections of the dashboard are streamed in progressively with skeleton placeholders, keeping the page responsive while data loads.

---

### Driver Management

Driver profiles aggregate data across both platforms, presenting per-driver performance charts, a fleet-wide efficiency leaderboard, and real-time activity status. Weekly targets with progress tracking are available for operators setting individual driver goals.

An inactive driver monitoring system has been implemented: a scheduled pipeline checks for drivers who have not been active beyond a configurable threshold and dispatches automated email alerts to configured recipients. An admin interface manages the recipient list, threshold settings, and a full delivery log.

---

### Vehicle Management

The fleet map is powered by **MapLibre GL** with per-vehicle markers reflecting last-known GPS positions and current status. Vehicle detail pages cover platform assignment, offline kilometres, and current driver.

Car wrap management tracks vehicles operating under advertising wrap contracts, monitoring ride milestone completions at defined intervals. A compliance dashboard shows progress across the fleet and highlights vehicles approaching or past due dates.

---

### Orders & Ride Timeline

The orders section provides a filterable view of all rides across drivers and vehicles. Order detail pages include route visualisation on MapLibre with the driven path rendered from GPS data. A ride timeline component presents the full lifecycle of a trip with playback controls and a detail overlay, useful for operational review and dispute handling.

---

### Database Design

The data model is divided into domain areas: vehicle data (locations, platform states, wrap events), driver data (profiles, activity states, revenues), ride data (orders, pricing, routes), company and payment period management, authentication, and notification infrastructure.

PostGIS is used for geospatial queries — route visualisation and GPS-based features rely on native spatial indexing and geometry types rather than application-layer coordinate manipulation.

---

## Marketing Website

The `everest-web` site presents EVEREST Solutions to business customers considering transportation services.

### Services

The site covers personal transportation (airport transfers, business travel, event transport) and cargo services, with country-specific landing pages for partner regions.

### Tech Stack

- **SvelteKit 2**, Svelte 5, TypeScript, TailwindCSS 4
- **svelte-i18n** for Czech and English translations
- **SEO**: JSON-LD structured data, Open Graph, XML sitemaps with RSS feed
- **Careers section** for driver and staff recruitment
- **Contact form** with server-side validation and email delivery
- **Deployment**: Docker + Nginx on Kubernetes

---

## Technical Challenges

### Aggregation Performance

Computing per-driver daily statistics over the full activity history is expensive. Moving this computation into materialised views and refreshing on a short schedule means the expensive work happens once, not on every dashboard page load. Concurrent refresh mode keeps reads available during refresh without locking.

### Import Robustness

Platform export formats change without notice. The import layer was built with explicit validation, row-level logging, and clear error output from the start — making it straightforward to diagnose and recover from unexpected format changes without data loss.

### Fuzzy Name Matching

Names as exported by Uber and Bolt frequently differ for the same driver. The normalisation and matching step handles common variation patterns and flags uncertain matches rather than auto-merging, keeping operator review in the loop for edge cases.

### MapLibre in a Reactive Framework

MapLibre manages its own internal state and DOM lifecycle outside of Svelte's reactivity model. A Svelte action wraps the map, handling initialisation after mount and cleanup on destroy, with reactive bindings for markers and layers sitting above that boundary. This kept map behaviour predictable without fighting the framework.

---

## Lessons Learned

1. **Precompute expensive aggregations on a schedule**: Once a query consistently takes seconds, it belongs in a background job and a precomputed view — not in the request path.

2. **Build the import layer defensively from day one**: External data sources change format without warning. Validation, logging, and clear errors in the import layer save significant operational time when changes occur.

3. **Store money as integers**: All monetary values are stored as whole units (smallest currency denomination). No rounding errors, no display inconsistencies, and a single formatting point for the entire application.

4. **Streaming improves perceived performance significantly**: Loading slow dashboard sections progressively with skeleton placeholders feels materially faster to users, even when total data load time is similar.

5. **Offline and geospatial data needs deliberate schema design**: Both the GPS location history and the materialised view approach required upfront schema decisions that would have been much more expensive to retrofit later.
