# Meeting Bingo — Implementation Plan

**Version**: 1.0
**Date**: March 3, 2026
**Status**: Implemented
**Stack**: React 18 + TypeScript + Vite + Tailwind CSS

---

## Overview

Greenfield browser-based bingo game with live audio transcription via the Web Speech API. Zero-cost infrastructure, deployed to Vercel.

---

## Phase 1: Project Scaffolding

**Goal**: Initialize the Vite + React + TypeScript project with Tailwind CSS.

1. Initialize Vite project in repo root with `react-ts` template
2. Install dependencies: `react`, `react-dom`, `canvas-confetti`
3. Install dev dependencies: `tailwindcss`, `postcss`, `autoprefixer`, `@types/react`, `@types/react-dom`, `@vitejs/plugin-react`, `typescript`, `vite`
4. Configure Tailwind CSS with custom animations (bounceIn, pulse-fast, confetti)
5. Configure Vite with React plugin, port 3000, sourcemaps
6. Create project structure:

```
src/
├── main.tsx
├── App.tsx
├── index.css
├── components/
├── hooks/
├── lib/
├── data/
├── types/
└── context/
```

**Files created**: `package.json`, `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`, `tailwind.config.js`, `postcss.config.js`, `index.html`, `public/favicon.svg`, `src/main.tsx`, `src/index.css`, `src/App.tsx`

---

## Phase 2: Types & Data

**Goal**: Define TypeScript interfaces and buzzword category data.

1. Create `src/types/index.ts` with all type definitions:
   - `CategoryId`, `Category`, `BingoSquare`, `BingoCard`
   - `GameStatus`, `WinningLine`, `GameState`
   - `SpeechRecognitionState`, `Toast`
2. Create `src/data/categories.ts` with three buzzword packs:
   - **Agile & Scrum** — sprint, backlog, standup, retrospective, etc. (47 words)
   - **Corporate Speak** — synergy, leverage, circle back, etc. (46 words)
   - **Tech & Engineering** — API, cloud, microservices, etc. (46 words)

**Files created**: `src/types/index.ts`, `src/data/categories.ts`

---

## Phase 3: Core Game Logic

**Goal**: Implement pure logic functions with no UI dependencies.

| File | Purpose |
|------|---------|
| `src/lib/cardGenerator.ts` | Fisher-Yates shuffle, `generateCard()`, `getCardWords()` |
| `src/lib/bingoChecker.ts` | `checkForBingo()`, `countFilled()`, `getClosestToWin()` |
| `src/lib/wordDetector.ts` | `detectWords()`, `detectWordsWithAliases()`, `WORD_ALIASES` |
| `src/lib/shareUtils.ts` | `generateShareText()`, `copyToClipboard()`, `nativeShare()` |
| `src/lib/utils.ts` | `cn()` helper for conditional classnames |

### Key algorithms

- **Card generation**: Shuffle category words, pick 24, place in 5x5 grid with center free space
- **Bingo detection**: Check all 5 rows, 5 columns, and 2 diagonals for filled lines
- **Word detection**: Regex word-boundary matching for single words, substring matching for phrases, plus alias lookups (e.g., "CI/CD" matches "continuous integration")

---

## Phase 4: React Hooks

**Goal**: Create React hooks for speech recognition and game state.

| File | Purpose |
|------|---------|
| `src/hooks/useSpeechRecognition.ts` | Web Speech API wrapper — start/stop/reset, continuous mode, interim results, auto-restart on end, error handling |
| `src/hooks/useGame.ts` | Game state management — square toggle, auto-fill wiring from transcript |
| `src/hooks/useBingoDetection.ts` | Win condition monitoring — triggers callback on bingo |
| `src/hooks/useLocalStorage.ts` | Persistence helper for game state |

---

## Phase 5: UI Components

**Goal**: Build all React components per the component tree.

### Component tree

