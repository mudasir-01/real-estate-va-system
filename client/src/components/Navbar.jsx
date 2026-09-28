import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { trackEvent } from "../lib/analytics";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const whatsapp =
    import.meta.env.VITE_WHATSAPP_NUMBER || "";

  const whatsappNumber =
    whatsapp.replace(/\D/g, "");

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const openWhatsApp = () => {
    trackEvent(
      "whatsapp_click",
      window.location.pathname,
      {
        source: "navbar",
      }
    );

    closeMenu();
  };

  const navClass = ({ isActive }) =>
    isActive
      ? "nav-link active"
      : "nav-link";

  return (
    <header className="nav-wrap">
      <nav className="nav container">

        {/* BRAND */}

        <Link
          className="brand"
          to="/"
          onClick={closeMenu}
        >
          Mudasir{" "}
          <span>Real Estate VA</span>
        </Link>

        {/* MOBILE MENU BUTTON */}

        <button
          className={`menu-toggle ${
            menuOpen ? "open" : ""
          }`}
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() =>
            setMenuOpen((prev) => !prev)
          }
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* NAV LINKS */}

        <div
          className={`nav-links ${
            menuOpen ? "show" : ""
          }`}
        >
          <NavLink
            className={navClass}
            to="/"
            end
            onClick={closeMenu}
          >
            Home
          </NavLink>

          <NavLink
            className={navClass}
            to="/services"
            onClick={closeMenu}
          >
            Services
          </NavLink>

          <NavLink
            className="btn btn-small"
            to="/order"
            onClick={closeMenu}
          >
           Place Order
          </NavLink>

          {whatsappNumber && (
            <a
              className="nav-whatsapp"
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                "Hi Mudasir, I would like to discuss a real estate prospecting campaign."
              )}`}
              target="_blank"
              rel="noreferrer"
              onClick={openWhatsApp}
            >
              WhatsApp
            </a>
          )}
        </div>

      </nav>
    </header>
  );
}