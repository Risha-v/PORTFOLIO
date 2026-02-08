import React from 'react';
// import { createHashRouter } from 'react-router-dom'
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@components/layout/Layout';
import { HomePage } from '@pages/HomePage';
import { ServicesPage } from '@pages/ServicesPage';
import { ProjectsPage } from '@pages/ProjectsPage';
import { FeedbackPage } from '@pages/FeedbackPage';
import { AboutPage } from '@pages/AboutPage';
import { ContactPage } from '@pages/ContactPage';
import { LegalImprintPage } from '@pages/LegalImprintPage';
import { LegalPrivacyPage } from '@pages/LegalPrivacyPage';
import { LegalTermsPage } from '@pages/LegalTermsPage';
import { NotFoundPage } from '@pages/NotFoundPage';

export const AppRouter: React.FC = () => (
  <HashRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/legal/imprint" element={<LegalImprintPage />} />
        <Route path="/legal/privacy" element={<LegalPrivacyPage />} />
        <Route path="/legal/terms" element={<LegalTermsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  </HashRouter>
);

