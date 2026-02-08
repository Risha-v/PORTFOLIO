import React from 'react';

interface ErrorStateProps {
  message?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message }) => (
  <div className="state state--error" role="alert">
    <p>{message ?? 'Something went wrong. Please try again.'}</p>
  </div>
);

