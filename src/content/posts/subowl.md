---
title: 'SubOwl: Subscription Tracking & Management Platform'
createdAt: '2026-04-22'
updatedAt: '2026-04-22'
category: 'Portfolio'
readTime: '11'
excerpt: 'A cross-platform subscription management app covering tracking, renewal reminders, spending analytics, price comparison, and cancellation guides — available on web and mobile. Actively developed.'
coverImage: '08d94f05-150a-4ae5-2ea3-ca3372a1df00'
coverImageAlt: 'SubOwl subscription management platform'
metaKeywords: 'SvelteKit, subscription tracker, Capacitor, iOS, Android, Stripe, RevenueCat, PostgreSQL, i18n, spending analytics, cancellation guides'
metaDescription: 'SubOwl is a cross-platform subscription management application with tracking, analytics, renewal reminders, bank statement import, and cancellation guides. Built with SvelteKit and Capacitor for web and mobile. Under active development.'
tags: ['SaaS', 'Svelte', 'Mobile', 'Analytics']
appLink: 'https://subowl.co'
---

## Overview

SubOwl is a subscription management platform designed to give users clarity over their recurring payments. The average person holds more active subscriptions than they actively track — many forgotten, some unused, others significantly cheaper on an alternative plan. SubOwl surfaces all of this in one place, with renewal reminders, spending trends, price comparisons, and guided cancellation flows.

The platform is available on web and as a native mobile app (iOS and Android), and is under active development with capabilities expanded on an ongoing basis.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | SvelteKit 2, Svelte 5 Runes, TypeScript, TailwindCSS 4 |
| Mobile | Capacitor (iOS + Android from shared SvelteKit codebase) |
| UI | shadcn-svelte (bits-ui), Lucide icons |
| Data Fetching | SvelteKit Remote Functions (query / command / form) |
| Validation | Zod 4 (Standard Schema) |
| Database | PostgreSQL 17 |
| Cache | Redis |
| Auth | Session-based + Google OAuth + Apple OAuth (Arctic) |
| Payments (Web) | Stripe |
| Payments (Mobile) | RevenueCat (iOS + Android IAP) |
| Email | Python mailer service (SMTP queue) |
| CDN | Cloudflare Worker + R2 (document storage, assets) |
| i18n | English, Czech, Polish |
| Monorepo | pnpm workspaces |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│              SvelteKit App (Web + Capacitor Shell)           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────┐  │
│  │Dashboard │  │ Subscr.  │  │Analytics │  │Cancellation│  │
│  │& Calendar│  │Management│  │& Insights│  │   Guides   │  │
│  └──────────┘  └──────────┘  └──────────┘  └────────────┘  │
└─────────────────────────────────────────────────────────────┘
                         │
        ┌────────────────┴────────────────┐
        ▼                                 ▼
 PostgreSQL 17 + Redis             Stripe / RevenueCat
 (subscriptions, users,            (billing, IAP, plan
  reminders, guides)                management)
        │
        ▼
 Python Mailer + Push
 (renewal reminders,
  renewal alerts)
