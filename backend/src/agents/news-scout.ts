import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();
const MODEL = process.env.CLAUDE_MODEL ?? "claude-sonnet-4-6";

export async function runNewsScout(groupId?: string): Promise<Record<string, string>> {
  console.log(`  📰 News Scout: nieuws ophalen voor ${groupId ?? "alle wedstrijden"}...`);

  const message = await client.messages.create({
    model: MODEL,
    max_tokens: 4000,
    tools: [
      {
        type: "web_search_20250305" as never,
        name: "web_search",
      },
    ],
    messages: [
      {
        role: "user",
        content: groupId
          ? `Zoek actueel nieuws op over WK 2026 poule ${groupId} deelnemende landen.
             Focuseer op: blessures, trainerswijzigingen, recente vorm, teamsfeer.
             Geef JSON terug met per landcode een nieuwssamenvatting.`
          : `Zoek actueel WK 2026 nieuws op over alle 48 deelnemende landen.
             Focuseer op: blessures topspelers, trainerswijzigingen, recente prestaties.
             Geef JSON terug: { "NL": "samenvatting...", "DE": "samenvatting...", ... }`,
      },
    ],
  });

  // Verwerk response — extraheer tekst blokken
  const textContent = message.content
    .filter((block) => block.type === "text")
    .map((block) => (block as { type: "text"; text: string }).text)
    .join("\n");

  try {
    const jsonMatch = textContent.match(/\{[\s\S]*\}/);
    if (jsonMatch) return JSON.parse(jsonMatch[0]);
  } catch {
    console.warn("  ⚠️  News parsing mislukt");
  }
  return {};
}
