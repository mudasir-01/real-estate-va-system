import React from "react";
export default function Footer() {
  const email = import.meta.env.VITE_EMAIL || "your@email.com";
  const linkedin = import.meta.env.VITE_LINKEDIN_URL || "#";
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h3>Mudasir Real Estate VA</h3>
          <p>Lead Generation + Skip Tracing, Cold Calling and Qualified Off-Market Appointment Setting.</p>
        </div>
        <div>
          <h4>Primary Markets</h4>
          <p>USA & Canada</p>
          <p>UK campaigns available after discussion.</p>
        </div>
        <div>
          <h4>Contact</h4>
          <p><a href={`mailto:${email}`}>{email}</a></p>
          <p><a href={linkedin} target="_blank" rel="noreferrer">LinkedIn</a></p>
        </div>
      </div>
    </footer>
  );
}
