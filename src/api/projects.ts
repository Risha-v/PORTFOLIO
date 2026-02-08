import type { Project } from '@app-types/project';

// Static, honest placeholder data.
// This is structured to be replaced later with a real API call (e.g. CMS).
export async function fetchProjects(): Promise<Project[]> {
  return [
    {
      id: 'placeholder-1',
      title: 'Upcoming small business website',
      summary:
        'This section will showcase a real small business website once a client project is completed.',
      status: 'upcoming',
      industryHint:
        'Local or service-based business (e.g., salon, café, consultancy)',
      techStackHint: [
        'MERN stack (MongoDB, Express.js, React, Node.js)',
        'TypeScript',
        'REST APIs',
        'Basic authentication patterns',
        'Data cleaning and preparation',
        'Spreadsheet-based data sources',
        'Dashboard-oriented data visualization'
      ],
      imageAlt:
        'Placeholder illustration representing a modern MERN-based business website with data-driven features.'
    }
  ];
}