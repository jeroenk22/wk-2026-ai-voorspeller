import cors from "cors";
import "dotenv/config";
import express from "express";
import { predictionsRouter } from "./routes/predictions.js";

const app = express();
const PORT = process.env.PORT ?? 3001;

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL ?? "http://localhost:5173" }));
app.use(express.json());

// Routes
app.use("/api/predictions", predictionsRouter);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", model: process.env.CLAUDE_MODEL, timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🏆 WK 2026 Backend draait op http://localhost:${PORT}`);
  console.log(`🤖 Claude model: ${process.env.CLAUDE_MODEL ?? "claude-sonnet-4-6"}`);
});
