---
title: 'Niro3D: Automated 3D Printing Service Platform'
createdAt: '2025-07-26'
updatedAt: '2026-02-05'
category: 'Portfolio'
readTime: '12'
excerpt: 'A full-stack SaaS platform for on-demand 3D printing services with real-time pricing, interactive 3D previews, and automated order processing.'
coverImage: '0f3f1715-5a40-457b-2c34-ed7720920d00'
coverImageAlt: 'Niro3D 3D Printing Platform'
metaKeywords: 'SvelteKit, 3D printing, Three.js, microservices, Go, Python, e-commerce, Stripe, PostgreSQL, Redis, Docker, Kubernetes'
metaDescription: 'Niro3D is a production-ready SaaS platform for automated 3D printing services featuring real-time pricing, interactive 3D visualization, and a microservices architecture.'
tags: ['SaaS', 'Svelte', 'Go', 'Python', 'Three.js']
appLink: 'https://www.niro3d.cz'
---

## Introduction

Niro3D is a complete e-commerce platform I built for offering automated 3D printing services. Users can upload their 3D models, get instant price quotes based on material usage and print time, preview their models in an interactive 3D viewer, and order prints—all without any manual intervention.

The platform targets three main audiences:

- **Makers and hobbyists** who download models from sites like Printables or MakerWorld
- **Engineers and businesses** needing rapid prototyping with professional materials
- **Designers** wanting to sell physical prints of their digital creations

What started as a simple idea to automate quoting for 3D prints turned into a complex system involving multiple microservices, real-time 3D visualization, and a complete order management workflow.

---

## Tech Stack

### Frontend & Apps

The user-facing application and admin dashboard are both built with modern web technologies:

- **SvelteKit 5** with Svelte 5 Runes for reactive state management
- **TailwindCSS 4** + **Shadcn-Svelte** for the component library
- **Three.js** + **Threlte** for interactive 3D model visualization
- **TypeScript** throughout for type safety
- **Zod** for runtime validation
- **Sveltekit-superforms** + **Formsnap** for form management
- **Vitest** for unit testing and **Playwright** for E2E tests

### Microservices

The backend processing is handled by specialized microservices:

- **Slicer (Go)**: Analyzes 3D files, calculates volume, weight, and printability metrics
- **Converter (Python)**: Converts geometry formats (STL to GLB for web preview)
- **Renderer (Python)**: Generates static 3D model thumbnails for product listings
- **Mailer (Python)**: Handles transactional emails (order confirmations, shipping updates)

### Infrastructure

- **Database**: PostgreSQL with a normalized schema across multiple schemas (public, billing, auth)
- **Caching**: Redis for performance optimization and session management
- **File Storage**: AWS S3 (Cloudflare R2) for model files and renders
- **Payments**: Stripe for subscriptions and one-time purchases
- **Deployment**: Docker Compose for development, Kubernetes-ready for production

The entire codebase is organized as a **pnpm monorepo** with TurboRepo for build orchestration, sharing components and utilities across the main app and admin dashboard.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        User Upload                               │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                     SvelteKit App                                │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │ 3D Viewer   │  │ Price Calc  │  │ Shopping Cart & Checkout│  │
│  │ (Threlte)   │  │ (Real-time) │  │ (Stripe Integration)    │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        ▼                       ▼                       ▼
┌───────────────┐      ┌───────────────┐      ┌───────────────┐
│ Slicer (Go)   │      │ Converter (Py)│      │ Renderer (Py) │
│ Volume/Weight │      │ STL → GLB     │      │ Thumbnails    │
└───────────────┘      └───────────────┘      └───────────────┘
        │                       │                       │
        └───────────────────────┼───────────────────────┘
                                ▼
                    ┌───────────────────────┐
                    │     PostgreSQL        │
                    │  (Products, Orders,   │
                    │   Materials, Users)   │
                    └───────────────────────┘
