---
title: 'Road Transportation Marketplace: Bus Booking, Parcels & Live Tracking for Diaspora Corridors'
createdAt: '2026-03-07'
updatedAt: '2026-07-05'
category: 'Portfolio'
readTime: '12'
excerpt: 'A Bolt/Uber-style marketplace connecting passengers with independent bus carriers across Eastern-European diaspora corridors — seat booking, parcel shipping, Stripe Connect payouts, real-time GPS tracking, and an 8-language SEO surface of 8,400+ pages. Built as an SEO-first demand engine before carriers exist.'
coverImage: 'e1e43b0d-7fa1-4b47-3bcb-22a2f4ceaa00'
coverImageAlt: 'Road transportation marketplace — bus booking, parcels, and live GPS tracking'
metaKeywords: 'SvelteKit, bus marketplace, Stripe Connect, programmatic SEO, hreflang, PostgreSQL, Leaflet, Server-Sent Events, Capacitor, Twilio, Viber, svelte-i18n, remote functions, parcel shipping, multi-leg routes'
metaDescription: 'A SvelteKit bus-carrier marketplace for Eastern-European corridors: seat booking, parcels, Stripe Connect payouts, SSE GPS tracking, and 8-language programmatic SEO across 8,400+ URLs.'
tags: ['SaaS', 'Svelte', 'Marketplace', 'SEO', 'Mobile']
githubLink: 'https://github.com/niro58/road-transportation-app'
---

## Overview

This project is a marketplace intermediary — structurally similar to Bolt or Uber — that connects passengers with independent bus carriers operating across Eastern-European diaspora corridors. Routes like Prague to Kyiv or Warsaw to Chișinău are today served by a fragmented mix of small operators who advertise through Viber groups, Facebook posts, and word of mouth. The platform aggregates that supply into a single searchable, bookable surface, facilitates the transaction, and takes a commission. Crucially, it is not the transport provider: carriers hold the licenses, insurance, and tax obligations, and the platform's legal role is limited to facilitating bookings and collecting a service fee.

The intended audience is twofold. Passengers — largely members of the Eastern-European diaspora traveling between their country of residence and their country of origin — get price comparison, seat selection, parcel shipping, and live bus tracking. Carriers get a booking channel, fleet and route management, dynamic pricing, analytics, and automated payouts. A distinctive strategic choice underpins the whole system: the SEO layer is built *first*, so route pages rank in Google and collect demand data before any carrier has signed up, and that demand becomes the sales pitch to onboard carriers.

The codebase is a pnpm/turborepo monorepo built with SvelteKit 2 and Svelte 5, with a feature set spanning six roadmap phases. Most phases are complete in the repository — SEO foundation, the core booking platform, dashboards, real-time tracking, payouts, and expansion features such as multi-leg connecting routes and corridor communities. The Capacitor mobile app is in progress and App Store submission is still pending, and there is no public live site yet.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | SvelteKit 2, Svelte 5 Runes, TypeScript, Tailwind CSS 4 |
| UI | shadcn-svelte (bits-ui), Lucide icons |
| Data Fetching | SvelteKit Remote Functions (query / command) |
| Forms | sveltekit-superforms + formsnap + Zod |
| Database | PostgreSQL 17 (pg driver, no ORM) |
| Auth | Session-based (Argon2) + Google OAuth (Arctic), multi-role |
| Payments | Stripe — Payment Intents, Connect (Express), webhooks |
| Maps | Leaflet + OpenStreetMap, Server-Sent Events for live tracking |
| Email | Python mailer service (SMTP, Jinja2 templates) |
| SMS | Twilio REST API + Viber Business Messages fallback |
| Push | Web Push (VAPID) |
| i18n | svelte-i18n — 8 languages (EN, RO, RU, UK, CS, PL, DE, FR) |
| Mobile | Capacitor 8 (iOS / Android) |
| Build | pnpm workspaces + turborepo, adapter-node |

---

## Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│         SvelteKit App (adapter-node) + Capacitor Shell            │
│                                                                    │
│  [lang=lang]/*     auth/*      dashboard/*   admin/*    api/*      │
│  ┌───────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐  ┌───────┐ │
│  │ Public SEO│  │  Login / │  │  Driver /│  │Platform│  │ REST  │ │
│  │ + Booking │  │  OAuth   │  │  Carrier │  │ Admin  │  │+ v1   │ │
│  │ 156 routes│  │          │  │Dashboards│  │        │  │Carrier│ │
│  └───────────┘  └──────────┘  └──────────┘  └────────┘  │  API  │ │
│                                                          └───────┘ │
│   Remote functions (query/command)  ·  hooks.server.ts guard chain │
└──────────────────────────────────────────────────────────────────┘
                                 │
        ┌────────────────────────┼────────────────────────┐
        ▼                        ▼                         ▼
┌────────────────┐   ┌───────────────────────┐   ┌──────────────────┐
│ PostgreSQL 17  │   │  Notification         │   │  Stripe Connect  │
│  my_auth       │   │  Dispatcher + Cron    │   │  destination     │
│  billing       │   │  ┌─────┬─────┬──────┐ │   │  charges,        │
│  transport(~50)│   │  │ SMS │Viber│ Push │ │   │  application_fee │
│  public        │   │  ├─────┴─────┴──────┤ │   │  (commission)    │
└────────────────┘   │  │ Email │ In-app   │ │   └──────────────────┘
        │            │  └───────┴──────────┘ │
        ▼            └───────────────────────┘
┌────────────────┐              │
│ SSE Tracking   │              ▼
│ /api/tracking  │      ┌───────────────┐
│ + 30s polling  │      │ Python Mailer │
│ fallback       │      │ polls mail_   │
│ (Leaflet/OSM)  │      │ logs, SMTP    │
└────────────────┘      └───────────────┘
```

---

## Core Features

### Programmatic Route Pages & the Demand Engine

The foundation of the platform is a set of programmatically generated corridor pages — on the order of 500 route pages, each rendered in all eight languages. These exist independently of live inventory: a page for a corridor can rank and collect demand signals (route requests, price alerts, waitlist sign-ups) before any carrier is listed on it. The `route_pages` table and the `demand.ts` and `route-pages.ts` server modules back this, and the strategy is explicitly encoded in the roadmap as "rank in Google for every major corridor, collect demand data, use as a sales pitch to onboard carriers." Multi-language content — city names, route descriptions, blog posts — is stored in JSONB columns rather than duplicated per locale.

### Seat Selection & Booking

The booking flow is a five-step wizard: seats, passengers, extras, payment, confirmation. Carriers can operate either assigned-seat vehicles or general-admission buses, and the seat layout and vehicle amenities are modeled in the `vehicles` migration. Seats are held for 15 minutes during checkout to prevent double-booking, and a passenger can book on behalf of others — a deliberate accommodation for the "grandchild books a ticket for a grandparent" pattern common in this market. On confirmation, a QR code is generated for the ticket, which also works offline for boarding.

### Three Payment Methods

Checkout supports card payments via Stripe Payment Intents, cash paid to the driver on board, and bank transfer. Cash and bank transfer both reserve the booking online and settle later, and an online-payment discount is used as an incentive to shift users away from cash — which matters because cash bookings can't have commission auto-deducted and must be invoiced to carriers monthly instead.

### Parcel Shipping

Parcel shipping is a first-class feature rather than an afterthought: passengers and senders can dispatch packages along the same bus routes, with photo proof of handover, status history, and SMS notifications to the receiver as the parcel moves. The `parcels.ts` module (one of the larger domain modules in the codebase) and the `018_parcels` migration cover parcel bookings, status history, and per-carrier parcel configuration.

### Real-Time GPS Tracking

Live bus tracking is delivered over Server-Sent Events rather than WebSockets — a deliberate choice for a unidirectional stream that auto-reconnects and degrades gracefully. The driver's device posts its position to `/api/tracking/update` roughly every ten seconds; passengers subscribe to `/api/tracking/[tripId]/stream`, with a 30-second polling endpoint as a fallback for unreliable mobile connections in border regions. The map is rendered with Leaflet over OpenStreetMap tiles, showing the bus marker, route stops, and ETA. Tracking links can be shared with a token so family can follow a journey without an account, and location data is auto-purged 24 hours after a trip completes for privacy.

### Driver, Carrier & Platform Dashboards

Three distinct operational surfaces sit behind authentication, gated by a many-to-many role model (`passenger`, `carrier_admin`, `driver`, `platform_admin`):

- **Driver dashboard** — passenger manifest, boarding check-in, cash collection tracking, delay reporting, and a QR/barcode scanner (via the MLKit Capacitor plugin), with an offline mode for stretches without signal.
- **Carrier admin** — fleet and route management, revenue and demand analytics, manifest export, and dynamic pricing rules.
- **Platform admin** — carrier approval, dispute handling, fraud monitoring, financial reporting, and a full audit log, spread across fourteen admin route groups (analytics, audit, bookings, carriers, cities, communities, demand, disputes, finance, insurance, loyalty, promos, users, and blog).

### Multi-Leg Connecting Routes

Where no single carrier covers a corridor end to end, the platform can stitch legs from different carriers into one itinerary with a unified checkout. The standout piece here is **connection protection**: the `connection-protection.ts` module continuously evaluates whether a delay on the first leg puts the second leg at risk, and if so, automatically rebooks the passenger onto a later trip or issues a refund — insulating the traveler from a risk they didn't create.

### Notifications Across Five Channels

A central dispatcher routes each notification to the right channel: SMS via the Twilio REST API (used directly through `fetch()`, with no SDK, to keep dependencies lean), Viber Business Messages as a fallback because many Eastern-European users prefer Viber over SMS, Web Push via VAPID, transactional email through the Python mailer, and always an in-app record in PostgreSQL. A cron scheduler drives time-based notifications such as trip reminders 24 hours and 2 hours before departure.

### Carrier API & Community

A versioned REST API under `/api/v1` exposes bookings, trips, parcels, usage metering, and webhooks so larger carriers can integrate their own systems. Corridor-based communities give travelers on a route a place to post, reply, and self-moderate — turning the informal Viber/Facebook groups the market currently relies on into a first-party feature.

---

## Technical Highlights

### An SEO Surface of 8,400+ URLs

The programmatic SEO layer is the platform's growth engine, and it is engineered accordingly. Across eight languages the indexable surface is on the order of 8,400+ URLs — roughly 4,000 route pages, 1,600 city hubs, 1,600 parcel-route pages, plus carrier profiles, blog posts, and country pages. Each localized page emits correct `hreflang` alternates (wired through nearly every public route: routes, cities, carriers, trips, blog, community), and structured data is generated per page type — Schema.org `Trip` for bus routes, `Place`, `WebSite` with a search action, `FAQPage`, `BreadcrumbList`, and `Article` for the blog. The `sitemap.xml` and `sitemap-[type].xml` endpoints, a `robots.txt` endpoint, and an on-the-fly Open Graph image endpoint (`/api/og`) round out the technical SEO. The hardest part of programmatic SEO at this scale is avoiding thin-content penalties across thousands of near-identical templates; grounding each page in real demand data and localized content is what keeps them substantive rather than boilerplate.

### Remote Functions as the Data Layer

Rather than the conventional `+page.server.ts` load pattern, essentially all data access goes through SvelteKit remote functions — `query()` for reads and `command()` for writes, defined in `data.remote.ts` files colocated with routes. Each is a type-safe RPC endpoint with Zod validation at the boundary, and the server-side domain logic lives in roughly forty modules under `lib/server/transport/` (bookings, search, connections, community, payments, and so on). There is no ORM; queries are written directly against PostgreSQL through the `pg` pool, and the schema is split into four namespaces — `my_auth`, `billing`, `transport` (around fifty tables), and `public` — across 37 migration files.

### Marketplace Payouts with Stripe Connect

Carrier payouts run on Stripe Connect Express accounts using destination charges: the platform owns the customer relationship, and the commission is taken as the `application_fee_amount` on each charge. Commission defaults to 10% but is configurable per carrier via a `carrier_commission` table, so onboarding incentives (Phase 1 is free for carriers; Phase 2 introduces commission plus a listing fee) can be expressed in data rather than code. Cash bookings, which can't route through Stripe, are tracked separately and reconciled by monthly invoice.

### One Codebase, Web and Mobile

The mobile app wraps the SvelteKit application in a Capacitor 8 shell (a separate static SPA build config drives the native bundle), sharing a single codebase across web, iOS, and Android. Native capabilities are pulled in as needed — geolocation for driver tracking, push notifications, MLKit barcode scanning for ticket check-in, haptics, network status, and share. This is the one area still in active progress: the shell and plugins are wired, but store submission remains on the backlog.

---

## Challenges

**SMS-first in a low-trust delivery environment.** The target market skews toward phone over email, and toward Viber over SMS. Rather than lean on a single provider, the notification layer tries Twilio first and falls back to Viber Business Messages on failure, logging every attempt to `sms_logs`. Building this directly on the Twilio REST API — no SDK — keeps the dependency surface small and the failure modes explicit.

**Real-time tracking over unreliable networks.** Buses on these corridors cross borders and pass through areas with patchy coverage. SSE with automatic reconnection handles the happy path cheaply, but a 30-second polling fallback ensures a passenger still sees movement when the stream can't hold. Auto-cleanup of location history after 24 hours keeps the privacy footprint small.

**Protecting connections the platform assembled.** Multi-leg journeys created from independent carriers introduce a failure mode the passenger never opted into — a missed transfer caused by someone else's delay. The connection-protection module turns that from a support ticket into an automated rebook-or-refund, which is the kind of guarantee that makes a stitched-together itinerary trustworthy enough to sell.

---

## Where Things Stand

The repository implements a broad marketplace: the SEO and demand engine, the full booking and parcel flows, three-channel payments, real-time tracking, driver/carrier/platform dashboards, Stripe Connect payouts, multi-leg connecting routes with protection, corridor communities, a carrier API, and loyalty, insurance, and referral systems. The Capacitor mobile app is the main piece still in progress, with store submission pending, and the platform has not yet launched publicly. The design bet throughout is consistent: rank first, prove demand, then bring carriers to the supply the demand data has already mapped.
