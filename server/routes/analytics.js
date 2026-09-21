import express from "express";
import { supabase } from "../lib/supabase.js";

const router = express.Router();

router.post("/event", async (req, res) => {
  try {
    const {
      type,
      page = "",
      visitorId = "",
      meta = {},
    } = req.body;

    if (!type) {
      return res.status(400).json({
        message: "type is required",
      });
    }

    const { error } = await supabase
      .from("analytics_events")
      .insert([
        {
          type,
          page,
          visitor_id: visitorId,
          meta,
        },
      ]);

    if (error) {
      console.error("Analytics error:", error);
    }

    res.status(201).json({
      ok: true,
    });
  } catch (error) {
    console.error(error);

    res.status(201).json({
      ok: true,
    });
  }
});

export default router;