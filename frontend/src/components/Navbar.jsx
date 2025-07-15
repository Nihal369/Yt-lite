// src/components/Navbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="navbar">
      <h2 className="logo">🎵 Muzic</h2>
      <ul>
        <li className={pathname === "/" ? "active" : ""}>
          <Link to="/">Home</Link>
        </li>
        <li className={pathname === "/search" ? "active" : ""}>
          <Link to="/search">Search</Link>
        </li>
        <li className={pathname === "/create-playlist" ? "active" : ""}>
          <Link to="/create-playlist">Create Playlist</Link>
        </li>
        <li className={pathname === "/my-playlists" ? "active" : ""}>
          <Link to="/my-playlists">My Playlists</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
