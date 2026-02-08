export interface Service {
  id: string;
  name: string;
  shortDescription: string;
  bullets: string[];
  startingPriceHint?: string;
  category: 'web' | 'data';
  isAvailable: boolean;
}

