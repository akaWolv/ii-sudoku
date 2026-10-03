# AGENTS.md - Developer & Agent Guide for ii-sudoku

## 1. Project Overview
`ii-sudoku` is a client-side Single Page Application (SPA) implementing an interactive Sudoku puzzle game, developed under the IndieImp (`ii-*`) ecosystem.

- **Type:** Client-side SPA (No backend; state serialized to URL & browser storage).
- **Core Mechanism:** Board generation via recursive backtracking, board state encoded in an 81-character string embedded in the route, allowing shareable/replayable game states.

---

## 2. Tech Stack

- **Runtime & Build:** Node.js `20.*`, Vite `2.9.7`, TypeScript `4.6.3` (Strict mode).
- **Package Manager:** Yarn v1 (Classic).
- **Frontend Framework:** React `18.1.0` with `react-router-dom` `6.3.0`.
- **UI & Theming:**
  - Material UI (MUI v5: `@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`).
  - `styled-components` `5.3.5` (bridged with MUI theme tokens).
- **State Management:**
  - **Redux Toolkit (`@reduxjs/toolkit`):** Timer/stopwatch slice (`src/features/stopwatch/stopwatchSlice.ts`, `src/stores/stopwatch.ts`).
  - **React Context:** `ThemeColorModeContext` (`light` | `dark`).
  - **Custom Hooks / Local State:** `useBoardManager` for board state, active tile highlight, validation.
  - **URL Route State:** Current board snapshot encoded in route path `/:difficultyLevelKey/:gameKey`.
- **Persistence:**
  - `localStorage` (key: `ii_sudoku_saved_games` for saved games history, progress %, and per-game elapsed time).
  - `js-cookie` (stores `themeMode`).

---

## 3. Directory Layout (`src/`)

```
src/
├── _hooks/               # Core business hooks (board generation, helpers, manager, stopwatch)
│   ├── useBoardGenerator.ts    # Recursive backtracking board generator & static tile carver
│   ├── useBoardHelper.ts       # Board encoding/decoding, conflict validation, line/square lookups
│   ├── useBoardManager.ts     # Game orchestrator, selection state, cell mutation, route synchronization
│   └── useStopwatchManager.ts  # Redux-backed timer controller with per-game time support
├── common/
│   └── AppProvider/            # Composite providers (Redux Provider, MUI/Styled ThemeProvider, StopwatchWrapper)
├── components/
│   ├── Board/                  # 9x9 CSS Grid rendering individual Tile components
│   ├── Controls/               # 1-9 keypad + erase button, disabled state based on hints/conflicts
│   ├── DifficultyLevelMenu/    # Difficulty selection list (tile counts, hint badges)
│   ├── Game/                   # Main game screen orchestrating TopBar, Board, Controls
│   ├── MenuModal/              # Modal menu with New Game trigger and theme switcher
│   ├── PleaseRotate/           # Orientation barrier for mobile landscape (< 700px height)
│   ├── SavedGames/             # Saved games list view with filtering, sorting, and resume actions
│   ├── Start/                  # Landing page with conditional Saved Games entry
│   ├── StartLevel/             # Board initialization route; triggers generator & redirects to Game
│   ├── ThemeSwitch/            # Light/Dark mode toggle control
│   ├── Tile/                   # Single Sudoku cell with conflict, group, and value styling
│   ├── TopBar/                 # Timer chip, game logo, difficulty label, menu trigger
│   └── WinnerBlend/            # Victory modal overlay when board is completed
├── constants/
│   ├── Colors.ts               # Brand hex codes (IMP_ORANGE, IMP_PINK, IMP_LIGHT_WHITE, etc.)
│   ├── DefaultFieldList.ts     # Initial 81-cell matrix metadata (x, y, hLine, vLine, square)
│   ├── DifficultLevelList.ts   # Presets (easy: 38 clues, medium: 32, hard: 28, expert: 22, master: 16, test: 80)
│   ├── Group.ts                # Enum identifying 3x3 squares (SQUARE_1_1 .. SQUARE_3_3)
│   └── TileVariant.ts          # Checkerboard variant definitions for 3x3 blocks
├── context/
│   ├── StopwatchContext.ts     # Context interface for stopwatch operations
│   └── ThemeColorModeContext.ts# Context interface for color mode toggle
├── features/
│   └── stopwatch/              # Redux slice for elapsed time and interval ID
├── helpers/
│   ├── materialTheme.ts        # Dynamic MUI theme generator with custom component overrides
│   ├── savedGamesStorage.ts    # localStorage CRUD, progress calculation, and board template IDs
│   └── index.ts
├── stores/
│   └── stopwatch.ts            # Root Redux store configuration
├── interfaces.ts               # Core TS types (Field, DifficultyLevel, ThemeColorMode)
├── App.tsx                     # Route definitions
├── main.tsx                    # Entry point mounting App to DOM
└── vite-env.d.ts
```

