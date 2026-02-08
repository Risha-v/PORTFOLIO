import React from 'react';
import { NavLink } from 'react-router-dom';

export interface NavLinkItemProps {
  to: string;
  label: string;
  onClick?: () => void;
}

export const NavLinkItem: React.FC<NavLinkItemProps> = ({
  to,
  label,
  onClick,
}) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `nav__link ${isActive ? 'nav__link--active' : ''}`
      }
    >
      {label}
    </NavLink>
  );
};