```

---

## Core Features

### Subscription Management

The core CRUD layer has been built with both manual entry and template-based onboarding. A library of templates covering a broad range of popular services allows users to add common subscriptions in a few taps, pre-populated with service name, billing period, and suggested pricing. Custom subscriptions support arbitrary service names, categories, currencies, and billing cycles.

Subscriptions can be marked as cancelled (retained in history) or fully deleted. Category management allows users to organise their subscriptions in whatever groupings make sense to their usage.

### Dashboard & Spending Analytics

The main dashboard presents a real-time picture of subscription spend:

- **Monthly and yearly cost** projections from current active subscriptions
- **Upcoming renewals** widget showing the next 30 days with cost and date
- **Calendar view** mapping billing dates visually across a month
- **Spending trends** chart showing month-over-month cost history
- **Category breakdown** with proportional spend per category

These views allow users to spot spending patterns, identify underused subscriptions, and project future costs before they become unexpected charges.

### Renewal Reminders

A notification pipeline dispatches reminders ahead of upcoming subscription renewals. Delivery channels include email, push notifications (via the mobile app), and in-app alerts. Reminder timing is configurable per subscription, with defaults set to give users enough time to cancel before a renewal charge.

### Cancellation Guides

Step-by-step cancellation guides have been developed for a broad range of popular services, covering the exact steps required on each platform to successfully cancel rather than just pausing. The guide content is available in multiple languages, with the current coverage expanding as new languages and services are added.

Guides are indexed for SEO and accessible without authentication, making them a content marketing entry point as well as a product utility.

### Price Comparison & Savings

A price comparison layer surfaces alternative plan options and competitive services for tracked subscriptions. AI-powered spending analysis identifies potential savings and presents them with suggested actions.

### Bank Statement Import

A CSV import flow accepts bank and credit card statements, applying smart column mapping and auto-detection to identify recurring transactions and suggest them as subscriptions to track. This reduces the friction of the initial setup for users who may have lost track of what they're subscribed to.

### Sharing Groups

A group sharing feature allows households and families to maintain a shared view of subscriptions, with duplicate detection surfacing situations where multiple members hold the same subscription independently. The shared view respects per-member privacy while still providing useful household-level aggregations.

### Document Storage

Subscription-related documents (contracts, invoices, receipts) can be attached to individual subscriptions and stored securely via Cloudflare R2. This keeps all subscription-relevant information in one place.

### Mobile App (iOS + Android)

The mobile application is built on Capacitor, which wraps the SvelteKit web application in a native shell. This approach means the web and mobile apps share a single codebase while supporting platform-native features — push notifications, Apple Sign-In, and in-app purchases via RevenueCat.

Mobile IAP is handled through RevenueCat, which abstracts the differences between Apple App Store and Google Play billing and provides a unified subscription management layer across both platforms.

### Admin Dashboard

A separate administration application covers user management, subscription template maintenance, guide content management, and platform analytics.

---

## Billing Architecture

The platform handles payments across two distinct channels:

**Web** — Stripe manages plan subscriptions and payment method management for users accessing SubOwl via browser.

**Mobile** — RevenueCat handles in-app purchases through Apple and Google's native billing systems. RevenueCat webhooks keep the platform's subscription state in sync with the app stores, allowing consistent entitlement enforcement regardless of which channel a user purchased through.

The combination means billing logic does not need to be duplicated — RevenueCat normalises the mobile billing signals into the same webhook format as Stripe, and the platform's entitlement layer responds to either.

---

## Internationalisation

The platform is built for a multilingual audience from the start. Czech and Polish are supported alongside English, covering the primary target markets. The i18n layer is threaded through all user-facing content — subscriptions, reminders, guides, marketing pages, and the onboarding flow.

Cancellation guides are localised at the content level, not just the UI, meaning the guide for a given service describes the actual cancellation interface a user in that locale would encounter.

---

## SEO & Content Strategy

Cancellation guides serve a dual purpose: product utility and organic search entry. Pages targeting queries like "how to cancel [service]" are structured with proper JSON-LD, Open Graph metadata, and canonical URLs. The blog provides supplementary content covering subscription management advice, money-saving strategies, and category-specific roundups.

---

## Technical Challenges

### Single Codebase for Web and Mobile

Capacitor wraps the SvelteKit app, but web and mobile have different interaction models — tap targets, navigation patterns, native APIs, and offline behaviour. A build mode flag controls platform-specific code paths and component variants where the difference is meaningful, without forking the codebase.

### Dual Billing Systems

Stripe and RevenueCat model subscriptions differently. A normalisation layer translates both into a consistent internal entitlement model, so the application code only deals with one concept of "user has access to plan X", regardless of how that access was purchased.

### CSV Import Reliability

Bank statements vary widely between institutions — different date formats, currency representations, column orderings, and description conventions. The import pipeline applies a series of heuristics for column detection, with explicit fallbacks and a manual mapping UI for columns that cannot be auto-detected.

### Reminder Timeliness

Renewal reminders need to arrive at the right time — not so early that users ignore them, not so late that they've already been charged. The reminder pipeline accounts for billing timezone, service processing lead times, and user-configured offsets, with a background job checking for upcoming renewals and dispatching notifications through the appropriate channel.

---

## Lessons Learned

1. **Shared web/mobile codebase is achievable but requires discipline**: Capacitor makes it straightforward to ship a mobile app from a web stack, but features that feel natural on web (hover states, multi-column layouts, browser-native form controls) need explicit mobile variants. Flagging these early prevents accumulating mobile-specific debt.

2. **RevenueCat simplifies mobile billing significantly**: Implementing App Store and Play billing directly is complex and version-sensitive. RevenueCat's abstraction layer reduces this to webhooks and a straightforward API, at the cost of an additional dependency.

3. **Bank statement parsing is a long tail problem**: The first 80% of formats are easy; the remaining 20% are corner cases that take disproportionate effort. A fallback manual mapping UI is not a cop-out — it's the correct product decision for an edge case that cannot be fully automated.

4. **SEO-driven content earns its place in the product**: Cancellation guides that rank for informational queries bring in users who are already motivated to manage their subscriptions — a better-qualified audience than generic advertising would reach.

---

## Where Things Stand

Core subscription management, dashboard analytics, renewal reminders, cancellation guides, and the mobile app are in production. Ongoing work covers expanding the service template library, extending language coverage, and building out the bank statement import for additional statement formats. The platform continues to evolve across web and mobile simultaneously.
