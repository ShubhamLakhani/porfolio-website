# Build report — Focused fixes after motion review

Date: 19 September 2026

## Preview URL

**http://127.0.0.1:3010** — fresh production build of the current source for this fix pass.  
Ports 3000 / 3008 / 3009 may still hold older processes; do not use them for this review.

## Fixes implemented

### 1. Mobile work navigation indicator
- Active project = last whose top has crossed the reading line below the visible header; defaults to Orbofi before any project crosses.
- Work-nav height is included in the offset only while sticky (≥1100px). Mobile stays in normal flow.
- Replaced the single absolutely positioned underline with a **per-link label underline** so wrapped rows (360/390) keep `aria-current` and the visible underline on the same project.
- Recalculates on scroll, resize, hash/popstate, font load, and work-section ResizeObserver. URL is not rewritten on scroll.

### 2. Dark work heading accent
- “real life.” now uses `.work-serif-accent` with cream `var(--paper)` on the ink work surface only.
- Ivory-section `.serif-accent` orange is unchanged.
- Contrast tests now sample nested accents, strong, links, captions, and dialog caption opacity.

### 3. Experience timeline
- Dedicated gutter (24px mobile / 28px desktop) + gap before text; markers and guide share one horizontal center.
- Nodes 14px / 16px with ivory fill and muted-ink outline; active orange fill plus outer ring 24px / 26px.
- Node wrap height matches the company heading first-line box (`1.3em` at heading size) so the marker center tracks the first line.
- Neutral 2px guide from first to last node center; orange reading segment travels ~420ms; ring opens once ~300ms.
- Horizontal dividers sit on the text column (`.experience-main`), not through the gutter.
- Education remains outside the timeline. Decorative rail/nodes/rings are `aria-hidden`. Reduced motion updates immediately.

## Checks run

| Command | Result |
| --- | --- |
| `pnpm check` | Pass (expected `metadataBase` warning) |
| `SKIP_WEBSERVER=1 PORT=3010 pnpm exec playwright test` | Pass **24/24** |

New / extended tests: mobile active-link underline match, work cream accent color, extended work contrast (nested elements + opacity), experience node/heading alignment (≤2px) + reduced-motion single active role.

## Evidence

Original-resolution captures (also zipped):

| File | Dimensions |
| --- | --- |
| `review/fix-desktop-full.png` | **1440 × 10144** |
| `review/fix-mobile-full.png` | **390 × 14808** |
| `review/fix-desktop-hero.png` / `-work.png` / `-experience.png` | 1440 × 900 |
| `review/fix-desktop-work-heading.png` | work “real life.” cream accent crop |
| `review/fix-desktop-experience-active.png` | mid-scroll active ring |
| `review/fix-mobile-hero.png` / `-work-nav.png` / `-experience.png` | 390 × 844 |
| `review/fix-mobile-360-work-nav.png` | wrapped nav, Orbofi underlined |
| `review/fix-screenshots.zip` | all `fix-*.png` originals |

Recordings (measured wall-clock from automation start to context close):

| File | Duration |
| --- | --- |
| `review/motion/fix-desktop-walkthrough.webm` | **30.5 s** — hero, approach, work nav through all four projects, gallery, dialog open/close, story expand, expertise, experience scroll across roles and back, contact |
| `review/motion/fix-mobile-walkthrough.webm` | **13.3 s** — work nav active changes through all four projects, experience scroll with markers |

## Unresolved

- Set `NEXT_PUBLIC_SITE_URL` before publish.
- Encoded webm length can differ slightly from wall-clock; values above are the measured capture times.
