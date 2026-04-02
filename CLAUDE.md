# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server
npm run build     # Type-check (astro check) then build to /dist
npm run preview   # Serve the production build locally
```

There is no test suite. Linting is handled by Prettier:

```bash
npx prettier --write .   # Format all files
npx prettier --check .   # Check formatting
```

## Architecture

**MacroCalc** is an Astro 6 + React 19 single-page nutrition calculator deployed to GitHub Pages at `https://dawalberto.github.io/macronutrients`.

### Data Flow

1. React components capture user input (sliders, dropdowns)
2. Each input calls a store update function (e.g. `$updateUserWeight()`)
3. The nanostores `map()` in `src/store/user-attributes.ts` emits reactive updates
4. `listenKeys()` subscriptions in the store trigger cascading recalculations:
   - Weight/Height/Gender changes → recalculate LBM
   - LBM/Age/Weight changes → recalculate BMR
5. Components read from the store via `useStore()` — no prop drilling

### Key Directories

- `src/store/` — single file with all state and `$update*` functions
- `src/utils/` — pure calculation functions (BMR, LBM, exercise multipliers); barrel-exported via `index.ts`
- `src/lib/` — static config: `defaults.ts` (initial state values) and `settings.ts` (macro ratios, calorie adjustments)
- `src/types/` — all TypeScript types and enums (`Genre`, `Goal`, `BMREquation`, `LBMEquation`)
- `src/components/` — React components (`.tsx`) and one Astro component (`ChartMacros.astro` for Chart.js)
- `src/pages/index.astro` — single route; composes all components

### Calculation Architecture

The app supports multiple formula choices per calculation type:
- **LBM** (Lean Body Mass): Boer, James, Hume, or Manual input
- **BMR** (Basal Metabolic Rate): Mifflin St Jeor, Revised Harris-Benedict, or Katch-McArdle

Goal adjustments (`Maintain` / `Surplus` / `Definition`) apply fixed calorie offsets (±300 kcal) and vary protein/fat/carb ratios — see `src/lib/settings.ts`.

### Conventions

- Path aliases: `@components/*`, `@store/*`, `@utils/*`, `@lib/*`, `@types/*`, `@styles/*`
- Formatting: tabs (width 4), single quotes, trailing commas (ES5), print width 150
- React components use named exports (not default)
- Enums for all categorical data; type aliases for primitives (`type Weight = number`)
- Brutalist dark-theme UI; custom CSS classes `.brutalist-border`, `.brutalist-border-active`, `.chamfered` defined in `src/styles/global.css`
