import Anthropic from "@anthropic-ai/sdk";
import axios from "axios";

const client = new Anthropic();
const MODEL = process.env.CLAUDE_MODEL ?? "claude-sonnet-4-6";
const API_FOOTBALL_KEY = process.env.API_FOOTBALL_KEY ?? "";

interface TeamData {
  [countryCode: string]: {
    squad: unknown[];
    injuries: unknown[];
    recentMatches: unknown[];
    fifaRanking: number;
  };
}

export async function runDataCollector(groupId?: string): Promise<TeamData> {
  console.log(`  📥 Data Collector: ophalen voor ${groupId ?? "alle landen"}...`);

  // Haal data op via API-Football
  const headers = {
    "x-rapidapi-key": API_FOOTBALL_KEY,
    "x-rapidapi-host": "v3.football.api-sports.io",
  };

  // TODO: Implementeer echte API-Football calls
  // Tijdelijk: Claude genereert mock data voor development
  const prompt = groupId
    ? `Genereer realistisch JSON voor WK 2026 poule ${groupId} spelersdata (4 landen).`
    : "Genereer realistisch JSON voor WK 2026 data overzicht (structuur voor 48 landen).";

  const message = await client.messages.create({
    model: MODEL,
    max_tokens: 2000,
    messages: [
      {
        role: "user",
        content: `${prompt}
Geef ALLEEN JSON terug (geen uitleg), met structuur:
{
  "NL": { "squad": [], "injuries": [], "recentMatches": [], "fifaRanking": 7 },
  ...
}`,
      },
    ],
  });

  try {
    const text = message.content[0].type === "text" ? message.content[0].text : "{}";
    const cleaned = text.replace(/```json\n?|```\n?/g, "").trim();
    return JSON.parse(cleaned);
  } catch {
    console.warn("  ⚠️  Data parsing mislukt, lege dataset teruggegeven");
    return {};
  }
}
