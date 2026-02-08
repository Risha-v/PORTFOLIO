import React from 'react';
import { AppRouter } from './router';
import { AppHelmetProvider } from '@components/common/SEO';
import '@styles/global.css';
import '@styles/layout.css';
import '@styles/typography.css';
import '@styles/components.css';

export const App: React.FC = () => (
  <AppHelmetProvider>
    <AppRouter />
  </AppHelmetProvider>
);

