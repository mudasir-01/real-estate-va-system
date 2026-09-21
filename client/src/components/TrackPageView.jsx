import React from "react";
import { useEffect } from "react";

export default function TrackPageView({ page }) {
  useEffect(() => {
    const api = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
    fetch(`${api}/analytics/event`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "page_view", page })
    }).catch(() => {});
  }, [page]);
  return null;
}
