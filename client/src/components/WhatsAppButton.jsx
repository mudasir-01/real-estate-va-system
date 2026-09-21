import React from "react";
export default function WhatsAppButton({ text = "Discuss on WhatsApp", message = "Hi Mudasir, I would like to discuss your real estate VA services." }) {
  const number = import.meta.env.VITE_WHATSAPP_NUMBER || "";
  const api = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const openWhatsApp = async () => {
    fetch(`${api}/analytics/event`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "whatsapp_click", page: window.location.pathname })
    }).catch(() => {});

    if (!number) {
      alert("Add VITE_WHATSAPP_NUMBER in client/.env");
      return;
    }
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return <button className="btn" onClick={openWhatsApp}>{text}</button>;
}