---

## 4. Core Architecture & Data Flow

### 4.1 Board State Encoding Protocol (`gameKey`)
The board is represented as an 81-character string serialized into the URL:
- **Length:** Exactly 81 characters (row-major order, indices 0 to 80).
- **Empty cell:** `,` (comma).
- **Static / Initial clue (immutable):** Lowercase letters `a` through `i` representing digits `1` to `9`:
  - `'a'` = 1, `'b'` = 2, ..., `'i'` = 9.
- **User input (mutable):** Digits `'1'` through `'9'`.
- **Validation Regex:** `/^([,]|[a-i]|[1-9]){81}$/`.

### 4.2 Game Lifecycle
1. **Entry (`/`):** User lands on `Start` component and selects a difficulty level.
2. **Generation (`/:difficultyLevelKey`):**
   - Handled by `StartLevel`.
   - `useBoardGenerator.generateBoard()` generates a full 81-cell solution using square-by-square recursive backtracking (`generateSquare`).
   - Carves out empty cells according to `tilesPerSquare` in the chosen difficulty level.
   - Encodes board into an 81-character string.
   - Navigates to `/:difficultyLevelKey/:gameKey`.
3. **Gameplay (`/:difficultyLevelKey/:gameKey`):**
   - Handled by `Game` and `useBoardManager`.
   - `getFieldListFromKey(gameKey)` parses and validates the string into `Field[]`.
   - Selecting a cell sets `highlightedField`.
   - Typing or clicking a number in `Controls` modifies `field.value`, regenerates the 81-character code, and calls `navigate('/' + difficultyLevel.key + '/' + boardCode)`.
4. **Completion:**
   - When all 81 fields are valid and non-empty (`isStatic || value`), `isGameFinished` becomes `true`.
   - Stopwatch halts, status transitions to `finished` in `localStorage`, and `<WinnerBlend>` overlay is displayed.
5. **Persistence & Saved Games (`/saved`):**
   - Every game start, move, or completion automatically synchronizes with `localStorage` (`ii_sudoku_saved_games`).
   - Tracked properties: `id` (template hash), `difficultyKey`, `currentGameKey`, `elapsedSeconds`, `status` (`paused` | `finished`), `progressPercent`.
   - Accessible via `/saved` or conditional button on `/`.

---

## 5. Development Workflows & Commands

```bash
# Start development server (runs vite --host on PORT from .env, default 3002)
yarn dev

# Typecheck and build for production (outputs to build/)
yarn build

# Preview production build locally
yarn preview

# Production launch via PM2
pm2 start yarn --interpreter bash --name "ii-sudoku" -- start
```

### Environment Variables
Configured via `.env`, `.env.example`, `.env.production`:
- `PORT`: Port for the local dev server (default `3002`).

---

## 6. Architectural Nuances & Technical Debt

Keep these edge cases and existing design issues in mind before making modifications:

1. **Object Mutation in Custom Hooks:**
   - `useBoardGenerator.ts` and `useBoardManager.ts` mutate `field` properties directly (`field.value = ...`, `field.isStatic = ...`) before spreading or setting state. Be cautious when introducing strict immutability checks.

2. **Type Hygiene:**
   - Multiple components and hooks utilize `Function` or `React.FC<any>` (e.g., `setHighlightedField: Function`, `changeSelectedFieldValue: Function`). Replace with concrete callback types (`(field: Field) => void`, `(value: number) => void`) when refactoring.

3. **Orientation Lock Limitation:**
   - `<PleaseRotate />` uses a CSS media query `(orientation:landscape) and (max-height: 700px)` alongside user-agent sniffing for iOS. Do not strip this without checking tablet/mobile responsive layout stability.