```

---

## Key Features

### 1. Product Editor with Real-Time Pricing

The heart of the platform is the product editor. Users upload STL, 3MF, or STEP files and immediately see:

- An interactive 3D preview of their model
- Material weight calculations
- Real-time price updates as they change materials or scale
- Support for multi-part models with different materials per part

The editor handles file upload queueing, processing status, and seamlessly updates the 3D scene as each file completes analysis.

### 2. Interactive 3D Visualization

Using Three.js via Threlte (Svelte bindings for Three.js), users can:

- Rotate, zoom, and pan around their models
- See accurate material colors applied to the mesh
- Scale models volumetrically while maintaining aspect ratio
- Preview multi-color prints with different materials assigned to different parts

The viewer supports both a full-featured mode for editing and a lightweight mode for product listings and cart previews.

### 3. Material System

The platform supports multiple filament types, each with different properties:

- **PLA**: Standard, biodegradable, great for prototypes
- **PETG**: Stronger, food-safe, better layer adhesion

Each material has associated colors, and the pricing engine accounts for material density and cost per gram.

### 4. Automated Processing Pipeline

When a user uploads a model, a chain of microservices processes it:

1. **Upload → Slicer**: The Go-based slicer analyzes the geometry, calculating exact volume, surface area, and estimated print time
2. **Slicer → Converter**: The Python converter transforms the STL into GLB format for efficient web rendering
3. **Converter → Renderer**: Another Python service generates static thumbnail images for listings
4. **Results → Database**: All metadata is stored for pricing calculations and order processing

This pipeline runs asynchronously, with the frontend polling for status updates and updating the UI as each stage completes.

### 5. E-Commerce Flow

The complete purchase flow includes:

- **Shopping Cart**: Add custom uploads or pre-configured products
- **Cart Validation**: Verify items are still available and prices are current
- **Checkout**: Stripe integration with session-based payments
- **Order Tracking**: Real-time status from `pending_payment` → `in_production` → `shipped`
- **Order History**: Users can view past orders with full details

Additional features include volume discounts for bulk orders, promo codes, and guest checkout for users who don't want to create an account.

### 6. Admin Dashboard

A separate SvelteKit application provides administrators with:

- **Printer Fleet Management**: Track printers and their capabilities
- **Order Queue**: Assign print jobs to specific machines
- **Inventory Management**: Monitor filament stock and batches
- **Product Management**: Create, edit, and manage product listings
- **Component Management**: Handle individual 3D model components

---

## Database Design

The PostgreSQL database uses a normalized schema across multiple namespaces:

**Core Tables:**

- `products` - Meta-products (listings visible to users)
- `product_components` - Individual 3D parts within a product
- `filaments` & `materials` - Material properties (density, price per gram)
- `component_filaments` - Material assignments to components

**Order Management:**

- `orders` - Customer orders linked to transactions
- `printing_queue` - Job assignments to printers
- `printers` - Fleet management

**Billing & Auth:**

- `billing.transactions` - Payment records via Stripe
- `my_auth.users` - User accounts with roles

Database triggers automatically recalculate costs when material prices change or components are updated.

---

## Technical Challenges

### Real-Time Price Calculation

Calculating accurate prices requires knowing the exact volume of irregular 3D geometry. The Go slicer service reads the mesh triangles, calculates the enclosed volume using signed tetrahedron volumes, and accounts for infill percentage to determine actual material usage.

### GLB Conversion for Web

STL files are great for printing but terrible for web rendering—they're large and lack material/color data. The Python converter uses trimesh to process models and export them as GLB (binary glTF), which Three.js renders efficiently with proper PBR materials.

### Multi-Material Support

Handling products with multiple components, each with their own material selection, required careful state management. The Svelte 5 runes system made this manageable with fine-grained reactivity that updates only what changes.

---

## Performance Optimizations

- **Redis Caching**: Product catalog and session data are cached to reduce database load
- **Lazy 3D Loading**: The Three.js viewer only initializes when visible in the viewport
- **Image Optimization**: Pre-rendered thumbnails served via CDN for fast product listings
- **Database Triggers**: Automatic cost recalculation happens at the database level, not in application code

---

## Lessons Learned

Building Niro3D taught me several valuable lessons:

1. **Microservices add complexity**: While the separation of concerns is clean, managing multiple services requires good tooling (Docker Compose, health checks, logging)

2. **3D on the web is tricky**: Browser memory limits, mobile performance, and shader compilation times all needed careful handling

3. **Pricing is harder than it looks**: Material costs, machine time, waste factors, minimum charges, volume discounts—the pricing engine has more edge cases than expected

4. **Monorepos pay off**: Sharing types, components, and utilities between the main app and admin dashboard eliminated entire classes of bugs

---

## Future Plans

The platform continues to evolve with planned features including:

- Support for resin (SLA) printing with different pricing models
- Automatic orientation optimization for better print quality
- Integration with shipping carriers for automated label generation
- Public API for developers to integrate Niro3D into their applications

---

## Conclusion

Niro3D represents months of work combining web development, 3D graphics, distributed systems, and e-commerce. It's a production-ready platform that handles the complete lifecycle from file upload to delivered print, with minimal manual intervention.

The combination of SvelteKit's developer experience, Go's performance for computation-heavy tasks, and Python's ecosystem for 3D processing proved to be a solid foundation for this kind of application.
