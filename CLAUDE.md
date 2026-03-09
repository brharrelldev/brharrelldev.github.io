# mod_blog — Claude context

## About Brandon
- Systems engineer — day job is Go + event-driven architecture
- Side project: neuromorphic simulator based on the Lövheim cube of emotion (R-STDP, serotonin/dopamine/noradrenaline axes), called **mod-e**
- Also building a **KV store** from scratch in Zig
- Writes blog posts in Zig and Go
- Not a frontend person — vibe-code approach, keep JS/TS minimal and simple

## Stack
- **Nuxt 3** + `@nuxt/content` v2 (markdown posts, static generation)
- **Tailwind CSS v3** + `@tailwindcss/typography`
- **Bun** as package manager (`~/.bun/bin/bun`)
- Dev server: `bun run dev` → http://localhost:3000
- Deploy: GitHub Actions → GitHub Pages (`brharrelldev.github.io`)

## Design system
- Aesthetic: "electrical brain / PCB" — minimal systems engineer meets neuroscience
- Background: navy blue `#0A1628`
- Accent: electric cyan `#00E5FF`
- Fonts: **JetBrains Mono** (headings, UI, code) + **Inter** (body prose)
- Animated circuit board SVG background (`CircuitBackground.vue`) with traveling cyan signal pulses

## Content structure
Posts live in `content/` organized by section:
```
content/
  mod-e/       → neuromorphic simulator / emotion robot posts
  kv-store/    → KV store from scratch posts
  thoughts/    → random musings / general posts
```

Post frontmatter:
```md
---
title: "post title"
date: "2026-03-09"
description: "one line summary"
tags: ["zig", "neuromorphic"]
---
```

To add a post: drop a `.md` file in the right folder. No other config needed.

## URL structure
- `/` — homepage with project cards + recent posts
- `/mod-e` — mod-e post index
- `/kv-store` — kv-store post index
- `/thoughts` — thoughts post index
- `/mod-e/some-slug` — individual post
- `/about` — about page

## File structure
```
assets/css/main.css          — global styles, light/dark theme, signal-divider
components/CircuitBackground.vue  — PCB SVG background + animations
layouts/default.vue          — header/nav/footer shell
pages/index.vue              — homepage (project cards + recent posts)
pages/about.vue              — about page
pages/[section]/index.vue    — per-section post list
pages/[section]/[slug].vue   — post detail + "more from section"
utils/sections.ts            — section metadata (slug, title, description, tags)
tailwind.config.ts           — hardcoded dark colors + typography prose config
nuxt.config.ts               — Nuxt config (cssPath, content highlight, prerender)
.github/workflows/deploy.yml — GitHub Actions deploy to Pages
```

## Critical lessons — do not repeat these mistakes

1. **Tailwind v3 + CSS variables**: Tailwind wraps color values in `rgb()` internally.
   `rgb(var(--hex-color))` is invalid CSS. Always use **hardcoded hex values** in
   `tailwind.config.ts`. Use `@media (prefers-color-scheme: light)` CSS overrides
   for light mode — defined after `@tailwind utilities` so source order wins.

2. **`@nuxtjs/tailwindcss` cssPath**: The module defaults to `assets/css/tailwind.css`.
   Our file is `main.css`, so `cssPath` must be set explicitly in `nuxt.config.ts`:
   ```ts
   tailwindcss: { cssPath: '~/assets/css/main.css' }
   ```
   Without this, all custom CSS in `main.css` is silently ignored.

3. **Vue `<style scoped>` + SVG**: Scoped styles do NOT reliably apply to SVG child
   elements (`<line>`, `<polyline>`, etc.). Use `<style>` (non-scoped) in
   `CircuitBackground.vue` with unique prefixed class names (`pcb-signal`, `pcb-s1`, etc.)

4. **CSS animation shorthand vs inline style**: Don't split `animation` shorthand across
   a CSS class and an inline `style` attribute. The shorthand resets `animation-duration`
   to `0s`. Define each signal's full animation (including duration + delay) in a
   dedicated CSS rule (`.pcb-s1 { animation: pcb-travel 13s linear 0s infinite; }`).

## Deployment
- Repo: `github.com/brharrelldev/brharrelldev.github.io`
- Push to `main` triggers GitHub Actions → `bun run generate` → deploys to Pages
- GitHub repo Settings → Pages → Source must be set to **GitHub Actions**
- Live at: `https://brharrelldev.github.io`
