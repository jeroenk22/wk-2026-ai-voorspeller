// ── WK Entiteiten ────────────────────────────────────────

export interface Team {
  id: string;
  name: string;
  countryCode: string; // ISO 3166-1 alpha-2, bijv. "NL"
  fifaRanking: number;
  group: string;
}

export interface Player {
  id: string;
  name: string;
  team: string;
  position: "goalkeeper" | "defender" | "midfielder" | "forward";
  club: string;
  goals: number;
  injured: boolean;
  injuryStatus: "confirmed" | "doubtful" | "fit";
}

export interface MatchPrediction {
  matchId: string;
  homeTeam: Team;
  awayTeam: Team;
  predictedScoreHome: number;
  predictedScoreAway: number;
  confidence: number; // 1-10
  stability: "stable" | "sensitive";
  motivation: string;
  keyFactors: string[];
  date: string;
  venue: string;
  group: string;
}

export interface GroupStanding {
  group: string;
  teams: GroupTeam[];
}

export interface GroupTeam {
  team: Team;
  position: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  qualified: boolean;
}

export interface TopscoreRecommendation {
  player: Player;
  expectedGoals: number;
  scoritoPointsValue: number;
  motivation: string;
}

export interface ChampionPrediction {
  winner: Team;
  confidencePercentage: number;
  top3: Array<{ team: Team; percentage: number }>;
  motivation: string;
  keyStrengths: string[];
  potentialWeaknesses: string[];
}

// ── Scorito Puntentelling ────────────────────────────────

export const SCORITO_POINTS = {
  groupStage: {
    exactScore: 45,
    toto: 30,
    groupPosition: 25,
    goals: { goalkeeper: 32, defender: 32, midfielder: 16, forward: 8 },
    champion: 250,
  },
  knockoutRounds: {
    roundOf32: { exactScore: 90, toto: 60, goals: { goalkeeper: 64, defender: 64, midfielder: 32, forward: 16 } },
    roundOf16: { exactScore: 135, toto: 90, goals: { goalkeeper: 96, defender: 96, midfielder: 48, forward: 24 } },
    quarterFinal: { exactScore: 180, toto: 120, goals: { goalkeeper: 128, defender: 128, midfielder: 64, forward: 32 } },
    semiFinal: { exactScore: 225, toto: 150, goals: { goalkeeper: 160, defender: 160, midfielder: 80, forward: 40 } },
    final: { exactScore: 270, toto: 180, goals: { goalkeeper: 192, defender: 192, midfielder: 96, forward: 48 } },
  },
} as const;
