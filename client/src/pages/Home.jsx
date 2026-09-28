import ScrollReveal from "../components/ScrollReveal";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import TrackPageView from "../components/TrackPageView";
import WhatsAppButton from "../components/WhatsAppButton";

const clients = [
  "Real Estate Investors",
  "Wholesalers",
  "Agents",
  "Brokers",
  "Acquisition Teams",
  "Investment Companies",
  "Realtors",
  "Commercial Real Estate Professionals",
  "Multifamily Investors",
  "Developers",
  "Property Managers",
  "Business Owners",
];

const niches = [
  "Single-Family",
  "Multifamily",
  "Mobile Home Parks",
  "RV Parks",
  "Self-Storage",
  "Vacant Land",
  "Commercial",
  "Hotels / Motels",
  "Retail",
  "Industrial",
  "Warehouses",
  "Distressed Properties",
];

const workflow = [
  {
    number: "01",
    title: "Tell Us Your Target",
    text: "Choose your market, property type, location and campaign size.",
  },
  {
    number: "02",
    title: "We Review the Criteria",
    text: "Your targeting requirements and campaign scope are reviewed before work begins.",
  },
  {
    number: "03",
    title: "Research & Outreach",
    text: "We handle property-owner research, contact discovery and outreach based on your selected service.",
  },
  {
    number: "04",
    title: "Receive the Results",
    text: "Lead data, calling outcomes or qualified appointments are delivered based on your campaign.",
  },
];

const benefits = [
  "Custom market targeting",
  "Property-owner research",
  "Accurate contact discovery",
  "Flexible campaign sizes",
  "Direct WhatsApp communication",
  "USA, Canada & UK targeting",
];

