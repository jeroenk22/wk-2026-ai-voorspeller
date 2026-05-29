import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();
const MODEL = process.env.CLAUDE_MODEL ?? "claude-sonnet-4-6";

export async function runGroupAnalyst(
  matchPredictions: unknown[],
  groupId?: string,
): Promise<unknown[]> {
  console.log(`  📋 Group Analyst: poule-standen berekenen...`);

  const message = await client.messages.create({
    model: MODEL,
    max_tokens: 3000,
    system: `Je berekent WK-poule eindstanden.
Tiebreak volgorde (officieel FIFA WK):
1. Punten onderling, 2. Doelsaldo onderling, 3. Goals onderling,
4. Herhaling 1-3 voor gelijke landen, 5. Doelsaldo totaal,
6. Goals totaal, 7. FIFA-ranking.
Return ALLEEN geldig JSON.`,
    messages: [
      {
        role: "user",
        content: `Bereken poule eindstanden${groupId ? ` voor poule ${groupId}` : " voor alle poules"}.

Wedstrijdvoorspellingen: ${JSON.stringify(matchPredictions).slice(0, 4000)}

Return JSON array:
[{
  "group": "A",
  "teams": [{
    "team": "Brazil",
    "position": 1,
    "played": 3,
    "won": 2,
    "drawn": 1,
    "lost": 0,
    "goalsFor": 5,
    "goalsAgainst": 2,
    "goalDifference": 3,
    "points": 7,
    "qualified": true
  }]
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
    console.warn("  ⚠️  Group standings parsing mislukt");
    return [];
  }
}
