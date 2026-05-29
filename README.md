# 🏆 WK 2026 AI Voorspeller

AI-powered voorspeller voor het WK 2026. Analyseert recente vorm, historische prestaties,
spelerselecties, blessures en meer om optimale Scorito-voorspellingen te genereren.

## Stack

| Onderdeel       | Technologie                          |
|-----------------|--------------------------------------|
| Frontend        | React 19 + Vite 8 + TypeScript 6    |
| Styling         | Tailwind CSS 4 (CSS-first)           |
| PWA             | vite-plugin-pwa 1.3                  |
| Backend         | Node.js 22 + Express                 |
| AI              | Anthropic claude-sonnet-4-6          |
| Voetbaldata     | API-Football (RapidAPI)              |
| Nieuws          | Claude web_search tool               |
| Tests           | Vitest 4 + Playwright 1.60           |
| Linter          | Biome 2                              |

## Snel starten

```bash
# 1. Dependencies installeren
cd frontend && pnpm install
cd ../backend && pnpm install

# 2. Environment instellen
cp .env.example .env
# → Vul je API keys in

# 3. Backend starten
cd backend && pnpm dev

# 4. Frontend starten (nieuw terminal)
cd frontend && pnpm dev

# 5. Open http://localhost:5173
```

## Agents

| Agent               | Taak                                               |
|---------------------|----------------------------------------------------|
| data-collector      | Spelerselecties, blessures, stats via API-Football |
| news-scout          | Actueel nieuws via web search                      |
| match-predictor     | Uitslag + motivatie per wedstrijd                  |
| group-analyst       | Eindstand per poule                                |
| topscore-advisor    | 6 topscorers (gewogen naar Scorito-punten)         |
| champion-predictor  | Wereldkampioen met uitgebreide motivatie           |

## Branch strategie

```
main (protected) → develop → feature/xxx, fix/xxx, chore/xxx
```

## Links

- [Scorito spelregels](https://scorito.nl)
- [API-Football docs](https://www.api-football.com/documentation-v3)
- [Claude API docs](https://docs.anthropic.com)

## Snel starten (één commando)

```bash
# Dependencies installeren (eenmalig)
pnpm install
cd frontend && pnpm install && cd ..
cd backend && pnpm install && cd ..

# Frontend + Backend tegelijk starten
pnpm dev
```

→ Frontend: http://localhost:5173
→ Backend:  http://localhost:3001

## Netlify deployment

1. Push naar GitHub (develop branch)
2. Netlify koppelen aan de repo
3. Build settings worden automatisch geladen uit `netlify.toml`
4. Environment variables instellen in Netlify Dashboard:
   - `ANTHROPIC_API_KEY`
   - `API_FOOTBALL_KEY`
   - `CLAUDE_MODEL` = `claude-sonnet-4-6`

Of lokaal testen met Netlify CLI:
```bash
npm install -g netlify-cli
netlify dev
```
