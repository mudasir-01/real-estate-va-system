import React from "react";
import { trackEvent } from "../lib/analytics";

export default function WhatsAppButton({
  text = "Discuss on WhatsApp",
  message = "Hi Mudasir, I would like to discuss your real estate VA services."
}) {
  const number = import.meta.env.VITE_WHATSAPP_NUMBER || "";

  const openWhatsApp = () => {
    // Real analytics tracking
    trackEvent("whatsapp_click", window.location.pathname);

    if (!number) {
      alert("Add VITE_WHATSAPP_NUMBER in client/.env");
      return;
    }

    window.open(
      `https://wa.me/${number}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <button className="btn" onClick={openWhatsApp}>
      {text}
    </button>
  );
}