import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className="layout">
    <Header />
    <main className="layout__main">{children}</main>
    <Footer />
  </div>
);