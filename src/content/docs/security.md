---
title: Security
description: How to report security issues responsibly to the TTCtl maintainer.
---

## Reporting a vulnerability

If you discover a security issue in TTCtl — credential exposure, sandbox escape, RCE in a parser, dependency CVE that affects TTCtl users, or anything else that could harm a TTCtl user or their Toptal account — **please do not file a public GitHub issue**.

Instead:

1. **Read the [`SECURITY.md`](https://github.com/alexey-pelykh/ttctl/blob/main/SECURITY.md)** in the main repository for the canonical reporting process and supported-version matrix.
2. **Email the maintainer** at the address listed in `SECURITY.md` with a clear description, reproduction steps, and impact assessment.
3. **Allow time for triage** — for a solo-maintained project, please don't disclose publicly before coordinated remediation.

## Scope

TTCtl's security surface includes:

- **Credential handling** — `op://` resolution, the optional literal `email`/`password` form, cookie-jar storage, file permissions on persisted secrets
- **TLS impersonation** — [`node-wreq`](https://github.com/alexey-pelykh/node-wreq) and the Chrome fingerprint profile
- **Dependency supply chain** — npm packages, transitive deps, and the published `ttctl` package on the npm registry
- **Build / release pipeline** — CI workflows, GitHub Actions pinning, npm provenance

Out of scope for TTCtl's security policy (these belong to Toptal LLC):

- Vulnerabilities in **Toptal's own platform** — please report those to Toptal directly via their channels
- The behavior of **third-party MCP clients** (Claude Desktop, Cursor, etc.) — report those to their respective vendors

## Hardening practices

TTCtl follows these baseline practices:

- **SHA-pinned GitHub Actions** in CI workflows (with version comments, Dependabot-tracked)
- **Dependency audit** via `pnpm audit` and Dependabot weekly
- **Immediate** security patches for confirmed user-impacting vulnerabilities
- **OIDC + npm provenance** for releases — no long-lived npm tokens

For details, see [`SECURITY.md`](https://github.com/alexey-pelykh/ttctl/blob/main/SECURITY.md) in the main repository.

---

**Unofficial.** Not affiliated with Toptal LLC. [Full disclaimer →](/disclaimer/)
