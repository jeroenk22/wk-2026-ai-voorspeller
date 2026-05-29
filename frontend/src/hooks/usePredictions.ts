import { useCallback, useState } from "react";
import type { ChampionPrediction, GroupStanding, MatchPrediction, TopscoreRecommendation } from "../types";

interface PredictionsState {
  matches: MatchPrediction[];
  standings: GroupStanding[];
  topscorers: TopscoreRecommendation[];
  champion: ChampionPrediction | null;
  isLoading: boolean;
  error: string | null;
}

export function usePredictions() {
  const [state, setState] = useState<PredictionsState>({
    matches: [],
    standings: [],
    topscorers: [],
    champion: null,
    isLoading: false,
    error: null,
  });

  const generateAll = useCallback(async () => {
    setState((s) => ({ ...s, isLoading: true, error: null }));
    try {
      const response = await fetch("/api/predictions/generate-all", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("API call mislukt");
      const data = await response.json();
      setState((s) => ({ ...s, ...data, isLoading: false }));
    } catch (err) {
      setState((s) => ({
        ...s,
        isLoading: false,
        error: err instanceof Error ? err.message : "Onbekende fout",
      }));
    }
  }, []);

  const generateGroup = useCallback(async (groupId: string) => {
    setState((s) => ({ ...s, isLoading: true, error: null }));
    try {
      const response = await fetch(`/api/predictions/group/${groupId}`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("API call mislukt");
      const data = await response.json();
      setState((s) => ({ ...s, ...data, isLoading: false }));
    } catch (err) {
      setState((s) => ({
        ...s,
        isLoading: false,
        error: err instanceof Error ? err.message : "Onbekende fout",
      }));
    }
  }, []);

  return { ...state, generateAll, generateGroup };
}
