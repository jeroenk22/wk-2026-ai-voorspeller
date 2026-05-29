import { usePredictions } from "../../hooks/usePredictions";
import type { GroupStanding } from "../../types";

// Officiële WK 2026 loting (5 december 2025, Washington D.C.)
// Bron: FIFA / wkloting.nl
const WK2026_GROUPS: GroupStanding[] = [
  {
    group: "A",
    teams: [
      { id:"mx", name:"Mexico",       countryCode:"mx", fifaRanking:16, group:"A" },
      { id:"za", name:"South Africa", countryCode:"za", fifaRanking:62, group:"A" },
      { id:"kr", name:"South Korea",  countryCode:"kr", fifaRanking:23, group:"A" },
      { id:"cz", name:"Czechia",      countryCode:"cz", fifaRanking:34, group:"A" },
    ].map((t,i) => ({ team:t, position:i+1, played:0, won:0, drawn:0, lost:0, goalsFor:0, goalsAgainst:0, goalDifference:0, points:0, qualified:false })),
  },
  {
    group: "B",
    teams: [
      { id:"ca", name:"Canada",               countryCode:"ca", fifaRanking:40, group:"B" },
      { id:"ba", name:"Bosnia-Herzegovina",   countryCode:"ba", fifaRanking:52, group:"B" },
      { id:"qa", name:"Qatar",                countryCode:"qa", fifaRanking:37, group:"B" },
      { id:"ch", name:"Switzerland",          countryCode:"ch", fifaRanking:19, group:"B" },
    ].map((t,i) => ({ team:t, position:i+1, played:0, won:0, drawn:0, lost:0, goalsFor:0, goalsAgainst:0, goalDifference:0, points:0, qualified:false })),
  },
  {
    group: "C",
    teams: [
      { id:"br", name:"Brazil",   countryCode:"br", fifaRanking:5,  group:"C" },
      { id:"ma", name:"Morocco",  countryCode:"ma", fifaRanking:13, group:"C" },
      { id:"ht", name:"Haiti",    countryCode:"ht", fifaRanking:83, group:"C" },
      { id:"gb-sct", name:"Scotland", countryCode:"gb-sct", fifaRanking:38, group:"C" },
    ].map((t,i) => ({ team:t, position:i+1, played:0, won:0, drawn:0, lost:0, goalsFor:0, goalsAgainst:0, goalDifference:0, points:0, qualified:false })),
  },
  {
    group: "D",
    teams: [
      { id:"us", name:"USA",       countryCode:"us", fifaRanking:14, group:"D" },
      { id:"py", name:"Paraguay",  countryCode:"py", fifaRanking:59, group:"D" },
      { id:"au", name:"Australia", countryCode:"au", fifaRanking:24, group:"D" },
      { id:"tr", name:"Turkey",    countryCode:"tr", fifaRanking:27, group:"D" },
    ].map((t,i) => ({ team:t, position:i+1, played:0, won:0, drawn:0, lost:0, goalsFor:0, goalsAgainst:0, goalDifference:0, points:0, qualified:false })),
  },
  {
    group: "E",
    teams: [
      { id:"de", name:"Germany",      countryCode:"de", fifaRanking:12, group:"E" },
      { id:"cw", name:"Curaçao",      countryCode:"cw", fifaRanking:77, group:"E" },
      { id:"ci", name:"Ivory Coast",  countryCode:"ci", fifaRanking:41, group:"E" },
      { id:"ec", name:"Ecuador",      countryCode:"ec", fifaRanking:45, group:"E" },
    ].map((t,i) => ({ team:t, position:i+1, played:0, won:0, drawn:0, lost:0, goalsFor:0, goalsAgainst:0, goalDifference:0, points:0, qualified:false })),
  },
  {
    group: "F",
    teams: [
      { id:"nl", name:"Netherlands", countryCode:"nl", fifaRanking:7,  group:"F" },
      { id:"jp", name:"Japan",       countryCode:"jp", fifaRanking:18, group:"F" },
      { id:"se", name:"Sweden",      countryCode:"se", fifaRanking:25, group:"F" },
      { id:"tn", name:"Tunisia",     countryCode:"tn", fifaRanking:30, group:"F" },
    ].map((t,i) => ({ team:t, position:i+1, played:0, won:0, drawn:0, lost:0, goalsFor:0, goalsAgainst:0, goalDifference:0, points:0, qualified:false })),
  },
  {
    group: "G",
    teams: [
      { id:"be", name:"Belgium",     countryCode:"be", fifaRanking:3,  group:"G" },
      { id:"eg", name:"Egypt",       countryCode:"eg", fifaRanking:35, group:"G" },
      { id:"ir", name:"Iran",        countryCode:"ir", fifaRanking:22, group:"G" },
      { id:"nz", name:"New Zealand", countryCode:"nz", fifaRanking:91, group:"G" },
    ].map((t,i) => ({ team:t, position:i+1, played:0, won:0, drawn:0, lost:0, goalsFor:0, goalsAgainst:0, goalDifference:0, points:0, qualified:false })),
  },
  {
    group: "H",
    teams: [
      { id:"es", name:"Spain",       countryCode:"es", fifaRanking:8,  group:"H" },
      { id:"cv", name:"Cape Verde",  countryCode:"cv", fifaRanking:68, group:"H" },
      { id:"sa", name:"Saudi Arabia",countryCode:"sa", fifaRanking:57, group:"H" },
      { id:"uy", name:"Uruguay",     countryCode:"uy", fifaRanking:20, group:"H" },
    ].map((t,i) => ({ team:t, position:i+1, played:0, won:0, drawn:0, lost:0, goalsFor:0, goalsAgainst:0, goalDifference:0, points:0, qualified:false })),
  },
  {
    group: "I",
    teams: [
      { id:"fr", name:"France",  countryCode:"fr", fifaRanking:2,  group:"I" },
      { id:"sn", name:"Senegal", countryCode:"sn", fifaRanking:21, group:"I" },
      { id:"iq", name:"Iraq",    countryCode:"iq", fifaRanking:58, group:"I" },
      { id:"no", name:"Norway",  countryCode:"no", fifaRanking:26, group:"I" },
    ].map((t,i) => ({ team:t, position:i+1, played:0, won:0, drawn:0, lost:0, goalsFor:0, goalsAgainst:0, goalDifference:0, points:0, qualified:false })),
  },
  {
    group: "J",
    teams: [
      { id:"ar", name:"Argentina", countryCode:"ar", fifaRanking:1,  group:"J" },
      { id:"dz", name:"Algeria",   countryCode:"dz", fifaRanking:33, group:"J" },
      { id:"at", name:"Austria",   countryCode:"at", fifaRanking:28, group:"J" },
      { id:"jo", name:"Jordan",    countryCode:"jo", fifaRanking:69, group:"J" },
    ].map((t,i) => ({ team:t, position:i+1, played:0, won:0, drawn:0, lost:0, goalsFor:0, goalsAgainst:0, goalDifference:0, points:0, qualified:false })),
  },
  {
    group: "K",
    teams: [
      { id:"pt", name:"Portugal", countryCode:"pt", fifaRanking:6,  group:"K" },
      { id:"cd", name:"DR Congo", countryCode:"cd", fifaRanking:50, group:"K" },
      { id:"uz", name:"Uzbekistan",countryCode:"uz", fifaRanking:72, group:"K" },
      { id:"co", name:"Colombia", countryCode:"co", fifaRanking:11, group:"K" },
    ].map((t,i) => ({ team:t, position:i+1, played:0, won:0, drawn:0, lost:0, goalsFor:0, goalsAgainst:0, goalDifference:0, points:0, qualified:false })),
  },
  {
    group: "L",
    teams: [
      { id:"gb-eng", name:"England", countryCode:"gb-eng", fifaRanking:4,  group:"L" },
      { id:"hr",     name:"Croatia", countryCode:"hr",     fifaRanking:9,  group:"L" },
      { id:"gh",     name:"Ghana",   countryCode:"gh",     fifaRanking:65, group:"L" },
      { id:"pa",     name:"Panama",  countryCode:"pa",     fifaRanking:71, group:"L" },
    ].map((t,i) => ({ team:t, position:i+1, played:0, won:0, drawn:0, lost:0, goalsFor:0, goalsAgainst:0, goalDifference:0, points:0, qualified:false })),
  },
];

