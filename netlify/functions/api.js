import express from "express";
import cors from "cors";
import serverless from "serverless-http";

import whatsappRoutes from "../../server/routes/whatsapp.js";
import orderRoutes from "../../server/routes/orders.js";
import analyticsRoutes from "../../server/routes/analytics.js";
import adminRoutes from "../../server/routes/admin.js";
import whatsappRoutes from "../../server/routes/whatsapp.js";

const app = express();

app.use(
  cors({
    origin: true,
  })
);

app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    database: "Supabase",
    hosting: "Netlify",
  });
});

app.use("/api/orders", orderRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/whatsapp", whatsappRoutes);
app.use("/api/whatsapp", whatsappRoutes);

export const handler = serverless(app);