# AI Agents

| Agent               | Bestand                  | Verantwoordelijkheid                            |
|---------------------|--------------------------|--------------------------------------------------|
| data-collector      | data-collector.yaml      | API-Football: selecties, blessures, stats       |
| news-scout          | news-scout.yaml          | Nieuws: vorm, trainerswijzigingen, klimaat      |
| match-predictor     | match-predictor.yaml     | Uitslag + motivatie per wedstrijd               |
| group-analyst       | group-analyst.yaml       | Poule-eindstand berekening                      |
| topscore-advisor    | topscore-advisor.yaml    | Topscorers gewogen naar Scorito-punten          |
| champion-predictor  | champion-predictor.yaml  | Wereldkampioen + uitgebreide motivatie          |

## Pipeline

```
data-collector + news-scout
        ↓
   match-predictor  (per wedstrijd, met motivatie)
        ↓
   group-analyst    (poule-eindstanden)
        ↓
topscore-advisor + champion-predictor
```

## Consistentie

Vraag: "Als ik een dag later nogmaals voorspel, zijn de uitkomsten dan stabiel?"
→ Ja. De agents werken deterministisch op dezelfde data-snapshot. Alleen als er
   nieuwe blessures of selectiewijzigingen zijn, kan de uitkomst veranderen.
   Dit is gewenst gedrag: de app reflecteert de actuele situatie.
