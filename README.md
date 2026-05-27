# NYXN · Rick & Morty

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Styles | Tailwind CSS v4 |
| UI Components | HeroUI v3 (headless) |
| Animations | Framer Motion |
| Icons | lucide-react |
| Class utils | clsx + tailwind-merge |
| API | [Rick & Morty API](https://rickandmortyapi.com) |

## Architecture

```
Atomic Design + Service Layer + Custom Hooks

src/
├── app/                    # Next.js App Router (SSR)
│   ├── layout.tsx          # Root layout + metadata
│   └── page.tsx            # Server Component — initial SSR fetch
├── components/
│   ├── atoms/              # Badge, Input, Spinner
│   ├── molecules/          # SearchBar, CharacterCard + skeleton
│   ├── organisms/          # Navbar, CharacterGrid (owns state)
│   └── templates/          # MainLayout (structural shell)
├── contexts/               # CharacterCacheContext (in-memory page cache)
├── services/               # httpClient.ts + characterService.ts
├── hooks/                  # useDebounce.ts + useCharacters.ts
├── types/                  # Character, ApiResponse interfaces
├── constants/              # BASE_URL, ENDPOINTS, DEBOUNCE_MS
└── lib/                    # cn() utility (clsx + tailwind-merge)
```

**Key decisions:**
- SSR initial fetch → fast first paint, ISR cache 60s
- Client-side search → debounced 400ms, no page reload
- In-memory page cache via `CharacterCacheContext` → back-navigation hits 0 network calls
- Race condition cleanup via `cancelled` flag in `useEffect`
- Service layer fully decoupled from UI (httpClient → characterService → hook → component)
- Plain `<img>` tags instead of `next/image` to bypass server-side proxy and avoid API rate limiting (429)

## Local Setup

```bash
# 1. Clone
git clone <repo-url>
cd nyxn

# 2. Install dependencies
npm install

# 3. Environment variables
cp .env.example .env.local
# .env.local is pre-filled — no changes needed

# 4. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

## Features

- ✅ Real-time search by character name (debounced 400ms, no page reload)
- ✅ Pagination (prev/next + numbered) — 20 chars/page, 826 total
- ✅ In-memory cache — back-navigation is instant (no re-fetch)
- ✅ Skeleton loading state matching card layout (no CLS)
- ✅ Empty + error states with context-aware messages (404 / 429 / network)
- ✅ Responsive grid: 2 → 3 → 4 → 5 → 6 columns across breakpoints
- ✅ NYXN dark design system (navy + cyan accent, liquid glass effects)
- ✅ Accessible: `aria-live`, `aria-busy`, `aria-label`, skip-to-content, focus-visible
- ✅ Image lazy loading (eager for first 4, lazy for rest)

## Branch Strategy

```
main       ← stable releases
develop    ← integration
feat/*     ← individual features
```
