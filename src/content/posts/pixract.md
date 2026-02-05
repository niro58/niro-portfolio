---
title: 'Pixract: AI Creative Tool with Node-Based Workflows'
createdAt: '2026-02-04'
updatedAt: '2026-02-04'
category: 'Portfolio'
readTime: '4'
excerpt: 'Pixract is a free, privacy-first AI creative tool that enables users to generate images, 3D models, and text using an intuitive node-based workflow editor.'
coverImage: '38fea1bb-6833-4e31-8ed0-9464a8943400'
coverImageAlt: 'Pixract node-based AI workflow editor interface'
metaKeywords: 'AI image generator, node-based workflow, 3D model generation, text generation, Google Gemini, Meshy, privacy-first AI tool, free AI creative tool'
metaDescription: 'Pixract is a free, privacy-first AI creative tool for generating images, 3D models, and text. Features node-based workflows, cascade regeneration, and local-only storage.'

tags: ['Website', 'Svelte', 'AI', 'Three.js']

appLink: 'https://pixract.com'
---

## What is Pixract?

Pixract combines the power of modern AI models with a visual node-graph interface, allowing users to create complex generative workflows. Whether you're designing images, generating text content, or creating 3D models, the node-based approach lets you connect different AI capabilities and iterate on your creative vision.

All data is stored locally on your device — nothing is stored on external servers. Your creative work stays private.

---

## Key Features

### Image Generation

- Create images using Google Gemini (Gemini 3 Pro and Gemini 2.5 Flash)
- Multiple aspect ratios: 1:1, 2:3, 3:2, 3:4, 4:3, 9:16, 16:9, 21:9
- Quality settings: 1K, 2K, 4K
- Reference-based image variations

### Text Generation

- Generate text using multiple Gemini models
- Gemini 3 Pro Preview, Gemini Flash Latest, Gemini 2.5 Pro

### 3D Model Creation

- Generate 3D models using Meshy 4
- Text-to-3D and Image-to-3D conversion
- GLB format support with live 3D preview

### Node-Based Workflow Editor

The core of Pixract is its visual node editor with various node types:

- **Image Creator** — Main image generation node
- **Created Image** — Stores and displays generated images
- **Update Image** — Modifies existing images
- **Image Reference** — Uses images as input for other nodes
- **Text Creator** — Generates text content
- **Text Reference** — Uses text as input for other nodes
- **3D Creator** — Generates 3D models
- **Color Reference** — Uses colors as input parameters

### Cascade Regeneration

When you modify an upstream node, all connected downstream nodes automatically regenerate. This enables rapid iteration on complex workflows without manually updating each node.

### Data Management

- **Local Storage**: All data stored in IndexedDB (browser-based)
- **Image Library**: Browse all generated images with full-text search
- **Scene Management**: Create and manage multiple workspace projects
- **Import/Export**: Share and backup your scenes

---

## Tech Stack

- **Frontend:**
  - SvelteKit 5: For a reactive, modern user interface
  - XYFlow/Svelte: For the node-graph visualization
  - Three.js with Threlte: For 3D model preview
  - Tailwind CSS 4: For utility-first styling
  - Bits UI & Shadcn: For pre-built components

- **Storage:**
  - IndexedDB: Fully local, browser-based storage
  - Repositories for images, nodes, edges, 3D models, and scenes

- **AI Integration:**
  - Google Generative AI (Gemini models)
  - Meshy API (3D generation)

- **Hosting:**
  - Self-hosted on Kubernetes
  - Docker-ready deployment

---

## Privacy First

Pixract takes a privacy-first approach:

- No server-side storage of your content
- API calls go directly to AI providers
- Your creative work stays on your device
- You control your API keys

---

## Pricing

Pixract itself is free. Users pay only for the AI generation costs directly to the providers:

| Generation Type | Cost Range              |
| --------------- | ----------------------- |
| Image           | $0.03 - $0.24 per image |
| 3D Model        | $0.15 - $0.30 per model |

---

## Who is it for?

- **Creative Professionals** — Designers, artists, and 3D creators
- **Content Creators** — Bloggers and social media creators needing AI-generated assets
- **Privacy-Conscious Users** — Those concerned about data privacy with cloud-based AI tools
- **Budget-Conscious Creators** — Free tool, pay only for API usage
