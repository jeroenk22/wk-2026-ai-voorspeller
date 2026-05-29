import { Router } from "express";
import { generateAllPredictions, generateGroupPrediction } from "../controllers/predictions.js";

export const predictionsRouter = Router();

// Genereer alle groepswedstrijden + topscorers + kampioen in één run
predictionsRouter.post("/generate-all", generateAllPredictions);

// Genereer voorspelling per poule
predictionsRouter.post("/group/:groupId", generateGroupPrediction);

// Haal gecachede voorspellingen op
predictionsRouter.get("/group/:groupId", (_req, res) => {
  // TODO: Cache implementeren
  res.json({ message: "Cache niet geïmplementeerd — gebruik POST om te genereren" });
});
