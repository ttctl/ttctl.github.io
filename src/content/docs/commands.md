---
title: Commands
description: TTCtl CLI command reference — the v0.1.0 command tree.
---

TTCtl groups commands by area of a Toptal talent's day-to-day. Each group is a Commander.js sub-command of the `ttctl` umbrella; run `ttctl <group> --help` for the live, authoritative help on any group.

```sh
ttctl --help
ttctl <group> --help
ttctl <group> <subcommand> --help
```

The command tree below reflects what ships in **0.1.0**. Read-heavy, personal-use surfaces are exposed; operations that would enable mass automation against the platform are deliberately not.

:::caution[Consent-gated and irreversible actions]
A handful of writes are **consent-gated**: they refuse to run unless you pass an explicit per-domain consent flag that attests you accept Toptal's terms for that action. TTCtl will never auto-fill these on your behalf. The flags are intentionally verbose and differ per surface — they are called out inline below. Pair any write with `--dry-run` first to preview the wire payload without sending it.
:::

## Global options

These apply across commands. Output-format and verbosity flags are global; pagination is declared per paginating leaf (so it appears only where it makes sense).

| Option | Purpose |
|---|---|
| `--config <path>` | Path to the YAML config. Resolution precedence: `--config` > `TTCTL_CONFIG_FILE` env > `~/.ttctl.yaml` |
| `-o, --output <format>` | Output format: `table` (default), `json`, `yaml` |
| `--json` | Shortcut for `--output json` |
| `--yaml` | Shortcut for `--output yaml` |
| `--dry-run` | Preview a mutation's request without sending it (no-op for read commands) |
| `--verbose` | Wire-level request/response summary to stderr |
| `--debug` | Full headers + bodies to stderr, sensitive fields redacted (a strict superset of `--verbose`) |

Paginating commands additionally accept `--page <n>` / `--per-page <n>` (or `--limit <n>` on limit-only leaves).

## auth

Bootstrap configuration and manage your session. This group is CLI-only — it is **not** exposed over MCP (an AI assistant never signs in; it consumes the bearer you already captured).

| Command | Purpose |
|---|---|
| `auth init` | Scaffold a fresh `~/.ttctl.yaml` interactively (1Password reference or literal credentials), written at mode `0600` |
| `auth signin` | Sign in with the configured credentials and persist the session bearer |
| `auth status` | Report whether the current session is valid |
| `auth signout` | Clear the persisted session (idempotent) |

## profile

View and update your Toptal Talent profile. The canonical form is `profile <section> <verb>`; `profile show` and `profile update` are short-form aliases for `profile basic show` / `profile basic update`.

**Read sections** (`show` / `list`): `basic`, `skills`, `industries`, `education`, `certifications`, `employment`, `external`, `portfolio`, `resume` (alias `cv`), `reviews`, `specializations`, `visas`, and the read-only `countries` reference catalog.

**Editable sections** (`add` / `update` / `remove`): `basic` (bio, headline, photo), `skills`, `industries`, `education`, `certifications`, `employment`, `external`, `portfolio`, `resume`, `visas`.

| Command | Purpose |
|---|---|
| `profile show [--full]` | Summary of your profile (alias for `profile basic show`) |
| `profile update [--bio \| --headline \| --edit]` | Update editable basic fields (alias for `profile basic update`) |
| `profile basic photo show` | Print URLs of your profile-photo variants |
| `profile basic photo upload <path>` | Upload a new profile photo from a local file |
| `profile <section> list` | List records in a section |
| `profile <section> show <id>` | Show one record by id |
| `profile <section> add` | Add a record to a section |
| `profile <section> update <id>` | Update a record |
| `profile <section> remove <id>` | Remove a record |

:::caution[`--consent-profile-capability` required]
A few profile capability actions are consent-gated and require `--consent-profile-capability`:

- `profile skills add-connection` / `profile skills remove-connection` — link or unlink two skills
- `profile reviews approve-item <reviewId>` / `profile reviews approve-section` — approve published reviews
- `profile specializations apply <specializationId>` — apply for a specialization track (Core, Marketplace, Expert Crowd, …). There is no CLI withdraw, so this is effectively one-way.
:::

## applications

Review your activity items — applications, availability requests, interviews, and engagement signals.

| Command | Purpose |
|---|---|
| `applications list` | List recent activity rows |
| `applications show <id>` | Show one activity row by id |
| `applications stats` | Per-status-group activity counts |
| `applications reject-reasons` | List the Interest Request decline-reason inventory |
| `applications interview show <id>` | Interview detail (interviewer handle, scheduled slot, agenda) |
| `applications interview notes show <jobId>` | Read your interview prep notes for a job |
| `applications interview guide show <interviewId>` | Read the interview-prep guide (sections + tips) |
| `applications availability-request show <id>` | Availability-request detail (status, rate, lifecycle) |

:::danger[Irreversible — terminal state, no undo]
- `applications confirm <id>` — confirm an Interest Request. This **creates a JobApplication**; there is no undo.
- `applications reject <id>` — reject an Interest Request. This transitions it to a terminal archived state; there is no undo.

