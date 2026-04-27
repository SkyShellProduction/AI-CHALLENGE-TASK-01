# CLAUDE.md — Leaderboard App

## Tech Stack
- **Runtime**: React 18 + TypeScript (strict)
- **UI Library**: Fluent UI v9 (`@fluentui/react-components`)
- **Build tool**: Vite
- **Architecture**: Feature-Sliced Design (FSD)

---

## TypeScript Rules
- **No `any`** — always use explicit types or `unknown` with type guards
- **No non-null assertions** (`!`) unless the value is provably non-null from context
- Prefer `interface` for object shapes, `type` for unions/intersections
- Export types from `model/types.ts` within each FSD slice
- Use path alias `@/` for imports from `src/` (configured in tsconfig + vite)
- All props interfaces must be explicitly typed; never rely on inference for component props

---

## ESLint Rules (enforced, never disable)
- `@typescript-eslint/no-explicit-any` — error
- `@typescript-eslint/no-unused-vars` — error
- `react-hooks/rules-of-hooks` — error
- `react-hooks/exhaustive-deps` — error
- `import/order` — enforce FSD layer import order (shared → entities → features → widgets → pages → app)

---

## Prettier Rules
- `singleQuote: true`
- `trailingComma: "all"`
- `semi: true`
- `printWidth: 100`
- `tabWidth: 2`
- `bracketSpacing: true`
- `arrowParens: "always"`
Run `npm run format` before committing. CI will fail on unformatted code.

---

## FSD Architecture Rules

### Layer order (imports only go DOWN, never UP)
```
app → pages → widgets → features → entities → shared
```
A layer may only import from layers **below** it. Never import from a higher layer.

### Slice public API
- Every slice exposes **only** what is listed in its `index.ts`
- Do **not** import from deep paths like `entities/contributor/model/types` from outside the entity — import from `entities/contributor`
- Internal files not re-exported from `index.ts` are private to the slice

### Layer responsibilities
| Layer | Contains |
|-------|----------|
| `shared` | Primitives: UI atoms, utilities, constants, types with no business logic |
| `entities` | Business models: types, mock data, single-entity UI (row, card) |
| `features` | User interactions: hooks, forms, filter logic — no page layout |
| `widgets` | Composed UI blocks combining entities + features — no routing |
| `pages` | Page-level composition; one component per route |
| `app` | Providers, global styles, router — nothing business-logic specific |

### File naming
- Components: `PascalCase.tsx`
- Hooks: `useCamelCase.ts`
- Utilities: `camelCase.ts`
- Types: `types.ts` (one per slice)
- Mock data: `mock.ts`
- Each UI component lives in its own folder: `ComponentName/ComponentName.tsx` + `index.ts`

---

## Styling Rules
- Use Fluent UI's `makeStyles` / `mergeClasses` for component styles — no inline `style=` props except for dynamic values (e.g., calculated heights)
- No plain CSS files for component styles; use `makeStyles` exclusively
- Global reset + body background in `app/styles/global.css` only
- Responsive breakpoints: mobile-first; `@media (min-width: 768px)` for tablet, `@media (min-width: 1024px)` for desktop
- Container max-width: **1500px**, centered with `margin: 0 auto`

---

## Mock Data Rules
- All mock data lives in `entities/contributor/model/mock.ts`
- Generate exactly **100** records
- Distribute evenly across years (2024, 2025), quarters (Q1–Q4), and categories (education, public_speaking, university_partners)
- Use realistic-looking names; never use "John Doe" or "Test User"
- Scores range 50–600; top 3 must have scores > 500

---

## Commit & PR Rules
- Run `npm run lint && npm run format:check && tsc --noEmit` before committing
- Commit messages: `feat:`, `fix:`, `refactor:`, `chore:` prefixes
