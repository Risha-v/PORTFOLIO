import React from 'react';
import { SEO } from '@components/common/SEO';
import { Section } from '@components/common/Section';
import { PageHeader } from '@components/common/PageHeader';
import type { Service } from '@app-types/services';
import { Card } from '@components/common/Card';

const services: Service[] = [
  {
    id: 'web-basic',
    name: 'Business website',
    shortDescription:
      'A clean, fast website designed to represent your business professionally online.',
    bullets: [
      'Responsive design for mobile, tablet, and desktop',
      'Clear structure: home, about, services, contact',
      'Performance, accessibility, and maintainability focused',
      'Hosting and infrastructure configured based on your requirements'
    ],
    startingPriceHint:
      'Typically starts around ₹25k-₹50k / $300-$700 depending on scope and content',
    category: 'web',
    isAvailable: true
  },
  {
    id: 'web-landing',
    name: 'Conversion-focused landing page',
    shortDescription:
      'A focused single-page website designed around one clear goal or offer.',
    bullets: [
      'Single-page layout optimized for clarity and conversion',
      'SEO-friendly and analytics-ready structure',
      'Fast-loading, lightweight implementation',
      'Designed to integrate with your existing tools'
    ],
    startingPriceHint:
      'Typically starts around ₹15k-₹30k / $200-$450 depending on complexity',
    category: 'web',
    isAvailable: true
  },
  {
    id: 'data-dashboard',
    name: 'Business data dashboard',
    shortDescription:
      'Turn raw data into clear dashboards that support better decision-making.',
    bullets: [
      'Understand what questions your data needs to answer',
      'Clean and structure data from spreadsheets or simple data sources',
      'Design dashboards that are clear and non-technical',
      'Focus on accuracy, clarity, and long-term usability'
    ],
    startingPriceHint:
      'Project-based pricing discussed after a short requirements call',
    category: 'data',
    isAvailable: true
  }
];

export const ServicesPage: React.FC = () => (
  <>
    <SEO
      title="Services"
      description="Paid freelance services for small and medium businesses, including website development and data dashboard creation."
      canonicalPath="/services"
    />

    <Section>
      <PageHeader
        title="Services"
        subtitle="Paid professional services with clear scope and transparent communication."
      />

      <p>
        Below are the types of projects I currently take on. Final pricing depends
        on your goals, technical requirements, and timeline, but the ranges below
        should help with initial planning.
      </p>

      <div className="grid grid--three">
        {services.map((service) => (
          <Card key={service.id}>
            <div className="service-card">
              <h3>{service.name}</h3>

              <p className="service-card__description">
                {service.shortDescription}
              </p>

              <ul className="service-card__list">
                {service.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              {service.startingPriceHint && (
                <p className="service-card__price">
                  <strong>Typical starting range:</strong>{' '}
                  {service.startingPriceHint}
                </p>
              )}

              <p className="service-card__availability">
                Status:{' '}
                {service.isAvailable
                  ? 'Currently accepting inquiries'
                  : 'Not available'}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <p className="page-footnote">
        These are paid services. Hosting, domains, third-party tools, and
        infrastructure costs are handled separately based on your preferences and
        security requirements.
      </p>
    </Section>
  </>
);