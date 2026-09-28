import React from "react";
import { Link } from "react-router-dom";
import { trackEvent } from "../lib/analytics";

export default function Footer() {
  const email =
    import.meta.env.VITE_EMAIL ||
    "your@email.com";

  const linkedin =
    import.meta.env.VITE_LINKEDIN_URL ||
    "#";

  const whatsapp =
    import.meta.env.VITE_WHATSAPP_NUMBER ||
    "";

  const whatsappNumber =
    whatsapp.replace(/\D/g, "");

  const openWhatsApp = () => {
    trackEvent(
      "whatsapp_click",
      window.location.pathname,
      {
        source: "footer",
      }
    );
  };

  return (
    <footer className="footer">
      <div className="container footer-grid">

        {/* BRAND */}

        <div>
          <h3>Mudasir Real Estate VA</h3>

          <p>
            Real estate prospecting support
            for investors, agents and
            acquisition teams looking to
            build stronger off-market
            pipelines.
          </p>

          <p className="small">
            Lead Generation • Skip Tracing •
            Cold Calling • Appointment Setting
          </p>
        </div>

        {/* NAVIGATION */}

        <div>
          <h4>Quick Links</h4>

          <p>
            <Link to="/">Home</Link>
          </p>

          <p>
            <Link to="/services">
              Services & Pricing
            </Link>
          </p>

          <p>
            <Link to="/order">
              Start a Campaign
            </Link>
          </p>

          <h4>Markets</h4>

          <p>
            United States • Canada •
            United Kingdom
          </p>
        </div>

        {/* CONTACT */}

        <div>
          <h4>Contact</h4>

          <p>
            <a href={`mailto:${email}`}>
              {email}
            </a>
          </p>

          <p>
            <a
              href={linkedin}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </p>

          {whatsappNumber && (
            <p>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                  "Hi Mudasir, I would like to discuss a real estate prospecting campaign."
                )}`}
                target="_blank"
                rel="noreferrer"
                onClick={openWhatsApp}
              >
                WhatsApp
              </a>
            </p>
          )}

          <p className="small">
            Campaign scope and payment are
            confirmed before work begins.
          </p>
        </div>

      </div>

      {/* BOTTOM */}

      <div className="container">
        <p
          className="small"
          style={{
            marginTop: "24px",
            paddingTop: "18px",
            borderTop:
              "1px solid rgba(255,255,255,0.1)",
          }}
        >
          © {new Date().getFullYear()} Mudasir
          Real Estate VA. All rights reserved.
        </p>
      </div>
    </footer>
  );
}