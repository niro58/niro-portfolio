---
title: 'Lucky Autoservis: Multilingual Car Service Platform'
createdAt: '2025-07-26'
updatedAt: '2026-04-22'
category: 'Portfolio'
readTime: '9'
excerpt: 'A multilingual web platform for an established Prague auto shop — online reservations with dynamic service pricing, programmatic SEO across thousands of localized pages, and dedicated content for both private customers and taxi professionals.'
coverImage: '61031108-0abf-4a75-92eb-2a753000da00'
coverImageAlt: 'Lucky Autoservis website'
metaKeywords: 'car repair shop website, SvelteKit, Paraglide, SEO, multilingual, online reservation, Kubernetes, Tailwind CSS, Svelte 5'
metaDescription: 'Lucky Autoservis is a multilingual platform for a Prague car repair shop, delivering online reservations, dynamic pricing, programmatic SEO at scale, and bilingual Czech/Russian content. Under active development.'
tags: ['Website', 'Svelte', 'SEO']
appLink: 'https://www.lucky-auto.cz'
---

## Overview

Lucky Autoservis is an established car service shop in Prague with a consistent local customer base and a broad range of services covering everything from seasonal tyre work to full vehicle diagnostics and body styling. The engagement started as a marketing website and has since grown into a multilingual platform with a reservation system, dynamic pricing, and a large-scale programmatic SEO layer that continues to expand.

The platform is under active development, with content coverage and feature capabilities being extended on an ongoing basis.

---

## Tech Stack

- **Framework**: SvelteKit 2, Svelte 5 with Runes
- **Styling**: TailwindCSS 4, Shadcn-Svelte (bits-ui)
- **i18n**: Paraglide — compile-time, type-safe translations with zero runtime overhead
- **Languages**: Czech (primary) + Russian
- **SEO**: Structured data (JSON-LD), Open Graph, canonical URLs, XML sitemaps
- **Analytics**: Plausible (self-hosted, privacy-first)
- **Images**: Cloudflare Images with on-the-fly resizing
- **Hosting**: Kubernetes (self-hosted), Nginx, Docker

---

## Services Covered

The platform covers the full range of services offered by the shop, organised into clear service categories:

**Tyre service** — seasonal changeovers, wheel balancing, and support for extended tyre types including run-flat. Sizes from compact to premium large-diameter fitments are covered.

**Brake service** — full system replacements, fluid changes with system bleeding, and suspension diagnostics.

**Vehicle inspections** — multi-point health checks, pre-MOT assessments with defect resolution, and manufacturer-specification maintenance scheduled by VIN.

**Diagnostics** — error code reading and clearing, advanced electronic fault investigation, and specialist coding procedures.

**Wrap and styling** — custom graphic vehicle wraps, paint protection film application, and window tinting.

**Wheel geometry** — precision measurement using CCD and 3D camera technology, full geometry adjustment including specialist vehicle types.

---

## Reservation System

An online booking flow has been implemented to allow customers to schedule service appointments directly from the website. The flow covers service category and job selection, date and time slot picking, vehicle details, and contact confirmation.

Service pricing is loaded from the database and presented in structured price tables before the customer commits — making costs transparent before any appointment is booked. The system includes VAT breakdowns and per-service scope notes.

A dedicated section addresses the needs of professional taxi drivers, who represent a meaningful segment of the customer base. Express service options, flexible scheduling, and cost-efficient packages for high-mileage vehicles have been highlighted here as part of the site's content strategy.

---

## SEO Architecture

A significant part of the work has been building out a programmatic SEO layer that generates a large volume of targeted, localised content pages. The approach follows a content matrix model: service types, vehicle manufacturers, specific models, and geographic areas are combined to create pages targeting long-tail search queries across both languages.

The content areas currently covered include:

- **Manufacturer pages** — one per brand, covering compatible services and common maintenance patterns
- **Model pages** — per vehicle model under each manufacturer, with service-relevant content
- **Service-city pages** — targeting service queries tied to specific Prague districts and surrounding areas
- **Blog** — seasonal advice, how-to articles, and service comparisons
- **Service detail pages** — structured pages for each service category

Content generation is treated as an ongoing effort rather than a one-time build. New manufacturers, models, and geographic areas are added iteratively as coverage expands.

Every page carries structured data appropriate to its type — FAQ schema on service and home pages, breadcrumb navigation, LocalBusiness data with geo-coordinates and opening hours, and WebSite schema at the root. Hreflang annotations and a language-split sitemap ensure both versions are indexed correctly.

---

## Multilingual Setup

The site is fully bilingual using **Paraglide**, which compiles translation keys into type-safe TypeScript functions at build time. This eliminates runtime i18n overhead and provides full autocomplete for every translation key in the codebase.

The Russian-language version mirrors the complete content structure under a separate URL path (`/ru/...`), including blog posts, manufacturer pages, model pages, and city pages. Separate canonical URLs and hreflang annotations ensure search engines treat each language as its own indexed content rather than duplicate content.

---

## Route Structure

```
/                               Home
/services                       Service overview
/services/[category]            Category page
/services/city/[city]           City-specific page
/services/manufacturer/[brand]           Brand page
/services/manufacturer/[brand]/[model]   Model page
/reservation                    Online booking
/blog / /blog/[slug]            Articles
/about / /contact / /terms      Static pages
/ru/...                         Russian mirrors of all above
```

The route structure continues to evolve as new content areas and features are introduced.

---

## Deployment

The application runs as a Docker container orchestrated by Kubernetes, with Nginx handling SSL termination and HTTP/HTTPS routing in front of the ingress. Deployments are triggered via GitHub Actions on tagged releases, with zero-downtime rolling updates.

---

## Lessons Learned

1. **Programmatic SEO requires genuine content, not templates**: Thin pages generated purely for keyword coverage get deindexed. Every page at scale needs to offer something useful to a reader, not just search engine signals.

2. **Multilingual is a force multiplier with relatively low marginal cost**: Once the component architecture and i18n pipeline are in place, adding a second language largely reuses existing work while opening a meaningfully different customer segment.

3. **Compile-time i18n beats runtime loading**: Paraglide's approach — generating typed functions from translation files at build time — gives type safety, no runtime bundle cost, and faster cold starts compared to libraries that load locale JSON at page load.

4. **Pricing data needs careful schema design**: Storing booked slots, service categories, and pricing snapshots requires deliberate modelling to prevent stale price references from surfacing in confirmed bookings.
