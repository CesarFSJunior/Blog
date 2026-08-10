# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Personal blog built with Next.js 16 (App Router) + TypeScript + Tailwind CSS v4, exported as a fully static site and deployed to GitHub Pages. There is no backend/server at runtime — everything is pre-rendered at build time.

## Commands

Package manager is **yarn** (`yarn.lock` is the only lockfile; `package-lock.json` was removed to avoid drift). Use `yarn`, not `npm`/`npx`.

```bash
yarn dev        # start dev server (localhost:3000)
yarn build      # production build -> static export in ./out
yarn start      # serve the Next.js build (not used for deployment; GitHub Pages serves ./out directly)
yarn lint       # eslint
yarn typecheck  # tsc --noEmit
yarn test:unit  # Vitest unit tests (tests/unit/), jsdom + React Testing Library
yarn test:e2e   # Playwright E2E tests (tests/e2e/); requires `yarn playwright install chromium` once per machine
```

## Architecture

### Static export constraint

`next.config.ts` sets `output: "export"`. This is required because GitHub Pages only serves static files. Consequently, **no server-only Next.js features may be used** (API routes, `getServerSideProps`, middleware, on-demand image optimization, etc.) — every route must be fully resolvable via `generateStaticParams`/static generation at build time.

### Content model

Blog posts are MDX files on disk under `src/content/YYYY/MM/DD/<slug>.mdx` with frontmatter (`title`, `date`, `description`, `tags`). There is no CMS or database — content is discovered at build time via `glob("**/*.mdx", { cwd: contentDir })` and parsed with `gray-matter`. This pattern is duplicated in two places and must stay in sync if changed:

- [src/app/page.tsx](src/app/page.tsx) — lists all posts on the home page, grouped by year+month (`groupByYearMonth`), sorted by date descending.
- [src/app/blog/[...slug]/page.tsx](src/app/blog/[...slug]/page.tsx) — `generateStaticParams` derives one route per MDX file (slug = file path segments minus extension); the page itself re-reads the file directly (not via the same `getPosts()` helper) and renders body content with `next-mdx-remote/rsc`'s `MDXRemote`.

### Global state

A single small React Context (`EstadoProvider` / `useEstadoGlobal` in [src/components/state_provider/page.tsx](src/components/state_provider/page.tsx)) holds one boolean (`valor`) that toggles the mobile nav dropdown open/closed. It wraps `Header` and `DropDown` in [src/app/layout.tsx](src/app/layout.tsx); `Header`'s hamburger icon calls `setValor`, and `DropDown`'s visibility/animation is driven by reading `valor`.

Dark mode is separate and local to `Header`: it's a plain `useState` that toggles a `dark` class on `document.documentElement` (not persisted, not part of the shared context).

### Component convention

Components live under `src/components/<name>/page.tsx` (the file is always named `page.tsx`, mirroring the App Router convention, not `index.tsx`). Follow this when adding new components.

### Styling

Tailwind v4 is configured via `@theme` in [src/app/globals.css](src/app/globals.css), which maps CSS custom properties (`--background`, `--color`, `--card`, `--highlight`) to Tailwind color tokens (`bg-background`, `text-foreground`, etc.). Light values live on `:root`, dark values are overridden under `.dark` (toggled by the `Header` dark-mode switch described above).

### Path alias

`@/*` maps to `src/*` (see `tsconfig.json`).

### Deployment

`.github/workflows/nextjs.yml` has three jobs: `test` (lint, typecheck, unit, E2E) → `build` (`next build`, uploads `./out`) → `deploy` (publishes to GitHub Pages). `test` and `build` also run on pull requests targeting `main` for validation; `deploy` is skipped for PRs and only runs on push to `main` or `workflow_dispatch`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
