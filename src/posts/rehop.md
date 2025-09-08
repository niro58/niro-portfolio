---
title: 'ReHop : URL Shortener, QR Generator'
createdAt: '2025-09-08'
updatedAt: '2025-09-08'
category: 'Portfolio'
readTime: '2'
excerpt: 'Link management: branded short links, customizable QR codes, and privacy-first analytics.'
coverImage: '/posts/rehop.webp'
coverWidth: 16
coverHeight: 9
metaKeywords: 'URL shortener, link management, QR code generator, link analytics, branded links, SvelteKit, Tailwind CSS, Go, Kubernetes, gRPC, Supabase, privacy-focused, ReHop'
metaDescription: 'ReHop is a platform to shorten URLs, generate QR codes, and track clicks. Built with SvelteKit and Go, self‑hosted on Kubernetes.'
tags: ['Website', 'Svelte', 'Go', 'Kubernetes', 'Analytics', 'QR']
appLink: 'https://www.rehop.io'
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
  - Go API, with gRPC for communication and type sharing between frontend and backend.
  - PostgreSQL hosted on Supabase
- **Analytics:**
  - Plausible: For privacy-focused web analytics.

---

### Project Description

ReHop is an all-in-one platform for managing your links.

- Branded URL Shortening
- Analytics if you dont have your own (visitors, devices and locations)
- QR Code Generation, with custom designs, logo, free export to svg or png, everything local-sided so your data is safe.

The web app provides a clean dashboard built for simplicity. Easily manage links individually, organize them into folders, and rest assured that our system ensures your external analytics tools correctly detect the original traffic source.

### Why I built it

I built this project as I have finished my template for saas projects which includes payments, full auth, mailer, gRPC setup, self-hosting on kubernetes and more. My first project with it is ReHop. Also I couldn't think of a project where I'd be able to use charts and analytics, so I thought why not go with a URL shortener with analytics.
