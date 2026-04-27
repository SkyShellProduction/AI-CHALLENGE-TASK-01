# Implementation Report

## Step 1: Project Initialization
**Done.** Scaffolded a new project using `npm create vite@latest leaderboard -- --template react-ts`.
- Applied technology: **Vite 8** as the build tool for fast HMR and ES module bundling.
- Installed **Fluent UI v9** (`@fluentui/react-components`, `@fluentui/react-icons`) — Microsoft's design system with built-in `makeStyles` for zero-runtime CSS-in-JS.
- React 19 + TypeScript 6 base.

## Step 2: Configuration Files
**Done.** Set up the full toolchain:
- **`tsconfig.app.json`**: enabled `"strict": true`, added `baseUrl`/`paths` for `@/` alias pointing to `src/`.
- **`vite.config.ts`**: added `resolve.alias` so `@/` maps to `src/` at bundle time, consistent with tsconfig.
- **`eslint.config.js`**: used ESLint 10 flat config with `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-config-prettier`. Added rules: `no-explicit-any: error`, `no-unused-vars: error`, `no-console: warn`.
- **`.prettierrc`**: `singleQuote`, `trailingComma: all`, `printWidth: 100`, `tabWidth: 2`.
- **`package.json`**: added `lint`, `lint:fix`, `format`, `format:check`, `typecheck` scripts.

## Step 3: FSD Folder Structure
**Done.** Created all Feature-Sliced Design layers under `src/`:
- Applied technology: **FSD (Feature-Sliced Design)** architecture — `app → pages → widgets → features → entities → shared` strict import direction.

## Step 4: Shared Layer
**Done.** Built reusable primitives:
- **`shared/config/constants.ts`**: filter option arrays with `as const` and exported key union types (`YearKey`, `QuarterKey`, `CategoryKey`).
- **`shared/lib/cn.ts`**: minimal classname joiner utility.
- **`shared/ui/Avatar`**: circular image with absolute-positioned rank badge; uses `ui-avatars.com` as fallback on broken image URLs.
- **`shared/ui/StarScore`**: reusable score display with `default` (blue star) and `gold` variants for podium use.
- **`shared/ui/Container`**: max-width 1500px wrapper with responsive padding via Fluent UI `makeStyles` media queries.

## Step 5: Entity Layer — Contributor
**Done.** Defined the core business model:
- **`model/types.ts`**: `Contributor` interface with strict types — `year: 2024 | 2025`, `quarter: Exclude<QuarterKey, 'all'>`, `category: Exclude<CategoryKey, 'all'>`.
- **`model/mock.ts`**: deterministic generation of **100 contributors** using American first/last names, tech departments (Mobile, Backend, Frontend, QA, Game Dev, ML, DevOps, Data Science), distributed evenly across years/quarters/categories. Top 3 scores are fixed (536, 328, 320).
- **`ui/ContributorRow`**: expandable row — clicking reveals Year, Quarter, Category, Presentations details. Presentations column hidden on ≤480px.

## Step 6: Feature Layer — Filters
**Done.** Encapsulated all filtering logic:
- **`useLeaderboardFilters`** hook: manages `{ year, quarter, category, search }` state. `useMemo` recomputes the filtered+sorted list on every filter change. Filtering is cumulative (all active filters applied simultaneously). Search is case-insensitive substring match on contributor name.
- **`FilterControls`**: three native Fluent UI `<Select>` components + `<SearchBox>` with clear button. Uses `flex-wrap` for responsive stacking.

## Step 7: Widget Layer — Podium
**Done.** Visual podium component:
- Applied technique: classic podium layout — **2nd place left, 1st place center, 3rd place right**, each on a colored pedestal.
- Gold (`#F0A500`), silver (`#9E9E9E`), bronze (`#7D4E00`) gradient podium blocks with semi-transparent rank number overlay.
- Podium only renders if filtered data has at least 1 entry; always uses the top 3 from the current filtered list.

## Step 8: Widget Layer — Ranking List
**Done.** Full ranked list below the podium:
- Renders all filtered contributors (not just top 3) using `ContributorRow`.
- Shows "No contributors match the selected filters" empty state when the list is empty.

## Step 9: Widget Layer — Filter Bar
**Done.** Card wrapper:
- Fluent UI `shadow4` card with border-radius housing the `FilterControls` feature.
- Intentionally thin — widget owns only layout/card styling, not filter logic.

## Step 10: Page Layer
**Done.** Page composition:
- `LeaderboardPage` owns the `useLeaderboardFilters` hook (single source of truth for filter state) and passes data down to FilterBar, Podium, and RankingList via props.
- Page header: "Leaderboard" h1 + "Top performers based on contributions and activity" subtitle.

## Step 11: App Layer
**Done.** Application shell:
- `App.tsx`: wraps the app in Fluent UI's `FluentProvider` with `webLightTheme`.
- `global.css`: CSS reset (`box-sizing: border-box`, margin/padding zero), `#f0f0f0` body background, Segoe UI font stack.
- `main.tsx`: clean mount — throws explicit error if `#root` element is missing instead of using non-null assertion.

## Step 12: Responsive Layout
**Done.** Fluid/rubber layout at all breakpoints:
- Container: 16px padding on mobile → 24px on tablet → 32px on desktop.
- FilterBar dropdowns: `flex-wrap` — stack vertically below their natural breakpoint.
- Podium: scales via `flex: 0 1 220px` slots and reduced font/padding on mobile.
- ContributorRow presentations counter hidden on ≤480px to prevent overflow.

## Step 13: QA
**Done.** All checks passed:
- `tsc --noEmit` — **0 errors**
- `npm run lint` — **0 errors**
- `npm run format:check` → `npm run format` — **4 files auto-fixed**, 0 remaining diffs
- Dev server started successfully on **http://localhost:5173**
