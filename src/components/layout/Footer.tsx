import React from 'react';
import { NavLink } from 'react-router-dom';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p className="site-footer__copyright">
          © {currentYear} Rishav Portfolio. All rights reserved.
        </p>
        <nav className="site-footer__nav" aria-label="Legal">
          <NavLink to="/legal/imprint" className="site-footer__link">
            Imprint
          </NavLink>
          <NavLink to="/legal/privacy" className="site-footer__link">
            Privacy
          </NavLink>
          <NavLink to="/legal/terms" className="site-footer__link">
            Terms
          </NavLink>
        </nav>
      </div>
    </footer>
  );
};