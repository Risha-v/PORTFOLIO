import React from 'react';
import type { Feedback } from '@app-types/feedback';
import { Card } from '@components/common/Card';

interface FeedbackCardProps {
  feedback: Feedback;
}

export const FeedbackCard: React.FC<FeedbackCardProps> = ({ feedback }) => {
  const date = new Date(feedback.createdAtIso);
  const formattedDate = Number.isNaN(date.getTime())
    ? ''
    : date.toLocaleDateString();

  return (
    <Card>
      <div className="feedback-card">
        <div className="feedback-card__header">
          <span className="feedback-card__rating">
            {'★'.repeat(feedback.rating)}
            {'☆'.repeat(Math.max(0, 5 - feedback.rating))}
          </span>
          {feedback.clientInitials && (
            <span className="feedback-card__client">{feedback.clientInitials}</span>
          )}
        </div>
        <h3 className="feedback-card__headline">{feedback.headline}</h3>
        <p className="feedback-card__comment">{feedback.comment}</p>
        <div className="feedback-card__meta">
          <span className="feedback-card__project-type">
            {feedback.projectType === 'web'
              ? 'Website development'
              : 'Data analysis & dashboards'}
          </span>
          {feedback.locationHint && (
            <span className="feedback-card__location">
              {feedback.locationHint}
            </span>
          )}
          {formattedDate && (
            <time dateTime={feedback.createdAtIso}>{formattedDate}</time>
          )}
        </div>
      </div>
    </Card>
  );
};