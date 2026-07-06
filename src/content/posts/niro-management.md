---
title: 'niro-management: A Self-Hosted AI DevOps Control Panel'
createdAt: '2026-07-04'
updatedAt: '2026-07-05'
category: 'Portfolio'
readTime: '12'
excerpt: 'A self-hosted SvelteKit control panel that runs daily AI code reviews, Sentry triage, and dependency audits across every repo — with a remote screen viewer, web terminal, sandboxed shell tasks, and an autofix engine that opens pull requests on its own. Under active development.'
coverImage: '855dc766-1144-46b1-847b-9c8c68348900'
coverImageAlt: 'niro-management — self-hosted AI DevOps control panel'
metaKeywords: 'SvelteKit, self-hosted, AI code review, DevOps, DeepSeek, Gonka, OpenCode, PostgreSQL, node-pty, noVNC, firejail, Sentry, autofix, BullMQ alternative, Tailscale'
metaDescription: 'niro-management is a self-hosted AI DevOps control panel — daily AI code reviews, Sentry triage, dependency audits, autofix pull requests, remote screen viewer and web terminal, all on a Tailscale-only PC.'
tags: ['DevOps', 'Svelte', 'AI', 'Self-Hosted']
---

## Overview

niro-management is an internal, self-hosted control panel that runs continuous AI-assisted maintenance across every repository its author maintains. Rather than paying for a stack of SaaS tools — one for code review, one for error triage, another for dependency scanning — it consolidates the work into a single SvelteKit app that runs on a spare Arch Linux (Omarchy) PC and calls cheap AI providers on a schedule. Daily, it pulls each project's git diff, sends it to an AI model for review, triages new Sentry errors, audits dependencies, and files the results as structured findings with severity levels.

It is built for exactly one operator: the developer running it. There is no public site and no sign-up. The whole surface sits behind a Tailscale VPN, reachable from any browser on the tailnet, and everything privileged — the web terminal, the screen viewer, the sandboxed shell — assumes a single trusted admin rather than multi-tenant isolation. This framing is what lets it be as powerful as it is.

The project is under active development. The core review-and-findings loop, remote access tooling, notification pipeline, and an autonomous "autofix" engine that opens pull requests are all working, while newer subsystems — a marketing/content engine, SEO auditing, and a video generation pipeline — are being layered on top of the same infrastructure.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | SvelteKit 2, Svelte 5 Runes, TypeScript, TailwindCSS 4 |
| UI | shadcn-svelte (bits-ui), Lucide icons, layerchart, @xyflow/svelte |
| Server | SvelteKit (Node adapter), SvelteKit Remote Functions |
| Database | PostgreSQL 17 |
| Cache | Redis 7 |
| Job Queue | PostgreSQL-native (`SKIP LOCKED` + `LISTEN/NOTIFY`) |
| Worker | Standalone Node process (systemd), separate from the app |
| Realtime | Server-Sent Events (dashboard), WebSocket server on :3001 |
| Terminal / Screen | node-pty + xterm.js, wayvnc + @novnc/novnc |
| AI Gateway | Multi-source: DeepSeek, Gonka, OpenRouter (via OpenAI SDK) |
| Agentic fixes | OpenCode agents in isolated git worktrees |
| Sandboxing | firejail / bubblewrap for shell tasks |
| Auth | Session-based (oslo, argon2), Google OAuth (Arctic), JWT for WS |
| Notifications | Telegram, email (Docker mailer), Web Push, in-app |
| Deploy | k3s / Docker on a self-hosted PC, Tailscale-only access |
| Monorepo | pnpm workspaces, Turbo |

---

## Architecture

```
                     Tailscale VPN (private tailnet)
                                │
        ┌───────────────────────┴────────────────────────┐
        ▼                                                 ▼
┌──────────────────────────┐              ┌──────────────────────────┐
│     SvelteKit App        │  SSE push    │   WebSocket Server :3001 │
│  ┌────────┐ ┌─────────┐  │◀────────────▶│  ┌─────────┐ ┌────────┐ │
│  │Projects│ │ Runs /  │  │              │  │ node-pty│ │  VNC   │ │
│  │/Findings│ │ Inbox  │  │              │  │ terminal│ │ proxy  │ │
│  └────────┘ └─────────┘  │              │  └─────────┘ └───┬────┘ │
│  ┌────────┐ ┌─────────┐  │              └──────────────────┼──────┘
│  │Terminal│ │ Screen /│  │                                 ▼
│  │/System │ │ Map     │  │                            wayvnc / Hyprland
│  └────────┘ └─────────┘  │
│   Scheduler (enqueues)   │
└────────────┬─────────────┘
             │ enqueue jobs
             ▼
┌──────────────────────────┐        ┌───────────────────────────┐
│  PostgreSQL 17 + Redis   │        │   AI Gateway (@niro/ai)   │
│  job_queue (SKIP LOCKED) │◀──────▶│  role → source/model      │
│  runs, findings, crons…  │        │  DeepSeek / Gonka / OR    │
└────────────┬─────────────┘        └───────────────────────────┘
             │ LISTEN/NOTIFY
             ▼
┌──────────────────────────────────────────────────────────────┐
│                Worker (standalone systemd process)            │
│  code-review · sentry-triage · consistency · deps · seo       │
│  autofix (OpenCode worktrees → GitHub PRs) · shell (firejail) │
│  system metrics · uptime sweeper · self-update · backups      │
└──────────────────────────────────────────────────────────────┘
```

