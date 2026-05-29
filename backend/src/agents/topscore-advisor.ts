import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();
const MODEL = process.env.CLAUDE_MODEL ?? "claude-sonnet-4-6";

type Phase = "group_stage" | "round_of_32" | "round_of_16" | "quarter_final" | "semi_final" | "final";

const POINTS_PER_GOAL: Record<Phase, Record<string, number>> = {
  group_stage:    { goalkeeper: 32, defender: 32, midfielder: 16, forward: 8 },
  round_of_32:   { goalkeeper: 64, defender: 64, midfielder: 32, forward: 16 },
  round_of_16:   { goalkeeper: 96, defender: 96, midfielder: 48, forward: 24 },
  quarter_final: { goalkeeper: 128, defender: 128, midfielder: 64, forward: 32 },
  semi_final:    { goalkeeper: 160, defender: 160, midfielder: 80, forward: 40 },
  final:         { goalkeeper: 192, defender: 192, midfielder: 96, forward: 48 },
};

export async function runTopscoreAdvisor(
  teamData: Record<string, unknown>,
  phase: Phase,
  activeCountries?: string[],
): Promise<unknown[]> {
  const count = phase === "group_stage" ? 6 : 4;
  console.log(`  🥇 Topscore Advisor: ${count} topscorers selecteren voor ${phase}...`);

  const pointsTable = POINTS_PER_GOAL[phase];

  const message = await client.messages.create({
    model: MODEL,
    max_tokens: 3000,
    system: `Je bent een Scorito-expert. Je selecteert topscorers voor MAXIMALE puntenopbrengst.

KRITISCH: Punten per goal naar positie (${phase}):
- Keeper/Verdediger: ${pointsTable.goalkeeper} punten
- Middenvelder: ${pointsTable.midfielder} punten  
- Aanvaller: ${pointsTable.forward} punten

STRATEGIE: Kies verdedigers/keepers die goals scoren (corners, vrije trappen) boven
aanvallers met vergelijkbare expected goals. Eigen doelpunten tellen NIET.
${activeCountries ? `\nALLEEN spelers van actieve landen: ${activeCountries.join(", ")}` : ""}
Return ALLEEN geldig JSON.`,
    messages: [
      {
        role: "user",
        content: `Selecteer de optimale ${count} topscorers voor ${phase}.

Team data: ${JSON.stringify(teamData).slice(0, 3000)}

Return JSON array:
[{
  "name": "Virgil van Dijk",
  "country": "Nederland",
  "countryCode": "NL",
  "position": "defender",
  "club": "Liverpool",
  "expectedGoals": 1.5,
  "scoritoPointsValue": 48,
  "motivation": "Waarom deze speler optimaal is..."
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
    console.warn("  ⚠️  Topscore parsing mislukt");
    return [];
  }
}
