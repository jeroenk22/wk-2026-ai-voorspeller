# WK 2026 AI Voorspeller

## Wat deze app doet
Een PWA die AI-gedreven voorspellingen genereert voor het WK 2026 Scorito-poule. De app
analyseert groepswedstrijden, berekent eindstanden per poule, selecteert optimale topscorers
(gewogen naar Scorito-puntenlogica) en voorspelt de wereldkampioen. Per voorspelling wordt
een gedetailleerde motivatie gegeven op basis van recente vorm, historische prestaties,
spelerselecties, blessures, trainerswijzigingen, klimaat, tijdstip en meer.

## Stack
- **Frontend:** React 19.2.5 + Vite 8.0.14 (Rolldown) + TypeScript 6.0.3
- **Styling:** Tailwind CSS 4.3.0 (CSS-first, geen tailwind.config.js)
- **PWA:** vite-plugin-pwa 1.3.0
- **Backend:** Node.js 22 LTS + Express
- **AI:** Anthropic claude-sonnet-4-6
- **Voetbaldata:** API-Football (RapidAPI) + Claude web_search tool
- **Tests:** Vitest 4.1.7 + Playwright 1.60.0
- **Linter/Formatter:** Biome 2.4.16

## Commando's

```bash
# Frontend
cd frontend
pnpm install          # Installeer dependencies
pnpm dev              # Start development server (http://localhost:5173)
pnpm build            # Production build
pnpm preview          # Preview production build
pnpm test             # Unit tests met coverage
pnpm test:e2e         # E2E tests met Playwright
pnpm lint             # Biome check
pnpm lint:fix         # Biome check + auto-fix

# Backend
cd backend
pnpm install          # Installeer dependencies
pnpm dev              # Start development server (http://localhost:3001)
pnpm build            # Compileer TypeScript
pnpm start            # Start production server
pnpm test             # Unit tests
```

## Projectstructuur

```
wk-2026-ai-voorspeller/
├── frontend/                    # React PWA
│   ├── src/
│   │   ├── components/
│   │   │   ├── groups/          # Poule-overzichten en wedstrijden
│   │   │   ├── matches/         # Wedstrijd-voorspellings-cards
│   │   │   ├── topscorers/      # Topscorer-selectie
│   │   │   ├── champion/        # Wereldkampioen-voorspelling
│   │   │   └── ui/              # Gedeelde UI-componenten
│   │   ├── hooks/               # Custom React hooks
│   │   ├── types/               # TypeScript type definities
│   │   ├── utils/               # Helper functies
│   │   └── styles/              # Globale CSS
│   └── tests/e2e/               # Playwright E2E tests
├── backend/
│   └── src/
│       ├── agents/              # AI agent implementaties
│       ├── routes/              # Express routes
│       ├── controllers/         # Route handlers
│       └── middleware/          # Express middleware
├── agents/                      # Agent YAML specs
└── skills/                      # Best-practice documentatie
```

## Scorito Puntensysteem (leidend voor agent-beslissingen)

### Groepsfase
| Type              | Punten |
|-------------------|--------|
| Exacte uitslag    | 45     |
| Toto goed         | 30     |
| Positie correct   | 25     |
| Verdediger/Keeper | 32/goal|
| Middenvelder      | 16/goal|
| Aanvaller         | 8/goal |
| Kampioen goed     | 250    |

→ Topscorer-advisor weegt verdedigers en middenvelders ZWAARDER dan aanvallers!

### Knock-outfase
Punten verdubbelen elke ronde (factor ×2 t/m ×6 in finale).
Per ronde 4 nieuwe topscorers kiezen — alleen nog actieve landen!

## Conventies
- Branch strategie: main (protected) → develop → feature/xxx, fix/xxx, chore/xxx
- Commits: Conventional Commits (feat:, fix:, chore:, docs:, test:)
- PR: nooit direct naar main, altijd via PR met passing tests
- Package manager: pnpm

## Wat Claude NIET mag doen
- Nooit direct committen naar main
- Nooit .env bestanden aanmaken met echte secrets
- Nooit dependencies toevoegen zonder expliciete vraag
- Nooit bestaande tests verwijderen
- Nooit uitgeschakelde landen als topscorer-optie voorstellen

---

## Karpathy Gedragsregels

### 1. Think Before Coding
**Don't assume. Don't hide confusion. Surface tradeoffs.**
- State assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them — don't pick silently.
- If a simpler approach exists, say so.

### 2. Simplicity First
**Minimum code that solves the problem. Nothing speculative.**
- No features beyond what was asked.
- No abstractions for single-use code.
- If you write 200 lines and it could be 50, rewrite it.

### 3. Surgical Changes
**Touch only what you must.**
- Don't "improve" adjacent code, comments, or formatting.
- Match existing style, even if you'd do it differently.

### 4. Goal-Driven Execution
**Define success criteria. Loop until verified.**
```
1. [Stap] → verificeer: [check]
2. [Stap] → verificeer: [check]
```

---

## Security
- Nooit API keys, passwords of secrets in code of commits
- Gebruik altijd .env.example voor configuratie voorbeelden
- Backend valideert alle inputs — nooit raw user input naar Claude sturen

## Kwaliteit
- Code coverage: minimaal 80% (afgedwongen in CI)
- E2E tests: Playwright voor kritieke flows
- Linting: Biome 2 — zero errors verplicht in CI

## Agents
Zie /agents map. Per agent een YAML spec met: naam, doel, inputs, outputs, tools, beperkingen.
