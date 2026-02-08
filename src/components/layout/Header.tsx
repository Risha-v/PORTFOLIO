import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { NavLinkItem } from './NavLinkItem';
// Import the SVG as an image URL
import logoImage from '../../assets/logo.svg';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogoError = () => {
    console.error('Logo failed to load. Check if logo.svg exists in src/assets folder.');
    setLogoError(true);
  };

  const handleLogoLoad = () => {
    console.log('✅ Logo loaded successfully from assets!');
  };

  return (
    <header className="site-header">
      <div className="site-header__inner">
        {/* Branding */}
        <div className="site-header__branding">
          <NavLink
            to="/"
            className="site-header__logo-link"
            onClick={closeMobileMenu}
          >
            {!logoError ? (
              <img
                src={logoImage}
                alt="Rishav Portfolio - Web Development & Data Analytics"
                className="site-header__logo-img"
                onError={handleLogoError}
                onLoad={handleLogoLoad}
              />
            ) : (
              <div className="site-header__logo-fallback">
                <div className="site-header__logo-text">R</div>
              </div>
            )}
          </NavLink>

          <div className="site-header__brand-text">
            <span className="site-header__title">Web & Data</span>
            <span className="site-header__subtitle">
              Modern websites & clear data insights
            </span>
          </div>
        </div>

        {/* Hamburger - hides when menu is open */}
        {!isMobileMenuOpen && (
          <button
            className="hamburger"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="primary-navigation"
          >
            <span className="hamburger__line" />
            <span className="hamburger__line" />
            <span className="hamburger__line" />
          </button>
        )}

        {/* Navigation */}
        <nav
          id="primary-navigation"
          className={`nav ${isMobileMenuOpen ? 'nav--mobile-open' : ''}`}
          aria-label="Primary"
        >
          {/* Close button (mobile only) - shows when menu is open */}
          {isMobileMenuOpen && (
            <button
              className="nav__close"
              onClick={closeMobileMenu}
              aria-label="Close navigation menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}

          <NavLinkItem to="/" label="Home" onClick={closeMobileMenu} />
          <NavLinkItem to="/services" label="Services" onClick={closeMobileMenu} />
          <NavLinkItem to="/projects" label="Projects" onClick={closeMobileMenu} />
          <NavLinkItem to="/feedback" label="Feedback" onClick={closeMobileMenu} />
          <NavLinkItem to="/about" label="About" onClick={closeMobileMenu} />
          <NavLinkItem to="/contact" label="Contact" onClick={closeMobileMenu} />
        </nav>

        {/* Overlay */}
        {isMobileMenuOpen && (
          <div
            className="nav-overlay"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
        )}
      </div>
    </header>
  );
};