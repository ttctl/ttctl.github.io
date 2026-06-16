---
title: Configuration
description: How TTCtl discovers `.ttctl.yaml`, the two valid auth forms, and how cookies are stored locally.
---

TTCtl uses a single configuration file — `.ttctl.yaml` — and operates against **one** Toptal Talent profile. There are no profile sections, no `[default]`/`[work]` switching: TTCtl is your personal-productivity tool for your own talent profile, and the schema reflects that.

## File discovery

TTCtl looks for `.ttctl.yaml` in this order, using the first match:

1. The current working directory: `./.ttctl.yaml`
2. The XDG config directory: `$XDG_CONFIG_HOME/ttctl/config.yaml`, falling back to `~/.config/ttctl/config.yaml` if `XDG_CONFIG_HOME` is unset

The CWD lookup is convenient for repository-scoped overrides; the XDG location is the home default for everyday use.

## Authentication

The `auth` field is **polymorphic** — it accepts either a string or an object — and there are exactly two valid forms.

### Recommended: 1Password item reference (string form)

```yaml
auth: "op://Personal/ttctl"
```

The string is parsed as `op://VAULT/ITEM` and resolved at runtime via the [1Password CLI](https://developer.1password.com/docs/cli/):

```sh
op item get ITEM --vault VAULT --fields username,password --format json
```

Requirements:

- The 1Password CLI (`op`) must be on `PATH`.
- The referenced item must have **both** `username` and `password` fields populated.
- With Desktop App integration enabled, you'll get a biometric prompt (Touch ID / Watch) on each resolve.

The reference must be **vault + item only**. Per-field URLs (`op://vault/item/field`) are **not** supported — TTCtl reads both `username` and `password` from the same item, so adding a field suffix would be ambiguous.

#### Common errors

| Error | Resolution |
|---|---|
| `op` not found on PATH | Install the [1Password CLI](https://developer.1password.com/docs/cli/get-started/) and reopen your terminal |
| Vault or item not found | Verify with `op item list --vault VAULT` |
| Missing `username` or `password` field | Edit the item in 1Password and add the missing field |
| Per-field `op://vault/item/field` supplied | Drop the field suffix — use `op://vault/item` |

### Object form (development / testing only)

```yaml
auth:
    email: "you@example.com"
    password: "hunter2"
```

This form is supported for local development and CI smoke tests. It is **not recommended** for everyday use — the password sits in plaintext on disk. Prefer the 1Password form.

## Cookie storage

After a successful sign-in, TTCtl persists the session cookie jar locally:

| Platform | Path |
|---|---|
| macOS | `~/.ttctl/session.cookies` |
| XDG (Linux) | `$XDG_DATA_HOME/ttctl/session.cookies` |

Format is Mozilla cookies.txt; permissions are `0600` (owner read/write only). The cookie file is the only persistent secret on disk. To force a fresh sign-in, delete it.

### Cloudflare clearance (`cf_clearance`)

The Toptal Talent surfaces sit behind Cloudflare bot-management. The `cf_clearance` cookie is **JA3 + IP bound** — it cannot be transferred between machines or networks. When TTCtl detects a `403` from a Cloudflare-protected endpoint, it will prompt you to refresh `cf_clearance` from a live browser session on the same network.

## TLS fingerprint impersonation

For Cloudflare-protected endpoints, TTCtl uses TLS-fingerprint impersonation through [`node-wreq`](https://github.com/alexey-pelykh/node-wreq) (Rust + BoringSSL, MIT license) so that JA3, JA4, and ECH validation pass like a real Chrome session. The Chrome version is pinned (currently `chrome_146`) and refreshed quarterly to track upstream stable Chrome.

You don't normally need to touch this — it's transparent. But if you debug 403s, knowing it exists helps: the request _looks_ like Chrome at the TLS layer, not like Node.

## Example `.ttctl.yaml`

```yaml
# ~/.ttctl.yaml — recommended setup
auth: "op://Personal/ttctl"
```

That's it. One file, one line.

---

**Unofficial.** Not affiliated with Toptal LLC. [Full disclaimer →](/disclaimer/)