```
App (screen router: landing → category → game → win)
├── LandingPage
│   ├── Hero section with "New Game" CTA
│   ├── How-it-works steps
│   └── Privacy message
│
├── CategorySelect
│   ├── 3 category cards with icons, descriptions, sample words
│   └── Back button
│
├── GameBoard
│   ├── Header (logo + progress counter)
│   ├── BingoCard (5x5 grid)
│   │   └── BingoSquare (×25) — states: default, filled, auto-filled, free, winning
│   ├── TranscriptPanel — live transcript, listening indicator, detected word chips
│   ├── GameControls — new card button, listening toggle
│   └── Toast notifications
│
├── WinScreen
│   ├── Confetti animation (canvas-confetti)
│   ├── Winning card with highlighted line
│   ├── Game stats (time, winning word, squares filled)
│   └── Share + Play Again buttons
│
└── Shared UI
    ├── ui/Button — variants: primary, secondary, ghost
    ├── ui/Card — container component
    └── ui/Toast — auto-dismissing notification
```

### Files created

- `src/components/LandingPage.tsx`
- `src/components/CategorySelect.tsx`
- `src/components/GameBoard.tsx`
- `src/components/BingoCard.tsx`
- `src/components/BingoSquare.tsx`
- `src/components/TranscriptPanel.tsx`
- `src/components/GameControls.tsx`
- `src/components/WinScreen.tsx`
- `src/components/ui/Button.tsx`
- `src/components/ui/Card.tsx`
- `src/components/ui/Toast.tsx`

---

## Phase 6: Integration & Polish

**Goal**: Wire everything together and verify production readiness.

1. Confetti integration — `canvas-confetti` fires on win screen mount
2. Responsive design — aspect-ratio squares, text scaling for mobile
3. Toast system — detected word notifications
4. Privacy messaging — local-processing explanation on landing page
5. Favicon — `public/favicon.svg` (blue "B" icon)
6. `.gitignore` — excludes `node_modules`, `dist`, `.env`

---

## Phase 7: Deploy

**Goal**: Deploy to Vercel.

1. Verify `npm run build` succeeds
2. Run `vercel --prod` to deploy
3. Verify deployed app works end-to-end

---

## Verification Checklist

### Build

- [x] `npm run build` compiles without errors
- [x] TypeScript strict mode passes (`tsc --noEmit`)
- [ ] `npm run dev` serves at localhost:3000

### Manual flow test

- [ ] Landing page loads, click "New Game"
- [ ] Select a category, card generates with 24 unique words + free space
- [ ] Click squares to toggle fill state
- [ ] Enable mic, verify listening indicator
- [ ] Check BINGO detection triggers on 5-in-a-row
- [ ] Win screen shows confetti, stats, share button
- [ ] Share copies text to clipboard

### Deploy

- [ ] `vercel --prod` deploys successfully
- [ ] Deployed app works end-to-end

---

## File Structure (Final)

```
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── .gitignore
│
├── public/
│   └── favicon.svg
│
├── docs/
│   ├── meeting-bingo-architecture.md
│   ├── meeting-bingo-prd.md
│   ├── meeting-bingo-uxr.md
│   └── implementation-plan.md
│
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    │
    ├── types/
    │   └── index.ts
    │
    ├── data/
    │   └── categories.ts
    │
    ├── lib/
    │   ├── cardGenerator.ts
    │   ├── bingoChecker.ts
    │   ├── wordDetector.ts
    │   ├── shareUtils.ts
    │   └── utils.ts
    │
    ├── hooks/
    │   ├── useSpeechRecognition.ts
    │   ├── useGame.ts
    │   ├── useBingoDetection.ts
    │   └── useLocalStorage.ts
    │
    └── components/
        ├── LandingPage.tsx
        ├── CategorySelect.tsx
        ├── GameBoard.tsx
        ├── BingoCard.tsx
        ├── BingoSquare.tsx
        ├── TranscriptPanel.tsx
        ├── GameControls.tsx
        ├── WinScreen.tsx
        └── ui/
            ├── Button.tsx
            ├── Card.tsx
            └── Toast.tsx
```
