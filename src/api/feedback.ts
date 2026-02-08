import type { Feedback } from '@app-types/feedback';

// Ready for future Google Sheets integration.
// For now, returns an empty list (no fabricated reviews).
export async function fetchFeedback(): Promise<Feedback[]> {
  // FUTURE:
  // - Add a small backend or serverless function that reads from Google Sheets.
  // - Call that backend from here, keeping API keys off the frontend.
  return [];
}