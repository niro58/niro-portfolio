---
title: 'QR Code Generator'
createdAt: '2026-01-27'
updatedAt: '2026-01-27'
category: 'Portfolio'
readTime: '2'
excerpt: 'A privacy-focused, client-side QR code generator. Create WiFi, VCard, and URL QR codes instantly.'
coverImage: 'cf186c32-9883-49d2-91d1-a409d7029800'
coverImageAlt: 'QR Code Generator Interface'
metaKeywords: 'qr generator, qr code, client-side, svelte 5, privacy, wifi qr, vcard, customization'
metaDescription: 'Generate custom QR codes directly in your browser. Supports URL, Text, WiFi, VCard, and more.'
tags: ['Tool', 'Svelte', 'Privacy']
appLink: '/tools/qr-code-generator'
---

I added a **QR Code Generator** to the tools section.

## Privacy

It runs entirely in the browser. No data is sent to a server. Most online generators track scans or redirect links through their own domains; this one doesn't.

## Features

It supports:

- **Formats**: URL, Text, WiFi, VCard, Email, SMS, Phone.
- **Styling**: Customizable dots, corners, gradients, and colors.
- **Logos**: Centered logo support.
- **Export**: PNG and SVG.

## Tech Stack

- **Svelte 5**: Uses Runes (`$state`, `$derived`, `$effect`).
- **Library**: `qr-code-styling`.
- **TypeScript** & **Tailwind CSS**.
