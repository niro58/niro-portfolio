---
title: 'Autoplakaty: In-Car Digital Signage Platform'
createdAt: '2026-04-22'
updatedAt: '2026-04-22'
category: 'Portfolio'
readTime: '11'
excerpt: 'A full SaaS platform for managing digital advertising on Android tablets deployed in vehicles across Prague — covering media management, playlist scheduling, device synchronisation, and a native offline-capable player app. Actively developed.'
coverImage: '02f42b2d-5207-4c24-0d2b-11b291554600'
coverImageAlt: 'Autoplakaty digital signage platform'
metaKeywords: 'digital signage, SvelteKit, Android, Kotlin, FCM, Cloudflare R2, SaaS, in-car advertising, playlist management, device registry'
metaDescription: 'Autoplakaty is a full-stack SaaS platform for managing in-car digital signage across a growing fleet of Android tablets in Prague vehicles. Built with SvelteKit, Kotlin, PostgreSQL, and Cloudflare R2. Under active development.'
tags: ['SaaS', 'Svelte', 'Kotlin', 'Android']
appLink: 'https://www.autoplakaty.cz'
---

## Overview

Autoplakaty is an in-vehicle advertising business operating a fleet of Android tablets installed in cars driving through Prague. Advertisers submit their creative content, the platform schedules it into playlists, and the devices display it to passengers throughout the day.

The engagement covers two distinct deliverables:

1. **The management platform** — a web-based SaaS application for organising devices, media, playlists, and campaigns
2. **The marketing website** — a customer-facing site through which advertising packages are sold

Both are under active development, with platform capabilities extended in iterations as the operation scales.

---

## The Management Platform

### Tech Stack

| Layer | Technology |
|---|---|
| Frontend | SvelteKit 2, Svelte 5 Runes, TypeScript, TailwindCSS 4 |
| UI | shadcn-svelte (bits-ui), Lucide icons |
| Database | PostgreSQL 17, Redis |
| Auth | Session-based + Google OAuth |
| Storage | Cloudflare R2 (S3-compatible CDN) |
| Device Push | Firebase Cloud Messaging (FCM) |
| Android Player | Native Kotlin (kiosk mode, offline-capable) |
| Background Services | Python (email delivery, scheduled jobs) |
| Monorepo | pnpm + Turborepo |

---

### Architecture

```
┌──────────────────────────────────────────────────────┐
│                  SvelteKit Web App                    │
│  ┌────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ Media Lib  │  │  Playlists   │  │   Devices    │  │
│  │  (R2 CDN)  │  │  & Layouts   │  │  & Registry  │  │
│  └────────────┘  └──────────────┘  └──────────────┘  │
└──────────────────────────────────────────────────────┘
             │                    │
             ▼                    ▼
      PostgreSQL 17           Firebase FCM
      + Redis Cache           (push to devices)
             │                    │
             └─────────┬──────────┘
                       ▼
            ┌─────────────────────┐
            │   Android Tablets   │
            │  (fleet in vehicles)│
            │  Kotlin Player App  │
            │  (kiosk + offline)  │
            └─────────────────────┘
```

---

### Platform Capabilities

#### Media Library

A centralised media library provides upload, organisation, and management of all advertising creatives. Image and video formats are supported, with large video files uploaded directly to Cloudflare R2 via presigned URLs to avoid routing them through the application server. Video thumbnails are generated automatically. Assets can be organised by tag and folder hierarchy, and in-use safety checks prevent accidental deletion of media that is part of an active playlist.

#### Device Registry

A device registry manages the full fleet of Android tablets. Devices are paired using a secure one-time token flow that binds each tablet's hardware identity to a database record. Once registered, devices are grouped by vehicle and operator, with status monitoring covering last-seen timestamps, current playlist assignment, and connection state. Remote commands — including targeted content pushes and cache resets — are delivered through Firebase Cloud Messaging.

#### Playlist and Layout Management

Content delivery is structured around a three-level hierarchy: a **layout** defines the screen composition (full-screen video, split screen, ticker overlay), a **playlist** is an ordered sequence of layouts with configurable durations, and **scheduling rules** allow playlists to be assigned time windows or priority levels. When multiple playlists are assigned to a device group, priority and scheduling determine which runs at any given time.

