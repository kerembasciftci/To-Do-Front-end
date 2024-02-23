import React from 'react';
import './Navbar.css'; // Navbar stilleri için ayrı bir CSS dosyası

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">NOTCUMM</a>
        <ul className="nav-menu">
          <li className="nav-item">
            <a href="/" className="nav-links">Anasayfa</a>
          </li>
          <li className="nav-item">
            <a href="/hakkimizda" className="nav-links">Hakkımızda</a>
          </li>
          <li className="nav-item">
            <a href="/hizmetler" className="nav-links">Hizmetler</a>
          </li>
          <li className="nav-item">
            <a href="/iletisim" className="nav-links">İletişim</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
