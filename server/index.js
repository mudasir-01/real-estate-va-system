import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import orderRoutes from "./routes/orders.js";
import analyticsRoutes from "./routes/analytics.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);

app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    database: "Supabase",
  });
});

app.use("/api/orders", orderRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/admin", adminRoutes);

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
  console.log("Database: Supabase");
});