export const YEAR_OPTIONS = [
  { key: 'all', text: 'All Years' },
  { key: '2025', text: '2025' },
  { key: '2024', text: '2024' },
] as const;

export const QUARTER_OPTIONS = [
  { key: 'all', text: 'All Quarters' },
  { key: 'Q1', text: 'Q1' },
  { key: 'Q2', text: 'Q2' },
  { key: 'Q3', text: 'Q3' },
  { key: 'Q4', text: 'Q4' },
] as const;

export const CATEGORY_OPTIONS = [
  { key: 'all', text: 'All Categories' },
  { key: 'education', text: 'Education' },
  { key: 'public_speaking', text: 'Public Speaking' },
  { key: 'university_partners', text: 'University Partners' },
] as const;

export type YearKey = (typeof YEAR_OPTIONS)[number]['key'];
export type QuarterKey = (typeof QUARTER_OPTIONS)[number]['key'];
export type CategoryKey = (typeof CATEGORY_OPTIONS)[number]['key'];
