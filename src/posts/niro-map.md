---
title: 'Niro Map: Places Visualizer'
createdAt: '2025-09-08'
updatedAt: '2025-09-08'
category: 'Portfolio'
readTime: '2'
excerpt: 'Interactive map visualizer of popular places powered by Overture Maps Places — explore, filter and inspect ~12M points-of-interest.'
coverImage: '/posts/niro-map.webp'
coverWidth: 16
coverHeight: 9
metaKeywords: 'map visualizer, Overture Maps Places, points of interest, POI, interactive map, geospatial, SvelteKit, Tailwind CSS, self-hosted, VPS'
metaDescription: 'Interactive map visualizer for exploring 12M+ points of interest. Filter by category, search by radius, and inspect place details from Overture Maps data.'
tags: ['Website', 'Svelte', 'Maps', 'Geospatial']
appLink: 'https://www.niromap.com'
githubLink: 'https://github.com/niro58/niro-map'
---

## Tech Stack Showcase

This project was built using:

- **Frontend:**
  - SvelteKit: For a reactive user interface.
  - Tailwind CSS: For utility-first styling.
  - Shadcn UI: For pre-built components and design consistency.
- **Hosting:**
  - Self-hosted on VPS where I have manage my projects in Kubernetes
- **Backend**
  - PostgreSQL self hosted on Kubernetes
- **Analytics:**
  - Plausible: For privacy-focused web analytics.

---

## Project Description

Niro Map is a small weekend project: a simple map visualizer of popular places powered by Overture Maps Places. It lets you explore, filter and inspect points of interest on an interactive map or view a single place page. The dataset includes roughly 12 million places from around the world.

What you can do

- Explore places by category and country
- Inspect place details and source metadata
- Place a pinned area and search by radius
- Open a place in Google Maps from its location

Costs & notes

- Free to use for everyone
- Self-hosted on my VPS (database on ~1GB RAM)
- Domain ≈ $15/year, data sources are free/open
- Quick weekend proof-of-concept — some parts were implemented fast and may be flaky. Contact me if you find issues.
