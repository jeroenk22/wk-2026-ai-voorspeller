import { usePredictions } from "../../hooks/usePredictions";
import type { GroupStanding } from "../../types";

// Vlagcodes per land (subset WK 2026)
const FLAG_CODES: Record<string, string> = {
  "Netherlands": "nl", "Germany": "de", "France": "fr", "Brazil": "br",
  "Argentina": "ar", "England": "gb-eng", "Spain": "es", "Portugal": "pt",
  "Belgium": "be", "Croatia": "hr", "Morocco": "ma", "Japan": "jp",
  "USA": "us", "Mexico": "mx", "Canada": "ca", "Australia": "au",
  "Senegal": "sn", "Poland": "pl", "Switzerland": "ch", "Uruguay": "uy",
  "South Korea": "kr", "Italy": "it", "Denmark": "dk", "Ecuador": "ec",
  "Colombia": "co", "Chile": "cl", "Peru": "pe", "Qatar": "qa",
  "Saudi Arabia": "sa", "Iran": "ir", "Nigeria": "ng", "Ghana": "gh",
  "Ivory Coast": "ci", "Cameroon": "cm", "Serbia": "rs", "Austria": "at",
  "Turkey": "tr", "Ukraine": "ua", "Czech Republic": "cz", "Hungary": "hu",
  "Wales": "gb-wls", "Scotland": "gb-sct", "Paraguay": "py", "Bolivia": "bo",
  "Venezuela": "ve", "Honduras": "hn", "Jamaica": "jm", "Costa Rica": "cr",
};

function FlagImg({ country, size = "sm" }: { country: string; size?: "sm" | "lg" }) {
  const code = FLAG_CODES[country]?.toLowerCase() ?? "un";
  return (
    <img
      src={`https://flagcdn.com/w${size === "lg" ? "40" : "24"}/${code}.png`}
      alt={country}
      className={size === "lg" ? "flag flag--lg" : "flag"}
      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
    />
  );
}

