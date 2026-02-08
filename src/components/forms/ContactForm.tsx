import React, { useState } from 'react';
import { Button } from '@components/common/Button';

// Uses your actual Formspree form ID to keep contact serverless and free.
// Replace only if you generate a new Formspree form.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xgozgbal';

interface FormState {
  name: string;
  email: string;
  projectType: 'web' | 'data' | '';
  message: string;
  budgetHint: string;
}

export const ContactForm: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    projectType: '',
    message: '',
    budgetHint: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState)
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSuccessMessage('Thank you for your message. I will get back to you soon.');
      setFormState({
        name: '',
        email: '',
        projectType: '',
        message: '',
        budgetHint: ''
      });
    } catch {
      // Fail safely: show an inline error instead of breaking the app.
      setErrorMessage(
        'Unable to send your message right now. Please try again later.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="form__row">
        <label htmlFor="name">Name *</label>
        <input
          id="name"
          name="name"
          required
          autoComplete="name"
          value={formState.name}
          onChange={handleChange}
        />
      </div>

      <div className="form__row">
        <label htmlFor="email">Email *</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={formState.email}
          onChange={handleChange}
        />
      </div>

      <div className="form__row">
        <label htmlFor="projectType">Project type *</label>
        <select
          id="projectType"
          name="projectType"
          required
          value={formState.projectType}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="web">Website / web app</option>
          <option value="data">Data analysis / dashboards</option>
        </select>
      </div>

      <div className="form__row">
        <label htmlFor="budgetHint">Budget range (rough idea)</label>
        <input
          id="budgetHint"
          name="budgetHint"
          placeholder="Example: ₹15k–₹40k or $300–$700"
          value={formState.budgetHint}
          onChange={handleChange}
        />
      </div>

      <div className="form__row">
        <label htmlFor="message">Project details *</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Share your goals, timeline, and any existing website or data tools."
          value={formState.message}
          onChange={handleChange}
        />
      </div>

      <p className="form__hint">
        This form only collects the details you submit. No payment is taken here.
        Payment integrations (Stripe / Razorpay) will be added later after we agree
        on a scope and budget.
      </p>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending…' : 'Send message'}
      </Button>

      {successMessage && <p className="form__success">{successMessage}</p>}
      {errorMessage && <p className="form__error">{errorMessage}</p>}
    </form>
  );
};

