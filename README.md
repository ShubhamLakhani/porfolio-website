# Shubham Lakhani portfolio

Next.js App Router site for the approved personal portfolio. Application code lives in this `site/` folder.

## Requirements

- Node.js 20+ (verified with 24.21.0)
- pnpm 9+ (lockfile uses pnpm 12.4.2)

## Commands

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build
pnpm start
pnpm lint
pnpm typecheck
pnpm check        # lint + typecheck + build
pnpm test:smoke   # Playwright interactions (expects a built app; starts `pnpm start`)
```

## Content and design

- Typed copy: `src/content/`
- Tokens and global styles: `src/app/globals.css`
- Section components: `src/components/`
- Project screenshots: `public/projects/`
- Resume PDF: `public/resume/Shubham_Lakhani_Resume.pdf`

Part A of the kit’s approved content is rendered. Part B editorial notes are not.

## Optional production URL

Canonical/sitemap output is enabled only when a real non-local URL is set:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

Leave unset for local development. Do not set it to `localhost`.

## Review screenshots

Local visual captures from verification are stored in `review/` (not served publicly).
