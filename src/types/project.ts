export interface Project {
  id: string;
  title: string;
  summary: string;
  status: 'upcoming' | 'in-progress' | 'delivered';
  industryHint?: string;
  techStackHint?: string[];
  liveUrl?: string;
  imageAlt: string;
}

