// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h2 className="logo">Mini<text className="tube">Tube</text></h2>

        <div className="hamburger" onClick={toggleMenu}>
          <span className={`bar ${menuOpen ? "rotate-top" : ""}`}></span>
          <span className={`bar ${menuOpen ? "fade" : ""}`}></span>
          <span className={`bar ${menuOpen ? "rotate-bottom" : ""}`}></span>
        </div>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li className={pathname === "/" ? "active" : ""}>
            <Link to="/" onClick={closeMenu}>Home</Link>
          </li>
          <li className={pathname === "/search" ? "active" : ""}>
            <Link to="/search" onClick={closeMenu}>Search</Link>
          </li>
          <li className={pathname === "/create-playlist" ? "active" : ""}>
            <Link to="/create-playlist" onClick={closeMenu}>Create Playlist</Link>
          </li>
          <li className={pathname === "/my-playlists" ? "active" : ""}>
            <Link to="/my-playlists" onClick={closeMenu}>My Playlists</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
