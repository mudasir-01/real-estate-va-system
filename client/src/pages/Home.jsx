import React from "react";
import { Link } from "react-router-dom";
import TrackPageView from "../components/TrackPageView";
import WhatsAppButton from "../components/WhatsAppButton";

const clients = [
  "Real Estate Investors", "Wholesalers", "Agents", "Brokers",
  "Acquisition Teams", "Investment Companies", "Realtors",
  "Commercial Real Estate Professionals", "Multifamily Investors",
  "Developers", "Property Managers", "Business Owners"
];

const niches = [
  "Single-Family", "Multifamily", "Mobile Home Parks", "RV Parks",
  "Self-Storage", "Vacant Land", "Commercial", "Hotels / Motels",
  "Retail", "Industrial", "Warehouses", "Distressed Properties"
];

export default function Home() {
  return (
    <main>
      <TrackPageView page="/" />

      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">USA & Canada Real Estate Support</span>
            <h1>Build a stronger off-market pipeline without doing all the research and calling yourself.</h1>
            <p className="hero-copy">
              Targeted Lead Generation + Skip Tracing, Cold Calling and Qualified Appointment Setting for real estate professionals.
            </p>
            <div className="hero-actions">
              <Link className="btn" to="/order">Place an Order</Link>
              <WhatsAppButton />
            </div>
            <div className="trust-row">
              <span>Real lead sheets available</span>
              <span>Client reviews available</span>
              <span>Flexible campaign sizes</span>
            </div>
          </div>

          <div className="hero-card">
            <p className="muted">Starting pricing</p>
            <div className="price-line"><strong>$20</strong><span>100 Leads + Skip Tracing</span></div>
            <div className="price-line"><strong>$30</strong><span>100 Cold Calls</span></div>
            <div className="price-line"><strong>$50</strong><span>1 Qualified Appointment</span></div>
            <p className="small">Larger campaigns and custom requirements are discussed before payment.</p>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <span className="eyebrow">Core services</span>
          <h2>Support for the full prospecting workflow</h2>
        </div>
        <div className="cards three">
          <article className="card">
            <h3>Lead Generation + Skip Tracing</h3>
            <p>Targeted property and owner research with contact information based on your market and criteria.</p>
            <strong>100 verified leads — $20</strong>
          </article>
          <article className="card">
            <h3>Cold Calling</h3>
            <p>Outbound calling to reach owners, identify interest and document outcomes for follow-up.</p>
            <strong>100 calls — $30</strong>
          </article>
          <article className="card">
            <h3>Qualified Appointments</h3>
            <p>Qualified prospects with verified property information, seller interest and an agreed appointment time.</p>
            <strong>1 appointment — $50</strong>
          </article>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container split">
          <div>
            <span className="eyebrow">Who we work with</span>
            <h2>Built for active real estate professionals</h2>
            <div className="chip-wrap">{clients.map(x => <span className="chip" key={x}>{x}</span>)}</div>
          </div>
          <div>
            <span className="eyebrow">Property niches</span>
            <h2>From residential to specialty assets</h2>
            <div className="chip-wrap">{niches.map(x => <span className="chip" key={x}>{x}</span>)}</div>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="proof-box">
          <div>
            <span className="eyebrow">Proof & experience</span>
            <h2>Real work, not invented portfolio numbers.</h2>
            <p>Your real lead-sheet screenshots and genuine client reviews should be added here before launch.</p>
          </div>
          <Link className="btn" to="/order">Discuss Your Campaign</Link>
        </div>
      </section>
    </main>
  );
}