---

## Core Features

### AI Checks & Findings

The heart of the system is a check-and-findings loop. A project is registered with a local path, repo URL, branch, and a list of enabled checks; a cron schedule then enqueues jobs against it. Each check type has a distinct source and pipeline:

- **code-review** — takes a git diff and sends it to a reasoning model for bug, security, and performance findings
- **sentry-triage** — pulls new Sentry issues and classifies them by priority
- **consistency** — scans files against project convention rules and flags violations
- **deps** — audits `package.json` / `Cargo.toml` for outdated or vulnerable dependencies
- **seo-audit** — combines Google Search Console, Bing, a crawl, and AI analysis into per-page SEO reports
- **page-health** and **test-runner** — browser-driven page checks and test execution

Every execution is recorded in a `runs` table with its status, trigger, token usage, and computed cost, and produces rows in a `findings` table carrying severity (critical through info), status, and a `dedup_hash`. That hash is load-bearing: findings are deduplicated before insert and carry an `occurrence_count`, so the same issue surfacing across daily runs collapses into one tracked item instead of flooding the inbox.

### The Autofix Engine

The most ambitious feature is autofix: the system doesn't just report findings, it tries to fix them and open a pull request. For a fixable finding, the worker creates an **isolated git worktree**, runs an **OpenCode agent** against the exact bytes of the target file, and then passes the result through two gates — a diff-integrity check and an AI **fix-review** verdict — before anything lands. If the first attempt fails review, it retries once on a stronger escalation model.

A separate **drainer** cycle governs how aggressively this happens. It caps the number of open fix PRs per project, limits findings bundled into a single PR, and tracks in-PR counts by category so the branch space never sprawls. Successful fixes are pushed to a `fix_branch` and turned into a GitHub pull request via the API, with the finding row updated to link back to its `fix_pr_url`. The design treats the AI as a proposer, not an authority — a human still reviews and merges every branch.

### Remote Screen Viewer & Web Terminal

Because the panel runs on a physical PC, it ships its own remote-access layer rather than depending on SSH. A dedicated WebSocket server on port 3001 handles two things: a **web terminal** backed by node-pty and rendered with xterm.js, and a **screen viewer** that proxies to wayvnc (the Wayland VNC server for Hyprland) and renders in-browser via noVNC. Both connections are gated by JWTs minted by the app for the authenticated admin, with per-IP connection rate limiting on the socket server. The same process exposes narrow `/deploy` and `/exec` HTTP endpoints — privileged RCE surfaces protected by a bearer token and, on the app side, an additional admin-session gate.

### System Monitoring & the System Map

A **System** view reports live hardware telemetry — CPU, memory, disk, and GPU utilization plus temperatures and load average — sampled by the worker from `/proc` and system commands and streamed to the dashboard over SSE. A **System Map** built with @xyflow/svelte visualizes the projects, services, and their relationships as an interactive node graph. Uptime monitoring runs on its own sweeper that tracks consecutive-degraded state so a single blip doesn't trigger a false alarm.

### Human-in-the-Loop Inbox

Not every situation can be automated, so the system has a `bot_requests` table and an **Inbox** that surfaces requests needing a human: a missing environment variable, an access-denied error, a setup step, a suggestion, an approval, a dead job, or an open-ended AI question. This gives the autonomous machinery a clean way to pause and ask rather than guessing or silently failing — the operator answers from the dashboard and the run continues.

### Notifications

Findings and alerts fan out across four channels with per-channel preferences and quiet hours: an in-app bell with unread counts, Telegram bot messages for critical findings, an email daily digest via a Dockerized mailer, and browser push through the Web Push API and a service worker. Alert hygiene is explicit in the schema — Telegram alert events are tracked to avoid re-notifying on the same incident.

### Self-Maintenance

