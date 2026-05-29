import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();
const MODEL = process.env.CLAUDE_MODEL ?? "claude-sonnet-4-6";

export async function runMatchPredictor(
  teamData: Record<string, unknown>,
  newsContext: Record<string, string>,
  groupId?: string,
): Promise<unknown[]> {
  console.log(`  ⚽ Match Predictor: wedstrijden voorspellen...`);

  const message = await client.messages.create({
    model: MODEL,
    max_tokens: 8000,
    system: `Je bent een expert WK-analist. Je voorspelt wedstrijduitslagen op basis van:
- Recente vorm en historiek tussen landen
- Spelerselecties en blessures
- Trainers, teamcohesie, motivatie
- Klimaat en tijdstip van de wedstrijd
- FIFA-ranking

SCORITO REGELS: Uitslag na 90 min + blessuretijd (geen verlenging in groepsfase).

Geef ALTIJD een motivatie van minimaal 150 woorden per wedstrijd.
Return ALLEEN geldig JSON.`,
    messages: [
      {
        role: "user",
        content: `Voorspel alle WK 2026 groepswedstrijden${groupId ? ` van poule ${groupId}` : ""}.

Team data: ${JSON.stringify(teamData).slice(0, 3000)}
Nieuws context: ${JSON.stringify(newsContext).slice(0, 2000)}

Return JSON array:
[{
  "matchId": "A1",
  "homeTeam": "Brazil",
  "awayTeam": "Germany",
  "predictedScoreHome": 2,
  "predictedScoreAway": 1,
  "confidence": 7,
  "stability": "stable",
  "motivation": "Gedetailleerde motivatie...",
  "keyFactors": ["factor1", "factor2", "factor3"]
}]`,
      },
    ],
  });

  const text = message.content[0].type === "text" ? message.content[0].text : "[]";
  try {
    const cleaned = text.replace(/```json\n?|```\n?/g, "").trim();
    const jsonMatch = cleaned.match(/\[[\s\S]*\]/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : [];
  } catch {
    console.warn("  ⚠️  Match prediction parsing mislukt");
    return [];
  }
}
