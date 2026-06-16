---
title: Installation
description: How to install TTCtl from npm and wire it into MCP clients.
---

## Prerequisites

- **Node.js** 24 or later. Use [`nvm`](https://github.com/nvm-sh/nvm) or [`fnm`](https://github.com/Schniz/fnm) if you need to manage multiple Node versions.
- A **Toptal Talent** account that you control. TTCtl is a personal-productivity tool against your own profile only.
- The **1Password CLI** (`op`) if you plan to use the recommended `op://vault/item` auth form. Install it from [1Password's downloads page](https://developer.1password.com/docs/cli/get-started/) and enable Desktop App integration for biometric auth.

## Install with npm

Global install:

```sh
npm install -g ttctl
```

Or run on demand without installing globally:

```sh
npx ttctl --help
```

## MCP integration

TTCtl implements the [Model Context Protocol](https://modelcontextprotocol.io) (MCP), exposing its capabilities to AI assistants through `ttctl mcp`. The configuration snippets below mirror the [QontoCtl MCP integration patterns](https://github.com/alexey-pelykh/qontoctl#mcp-integration) and apply to TTCtl with the binary name `ttctl`.

### Claude Desktop

Add to your Claude Desktop configuration (`claude_desktop_config.json`):

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

### Claude Code

```sh
claude mcp add ttctl -- npx ttctl mcp
```

### Cursor

Add to `.cursor/mcp.json` in your project root:

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

### Windsurf

Add to `~/.codeium/windsurf/mcp_config.json`:

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

## Verify the install

```sh
ttctl --help
```

You should see the top-level command list. If you get `command not found`, your global `npm` bin directory is not on `PATH`; check with `npm config get prefix` and add the resulting `bin/` directory to your shell's `PATH`.

## Updating

```sh
npm install -g ttctl@latest
```

TTCtl follows [semantic versioning](https://semver.org). Release notes for each version are published on [GitHub Releases](https://github.com/alexey-pelykh/ttctl/releases).

---

**Unofficial.** Not affiliated with Toptal LLC. [Full disclaimer →](/disclaimer/)
