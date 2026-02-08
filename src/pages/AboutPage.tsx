import React from 'react';
import { SEO } from '@components/common/SEO';
import { Section } from '@components/common/Section';
import { PageHeader } from '@components/common/PageHeader';

export const AboutPage: React.FC = () => (
  <>
    <SEO
      title="About"
      description="Background, working approach, and values of a freelance web developer and data specialist working with small and medium businesses."
      canonicalPath="/about"
    />

    <Section>
      <PageHeader title="About" />

      <p>
        I am a freelance developer working with small and medium businesses to
        design, build, and maintain modern websites, as well as create clear and
        practical data dashboards. My focus is on delivering solutions that are
        reliable, understandable, and aligned with real business needs.
      </p>

      <p>
        My working style is straightforward and transparent. I prioritize clear
        communication, realistic timelines, and maintainable solutions over
        unnecessary complexity or buzzwords. If a requirement falls outside my
        expertise, I communicate that early and help identify more suitable
        alternatives where possible.
      </p>

    </Section>
  </>
);
