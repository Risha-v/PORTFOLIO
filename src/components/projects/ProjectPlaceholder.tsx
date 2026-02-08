import React from 'react';
import { Card } from '@components/common/Card';

export const ProjectPlaceholder: React.FC = () => (
  <Card>
    <div className="placeholder">
      <h3>Real client projects coming soon</h3>
      <p>
        I am currently setting up this portfolio and actively looking for my first
        small and medium business clients.
      </p>
      <p>Once projects go live, this section will show:</p>
      <ul>
        <li>Before/after screenshots of business websites</li>
        <li>Short explanations of the business goals</li>
        <li>Tech stack used and measurable outcomes where possible</li>
      </ul>
      <p className="placeholder__note">
        There are no fake projects here—everything will be based on real client work
        as soon as it exists.
      </p>
    </div>
  </Card>
);

