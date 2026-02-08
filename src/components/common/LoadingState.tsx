import React from 'react';

export const LoadingState: React.FC = () => (
  <div className="state state--loading" aria-busy="true">
    <span className="state__spinner" aria-hidden="true" />
    <span>Loading…</span>
  </div>
);

