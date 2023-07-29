import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">To-do-app</div>
      <div className={`nav-links ${menuOpen ? 'show-menu' : ''}`}>
        <Link to="/" onClick={toggleMenu}>Home</Link>
        <Link to="/create" onClick={toggleMenu}>Create New</Link>
      </div>
      <div className={`burger ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
};

export default Navbar;
