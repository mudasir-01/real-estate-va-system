import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="nav-wrap">
      <nav className="nav container">
        <Link className="brand" to="/">
          Mudasir <span>Real Estate VA</span>
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link className="btn btn-small" to="/order">
            Place Order
          </Link>
        </div>
      </nav>
    </header>
  );
}