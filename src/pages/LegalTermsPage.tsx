import React from 'react';
import { SEO } from '@components/common/SEO';
import { Section } from '@components/common/Section';
import { PageHeader } from '@components/common/PageHeader';

export const LegalTermsPage: React.FC = () => (
  <>
    <SEO
      title="Terms & Conditions"
      description="Terms governing the use of this freelance portfolio and related services."
      canonicalPath="/legal/terms"
    />

    <Section>
      <PageHeader title="Terms & Conditions" />

      <p>
        This website is operated as a freelance portfolio by an individual developer
        based in India. By contacting or engaging through this site, you agree to
        the terms outlined below.
      </p>

      <p>
        <strong>Services:</strong> Services offered include website development and
        data-related work. The exact scope, timeline, deliverables, and pricing are
        discussed and agreed upon individually for each project.
      </p>

      <p>
        <strong>Payments:</strong> Payment terms, milestones, and methods are
        defined on a per-project basis and confirmed in writing before work begins.
        Work may be paused or withheld if agreed payments are not made on time.
      </p>

      <p>
        <strong>Revisions:</strong> Reasonable revisions related to the agreed scope
        are included unless otherwise stated. Requests beyond the original scope
        may require additional time or cost.
      </p>

      <p>
        <strong>Intellectual property:</strong> Ownership of final deliverables is
        transferred to the client only after full payment is received, unless
        agreed otherwise in writing.
      </p>

      <p>
        <strong>Liability:</strong> While reasonable care is taken in delivering
        services, no guarantees are made regarding business outcomes, revenue, or
        performance beyond the agreed technical scope.
      </p>

      <p>
        <strong>Communication:</strong> Project-related communication and approvals
        are handled via written channels such as email or shared documents to avoid
        misunderstandings.
      </p>

      <p>
        These terms may be updated as services evolve. Any updates will be reflected
        on this page.
      </p>
    </Section>
  </>
);