const faqs = [
  {
    question: "What do you need to start?",
    answer:
      "Your target country, city or ZIP code, property type, campaign size and any specific acquisition criteria.",
  },
  {
    question: "Can I target specific locations?",
    answer:
      "Yes. Campaigns can target specific states, provinces, cities, counties, ZIP codes, postal codes or regions.",
  },
  {
    question: "Can I add cold calling to my leads?",
    answer:
      "Yes. Lead Generation + Skip Tracing campaigns can include cold calling as an additional service.",
  },
  {
    question: "What markets do you support?",
    answer:
      "Campaigns are available for the United States, Canada and the United Kingdom.",
  },
  {
    question: "How does payment work?",
    answer:
      "Submit your order first. The campaign scope and workable payment method are confirmed before work begins.",
  },
  {
    question: "Can I request a larger campaign?",
    answer:
      "Yes. Larger campaigns and custom targeting requirements can be discussed before payment.",
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main>
      <TrackPageView />
      <ScrollReveal />


      {/* HERO */}

      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">
              USA • Canada • UK Real Estate Prospecting Support
            </span>

            <h1>
              Find and reach more off-market property owners without doing all
              the research and outreach yourself.
            </h1>

            <p className="hero-copy">
              Build a stronger seller and acquisition pipeline with targeted
              owner research, skip tracing, cold calling and qualified
              appointment setting.
            </p>

            <div className="hero-actions">
              <Link className="btn" to="/order">
                Place Order
              </Link>

              <WhatsAppButton text="Discuss on WhatsApp" />
            </div>

            <div className="trust-row">
              <span>Real lead sheets available</span>
              <span>Genuine client reviews available</span>
              <span>Custom targeting criteria</span>
            </div>
          </div>

          <div className="hero-card">
            <p className="muted">Starting pricing</p>

            <div className="price-line">
              <strong>$20</strong>
              <span>100 Leads + Skip Tracing</span>
            </div>

            <div className="price-line">
              <strong>$30</strong>
              <span>100 Cold Calls</span>
            </div>

            <div className="price-line">
              <strong>$50</strong>
              <span>1 Qualified Appointment</span>
            </div>

            <p className="small">
              Larger campaigns and custom targeting requirements are reviewed
              before payment.
            </p>

            <Link className="btn btn-full" to="/order">
              Place Order
            </Link>
          </div>
        </div>
      </section>

      {/* PROBLEM / SOLUTION */}

      <section className="section container reveal">
        <div className="section-head">
          <span className="eyebrow">
            The problem we solve
          </span>

          <h2>
            Your time should go into conversations and deals — not hours of
            prospect research.
          </h2>

          <p>
            Finding the right owners, locating usable contact information and
            consistently following up can consume valuable time. We help handle
            that prospecting workload so your pipeline keeps moving.
          </p>
        </div>

        <div className="cards three">
          <article className="card">
            <h3>Find the Right Owners</h3>

            <p>
              Build targeted property-owner lists based on location, property
              type and your acquisition criteria instead of relying on generic
              databases.
            </p>
          </article>

          <article className="card">
            <h3>Reach More Prospects</h3>

            <p>
              Skip tracing and contact research help turn property records into
              people your team can actually reach.
            </p>
          </article>

          <article className="card">
            <h3>Stay Consistent</h3>

            <p>
              Cold calling and appointment support help keep prospecting moving
              while you focus on negotiations, listings and closings.
            </p>
          </article>
        </div>
      </section>

      {/* SERVICES */}

      <section className="section section-soft reveal">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">
              Core services
            </span>

            <h2>
              Choose the part of the prospecting process you need help with.
            </h2>
          </div>

          <div className="cards three">
            <article className="card">
              <h3>
                Lead Generation + Skip Tracing
              </h3>

              <p>
                Targeted property and owner research with contact information
                based on your market, niche and acquisition criteria.
              </p>

              <strong>
                100 targeted leads — $20
              </strong>
            </article>

            <article className="card">
              <h3>Cold Calling</h3>

              <p>
                Outbound calls to reach property owners, identify interest and
                organize the outcome for follow-up.
              </p>

              <strong>
                100 calls — $30
              </strong>
            </article>

            <article className="card">
              <h3>
                Qualified Appointment Setting
              </h3>

              <p>
                Qualified prospects with relevant property information, seller
                interest and an agreed appointment opportunity.
              </p>

              <strong>
                1 qualified appointment — $50
              </strong>
            </article>
          </div>

          <div
            className="hero-actions"
            style={{ marginTop: "28px" }}
          >
            <Link
              className="btn"
              to="/services"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* WHO WE HELP */}

      <section className="section container reveal">
        <div className="split">
          <div>
            <span className="eyebrow">
              Who we work with
            </span>

            <h2>
              Built for active real estate professionals
            </h2>

            <div className="chip-wrap">
              {clients.map((client) => (
                <span
                  className="chip"
                  key={client}
                >
                  {client}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="eyebrow">
              Property niches
            </span>

            <h2>
              From residential to specialty assets
            </h2>

            <div className="chip-wrap">
              {niches.map((niche) => (
                <span
                  className="chip"
                  key={niche}
                >
                  {niche}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}

      <section className="section section-soft reveal">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">
              How it works
            </span>

            <h2>
              A simple process from targeting to delivery
            </h2>

            <p>
              No complicated onboarding. Tell us what you are targeting and we
              confirm the campaign before work begins.
            </p>
          </div>

          <div className="cards three">
            {workflow.map((step) => (
              <article
                className="card"
                key={step.number}
              >
                <span className="eyebrow">
                  {step.number}
                </span>

                <h3>{step.title}</h3>

                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TARGETING */}

      <section className="section container reveal">
        <div className="section-head">
          <span className="eyebrow">
            Custom targeting
          </span>

          <h2>
            Your campaign should match your buying criteria.
          </h2>

          <p>
            Campaigns can be structured around specific cities, ZIP codes,
            property types, owner criteria and other acquisition requirements.
          </p>
        </div>

        <div className="cards three">
          <article className="card">
            <h3>
              Self-Storage & Specialty Assets
            </h3>

            <p>
              Build owner and facility prospect lists around specific markets
              and investment criteria.
            </p>
          </article>

          <article className="card">
            <h3>
              Residential & Multifamily
            </h3>

            <p>
              Target property owners based on your selected locations,
              ownership characteristics and asset criteria.
            </p>
          </article>

          <article className="card">
            <h3>
              Vacant Land & Commercial
            </h3>

            <p>
              Research owners and opportunities across targeted counties,
              cities, ZIP codes and property categories.
            </p>
          </article>
        </div>
      </section>

      {/* WHY US */}

      <section className="section section-soft reveal">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">
              Why work with us
            </span>

            <h2>
              Prospecting support built around your campaign.
            </h2>
          </div>

          <div className="chip-wrap">
            {benefits.map((benefit) => (
              <span
                className="chip"
                key={benefit}
              >
                {benefit}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* PROOF */}

      <section className="section container reveal">
        <div className="proof-box">
          <div>
            <span className="eyebrow">
              Proof & experience
            </span>

            <h2>
              Review real examples before placing your order.
            </h2>

            <p>
              Real lead-sheet samples and genuine client feedback are available
              so you can understand the type of work and data provided before
              moving forward.
            </p>
          </div>

          <WhatsAppButton
            text="Ask for Work Samples"
            message="Hi Mudasir, I would like to see examples of your real estate lead generation and VA work."
          />
        </div>
      </section>

      {/* FAQ */}

      <section className="section section-soft reveal">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">
              Frequently Asked Questions
            </span>

            <h2>
              Common questions before placing an order
            </h2>

            <p>
              Everything you need to know before getting started.
            </p>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div
                className={`faq-item ${
                  openFaq === index
                    ? "active"
                    : ""
                }`}
                key={faq.question}
              >
                <button
                  type="button"
                  className="faq-question"
                  onClick={() =>
                    toggleFaq(index)
                  }
                  aria-expanded={
                    openFaq === index
                  }
                >
                  <span>
                    {faq.question}
                  </span>

                  <span
                    className="faq-icon"
                    aria-hidden="true"
                  >
                    {openFaq === index
                      ? "−"
                      : "+"}
                  </span>
                </button>

                <div
                  className={`faq-answer ${
                    openFaq === index
                      ? "open"
                      : ""
                  }`}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}

      <section className="section container reveal">
        <div className="proof-box">
          <div>
            <span className="eyebrow">
              Ready to get started?
            </span>

            <h2>
              Tell us exactly what market and property type you want to target.
            </h2>

            <p>
              Select your target location, niche, service and quantity. Your
              order will be reviewed before payment.
            </p>
          </div>

          <div className="hero-actions">
            <Link
              className="btn"
              to="/order"
            >
              Place Order
            </Link>

            <WhatsAppButton
              text="Discuss on WhatsApp"
              message="Hi Mudasir, I would like to discuss a real estate prospecting order."
            />
          </div>
        </div>
      </section>
    </main>
  );
}