The panel is built to look after itself. There's a self-update mechanism (git pull, rebuild, restart), scheduled PostgreSQL backups with restore, an encrypted secrets-sync layer that keeps `.env` values under AES, a data-retention/maintenance job, and an immutable audit log recording every actor and action. Model pricing lives in a `model_pricing` table so per-run cost figures stay accurate as providers change their rates.

---

## Technical Highlights

### Dropping BullMQ for a Postgres-Native Queue

An early version used BullMQ on Redis for job processing. That was replaced (migration 031) with a PostgreSQL-native queue: a `job_queue` table where workers claim jobs using `SELECT … FOR UPDATE SKIP LOCKED` and get woken instantly by `LISTEN/NOTIFY` on insert. Priority is a plain integer column (manual "Run Now" at 1, webhooks at 3, scheduled runs at 5), and stale-active jobs are recoverable via an index on `started_at`. For a single-node system that already runs Postgres, this removed a moving part while keeping concurrent-safe pickup and near-instant wakeup — Redis stayed on, but for caching rather than queueing.

### A Role-Based, Multi-Source AI Gateway

Rather than hard-coding one provider, all AI calls go through a `@niro/ai` gateway that maps a semantic **role** to a source and model. Code review and consistency run on DeepSeek's reasoner; Sentry triage and page-health use stronger OpenRouter-hosted models; autofix, SEO, content, and social tasks route to Gonka's cheaper model. Each source declares a defensive per-process concurrency ceiling kept comfortably under the provider's documented limit so a runaway fan-out can't trip a 429, with retry handling the rest. Roles carry fallback models and legacy env-var overrides, so swapping a model for a whole class of work is a one-line change instead of a hunt through the codebase.

### Sandboxing Untrusted Shell Tasks

Shell-type checks and agent commands run under **firejail** with a deliberately hostile configuration: `--noroot`, `--seccomp`, `--caps.drop=all`, `--net=none` by default, and a filesystem whitelist scoped to the working directory, with an optional read-only mount. On top of the OS sandbox sits an application-level warn-list — regexes matching `rm -rf`, `git push --force`, `DROP TABLE`, `mkfs`, `dd if=`, `curl … | bash`, and similar — that forces genuinely destructive commands through human approval rather than letting them execute unattended. Defense in depth: the sandbox contains blast radius, the warn-list catches intent.

### Findings Deduplication as a First-Class Concern

Running the same reviews daily means the same issues reappear constantly. Instead of treating findings as append-only log lines, each carries a content-derived `dedup_hash` and an `occurrence_count`, and there's a parallel dedup layer for `bot_requests`. The result is an inbox that reflects the *set* of open problems rather than a firehose of repeated observations — the difference between a tool an operator actually reads and one they learn to ignore.

---

## Challenges

### Making Autonomy Safe by Default

The hard part of an autonomous DevOps tool isn't getting an AI to propose changes — it's making sure nothing lands that shouldn't. The approach here is layered gates rather than trust: every fix happens in a throwaway git worktree, passes a mechanical diff-integrity check and an AI review verdict, is capped in volume by the drainer, and ends as a pull request a human merges. Failures self-heal — the autofix reconciler cleans up orphaned integration worktrees so a crashed run doesn't leave the workspace wedged.

### Privileged Access Without Multi-Tenancy

A web terminal and a `/exec` endpoint are, by definition, remote code execution. The project accepts that and defends it with position rather than pretending otherwise: the whole app is Tailscale-only, socket connections require app-minted JWTs and are rate-limited per IP, and the raw exec channel demands a separate bearer token *and* an admin session on the relay. It's a single-operator threat model executed deliberately, not multi-tenant security bolted on after the fact.

### Cost Control at a Hobby Budget

The entire point is to get SaaS-grade automation for a few dollars a month, which forces constant attention to spend. Cheap models handle the bulk (DeepSeek and Gonka), stronger models are reserved for the roles that need them, per-run token usage and cost are recorded against a live pricing table, and concurrency ceilings keep provider fan-out predictable. The running cost lands in the low single digits of dollars per month plus the electricity for a PC that would otherwise sit idle.

---

## Where Things Stand

The core loop — scheduled AI checks, deduplicated findings, the inbox, notifications, remote terminal and screen viewer, system monitoring, and the autofix-to-PR pipeline — is operational and maintaining real repositories daily. More recent work extends the same worker and AI gateway into marketing and content generation, SEO rank tracking and auditing, and a video generation engine, all reusing the job queue, role-based model routing, and findings infrastructure the DevOps side established. It remains a personal, self-hosted tool — deliberately single-tenant, deliberately cheap, and continuously growing into whatever its author needs automated next.