Both prompt for interactive confirmation. Preview with `--dry-run` before committing.
:::

## engagements

View current and past engagements and manage engagement breaks.

| Command | Purpose |
|---|---|
| `engagements list` | List engagements (active by default) |
| `engagements show <id>` | Show one engagement by id |
| `engagements stats` | Per-engagement-status counts |
| `engagements payments list <job-id>` | List per-engagement payments |
| `engagements breaks list <id>` | List breaks on an engagement |
| `engagements breaks reasons list` | List valid `breaks add --reason-id` values |
| `engagements breaks add <id>` | Schedule a new break |
| `engagements breaks reschedule <break-id>` | Move an existing break to a new window |
| `engagements breaks remove <break-id>` | Cancel a scheduled break |

## jobs

Browse opportunities and manage your saved / viewed / not-interested signals and search subscription.

| Command | Purpose |
|---|---|
| `jobs list [filters]` | List current job opportunities (paginated) |
| `jobs recommended` | The algorithmically-recommended feed (paginated) |
| `jobs show <id>` | Job detail view |
| `jobs show-many <id…>` | Show several jobs by id in one batch (≤20) |
| `jobs match-quality <id>` | Per-criterion match-score breakdown |
| `jobs rate-insight <id>` | Per-job rate-intelligence panel |
| `jobs dashboard` | Dashboard job-activity items |
| `jobs saved` / `jobs viewed` / `jobs not-interested-list` | List jobs by interest signal (paginated) |
| `jobs save <id>` / `jobs unsave <id>` | Bookmark / un-bookmark a job |
| `jobs mark-viewed <id>` | Explicitly mark a job as viewed |
| `jobs not-interested <id> --reason <text>` | Mark a job not-interested with a reason |
| `jobs search list \| save \| remove` | View, start/replace, or terminate your job-search subscription |

:::danger[`--consent` required — direct-apply]
`jobs apply <id> --consent` submits a job application. The `--consent` flag is a **mandatory legal-compliance attestation** that you have read and accepted Toptal's apply terms — auto-filling it on your behalf is forbidden by design. Add `--suggest-answers` to pull your own historical answers to similar prior questions as advisory autocomplete (opt-in, off the critical path). Preview the wire payload with `--dry-run` first.
:::

## timesheet

View timesheet billing cycles and submit them for billing.

| Command | Purpose |
|---|---|
| `timesheet list [--engagement <id>]` | List timesheet billing cycles |
| `timesheet pending list [--limit <n>]` | List viewer-wide pending billing cycles |
| `timesheet show <id>` | Show one timesheet by id |
| `timesheet update <id>` | Edit a draft timesheet's comment / per-day records |
| `timesheet submit [id]` | Submit a timesheet for billing |

:::danger[Irreversible billing actions]
- `timesheet update <id>` is consent-gated and requires `--consent-timesheet-billing`.
- `timesheet submit [id]` is **one-way** — once submitted, a timesheet enters billing. It prompts for interactive confirmation; pass `--confirm` to skip the prompt, or `--dry-run` to preview.
:::

## availability

View and update your working hours and allocated weekly hours.

| Command | Purpose |
|---|---|
| `availability show` | Full availability snapshot (time zone, working hours, allocated hours) |
| `availability working-hours show` | Show the working-hours subset |
| `availability working-hours set` | Update working hours |
| `availability allocated-hours show` | Show current allocated hours |
| `availability allocated-hours set --hours <n>` | Set allocated weekly hours |

## payments

View payout history and totals, payment methods, and your rate; submit rate-change requests.

| Command | Purpose |
|---|---|
| `payments summary` | Aggregate payment totals |
| `payments payouts list` | Historical payouts (paginated) |
| `payments payouts show <id>` | Show one payout by id |
| `payments show-many <id…>` | Show several payments by id in one batch (≤20) |
| `payments methods list` / `payments methods show <id>` | Configured payment methods |
| `payments rate current` | Current hourly rate (lightweight) |
| `payments rate show` | Current rate + change-request status |
| `payments rate questions` | Form questions required by `rate change` |
| `payments rate change --kind … --rate … [--confirm]` | Submit a rate-change request |

## contracts

| Command | Purpose |
|---|---|
| `contracts list` | List talent-level contracts (Toptal Direct, MSA, etc.) |
| `contracts show <id>` | Show one contract by id |

## surveys

List pending surveys and submit answers or free-text feedback (post-interview, NPS, …).

| Command | Purpose |
|---|---|
| `surveys list` | List pending surveys |
| `surveys submit <surveyId>` | Submit structured answers to a pending survey |
| `surveys feedback <surveyId>` | Add free-text feedback to a survey |

:::danger[`--consent-survey-submission` required — irreversible]
Both `surveys submit` and `surveys feedback` are **irreversible** and require `--consent-survey-submission` to acknowledge that you are sending your answers/feedback to Toptal. They cannot be recalled once sent.
:::

## me

| Command | Purpose |
|---|---|
| `me actions list` | Your performed-actions audit log (viewer-scoped) |

---

**Unofficial.** Not affiliated with Toptal LLC. [Full disclaimer →](/disclaimer/)
