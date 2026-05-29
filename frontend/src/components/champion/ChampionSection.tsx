import { usePredictions } from "../../hooks/usePredictions";

const FLAG_CODES: Record<string, string> = {
  "Netherlands": "nl", "Germany": "de", "France": "fr", "Brazil": "br",
  "Argentina": "ar", "England": "gb-eng", "Spain": "es", "Portugal": "pt",
};

const DEMO_CHAMPION = {
  winner: "France",
  winnerCode: "FR",
  confidencePercentage: 22,
  top3: [
    { team: "France",    code: "fr", percentage: 22 },
    { team: "Brazil",    code: "br", percentage: 19 },
    { team: "Argentina", code: "ar", percentage: 16 },
  ],
  motivation: `Frankrijk is de topkandidaat voor de wereldtitel in 2026. Met een uitzonderlijke spelersgroep onder leiding van coach Didier Deschamps beschikt Les Bleus over diepte op elke positie. Kylian Mbappé, inmiddels op zijn absolute top bij Real Madrid, zal extra gemotiveerd zijn na de verloren finale van 2022. De combinatie met Griezmann op het middenveld en Camavinga als motor geeft Frankrijk een uniek evenwicht tussen aanvallend vermogen en defensieve soliditeit. Bovendien heeft geen enkel WK-deelnemend land de afgelopen twee jaar minder goals tegen gekregen. De defensie met Upamecano en Konaté is van wereldklasse. Een mogelijk kwetsbaar punt is de blessuregeschiedenis van enkele sleutelspelers, maar de breedte van de selectie maakt dit beheersbaar. De verwachte route via een speelbare groep en een gunstig kwartfinale-traject maakt Frankrijk tot de meest complete en complete keuze.`,
  keyStrengths: ["Diepste selectie ter wereld", "Mbappé op absolute top", "Defensie concedeerde minste goals (2024-2026)", "Ervaren trainer met WK-winst (2018)", "Sterk ingespeld team"],
  potentialWeaknesses: ["Blessurerisico Kanté/Camavinga", "Onderlinge spanning in selectie (2022-ervaring)"],
};

export function ChampionSection() {
  const { champion, isLoading } = usePredictions();
  const data = (champion && Object.keys(champion).length > 0 ? champion : DEMO_CHAMPION) as typeof DEMO_CHAMPION;
  const flagCode = (FLAG_CODES[data.winner] ?? data.winnerCode?.toLowerCase() ?? "un").toLowerCase();

  return (
    <div>
      <div className="section-header">
        <h2 className="section-title">WERELDKAMPIOEN</h2>
        <span className="section-subtitle">250 Scorito-punten</span>
      </div>

      {isLoading ? (
        <div className="card">
          <div style={{ padding: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <div className="skeleton" style={{ width: 80, height: 80, borderRadius: "50%" }} />
            <div className="skeleton" style={{ width: 200, height: 40 }} />
            <div className="skeleton" style={{ width: 160, height: 28 }} />
          </div>
        </div>
      ) : (
        <div className="card card--gold">
          {/* Hero */}
          <div className="champion-hero">
            <div className="champion-trophy">🏆</div>
            <img
              src={`https://flagcdn.com/w80/${flagCode}.png`}
              alt={data.winner}
              style={{ height: 48, borderRadius: 6, marginBottom: 12, boxShadow: "0 4px 16px rgba(0,0,0,0.5)" }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
            <div className="champion-country">{data.winner.toUpperCase()}</div>
            <div className="champion-confidence">
              {data.confidencePercentage}% kans op WK-titel
            </div>

            {/* Top 3 */}
            <div className="podium">
              {data.top3.map((item, i) => (
                <div
                  key={item.team}
                  className={`podium-item podium-item--${["first","second","third"][i]}`}
                >
                  <img
                    src={`https://flagcdn.com/w40/${item.code}.png`}
                    alt={item.team}
                    className="flag flag--lg"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                  <div className="podium-item__pct">{item.percentage}%</div>
                  <div className="podium-item__name">{item.team}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Motivatie */}
          <div style={{ padding: "0 20px 20px" }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: 8 }}>
              Analyse
            </p>
            <div className="motivation-text">{data.motivation}</div>

            {/* Sterktes */}
            <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--color-green-score)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
                  ✓ Sterktes
                </p>
                {data.keyStrengths.map((s) => (
                  <p key={s} style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)", marginBottom: 4, lineHeight: 1.4 }}>
                    · {s}
                  </p>
                ))}
              </div>
              <div>
                <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--color-red-score)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
                  ⚠ Risico's
                </p>
                {data.potentialWeaknesses.map((w) => (
                  <p key={w} style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)", marginBottom: 4, lineHeight: 1.4 }}>
                    · {w}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
