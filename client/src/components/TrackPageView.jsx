import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackEvent } from "../lib/analytics";

export default function TrackPageView() {
  const location = useLocation();

  useEffect(() => {
    trackEvent("page_view", location.pathname);
  }, [location.pathname]);

  return null;
}