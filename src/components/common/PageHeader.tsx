import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => (
  <header className="page-header">
    <h1>{title}</h1>
    {subtitle && <p className="page-header__subtitle">{subtitle}</p>}
  </header>
);

