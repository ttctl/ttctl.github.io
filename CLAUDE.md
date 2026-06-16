# TTCtl Website

Marketing site and docs for [TTCtl](https://github.com/alexey-pelykh/ttctl), built with [Astro](https://astro.build) + [Starlight](https://starlight.astro.build) and deployed to GitHub Pages from the `main` branch of [`ttctl/ttctl.github.io`](https://github.com/ttctl/ttctl.github.io).

## Quick reference

| Action | Command |
|---|---|
| Install deps | `pnpm install` |
| Dev server | `pnpm dev` (default port `4321`) |
| Production build | `pnpm build` (output in `dist/`) |
| Preview built site | `pnpm preview` |

Node 24+. Use `nvm use` (or `fnm use`) — `.nvmrc` pins it.

## Layout

```
ttctl.github.io/
├── astro.config.mjs           # Starlight integration + sidebar
├── src/
│   ├── content.config.ts      # docs collection (Starlight schema)
│   └── content/docs/          # all docs pages live here
│       ├── index.mdx          # homepage (h1 "TTCtl", disclaimer block, quick start)
│       ├── installation.md
│       ├── configuration.md
│       ├── commands.md
│       ├── mcp-tools.md
│       ├── disclaimer.md      # full long-form disclaimer (linked from EVERY page footer)
│       ├── security.md
│       └── license.md
├── public/
│   ├── CNAME                  # `ttctl.org` — custom domain
│   ├── favicon.svg
│   └── og-image.png           # 1200x630 social-card image (wired via Starlight `head`)
├── LICENSE                    # AGPL-3.0-only (full text)
└── CLAUDE.md                  # this file
```

## Conventions

- **Disclaimer everywhere**: every content page MUST end with a footer linking to `/disclaimer/`. The minimal pattern is:

  ```markdown
  ---

  **Unofficial.** Not affiliated with Toptal LLC. [Full disclaimer →](/disclaimer/)
  ```

  Pages that already discuss licensing or trademarks (e.g., the homepage) may use a richer footer, but the `/disclaimer/` link is non-negotiable.

- **AGPL header on code files**: `.ts`, `.astro`, `.mjs` files start with:

  ```text
  // SPDX-License-Identifier: AGPL-3.0-only
  // Copyright (C) 2026 Oleksii PELYKH
  ```

  Markdown / MDX content does NOT need a header — license is conveyed via the repository `LICENSE` file.

- **Editor style**: see `.editorconfig` — 4-space indent for code, 2 for YAML/JSON, LF line endings, UTF-8, 120 cols.

- **No emojis** in pages or commits unless explicitly justified.

## Domain

`ttctl.org` is the registered custom domain. `public/CNAME` carries it, and the Astro `site` config points to `https://ttctl.org` so that absolute URLs (sitemap, OG meta, canonicals) resolve to the canonical destination. Do **not** switch `site` or `CNAME` to the `github.io` default.

If DNS or Pages settings ever need re-verification:

1. Confirm the `ttctl.org` `A`/`CNAME` records point to GitHub Pages.
2. In the GitHub repository settings → Pages, the custom domain is `ttctl.org` with "Enforce HTTPS" enabled.
3. No code change is needed — the CNAME file is already in place.

## Deployment

GitHub Actions workflow in `.github/workflows/deploy.yaml` builds on every push to `main` and publishes to GitHub Pages. The `Deploy to GitHub Pages` job runs `pnpm build`, then uses `actions/upload-pages-artifact` + `actions/deploy-pages`.

## Editing tips

- **Adding a page**: create the `.md` / `.mdx` file under `src/content/docs/`, then add a sidebar entry in `astro.config.mjs` under the appropriate group (`Get Started` / `Reference` / `Project`).
- **Adding a sidebar group**: insert a new group object in `astro.config.mjs` `sidebar` array. Use `slug` to reference docs (the slug is the path without extension); use `link` for external URLs or root.
- **Customizing theme**: `customCss` is not yet wired. To add a stylesheet, drop it under `src/styles/` and reference it in `astro.config.mjs` via Starlight's `customCss: ["./src/styles/custom.css"]`.

## Out of scope (intentional)

- No analytics (cookieless or otherwise) — keep the site lean and tracker-free.
- No theme customization beyond Starlight defaults until brand visual identity locks.
- No exhaustive, auto-generated MCP tool catalog — `mcp-tools.md` documents the naming convention, tool groups, and the `profile` subtree as of `0.1.0`, but the canonical per-tool reference is the live `ttctl mcp` surface and the source in [`alexey-pelykh/ttctl`](https://github.com/alexey-pelykh/ttctl). Keep this page curated, not mechanically generated.
