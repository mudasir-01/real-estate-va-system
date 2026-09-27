const API_URL = import.meta.env.VITE_API_URL;

export function getVisitorId() {
  let id = localStorage.getItem("visitor_id");

  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("visitor_id", id);
  }

  return id;
}

export function getSessionId() {
  let id = sessionStorage.getItem("session_id");

  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem("session_id", id);
  }

  return id;
}

export async function trackEvent(type, page = "", meta = {}) {
  try {
    await fetch(`${API_URL}/analytics/event`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type,
        page,
        visitorId: getVisitorId(),
        meta: {
          ...meta,
          sessionId: getSessionId(),
          referrer: document.referrer || "direct",
        },
      }),
    });
  } catch (error) {
    console.error("Analytics error:", error);
  }
}