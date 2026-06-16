---
title: MCP Tools
description: The MCP server tool surface exposed by TTCtl over stdio.
---

`ttctl mcp` starts a [Model Context Protocol](https://modelcontextprotocol.io) server on stdio. AI assistants (Claude Desktop, Claude Code, Cursor, Windsurf, and any MCP-compatible client) connect to it and call TTCtl's tools through natural language, operating against **your own** Toptal Talent profile.

## Connecting a client

Most clients take an `mcpServers` map. Point the server at the published `ttctl` package via `npx` so it always runs the installed version:

```json
{
  "mcpServers": {
    "ttctl": {
      "command": "npx",
      "args": ["ttctl", "mcp"]
    }
  }
}
```

For **Claude Code**, register it with one command:

```sh
claude mcp add ttctl -- npx ttctl mcp
```

The server consumes the session bearer that `ttctl auth signin` already captured into your config — so sign in on the CLI first. See [Installation → MCP integration](/installation/#mcp-integration) for per-client wiring details.

:::note[`auth` is CLI-only]
There are no `auth` MCP tools. Signing in, checking status, and signing out are CLI operations — an AI agent never authenticates; it only uses the bearer you captured beforehand with `ttctl auth signin`.
:::

## Tool naming

Every tool follows a flat, predictable convention that mirrors the CLI command tree:

```
ttctl_<group>_<subdomain>_<verb>
```

For example: `ttctl_profile_basic_show`, `ttctl_profile_skills_add`, `ttctl_jobs_apply`, `ttctl_timesheet_submit`, `ttctl_payments_summary`. Because the names map one-to-one onto the [CLI commands](/commands/), the same consent and irreversibility rules apply — a tool that writes carries the same per-domain consent requirement as its CLI counterpart.

## Tool groups

The MCP surface covers the same areas as the CLI:

| Group | What the tools cover |
|---|---|
| `applications` | Activity items, stats, interview / availability-request detail |
| `availability` | Working hours and allocated weekly hours |
| `contracts` | Talent-level contracts |
| `engagements` | Engagements, stats, breaks, per-engagement payments |
| `interest_requests` | Confirm / decline Interest Requests — **MCP-only** (no CLI equivalent) |
| `jobs` | Browse, signals, search subscription, match-quality, rate-insight, apply |
| `me` | Your performed-actions audit log |
| `payments` | Payouts, totals, methods, rate, rate-change |
| `surveys` | Pending surveys |
| `timesheet` | Billing cycles — list, show, submit |
| `profile` | The full profile subtree (below) |

The `profile` group is the largest, with one sub-domain per profile section:

```
basic · skills · external · reviews · specializations
certifications · countries · education · employment
industries · portfolio · resume · visas
```

Each sub-domain exposes the same read/write verbs as its CLI section — for example `ttctl_profile_employment_list`, `ttctl_profile_employment_add`, `ttctl_profile_portfolio_projects_list`, `ttctl_profile_reviews_approve_section`.

## Example prompts

Once connected, you can ask your assistant things like:

- "What's my current-week timesheet?"
- "Show my last five engagements with hours and rates."
- "Pull my open applications and their status."
- "Which recommended jobs match my profile best this week?"
- "Update my profile bio with this draft."

## Source

The MCP server lives in [`packages/mcp/`](https://github.com/alexey-pelykh/ttctl/tree/main/packages/mcp) of the main repository. Track MCP-specific work on the [issues board](https://github.com/alexey-pelykh/ttctl/issues?q=is%3Aissue+label%3Amcp).

---

**Unofficial.** Not affiliated with Toptal LLC. [Full disclaimer →](/disclaimer/)
