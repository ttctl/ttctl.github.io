---
title: Disclaimer
description: TTCtl is unofficial, personal-use only, and not affiliated with Toptal LLC.
---

## Unofficial. Not affiliated with Toptal LLC.

TTCtl is an **unofficial** personal-productivity tool. It is **not affiliated with, endorsed by, or supported by Toptal LLC**. It interacts with Toptal Talent's public web and mobile interfaces using your own session, exclusively for personal use.

This tool is built for fair use against the maintainer's own profile and is shared in case it's useful to other Toptal talents for their own profiles.

## What TTCtl is not for

TTCtl is **not** a platform for:

- **Spam** of any kind directed at Toptal, its clients, recruiters, or other talents
- **Mass automation** of profile interactions, applications, or engagement signals
- **Recruiter scraping** or harvesting of client / opportunity / talent data
- **Engagement-signal manipulation** — fake activity, gamed metrics, inflated stats
- **Application bombing** — rapid-fire applications across opportunities to game match scoring
- **Any behavior** that violates [Toptal's Terms of Service](https://www.toptal.com/tos), the [Toptal Network Code](https://www.toptal.com/community/code-of-conduct), or burdens the platform

If you're considering using TTCtl for any of the above, **don't**. Use it for what it's built for: managing **your own** Toptal profile, time, and engagements.

## Trademark / nominative fair use

"Toptal" is a trademark of **Toptal LLC**. Use of the name in this project — its description, documentation, and identifying language — is **nominative fair use only**. TTCtl does not use Toptal's logos, brand assets, or visual identity, and does not represent itself as a Toptal product or service.

The project name "TTCtl" is a contraction chosen for ergonomic CLI use; it is not a Toptal mark and does not imply endorsement.

## Reverse engineering and API access

TTCtl synthesizes a local representation of Toptal Talent's GraphQL surfaces (mobile gateway, talent profile portal, scheduler) from observed traffic and persisted-query introspection. It uses TLS-fingerprint impersonation ([`node-wreq`](https://github.com/alexey-pelykh/node-wreq)) where Cloudflare bot-management requires it.

This is fair-use research conducted against the maintainer's own profile. The reverse-engineering artifacts are kept private and are not redistributed publicly. The TTCtl code itself does not embed or distribute Toptal's persisted query hashes; it discovers them at runtime from your own session.

## No warranty

TTCtl is provided **as is**, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and non-infringement. See the [LICENSE](/license/) for the full terms.

## Liability

You are responsible for how you use TTCtl. If you use it in ways that violate Toptal's Terms of Service or harm the platform or its participants, the maintainer disclaims all liability. The license that ships with TTCtl makes this explicit.

## Reporting issues

- **Security issues**: see the [security policy](/security/) — please do not file public GitHub issues for security-sensitive reports
- **Bugs and feature requests**: use the [GitHub issue tracker](https://github.com/alexey-pelykh/ttctl/issues)
- **Conduct concerns**: see the [Code of Conduct](https://github.com/alexey-pelykh/ttctl/blob/main/CODE_OF_CONDUCT.md) and email <alexey.pelykh@gmail.com>. Pseudonymous reports accepted; truly anonymous reports not feasible. Best-effort response within 7 days.

## Contact

Maintainer: **Oleksii PELYKH** ([alexey-pelykh on GitHub](https://github.com/alexey-pelykh)).

For nominative-fair-use, takedown, or trademark concerns from Toptal LLC: please open an issue or contact the maintainer directly. TTCtl will respond promptly and in good faith.

---

**License: [AGPL-3.0-only](/license/) · [Repository](https://github.com/alexey-pelykh/ttctl)**
