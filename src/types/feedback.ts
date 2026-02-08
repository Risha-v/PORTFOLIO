export interface Feedback {
  id: string;
  clientInitials?: string;
  projectType: 'web' | 'data';
  rating: number;
  headline: string;
  comment: string;
  createdAtIso: string;
  locationHint?: string;
  externalRowId?: string;
}

