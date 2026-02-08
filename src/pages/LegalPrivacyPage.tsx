import React from 'react';
import { SEO } from '@components/common/SEO';
import { Section } from '@components/common/Section';
import { PageHeader } from '@components/common/PageHeader';

export const LegalPrivacyPage: React.FC = () => (
  <>
    <SEO
      title="Privacy Policy"
      description="Privacy policy describing how this freelance portfolio handles personal information."
      canonicalPath="/legal/privacy"
    />

    <Section>
      <PageHeader title="Privacy Policy" />

      <p>
        This website is a personal freelance portfolio operated by an individual
        developer based in India. Your privacy is respected, and personal data is
        collected only when you choose to share it.
      </p>

      <p>
        <strong>Information collected:</strong> This site collects personal
        information only when you submit it through forms (such as your email
        address via the contact or update form).
      </p>

      <p>
        <strong>How your information is used:</strong> Submitted information is
        used solely to respond to inquiries or to share updates about completed
        work when requested. Your information is never sold or shared for
        marketing purposes.
      </p>

      <p>
        <strong>Third-party services:</strong> Form submissions are handled by
        Formspree, which processes the data on behalf of this site. No analytics,
        tracking cookies, or advertising services are used.
      </p>

      <p>
        <strong>Data retention:</strong> Personal information is retained only
        for as long as necessary to respond to inquiries or provide requested
        updates.
      </p>

      <p>
        <strong>Your rights:</strong> You may request access to or deletion of
        your personal information by contacting the site owner.
      </p>

      <p>
        This privacy policy may be updated if the site’s functionality changes.
        Any updates will be reflected on this page.
      </p>
    </Section>
  </>
);
