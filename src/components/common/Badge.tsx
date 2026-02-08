import React from 'react';

interface BadgeProps {
  label: string;
  tone?: 'neutral' | 'success' | 'warning';
}

export const Badge: React.FC<BadgeProps> = ({ label, tone = 'neutral' }) => (
  <span className={`badge badge--${tone}`}>{label}</span>
);

