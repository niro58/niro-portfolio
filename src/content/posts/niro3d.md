---
title: 'Niro3D: Automated 3D Printing Service Platform'
createdAt: '2025-07-26'
updatedAt: '2026-04-22'
category: 'Portfolio'
readTime: '12'
excerpt: 'A full-stack platform for on-demand 3D printing services — covering automated pricing, interactive 3D previews, a product configurator system, and end-to-end order processing. Actively developed.'
coverImage: '244eda23-a6aa-400c-9f55-993080983a00'
coverImageAlt: 'Niro3D 3D Printing Platform'
metaKeywords: 'SvelteKit, 3D printing, Three.js, microservices, Go, Python, e-commerce, Stripe, PostgreSQL, Redis, Docker, Kubernetes, template configurator'
metaDescription: 'Niro3D is a production-grade platform for automated 3D printing services featuring real-time pricing, interactive 3D visualization, a product configurator, and a complete microservices architecture. Under active development.'
tags: ['SaaS', 'Svelte', 'Go', 'Python', 'Three.js']
appLink: 'https://www.niro3d.cz'
---

## Overview

Niro3D is an e-commerce platform built for offering automated 3D printing services. Customers can upload their own 3D models or configure ready-made products through an interactive interface, receive instant price quotes based on material usage and print time, preview their work in a browser-based 3D viewer, and place orders — all without manual intervention at any step.

The platform addresses three distinct customer segments:

- **Makers and hobbyists** working with downloaded models from community repositories
- **Engineers and businesses** with rapid-prototyping requirements
- **Gift and personalisation buyers** looking for custom printed products with specific text, shapes, or imagery

The project has been in active development since mid-2025 and continues to expand, with new product categories and platform capabilities added on an ongoing basis.

---

## Tech Stack

### Frontend & Apps

- **SvelteKit 2** with **Svelte 5 Runes** for fine-grained reactive state management
- **TailwindCSS 4** + **Shadcn-Svelte** for the component library
- **Three.js** + **Threlte** for interactive 3D visualisation and custom shader materials
- **TypeScript** throughout for type safety
- **Zod** for runtime validation
- **Sveltekit-superforms** for form management

### Processing Services

- **Slicer (Go)**: Analyses 3D geometry via a slicing engine, calculating volume, weight, print time, and cost
- **Converter (Python + trimesh)**: Converts STL/3MF geometry to GLB format for browser rendering
- **Renderer (Python + headless OpenGL)**: Generates static thumbnail images from 3D models
- **Mailer (Python + Jinja2)**: Handles transactional email delivery
- **Image Resizer (Cloudflare Worker)**: On-the-fly CDN image transforms served from object storage

### Infrastructure

- **Database**: PostgreSQL 17 with separate schemas for application data and authentication
- **Caching**: Redis for session management and catalog performance
- **File Storage**: Cloudflare R2 for models, renders, and review images
- **Payments**: Stripe with embedded checkout sessions and webhook-based order lifecycle
- **Deployment**: Kubernetes for the web applications; containerised services deployed to cloud compute via infrastructure-as-code; tagged release pipelines handle each component independently
- **Monorepo**: pnpm workspaces + Turborepo for build orchestration

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Customer Browser                        │
└─────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                     SvelteKit App                            │
│  ┌───────────┐  ┌────────────┐  ┌───────────┐  ┌─────────┐  │
│  │ 3D Viewer │  │Configurator│  │  Catalog  │  │Checkout │  │
│  │ (Threlte) │  │ & Pricing  │  │ + Upload  │  │(Stripe) │  │
│  └───────────┘  └────────────┘  └───────────┘  └─────────┘  │
└─────────────────────────────────────────────────────────────┘
                               │
       ┌───────────────────────┼────────────────────┐
       ▼                       ▼                    ▼
┌─────────────┐      ┌──────────────┐      ┌──────────────────┐
│ Slicer (Go) │      │Converter (Py)│      │  Renderer (Py)   │
│ Geometry    │      │ STL → GLB    │      │  GLB → PNG       │
│ + Pricing   │      │ (trimesh)    │      │  (headless GL)   │
└─────────────┘      └──────────────┘      └──────────────────┘
       │                       │                    │
       └───────────────────────┼────────────────────┘
                               ▼
                 ┌─────────────────────────┐
                 │       PostgreSQL 17      │
                 │  Products, Orders,       │
                 │  Templates, Filaments    │
                 └─────────────────────────┘
                               │
                 ┌─────────────┴────────────┐
                 ▼                          ▼
          Cloudflare R2             Cloudflare Worker
          (File Storage)            (Image CDN)
