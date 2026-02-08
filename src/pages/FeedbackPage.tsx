import React, { useEffect, useState } from 'react';
import { SEO } from '@components/common/SEO';
import { Section } from '@components/common/Section';
import { PageHeader } from '@components/common/PageHeader';
import { LoadingState } from '@components/common/LoadingState';
import { ErrorState } from '@components/common/ErrorState';
import { FeedbackCard } from '@components/feedback/FeedbackCard';
import { FeedbackPlaceholder } from '@components/feedback/FeedbackPlaceholder';
import type { Feedback } from '@app-types/feedback';
import { fetchFeedback } from '@api/feedback';

export const FeedbackPage: React.FC = () => {
  const [feedback, setFeedback] = useState<Feedback[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    fetchFeedback()
      .then((data) => {
        if (isMounted) {
          setFeedback(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError('Unable to load feedback right now.');
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const isLoading = !feedback && !error;

  return (
    <>
      <SEO
        title="Feedback"
        description="Transparent client feedback will be displayed here in the future, synced from a private Google Sheet. No testimonials are shown until real work is completed."
        canonicalPath="/feedback"
      />
      <Section>
        <PageHeader
          title="Feedback"
          subtitle="Planned: real, mixed feedback automatically pulled from Google Sheets."
        />
        {isLoading && <LoadingState />}
        {error && <ErrorState message={error} />}
        {!isLoading && !error && (
          <>
            <FeedbackPlaceholder />
            {feedback && feedback.length > 0 && (
              <div className="grid grid--two">
                {feedback.map((item) => (
                  <FeedbackCard key={item.id} feedback={item} />
                ))}
              </div>
            )}
          </>
        )}
      </Section>
    </>
  );
};