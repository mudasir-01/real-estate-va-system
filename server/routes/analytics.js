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
        ok: false,
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
      console.error("Analytics insert error:", error);

      return res.status(500).json({
        ok: false,
        message: "Analytics event could not be saved",
      });
    }

    return res.status(201).json({
      ok: true,
    });

  } catch (error) {
    console.error("Analytics route error:", error);

    return res.status(500).json({
      ok: false,
      message: "Internal server error",
    });
  }
});

export default router;