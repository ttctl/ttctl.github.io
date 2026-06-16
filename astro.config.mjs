// SPDX-License-Identifier: AGPL-3.0-only
// Copyright (C) 2026 Oleksii PELYKH

import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// Custom domain: ttctl.org is registered and served via GitHub Pages.
// `public/CNAME` carries the domain; `site` is the canonical URL so that
// generated absolute URLs (sitemap, OG tags, canonical links) resolve to it.
export default defineConfig({
    site: "https://ttctl.org",
    integrations: [
        starlight({
            title: "TTCtl",
            description: "Unofficial CLI and MCP server for the Toptal Talent platform",
            head: [
                {
                    tag: "meta",
                    attrs: { property: "og:image", content: "https://ttctl.org/og-image.png" },
                },
                {
                    tag: "meta",
                    attrs: { name: "twitter:image", content: "https://ttctl.org/og-image.png" },
                },
                {
                    tag: "meta",
                    attrs: { name: "twitter:card", content: "summary_large_image" },
                },
            ],
            social: [
                {
                    icon: "github",
                    label: "GitHub",
                    href: "https://github.com/alexey-pelykh/ttctl",
                },
            ],
            sidebar: [
                {
                    label: "Get Started",
                    items: [
                        { label: "Overview", link: "/" },
                        { label: "Installation", slug: "installation" },
                        { label: "Configuration", slug: "configuration" },
                    ],
                },
                {
                    label: "Reference",
                    items: [
                        { label: "Commands", slug: "commands" },
                        { label: "MCP Tools", slug: "mcp-tools" },
                    ],
                },
                {
                    label: "Project",
                    items: [
                        { label: "Disclaimer", slug: "disclaimer" },
                        { label: "Security", slug: "security" },
                        { label: "License", slug: "license" },
                    ],
                },
            ],
            editLink: {
                baseUrl: "https://github.com/ttctl/ttctl.github.io/edit/main/",
            },
            lastUpdated: true,
        }),
    ],
});
