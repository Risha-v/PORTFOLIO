import React from 'react';
import { SEO } from '@components/common/SEO';
import { Section } from '@components/common/Section';
import { PageHeader } from '@components/common/PageHeader';

export const LegalImprintPage: React.FC = () => (
  <>
    <SEO
      title="Imprint"
      description="Site ownership and legal information for this freelance portfolio."
      canonicalPath="/legal/imprint"
    />

    <Section>
      <PageHeader title="Imprint" />

      <p>
        This website is operated by an individual freelance developer based in
        India. It serves as a professional portfolio and informational site for
        freelance services.
      </p>

      <p>
        At present, no formal business registration details are required under
        Indian law for this portfolio website. Contact and identification
        information will be provided here if and when it becomes legally or
        commercially necessary.
      </p>
    </Section>
  </>
);
