import React, { useState } from 'react';
import { Button } from '@components/common/Button';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mdadqrzy';

export const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error();
      }

      setStatusMessage(
        'Thanks. You will be notified when new work or updates are published.'
      );
      setEmail('');
    } catch {
      setStatusMessage(
        'Unable to submit right now. Please try again later.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="form form--inline" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="newsletter-email">
        Email address
      </label>

      <input
        id="newsletter-email"
        type="email"
        name="email"
        placeholder="Email address"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        disabled={isSubmitting}
      />

      <Button type="submit" variant="secondary" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting…' : 'Get updates'}
      </Button>

      {statusMessage && (
        <p className="form__hint" role="status">
          {statusMessage}
        </p>
      )}
    </form>
  );
};