function GroupCard({ standing }: { standing: GroupStanding }) {
  return (
    <div className="card">
      <div className="group-card__header">
        <span className="group-card__letter">GROEP {standing.group}</span>
        <span className="group-card__count">{standing.teams.length} landen</span>
      </div>

      {/* Standings header */}
      <div className="standings-header">
        <span>#</span>
        <span>Land</span>
        <span>G</span>
        <span>W</span>
        <span>GS</span>
        <span>GT</span>
        <span>Ptn</span>
      </div>

      <div className="standings-table">
        {standing.teams.map((t) => (
          <div
            key={t.team.name}
            className={`standings-row ${t.qualified ? "standings-row--qualified" : ""}`}
          >
            <span className="standings-row__pos">{t.position}</span>
            <div className="standings-row__team">
              <FlagImg country={t.team.name} />
              <span className="standings-row__name">{t.team.name}</span>
            </div>
            <span className="standings-row__stat">{t.played}</span>
            <span className="standings-row__stat">{t.won}</span>
            <span className="standings-row__stat">{t.goalsFor}</span>
            <span className="standings-row__stat">{t.goalsAgainst}</span>
            <span className="standings-row__pts">{t.points}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Demo data voor als er nog geen API call gedaan is
const DEMO_STANDINGS: GroupStanding[] = [
  {
    group: "A",
    teams: [
      { team: { id: "1", name: "Brazil", countryCode: "br", fifaRanking: 1, group: "A" }, position: 1, played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 6, goalsAgainst: 2, goalDifference: 4, points: 7, qualified: true },
      { team: { id: "2", name: "Germany", countryCode: "de", fifaRanking: 13, group: "A" }, position: 2, played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 5, goalsAgainst: 3, goalDifference: 2, points: 6, qualified: true },
      { team: { id: "3", name: "Japan", countryCode: "jp", fifaRanking: 18, group: "A" }, position: 3, played: 3, won: 1, drawn: 0, lost: 2, goalsFor: 3, goalsAgainst: 5, goalDifference: -2, points: 3, qualified: false },
      { team: { id: "4", name: "Canada", countryCode: "ca", fifaRanking: 40, group: "A" }, position: 4, played: 3, won: 0, drawn: 1, lost: 2, goalsFor: 1, goalsAgainst: 5, goalDifference: -4, points: 1, qualified: false },
    ],
  },
  {
    group: "B",
    teams: [
      { team: { id: "5", name: "France", countryCode: "fr", fifaRanking: 2, group: "B" }, position: 1, played: 3, won: 3, drawn: 0, lost: 0, goalsFor: 7, goalsAgainst: 1, goalDifference: 6, points: 9, qualified: true },
      { team: { id: "6", name: "England", countryCode: "gb-eng", fifaRanking: 5, group: "B" }, position: 2, played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 4, goalsAgainst: 4, goalDifference: 0, points: 4, qualified: true },
      { team: { id: "7", name: "USA", countryCode: "us", fifaRanking: 14, group: "B" }, position: 3, played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 3, goalsAgainst: 4, goalDifference: -1, points: 4, qualified: false },
      { team: { id: "8", name: "Morocco", countryCode: "ma", fifaRanking: 13, group: "B" }, position: 4, played: 3, won: 0, drawn: 0, lost: 3, goalsFor: 0, goalsAgainst: 5, goalDifference: -5, points: 0, qualified: false },
    ],
  },
  {
    group: "C",
    teams: [
      { team: { id: "9", name: "Spain", countryCode: "es", fifaRanking: 8, group: "C" }, position: 1, played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 5, goalsAgainst: 2, goalDifference: 3, points: 7, qualified: true },
      { team: { id: "10", name: "Netherlands", countryCode: "nl", fifaRanking: 7, group: "C" }, position: 2, played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 6, goalsAgainst: 3, goalDifference: 3, points: 6, qualified: true },
      { team: { id: "11", name: "Croatia", countryCode: "hr", fifaRanking: 9, group: "C" }, position: 3, played: 3, won: 1, drawn: 0, lost: 2, goalsFor: 3, goalsAgainst: 5, goalDifference: -2, points: 3, qualified: false },
      { team: { id: "12", name: "Mexico", countryCode: "mx", fifaRanking: 16, group: "C" }, position: 4, played: 3, won: 0, drawn: 1, lost: 2, goalsFor: 2, goalsAgainst: 6, goalDifference: -4, points: 1, qualified: false },
    ],
  },
  {
    group: "D",
    teams: [
      { team: { id: "13", name: "Argentina", countryCode: "ar", fifaRanking: 3, group: "D" }, position: 1, played: 3, won: 3, drawn: 0, lost: 0, goalsFor: 8, goalsAgainst: 2, goalDifference: 6, points: 9, qualified: true },
      { team: { id: "14", name: "Portugal", countryCode: "pt", fifaRanking: 6, group: "D" }, position: 2, played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 4, goalsAgainst: 5, goalDifference: -1, points: 4, qualified: true },
      { team: { id: "15", name: "Belgium", countryCode: "be", fifaRanking: 4, group: "D" }, position: 3, played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 4, goalsAgainst: 4, goalDifference: 0, points: 4, qualified: false },
      { team: { id: "16", name: "Colombia", countryCode: "co", fifaRanking: 12, group: "D" }, position: 4, played: 3, won: 0, drawn: 0, lost: 3, goalsFor: 1, goalsAgainst: 6, goalDifference: -5, points: 0, qualified: false },
    ],
  },
];

export function GroupsSection() {
  const { standings, isLoading, generateAll } = usePredictions();
  const displayStandings = standings.length > 0 ? standings as GroupStanding[] : DEMO_STANDINGS;

  return (
    <div>
      <div className="section-header">
        <h2 className="section-title">GROEPSFASE</h2>
        <span className="section-subtitle">12 groepen · 48 landen</span>
      </div>

      <button
        className="generate-btn"
        onClick={generateAll}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>⚙️</span>
            AI bezig met analyseren...
          </>
        ) : (
          <>🤖 Genereer AI-voorspellingen</>
        )}
      </button>

      {standings.length === 0 && (
        <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginBottom: 16, marginTop: -16 }}>
          ↑ Preview hieronder — klik de knop voor echte AI-voorspellingen
        </p>
      )}

      <div className="groups-grid">
        {displayStandings.map((s) => (
          <GroupCard key={s.group} standing={s} />
        ))}
      </div>
    </div>
  );
}
