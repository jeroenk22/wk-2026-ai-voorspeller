import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();
const MODEL = process.env.CLAUDE_MODEL ?? "claude-sonnet-4-6";

export async function runChampionPredictor(
  teamData: Record<string, unknown>,
  groupStandings: unknown[],
): Promise<unknown> {
  console.log("  🏆 Champion Predictor: wereldkampioen voorspellen...");

  const message = await client.messages.create({
    model: MODEL,
    max_tokens: 3000,
    system: `Je bent een expert WK-analist. Je voorspelt de wereldkampioen van WK 2026.
Analyseer ALLE volgende factoren:
1. Recente vorm (laatste 10 wedstrijden)
2. Historische WK-prestaties
3. Kwaliteit spelerselectie (basisspelers bij topclubs)
4. Trainerskwaliteit en ervaring
5. Teamcohesie en ingespeel zijn
6. Sleutelspelers die extra gemotiveerd zijn (bijv. laatste WK)
7. Blessures/twijfelgevallen in de selectie
8. Verwacht toernooitraject via groep
9. Doelpunten schietende verdedigers/aanvallers
10. Mentale weerbaarheid in knock-out wedstrijden

250 SCORITO PUNTEN staan op het spel!
Return ALLEEN geldig JSON.`,
    messages: [
      {
        role: "user",
        content: `Voorspel de WK 2026 wereldkampioen.

Team data: ${JSON.stringify(teamData).slice(0, 3000)}
Poule standen: ${JSON.stringify(groupStandings).slice(0, 2000)}

Return JSON:
{
  "winner": "Brazil",
  "winnerCode": "BR",
  "confidencePercentage": 22,
  "top3": [
    { "team": "Brazil", "code": "BR", "percentage": 22 },
    { "team": "France", "code": "FR", "percentage": 18 },
    { "team": "England", "code": "GB-ENG", "percentage": 14 }
  ],
  "motivation": "Uitgebreide motivatie van minimaal 300 woorden...",
  "keyStrengths": ["sterk punt 1", "sterk punt 2", "sterk punt 3"],
  "potentialWeaknesses": ["risico 1", "risico 2"]
}`,
      },
    ],
  });

  const text = message.content[0].type === "text" ? message.content[0].text : "{}";
  try {
    const cleaned = text.replace(/```json\n?|```\n?/g, "").trim();
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : {};
  } catch {
    console.warn("  ⚠️  Champion prediction parsing mislukt");
    return {};
  }
}