function FlagImg({ code, name, size = "sm" }: { code: string; name: string; size?: "sm" | "lg" }) {
  const w = size === "lg" ? "40" : "24";
  return (
    <img
      src={`https://flagcdn.com/w${w}/${code.toLowerCase()}.png`}
      alt={name}
      className={size === "lg" ? "flag flag--lg" : "flag"}
      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
    />
  );
}

function GroupCard({ standing }: { standing: GroupStanding }) {
  const hasResults = standing.teams.some((t) => t.played > 0);

  return (
    <div className="card">
      <div className="group-card__header">
        <span className="group-card__letter">GROEP {standing.group}</span>
        <span className="group-card__count">{standing.teams.length} landen</span>
      </div>

      {hasResults ? (
        <>
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
                key={t.team.id}
                className={`standings-row ${t.qualified ? "standings-row--qualified" : ""}`}
              >
                <span className="standings-row__pos">{t.position}</span>
                <div className="standings-row__team">
                  <FlagImg code={t.team.countryCode} name={t.team.name} />
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
        </>
      ) : (
        /* Nog geen resultaten — toon gewoon de 4 landen */
        <div className="standings-table">
          {standing.teams.map((t) => (
            <div key={t.team.id} className="standings-row">
              <span className="standings-row__pos">—</span>
              <div className="standings-row__team">
                <FlagImg code={t.team.countryCode} name={t.team.name} />
                <span className="standings-row__name">{t.team.name}</span>
              </div>
              <span className="standings-row__stat" style={{ gridColumn: "3 / span 4" }} />
              <span className="standings-row__pts" style={{ color: "var(--color-text-muted)", fontSize: "0.7rem" }}>#{t.team.fifaRanking}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function GroupsSection() {
  const { standings, isLoading, generateAll } = usePredictions();
  const displayStandings = standings.length > 0
    ? (standings as GroupStanding[])
    : WK2026_GROUPS;

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
          <><span style={{ display:"inline-block", animation:"spin 1s linear infinite" }}>⚙️</span> AI bezig met analyseren...</>
        ) : (
          <>🤖 Genereer AI-voorspellingen</>
        )}
      </button>

      <div className="groups-grid">
        {displayStandings.map((s) => (
          <GroupCard key={s.group} standing={s} />
        ))}
      </div>
    </div>
  );
}
