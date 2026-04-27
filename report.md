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

## Step 14: Fix duplicate names in mock data
**Done.** Each full name was repeating 3–4 times across 100 records due to array sizes being multiples.

**Root cause:** `FIRST_NAMES` had 30 entries and `LAST_NAMES` had 30 entries. With multipliers `i * 7` and `i * 11`, the period of unique combinations is `LCM(30, 30) = 30`, so every combination repeated `100 / 30 ≈ 3–4` times.

**Fix:** Added one entry (`'Campbell'`) to `LAST_NAMES`, making it 31 entries. Now the period is `LCM(30, 31) = 930 > 100`, so all 100 generated names are fully unique.

- File changed: `entities/contributor/model/mock.ts`

## Step 15: Single expanded card in ranked list
**Done.** Previously each `ContributorRow` managed its own `expanded` state independently — multiple cards could be open simultaneously.

**Approach:** Lifted state up to `RankingList`:
1. Removed `useState(false)` from `ContributorRow`; replaced with two new required props — `isExpanded: boolean` and `onToggle: () => void`
2. Added `useState<string | null>(null)` (`expandedId`) to `RankingList`
3. Each row receives `isExpanded={expandedId === contributor.id}` and `onToggle` that sets `expandedId` to the clicked id, or resets to `null` if the same row is clicked again — ensuring only one card is open at a time

- Files changed: `entities/contributor/ui/ContributorRow/ContributorRow.tsx`, `widgets/ranking-list/ui/RankingList.tsx`

## Step 16: Multiple categories per contributor with icons and tooltips

**Done.** Previously each contributor had a single `category` field; all rows showed the same desktop icon regardless of category.

### Data model change
- `Contributor.category: string` → `Contributor.categories: Array<Exclude<CategoryKey, 'all'>>`
- File changed: `entities/contributor/model/types.ts`

### Mock data — deterministic multi-category assignment
- If `i % 7 === 0` → contributor gets all 3 categories (~14 contributors)
- If `i % 3 === 0` → contributor gets primary + one extra category (~29 contributors)
- Otherwise → single primary category (~57 contributors)
- Extra categories are always the two that the primary isn't, picked by `(primaryIdx + 1) % 3` and `(primaryIdx + 2) % 3`
- File changed: `entities/contributor/model/mock.ts`

### Filtering update
- `c.category !== filters.category` → `!c.categories.includes(filters.category)` so filtering returns contributors that have the selected category anywhere in their array
- File changed: `features/leaderboard-filters/model/useLeaderboardFilters.ts`

### Category icons with tooltips in ContributorRow
- Added a `CATEGORY_ICON` map (`education` → `BookOpenRegular`, `public_speaking` → `MicRegular`, `university_partners` → `BuildingRegular`) using `FluentIcon` type
- Added a `CATEGORY_LABEL` map for human-readable names
- Rendered all contributor categories as brand-colored icons inside a `categoryIcons` span (hidden on ≤480px) — placed between presentations count and score
- Each icon wrapped in Fluent UI `<Tooltip>` (`relationship="description"`) so hovering shows the category name
- Expanded section updated: `Category` label replaced with `Categories`, rendering `CATEGORY_LABEL` values joined by `", "`
- File changed: `entities/contributor/ui/ContributorRow/ContributorRow.tsx`

## Step 17: Category badge redesign — vertical icon + count layout

**Done.** Category icons were shown as flat inline icons without numbers; user wanted a vertical badge layout (icon on top, number below) in brand blue.

- Removed the separate presentations counter (`DesktopRegular` + count)
- Each category now renders as a flex-column badge: icon (18px) above a count (`Math.round(presentations / categories.length)`), all in `colorBrandForeground1`
- Hidden on ≤480px screens
- Distribution tightened: `i % 20 === 5` → 3 categories (5 contributors), `i % 10 === 0` → 2 categories (10 contributors), otherwise 1 category (85 contributors)
- Files changed: `entities/contributor/model/mock.ts`, `entities/contributor/ui/ContributorRow/ContributorRow.tsx`

## Step 18: Recent Activity panel in expanded card

**Done.** The expanded card previously showed static Year/Quarter/Category/Presentations fields. Replaced with a "RECENT ACTIVITY" table matching a provided design reference.

### Data model
- Added `CategoryValue` type alias (`Exclude<CategoryKey, 'all'>`) to `types.ts`
- Added `Activity` interface (`name`, `category`, `date`, `points`) to `types.ts`
- Added `activities: Activity[]` to `Contributor`

### Mock data — deterministic activity generation
- Each contributor gets `n = 2 + (i % 3)` activities (2, 3, or 4)
- Points distributed across activities using weighted random (weights 1–5 per activity) normalized to sum exactly to `contributor.score`, so the total always equals the score shown in the card
- Activity names generated from per-category template arrays with English names/topics/events/universities:
  - `education` → `[REG] Mentoring of …` / `[REG] Workshop: …` / etc.
  - `public_speaking` → `[SPK] Talk at …` / `[SPK] Webinar: …` / etc.
  - `university_partners` → `[UNI] Lecture for guests from …` / `[UNI] Workshop at …` / etc.
- Dates generated as `DD-Mon-YYYY` strings (2024–2025 range), deterministic per contributor index
- File changed: `entities/contributor/model/mock.ts`, `entities/contributor/model/types.ts`

### ContributorRow expanded section
- Replaced old four-field layout with a CSS Grid table (`1fr 160px 130px 70px`)
- Header row: ACTIVITY / CATEGORY / DATE / POINTS (uppercase, muted)
- Each activity row rendered via `flatMap` (flat grid children, no wrapper divs)
- Category column: pill badge with per-category color — Education `#FFF3E0/E65100`, Public Speaking `#F3E5F5/7B1FA2`, University Partners `#E3F2FD/1565C0`
- Points column: right-aligned, brand blue, `+N` format
- File changed: `entities/contributor/ui/ContributorRow/ContributorRow.tsx`

## Step 19: English-only names in activity descriptions

**Done.** `MENTEE_NAMES` in mock data contained Central Asian names. Replaced with 12 common English first + last name combinations (James Carter, Emma Robinson, Noah Mitchell, etc.) so all visible text in activity descriptions is English.

- File changed: `entities/contributor/model/mock.ts`

## Step 20: Dedicated expand/collapse button

**Done.** Previously the entire contributor row was clickable to expand/collapse. Replaced with a dedicated button.

- Removed `onClick`, `role="button"`, `tabIndex`, `onKeyDown` from the row `<div>` — the row is no longer interactive
- Added a native `<button>` element wrapping the chevron icon, styled via `expandButton` class:
  - 32×32px, `border-radius: 50px` (circular), 1.5px solid border in `colorNeutralStroke1`
  - Brand blue chevron; on hover: `colorBrandBackground2` fill + `colorBrandStroke1` border
  - Border specified as per-side longhand properties (`borderTopWidth` etc.) — required by Griffel's atomic CSS engine
- `aria-label` toggles between "Collapse" and "Expand" for accessibility
- File changed: `entities/contributor/ui/ContributorRow/ContributorRow.tsx`
