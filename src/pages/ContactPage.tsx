import React from 'react';
import { SEO } from '@components/common/SEO';
import { Section } from '@components/common/Section';
import { PageHeader } from '@components/common/PageHeader';
import { ContactForm } from '@components/forms/ContactForm';

export const ContactPage: React.FC = () => (
  <>
    <SEO
      title="Contact"
      description="Contact form for paid web development and data analytics projects. Powered by Formspree for free, serverless hosting."
      canonicalPath="/contact"
    />
    <Section>
      <PageHeader
        title="Contact"
        subtitle="Share a bit about your business and what you want to achieve."
      />
      <p>
        Use the form below to start a conversation. There is no obligation at this
        stage—we&apos;ll first confirm whether the project is a good fit and align
        on scope and budget.
      </p>
      <ContactForm />
    </Section>
  </>
);

