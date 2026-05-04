# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

DecodEmojis — French-language Next.js 15 PWA that explains the meaning of emojis (especially coded uses among teens) plus a slang glossary. UI text is in French. See `prd.md` for product scope.

## Commands

```bash
npm run dev     # next dev --turbopack (http://localhost:3000)
npm run build   # next build — also runs generateStaticParams for /emoji/[symbol]
npm run start
npm run lint    # next lint (eslint flat config: next/core-web-vitals + next/typescript)
```

No test runner is configured.

## Stack

- Next.js 15 App Router, React 19, TypeScript (strict), Tailwind CSS v4 (`@tailwindcss/postcss`)
- `next-pwa` for service worker / installable PWA (`public/sw.js`, `public/workbox-*.js` are generated)
- `react-icons` for iconography
- Path alias `@/* → src/*`

## Two Next configs — read this before changing config

Both `next.config.ts` and `next.config.js` exist. Next picks one, not both, and the PWA wrapping lives only in `next.config.js`. If you edit Next config, edit `next.config.js` (and consider deleting the empty `next.config.ts` to remove ambiguity) — otherwise PWA generation silently breaks.

## Data layer

There is **no database**. Content is two JSON files in `public/`, served as static assets and fetched over HTTP at request/build time:

- `public/emojis.json` — emoji entries (`Emoji` type in [src/types/index.ts](src/types/index.ts))
- `public/argots.json` — slang glossary

Loading paths:

- [src/utils/emoji-utils.ts](src/utils/emoji-utils.ts) `getAllEmojis()` — primary loader. Builds a URL from `NEXT_PUBLIC_BASE_URL` (or `localhost:3000` in dev), `fetch`es with `next: { revalidate: 3600 }`, normalizes each emoji, and falls back to `staticEmojisData` (10 hardcoded entries) on failure.
- The argot pages duplicate this same fetch pattern inline ([glossaire-argot/page.tsx](src/app/glossaire-argot/page.tsx), [glossaire-argot-categories/page.tsx](src/app/glossaire-argot-categories/page.tsx)).
- [src/data/emojisData.ts](src/data/emojisData.ts) is a separate `fs.readFileSync` loader that is **not used by any page** — leftover.

Consequence: production builds need `NEXT_PUBLIC_BASE_URL` set to a URL that actually serves `public/emojis.json` at build time, because [emoji/[symbol]/page.tsx](src/app/emoji/[symbol]/page.tsx) calls `generateStaticParams()` → `getAllEmojis()`. Without it, the build falls back to the 10 static entries and only those detail pages get pre-rendered.

## Emoji encoding (important — non-obvious)

Composed emojis (skin-tone modifiers, ZWJ sequences like `👨‍❤️‍👨`) break naïve URL handling. Always go through the helpers in [src/utils/emoji-utils.ts](src/utils/emoji-utils.ts):

- `normalizeEmoji` — Unicode NFC normalization
- `encodeEmojiForUrl` / `decodeEmojiFromUrl` — encode codepoints as `hex-hex-hex`, not `encodeURIComponent`
- `getEmojiBySymbol` — tolerant matcher that compares codepoints with ZWJ stripped
- `normalizeEmojisInText` — for free-text fields containing emojis

The `/emoji/[symbol]` route param is the hex-encoded form, decoded inside the page. Background and rationale: [src/utils/README-emojis.md](src/utils/README-emojis.md).

## Routes

App Router pages under [src/app/](src/app/): `/`, `/search`, `/glossaire`, `/glossaire-alphabetique`, `/glossaire-argot`, `/glossaire-argot-categories`, `/emoji/[symbol]`, `/proposer`, `/contact`, `/cgu`, `/mentions-legales`. Most are async server components that call `getAllEmojis()` directly; `/proposer` is a client component because it reads `useSearchParams` to prefill the emoji.

## Forms

`/contact` and `/proposer` POST to Web3Forms (`https://api.web3forms.com/submit`) using `NEXT_PUBLIC_WEB3FORM_ACCESS_KEY`. No backend route handlers.

## Environment variables

- `NEXT_PUBLIC_BASE_URL` — origin used by server-side fetches of `/emojis.json` and `/argots.json` (defaults to `https://decodemojis.fr` in `emoji-utils.ts` but `https://decodemojis.vercel.app` in `.env`)
- `NEXT_PUBLIC_WEB3FORM_ACCESS_KEY` — Web3Forms access key for both forms
