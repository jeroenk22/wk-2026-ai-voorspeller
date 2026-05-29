import type { Request, Response } from "express";
import { runDataCollector } from "../agents/data-collector.js";
import { runGroupAnalyst } from "../agents/group-analyst.js";
import { runMatchPredictor } from "../agents/match-predictor.js";
import { runNewsScout } from "../agents/news-scout.js";
import { runTopscoreAdvisor } from "../agents/topscore-advisor.js";
import { runChampionPredictor } from "../agents/champion-predictor.js";

export async function generateAllPredictions(_req: Request, res: Response) {
  try {
    console.log("🚀 Starten met alle voorspellingen genereren...");

    // Stap 1: Data ophalen (parallel)
    console.log("📊 Stap 1: Data ophalen...");
    const [teamData, newsContext] = await Promise.all([
      runDataCollector(),
      runNewsScout(),
    ]);

    // Stap 2: Wedstrijden voorspellen
    console.log("⚽ Stap 2: Wedstrijden voorspellen...");
    const matchPredictions = await runMatchPredictor(teamData, newsContext);

    // Stap 3: Poule-standen berekenen
    console.log("📋 Stap 3: Poule-standen berekenen...");
    const groupStandings = await runGroupAnalyst(matchPredictions);

    // Stap 4: Topscorers + kampioen (parallel)
    console.log("🥇 Stap 4: Topscorers en kampioen voorspellen...");
    const [topscorers, champion] = await Promise.all([
      runTopscoreAdvisor(teamData, "group_stage"),
      runChampionPredictor(teamData, groupStandings),
    ]);

    res.json({ matches: matchPredictions, standings: groupStandings, topscorers, champion });
  } catch (error) {
    console.error("❌ Fout bij genereren voorspellingen:", error);
    res.status(500).json({ error: "Fout bij genereren voorspellingen" });
  }
}

export async function generateGroupPrediction(req: Request, res: Response) {
  const { groupId } = req.params;
  try {
    const [teamData, newsContext] = await Promise.all([
      runDataCollector(groupId),
      runNewsScout(groupId),
    ]);
    const matchPredictions = await runMatchPredictor(teamData, newsContext, groupId);
    const groupStandings = await runGroupAnalyst(matchPredictions, groupId);
    res.json({ groupId, matches: matchPredictions, standings: groupStandings });
  } catch (error) {
    console.error(`❌ Fout bij poule ${groupId}:`, error);
    res.status(500).json({ error: `Fout bij genereren poule ${groupId}` });
  }
}
