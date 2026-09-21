import React from "react";
import { Link } from "react-router-dom";
import TrackPageView from "../components/TrackPageView";

const services = [
  {
    title: "Lead Generation + Skip Tracing",
    price: "$20 / 100 leads",
    body: "Owner/property research plus contact information based on location, property type and your investment criteria."
  },
  {
    title: "Cold Calling",
    price: "$40 / 100 calls",
    body: "Outbound calling with call outcomes and notes. Larger calling campaigns can be quoted separately."
  },
  {
    title: "Qualified Appointment Setting",
    price: "$60 / appointment",
    body: "A qualified appointment means the prospect has been contacted, the property is identified, interest is established and an appointment time is agreed."
  }
];

export default function Services() {
  const api = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const track = (service) => {
    fetch(`${api}/analytics/event`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "service_click", page: "/services", meta: { service } })
    }).catch(() => {});
  };

  return (
    <main className="section container page-top">
      <TrackPageView page="/services" />
      <div className="section-head">
        <span className="eyebrow">Services & pricing</span>
        <h1>Choose a service or request a larger campaign.</h1>
        <p>USA and Canada are the primary markets. UK projects are reviewed individually.</p>
      </div>

      <div className="cards three">
        {services.map(s => (
          <article className="card service-card" key={s.title}>
            <h2>{s.title}</h2>
            <p>{s.body}</p>
            <div className="service-price">{s.price}</div>
            <Link className="btn" to="/order" onClick={() => track(s.title)}>Order / Discuss</Link>
          </article>
        ))}
      </div>

      <div className="notice">
        <strong>Large campaign?</strong> Order details are reviewed first. Payment method and any custom scope are then discussed on WhatsApp.
      </div>
    </main>
  );
}
