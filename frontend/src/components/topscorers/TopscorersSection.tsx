import { usePredictions } from "../../hooks/usePredictions";

const POSITION_LABELS: Record<string, string> = {
  goalkeeper: "Keeper",
  defender:   "Verdediger",
  midfielder: "Middenvelder",
  forward:    "Aanvaller",
};

const POSITION_CLASS: Record<string, string> = {
  goalkeeper: "gk",
  defender:   "def",
  midfielder: "mid",
  forward:    "fwd",
};

const FLAG_CODES: Record<string, string> = {
  "Netherlands": "nl", "Germany": "de", "France": "fr", "Brazil": "br",
  "Argentina": "ar", "England": "gb-eng", "Spain": "es", "Portugal": "pt",
  "Belgium": "be", "Croatia": "hr", "Morocco": "ma", "Japan": "jp",
};

// Demo topscorers (gewogen op Scorito-punten — verdedigers hoog!)
const DEMO_TOPSCORERS = [
  { name: "Virgil van Dijk",  country: "Netherlands", position: "defender",   expectedGoals: 2.1, scoritoPointsValue: 67 },
  { name: "Raphaël Varane",   country: "France",      position: "defender",   expectedGoals: 1.8, scoritoPointsValue: 58 },
  { name: "Kylian Mbappé",    country: "France",      position: "forward",    expectedGoals: 5.2, scoritoPointsValue: 42 },
  { name: "Pedri",            country: "Spain",       position: "midfielder", expectedGoals: 2.4, scoritoPointsValue: 38 },
  { name: "Lionel Messi",     country: "Argentina",   position: "forward",    expectedGoals: 4.8, scoritoPointsValue: 38 },
  { name: "Toni Kroos",       country: "Germany",     position: "midfielder", expectedGoals: 2.1, scoritoPointsValue: 34 },
];

export function TopscorersSection() {
  const { topscorers, isLoading } = usePredictions();
  const display = topscorers.length > 0 ? topscorers as typeof DEMO_TOPSCORERS : DEMO_TOPSCORERS;

  return (
    <div>
      <div className="section-header">
        <h2 className="section-title">TOPSCORERS</h2>
        <span className="section-subtitle">6 selecties · Scorito-gewogen</span>
      </div>

      {/* Scorito uitleg */}
      <div className="card" style={{ padding: "14px 16px", marginBottom: 20, fontSize: "0.78rem", lineHeight: 1.6 }}>
        <p style={{ color: "var(--color-gold-400)", fontWeight: 700, marginBottom: 6 }}>
          💡 Scorito-strategie
        </p>
        <p style={{ color: "var(--color-text-secondary)" }}>
          Verdedigers &amp; keepers leveren <strong style={{ color: "var(--color-gold-400)" }}>32 punten</strong> per goal,
          middenvelders <strong style={{ color: "#60a5fa" }}>16 punten</strong>,
          aanvallers slechts <strong style={{ color: "#f87171" }}>8 punten</strong>.
          De AI weegt puntenwaarde zwaarder dan doelpuntengemiddelde.
        </p>
      </div>

      {isLoading ? (
        <div className="topscorers-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card">
              <div className="topscore-card">
                <div className="skeleton" style={{ width: 28, height: 32 }} />
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                  <div className="skeleton" style={{ height: 16, width: "70%" }} />
                  <div className="skeleton" style={{ height: 12, width: "40%" }} />
                </div>
                <div className="skeleton" style={{ width: 48, height: 32 }} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="topscorers-grid">
          {display.map((player, i) => {
            const flagCode = (FLAG_CODES[player.country] ?? "un").toLowerCase();
            const posClass = POSITION_CLASS[player.position] ?? "fwd";
            return (
              <div key={player.name} className={`card ${i === 0 ? "card--gold" : ""}`}>
                <div className="topscore-card">
                  <span className={`topscore-card__rank ${i < 3 ? "topscore-card__rank--top" : ""}`}>
                    {i + 1}
                  </span>
                  <div className="topscore-card__info">
                    <p className="topscore-card__name">{player.name}</p>
                    <div className="topscore-card__meta">
                      <img
                        src={`https://flagcdn.com/w24/${flagCode}.png`}
                        alt={player.country}
                        className="flag"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                      />
                      <span className={`position-badge position-badge--${posClass}`}>
                        {POSITION_LABELS[player.position]}
                      </span>
                    </div>
                  </div>
                  <div className="topscore-card__pts">
                    <div className="topscore-card__pts-value">{player.scoritoPointsValue}</div>
                    <div className="topscore-card__pts-label">punten</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
