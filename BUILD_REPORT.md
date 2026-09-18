# Build report — Shubham Lakhani portfolio

Date: 18 September 2026 (visual repair kit applied)

## Repair kit application

Source: `portfolio-repair-kit/` against app root `site/`.

| File | Baseline SHA match | Result |
| --- | --- | --- |
| 8 application files + `playwright.config.ts` | Matched `original_sha256` | `changes.patch` applied; hashes match `corrected_sha256` |
| `tests/visual-integrity.spec.ts` | New | Added from patch |

Extra local adjustments (not in kit, required for verification):

- `playwright.config.ts` — `PORT` env support so tests can target a free port when **3005** is occupied by an older preview (default remains 3005; `reuseExistingServer: false` kept).
- `tests/smoke.spec.ts` — scoped Accelevents lightbox dialog to `#accelevents` and waited for the copy-email control before click (same assertions; reduces parallel-worker flakes).

## Root fixes verified

- Typography / component rules live in `@layer components` so Tailwind utilities win.
- `#work` / dialog use `data-surface="ink"` with light heading/body/secondary tokens.
- Scroll reveal never sets opacity to 0 / 0.01; motion is translate-only via WAAPI; content opaque without JS.
- Expertise: quieter cards, icon lists without nested skill chips, learning card separate; all skills retained.
- Expertise hover lift not cancelled by reveal; approach progress bar stays mounted across stage changes.

## Checks run

| Command | Result |
| --- | --- |
| `pnpm check` (`lint` + `typecheck` + `build`) | Pass (expected `metadataBase` warning) |
| `SKIP_WEBSERVER=1 PORT=3006 pnpm exec playwright test` | Pass **18/18** (14 smoke + 4 visual-integrity) |

First full parallel run had 2 flake failures (gallery dialog scope / clipboard timing); both passed serially, then the full suite passed after the locator hardening above. Assertions were not weakened.

## Live visual / motion review

Fresh production server: **http://127.0.0.1:3006**  
(Port **3005** still held an older pre-repair `next start`; it was not terminated. Open **3006** for this build.)

Measured work-section contrast on ink (`#202421`):

| Element | Color | Contrast |
| --- | --- | --- |
| Headings | `#F5F2EA` | ~14.05:1 |
| Body | `#E3E7DE` | ~12.54:1 |
| Result | `#DCE5D2` | ~12.11:1 |
| Captions | `#C4CCBE` | ~9.53:1 |

All widths **360 / 390 / 768 / 1024 / 1440**: no horizontal overflow; min reveal opacity **1**.

Browser checks exercised: hero underline, approach stage + progress, expertise hover lift, lightbox open/close, reduced-motion and no-JS paths (via smoke suite).

### Evidence (`site/review/`)

- `repair-desktop-hero.png`, `repair-desktop-work.png`, `repair-desktop-expertise.png`, `repair-desktop-full.png`
- `repair-mobile-hero.png`, `repair-mobile-full.png`
- `motion/repair-motion.webm` — short recording (hero → scroll → approach → expertise hover → lightbox)

Lighthouse was **not** run.

## Content preservation

Approved copy, dates, metrics, roles, learning labels, contact details, project order, links, images, fonts, and palette unchanged by this repair. No new dependencies.

## Pre-publication

Set `NEXT_PUBLIC_SITE_URL` to the real https domain, rebuild, and verify metadata. Do not invent a domain.
