import React from 'react';
import { SEO } from '@components/common/SEO';
import { Section } from '@components/common/Section';
import { Button } from '@components/common/Button';
import { NewsletterForm } from '@components/forms/NewsletterForm';
import { NavLink } from 'react-router-dom';

export const HomePage: React.FC = () => (
  <>
    <SEO
      title="Home"
      description="Professional web development and data dashboard services for small and medium businesses. Modern websites, clear analytics, and cost-effective delivery."
      canonicalPath="/"
    />

    <Section className="hero">
      <div className="hero__content">
        <p className="hero__eyebrow">Professional freelance services</p>

        <h1>
          Modern websites and data dashboards for growing businesses
        </h1>

        <p className="hero__text">
          I help small and medium businesses build a strong online presence and make
          better decisions using clean, modern websites and easy-to-understand data
          dashboards. My focus is on practical solutions that are reliable,
          maintainable, and cost-effective.
        </p>

        <div className="hero__actions">
          <NavLink to="/contact">
            <Button>Discuss your project</Button>
          </NavLink>
          <NavLink to="/services">
            <Button variant="ghost">View services</Button>
          </NavLink>
        </div>
{/* 
        <p className="hero__note">
          This portfolio is built with transparency. Client projects and feedback
          will be added later when delivered.
        </p> */}
      </div>
    </Section>

    <Section className="home-section">
      <h2>How I can help your business</h2>

      <div className="grid grid--two">
        <div>
          <h3>Website development</h3>
          <ul>
            <li>Modern, responsive websites built with MERN Stack</li>
            <li>Clean, maintainable code that can grow with your business</li>
            <li>Secure deployment and hosting setup based on your requirements</li>
            <li>SEO-friendly structure for long-term visibility</li>

          </ul>
        </div>

        <div>
          <h3>Data analysis &amp; dashboards</h3>
          <ul>
            <li>Transform spreadsheets into clear visual dashboards</li>
            <li>Identify key metrics that matter to your business</li>
            <li>Simple, budget-friendly tools (Google Sheets, lightweight BI tools)</li>
            <li>Dashboards designed for clarity, accuracy, and usability</li>
          </ul>
        </div>
      </div>
    </Section>

    <Section className="home-section home-section--newsletter">
      <h2>Stay updated</h2>

      <p>
        As real client projects are completed, this portfolio will be updated with
        live examples and feedback. You can leave your email to receive occasional
        updates when new work is published.
      </p>

      <NewsletterForm />
    </Section>
  </>
);
