# Leaderboard App — Implementation Plan

## Step 1: Project Initialization
- [x] Initialize Vite + React + TypeScript project (`npm create vite@latest leaderboard -- --template react-ts`)
- [x] Install core dependencies: `@fluentui/react-components`, `@fluentui/react-icons`, `react`, `react-dom`
- [x] Install dev dependencies: `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, `eslint-plugin-react-hooks`, `eslint-config-prettier`, `prettier`

## Step 2: Configuration Files
- [x] Configure `tsconfig.app.json` — strict mode, path aliases (`@/` → `src/`)
- [x] Configure `eslint.config.js` — TS + React hooks + prettier rules (flat config for ESLint 10)
- [x] Configure `.prettierrc` — single quotes, trailing commas, 2-space indent, 100 line width
- [x] Configure `.prettierignore`
- [x] Add `lint`, `lint:fix`, `format`, `format:check`, `typecheck` scripts to `package.json`
- [x] Configure `vite.config.ts` with `@/` path alias via `resolve.alias`

## Step 3: FSD Folder Structure
- [x] Create all FSD layer directories: `app/`, `pages/`, `widgets/`, `features/`, `entities/`, `shared/`

## Step 4: Shared Layer
- [x] `shared/config/constants.ts` — YEAR_OPTIONS, QUARTER_OPTIONS, CATEGORY_OPTIONS with exported key types
- [x] `shared/lib/cn.ts` — classname utility helper
- [x] `shared/ui/Avatar/` — circular avatar with rank badge overlay (gold/silver/bronze colors)
- [x] `shared/ui/StarScore/` — star icon + numeric score display, supports gold variant
- [x] `shared/ui/Container/` — max-width 1500px centered wrapper with responsive padding

## Step 5: Entity Layer — Contributor
- [x] `entities/contributor/model/types.ts` — `Contributor` interface (id, name, title, department, score, presentations, year, quarter, category, avatarUrl)
- [x] `entities/contributor/model/mock.ts` — 100 mock contributors with American names, tech departments, distributed across years/quarters/categories
- [x] `entities/contributor/ui/ContributorRow/` — expandable row with rank, avatar, name, title, presentations, score, chevron
- [x] `entities/contributor/index.ts` — public API

## Step 6: Feature Layer — Filters
- [x] `features/leaderboard-filters/model/useLeaderboardFilters.ts` — hook managing year/quarter/category/search state, returns filtered+sorted list
- [x] `features/leaderboard-filters/ui/FilterControls/` — three Fluent UI Select dropdowns + SearchBox
- [x] `features/leaderboard-filters/index.ts` — public API

## Step 7: Widget Layer — Podium
- [x] `widgets/podium/ui/Podium.tsx` — renders top-3 in 2nd-1st-3rd visual order, gold/silver/bronze podium blocks
- [x] `widgets/podium/index.ts`

## Step 8: Widget Layer — Ranking List
- [x] `widgets/ranking-list/ui/RankingList.tsx` — ranked list using `ContributorRow`, empty state message
- [x] `widgets/ranking-list/index.ts`

## Step 9: Widget Layer — Filter Bar
- [x] `widgets/filter-bar/ui/FilterBar.tsx` — card with shadow wrapping FilterControls
- [x] `widgets/filter-bar/index.ts`

## Step 10: Page Layer
- [x] `pages/leaderboard/ui/LeaderboardPage.tsx` — composes FilterBar + Podium + RankingList with page header
- [x] `pages/leaderboard/index.ts`

## Step 11: App Layer
- [x] `app/styles/global.css` — CSS reset, body background, font stack
- [x] `app/App.tsx` — root component with `FluentProvider` (webLightTheme)
- [x] `src/main.tsx` — updated mount point without boilerplate

## Step 12: Responsive Layout
- [x] Container max-width 1500px, responsive horizontal padding (16/24/32px)
- [x] Podium — flex row layout, responsive gap/padding
- [x] FilterBar — flex-wrap so dropdowns stack on small screens
- [x] RankingList rows — presentations column hidden on ≤480px

## Step 13: Polish & QA
- [x] Verified filter logic (year/quarter/category/search all combined correctly)
- [x] Search is case-insensitive, matches partial names
- [x] `npm run lint` — zero errors
- [x] `npm run format` — applied, no remaining diffs
- [x] `tsc --noEmit` — zero TypeScript errors
- [x] Dev server running at http://localhost:5173
