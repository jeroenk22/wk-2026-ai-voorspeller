import serverless from "serverless-http";
import "dotenv/config";
import cors from "cors";
import express from "express";
import { predictionsRouter } from "../../backend/src/routes/predictions.js";

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/api/predictions", predictionsRouter);
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", model: process.env.CLAUDE_MODEL, timestamp: new Date().toISOString() });
});

export const handler = serverless(app);