```

---

## Key Capabilities

### Product Configurator

A product configurator system has been developed to allow customers to order custom-printed products without uploading their own files. Generator modules cover a growing range of product categories — including name-based keychains and script-style variants, desk accessories, Spotify-themed gifts, decorative wall pieces, and custom SVG art conversions. New categories are introduced iteratively as the product range expands.

Each generator implements a shared interface covering parameter definitions, 3D preview, and pricing rules. Parameters feed directly into the pricing engine and the in-browser 3D scene, so customers see both a live price and an accurate visual before adding to cart.

### Isomorphic Pricing Engine

Pricing logic is implemented as a shared package that runs identically in the browser and on the server. This ensures the price shown during configuration matches exactly what is validated at checkout, without a server round-trip for every customer interaction.

The engine is rule-based and composable, supporting cost scaling by character count, size tiers, optional add-on flags, dropdown-based surcharges, uploaded image processing fees, and per-material multipliers.

### 3D Viewer with Shader Materials

The Three.js viewer, integrated via Threlte, handles standard PBR material rendering as well as custom shader materials for specialty filaments — including smooth gradient blends and metallic shimmer effects. Viewer initialisation is deferred until the component enters the viewport, and a lightweight mode is used for catalog listings and cart previews.

### Automated Processing Pipeline

When a custom model is uploaded, a chain of services processes it asynchronously:

1. The slicing service analyses the geometry, runs it through the configured slicing tooling, and calculates weight, print time, and cost. Defensive handling is in place for edge cases in off-the-shelf slicing software.
2. A conversion service transforms the geometry into a web-optimised format for the browser viewer.
3. A rendering service generates static thumbnail images for the product listing.
4. Results are written back to the database; the frontend reflects processing status in real time.

Template-configured products bypass this pipeline — pricing is calculated by the shared engine, and preview renders are pre-generated from known parameter combinations.

### E-Commerce Flow

The platform supports both guest and authenticated purchase flows. Cart contents can mix custom-upload items and configured template products. Checkout is handled through an embedded Stripe session, and order status transitions are driven by webhook events. Customers with accounts have access to their full order history.

### Customer Reviews

A verified review system has been implemented, gated at the database level to confirmed purchasers. Verified customers can submit star ratings and attach review images, which are stored in object storage and displayed on product pages.

### Marketplace Integrations

Export tooling has been developed for third-party marketplace and shopping feed integrations, supporting the business's presence across multiple sales channels.

### Admin Dashboard

A separate administration application provides operational tools: order queue management with printer assignment, template and product management, filament inventory tracking, and a material shader preview tool for validating visual effects before publishing.

---

## Database Design

The schema is divided into two areas:

**Application data** covers the product catalogue, component and material relationships, the template and configurator system, orders and fulfilment, review content, and an asynchronous mail queue.

**Authentication** handles user accounts, session management, and credential flows.

Triggers ensure derived costs are recalculated automatically when material prices or component configurations change, keeping pricing consistent without application-level orchestration.

---

## Technical Challenges

### Slicing Tooling Integration

Integration with off-the-shelf slicing software required defensive handling of a range of edge cases: malformed geometry files, platform-specific parsing quirks, and ensuring that user-configured print settings persist correctly across re-slice operations rather than being silently overwritten.

### Template Geometry & Printability

Generating parametric 3D geometry from user inputs (text, dimensions, shape choices) requires careful validation that the resulting mesh is actually printable — watertight, within bed dimensions, and free of inverted normals. Each template went through multiple geometry iterations before reaching production.

### Isomorphic Pricing

The pricing engine runs in the browser for live updates and on the server for order validation. Keeping both in sync required isolating it as a pure TypeScript package with no environment dependencies — no DOM, no Node.js globals.

### Web-Optimised 3D Formats

Source geometry formats are optimised for printing, not browser rendering. The conversion service processes models into binary glTF (GLB), which renders efficiently with Three.js. Multi-part files required preserving per-component material assignments through the conversion.

---

## Performance Considerations

CDN image serving is handled at the edge by a Cloudflare Worker, eliminating origin requests for product thumbnails. The 3D viewer defers initialisation to avoid blocking page load. Session and catalogue data are cached to reduce database load on high-traffic pages. Cost recalculation is handled at the database level rather than in application code.

---

## Lessons Learned

1. **Microservices add operational surface area**: Separation of concerns is clean, but health checks, retry logic, and cross-service observability are as load-bearing as the business logic itself.

2. **3D in the browser is constrained by mobile**: Shader compilation times, WebGL context limits, and memory pressure all needed explicit handling — particularly for lower-end devices.

3. **Pricing has more edge cases than expected**: Per-character costs, minimum charges, volume discounts, material multipliers, and add-on surcharges each added complexity. The rule-based engine paid for itself quickly.

4. **Monorepos surface breaking changes early**: Sharing types, pricing logic, and utilities between the customer app, admin dashboard, and scripts meant any incompatible change is caught at compile time rather than at runtime.

5. **Building a configurator from first principles is necessary**: Off-the-shelf product configurators don't exist for 3D printing. Full ownership of the engine gave control over pricing, rendering, and the checkout integration that would not have been possible with a third-party tool.

---

## Where Things Stand

The platform is in active production and continues to receive regular updates. Current work is focused on expanding the product configurator range, improving the material visualisation system, and extending marketplace integrations. The architecture is designed to accommodate new product categories and service types without structural changes to the core platform.