#### Content Synchronisation

When a playlist is updated, a push notification is dispatched to affected devices. The Android player fetches the updated manifest, downloads any new media to local storage, and switches to the new content once all files are cached. Playback continues uninterrupted from local storage regardless of network state — the design is offline-first so that intermittent connectivity during vehicle operation never results in blank screens.

A background polling mechanism supplements push delivery, ensuring content remains current even when push notifications are not received.

#### Playback Statistics

The player app reports playback events back to the platform, which aggregates them into per-campaign dashboards showing impression counts, device uptime, and content utilisation. These reports are surfaced to operators and, where relevant, to advertisers as campaign performance data.

#### Multi-Tenant Organisations

The platform supports multiple advertising organisations in isolation, each with their own media library, device groups, and team members. Role-based access distinguishes between administrators with full platform control and operators with content management permissions. Email-based team invitations are handled through the platform.

---

### Android Player (Kotlin)

The tablet player is a native Kotlin application running in kiosk mode — it is the sole accessible application on the device and cannot be exited by passengers. Key behaviours:

- **Offline-first playback**: All media is downloaded and cached locally before being displayed. Playback continues indefinitely without network connectivity.
- **Auto-recovery**: The application restarts automatically after crashes, reboots, or OS events.
- **Background sync**: Content updates are downloaded silently without interrupting playback.
- **Remote management**: Cache clears and forced re-downloads can be triggered from the management dashboard.

Support has been implemented across the range of hardware in the fleet.

---

## The Marketing Website

The `autoplakaty-web` site is built separately, targeting businesses considering in-vehicle advertising campaigns in Prague.

### Structure

The site covers the value proposition of mobile advertising over static formats — reach, measurability, and geographic flexibility — alongside case study content, a blog with advertising insights, and contact and inquiry flows. A FAQ section addresses common questions from prospective advertisers.

### Tech Stack

- **SvelteKit 2**, Svelte 5 Runes, TypeScript, TailwindCSS 4
- **Paraglide** for i18n (Czech and English)
- **SEO**: structured data (LocalBusiness, FAQPage, BlogPosting), Open Graph, sitemaps
- **Deployment**: Docker + Nginx on Kubernetes

---

## Technical Challenges

### Offline-First for Embedded Hardware

The most critical constraint is that tablets must never show blank screens. Network connectivity inside moving vehicles is intermittent. The solution treats the network as an optimisation — used only for syncing updates — and keeps a full local copy of the active playlist on every device at all times.

### Large Media Upload UX

Video files can be substantial in size. Routing uploads through the application server would be slow and resource-intensive. A presigned upload flow was implemented where the client requests a short-lived upload URL from the server, uploads directly to Cloudflare R2 from the browser, and the server records completion via a callback. This keeps origin traffic minimal regardless of file size.

### Push Delivery Reliability

Push notifications cannot be treated as guaranteed delivery, particularly for devices that may be in a low-power state. A periodic background polling mechanism ensures playlist freshness even when push events are missed, preventing stale content from persisting beyond a defined window.

### Kiosk Mode Across Hardware Variants

Locking an Android device to a single application requires platform-level device management APIs. Ensuring reliable kiosk behaviour across the range of hardware in the fleet required version-aware code paths and thorough testing on the actual target devices rather than emulators.

---

## Lessons Learned

1. **Offline-first forces better architecture**: Designing for zero-connectivity from the start produces a more resilient system than retrofitting offline support later. The data model, sync protocol, and player state machine are all cleaner for it.

2. **Presigned uploads are worth the extra step**: The round-trip to generate a presigned URL adds a small amount of latency but eliminates the origin bandwidth cost and eliminates upload size limits imposed by the application layer.

3. **Treat push as an acceleration, not a guarantee**: Systems that break when a push is dropped are fragile in practice. Polling as the baseline, push as the fast path, is the correct model for device fleets.

4. **Test on real hardware early**: The gap between emulator behaviour and a production device is significant. Real-device testing from the beginning of the Android work saved meaningful debugging time later.
