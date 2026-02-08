import React from 'react';
import { Card } from '@components/common/Card';

export const FeedbackPlaceholder: React.FC = () => (
  <Card>
    <div className="placeholder">
      <h3>Client feedback</h3>

      <p>
        Client feedback will be published here once projects are completed and
        feedback is collected from real clients.
      </p>

      <ul>
        <li>Verified feedback linked to completed projects</li>
        <li>Balanced reviews to reflect real outcomes</li>
        <li>Filterable by project type (web or data)</li>
      </ul>

      <p className="placeholder__note">
        No testimonials are displayed until real client work exists.
      </p>
    </div>
  </Card>
);
