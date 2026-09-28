import React from "react";
import { Link } from "react-router-dom";

import TrackPageView from "../components/TrackPageView";
import WhatsAppButton from "../components/WhatsAppButton";
import { trackEvent } from "../lib/analytics";

const services = [
  {
    title: "Lead Generation + Skip Tracing",
    price: "$20 / 100 leads",
    description:
      "For investors and real estate professionals who need targeted property owners and accurate contact information without spending hours researching records.",
    features: [
      "Targeted owner & property research",
      "Skip tracing and contact discovery",
      "Custom city / ZIP / property criteria",
      "Available in packages starting from 100 leads",
    ],
  },

  {
    title: "Cold Calling",
    price: "$30 / 100 calls",
    description:
      "For teams that already have leads but need consistent outbound outreach to identify interested owners and organize follow-up opportunities.",
    features: [
      "Outbound property-owner calling",
      "Call outcomes and notes",
      "Interest identification",
      "Available in packages starting from 100 calls",
    ],
  },

  {
    title: "Qualified Appointment Setting",
    price: "$50 / appointment",
    description:
      "For investors, agents and acquisition teams who want qualified conversations instead of spending time prospecting and chasing unresponsive leads.",
    features: [
      "Prospect contacted",
      "Property confirmed",
      "Interest established",
      "Appointment opportunity arranged",
    ],
  },
];

const targetingOptions = [
  "United States",
  "Canada",
  "United Kingdom",
  "State / Province / Region",
  "City / Town",
  "ZIP / Postal Code / Postcode",
  "Property Type",
  "Owner Criteria",
  "Custom Acquisition Requirements",
];

export default function Services() {
  const handleServiceClick = (service) => {
    trackEvent(
      "service_click",
      "/services",
      {
        service,
      }
    );
  };

  return (
    <main className="section container page-top">
      <TrackPageView />

      {/* HEADER */}

      <div className="section-head">
        <span className="eyebrow">
          Services & Pricing
        </span>

        <h1>
          Choose the prospecting support your
          real estate business needs.
        </h1>

        <p>
          Whether you need better owner data,
          more outreach, or qualified
          conversations, campaigns can be
          tailored around your market,
          property type and acquisition
          criteria.
        </p>
      </div>

      {/* SERVICES */}

      <div className="cards three">
        {services.map((service) => (
          <article
            className="card service-card"
            key={service.title}
          >
            <h2>{service.title}</h2>

            <p>
              {service.description}
            </p>

            <div className="service-price">
              {service.price}
            </div>

            <ul>
              {service.features.map(
                (feature) => (
                  <li key={feature}>
                    {feature}
                  </li>
                )
              )}
            </ul>

            <Link
              className="btn"
              to="/order"
              onClick={() =>
                handleServiceClick(
                  service.title
                )
              }
            >
              Start This Campaign
            </Link>
          </article>
        ))}
      </div>

      {/* PROBLEM / SOLUTION */}

      <section className="section">
        <div className="section-head">
          <span className="eyebrow">
            Built around your target
          </span>

          <h2>
            No generic lists. Tell us exactly
            what you want to target.
          </h2>

          <p>
            Campaigns can be structured around
            your preferred location, property
            niche, owner profile and other
            acquisition requirements.
          </p>
        </div>

        <div className="chip-wrap">
          {targetingOptions.map(
            (option) => (
              <span
                className="chip"
                key={option}
              >
                {option}
              </span>
            )
          )}
        </div>
      </section>

      {/* COMBINED CAMPAIGN */}

      <section className="section">
        <div className="proof-box">
          <div>
            <span className="eyebrow">
              Need more than a lead list?
            </span>

            <h2>
              Combine lead generation with
              cold calling.
            </h2>

            <p>
              Start with targeted owner data
              and add cold calling to move from
              research to actual seller
              conversations.
            </p>

            <p className="small">
              Example: 100 Leads + Skip
              Tracing ($20) + 100 Cold Calls
              ($30) = $50 estimated starting
              total.
            </p>
          </div>

          <Link
            className="btn"
            to="/order"
            onClick={() =>
              handleServiceClick(
                "Lead Generation + Cold Calling"
              )
            }
          >
            Build Your Campaign
          </Link>
        </div>
      </section>

      {/* PROCESS */}

      <section className="section">
        <div className="section-head">
          <span className="eyebrow">
            Simple process
          </span>

          <h2>
            From targeting criteria to
            delivery
          </h2>
        </div>

        <div className="cards three">
          <article className="card">
            <h3>1. Select Your Target</h3>

            <p>
              Choose your country, location,
              property type and campaign size.
            </p>
          </article>

          <article className="card">
            <h3>2. Confirm the Scope</h3>

            <p>
              We review the criteria and
              confirm the campaign and payment
              method with you.
            </p>
          </article>

          <article className="card">
            <h3>3. Work Begins</h3>

            <p>
              Research, calling or appointment
              setting begins based on the
              selected service.
            </p>
          </article>
        </div>
      </section>

      {/* FINAL CTA */}

      <div className="notice">
        <strong>
          Have custom requirements?
        </strong>

        <p>
          Larger campaigns, specialty asset
          classes and custom acquisition
          criteria can be discussed before
          payment.
        </p>

        <div className="hero-actions">
          <Link
            className="btn"
            to="/order"
          >
            Place an Order
          </Link>

          <WhatsAppButton
            text="Discuss on WhatsApp"
            message="Hi Mudasir, I would like to discuss a custom real estate prospecting campaign."
          />
        </div>
      </div>
    </main>
  );
}