import React from 'react';
import { SEO } from '@components/common/SEO';
import { Section } from '@components/common/Section';
import { PageHeader } from '@components/common/PageHeader';
import { NavLink } from 'react-router-dom';
import { Button } from '@components/common/Button';

export const NotFoundPage: React.FC = () => (
  <>
    <SEO
      title="Page not found"
      description="The page you are looking for does not exist."
    />
    <Section>
      <PageHeader title="Page not found" />
      <p>The page you requested does not exist or has moved.</p>
      <NavLink to="/">
        <Button>Go back home</Button>
      </NavLink>
    </Section>
  </>
);

