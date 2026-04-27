import type { Contributor } from './types';

const FIRST_NAMES = [
  'James',
  'Emma',
  'Noah',
  'Olivia',
  'Liam',
  'Ava',
  'William',
  'Sophia',
  'Benjamin',
  'Isabella',
  'Lucas',
  'Mia',
  'Henry',
  'Charlotte',
  'Alexander',
  'Amelia',
  'Mason',
  'Harper',
  'Ethan',
  'Evelyn',
  'Daniel',
  'Abigail',
  'Michael',
  'Emily',
  'Logan',
  'Elizabeth',
  'Jackson',
  'Sofia',
  'Sebastian',
  'Avery',
];

const LAST_NAMES = [
  'Anderson',
  'Thompson',
  'Martinez',
  'Garcia',
  'Robinson',
  'Clark',
  'Rodriguez',
  'Lewis',
  'Lee',
  'Walker',
  'Hall',
  'Allen',
  'Young',
  'Hernandez',
  'King',
  'Wright',
  'Lopez',
  'Hill',
  'Scott',
  'Green',
  'Adams',
  'Baker',
  'Gonzalez',
  'Nelson',
  'Carter',
  'Mitchell',
  'Perez',
  'Roberts',
  'Turner',
  'Phillips',
];

const TITLES = [
  'Senior Software Engineer',
  'Lead QA Engineer',
  'Engineering Manager',
  'Software Engineer',
  'Middle Software Engineer',
  'Tech Lead',
  'Senior QA Engineer',
  'Product Manager',
  'DevOps Engineer',
  'Data Scientist',
  'UX Designer',
  'Scrum Master',
  'Business Analyst',
  'Solution Architect',
  'ML Engineer',
];

const DEPARTMENTS = [
  'Mobile',
  'Backend',
  'Frontend',
  'QA',
  'Game Dev',
  'Machine Learning',
  'DevOps',
  'Data Science',
];

const QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4'] as const;
const CATEGORIES = ['education', 'public_speaking', 'university_partners'] as const;
const YEARS = [2024, 2025] as const;

function pickRound<T>(arr: readonly T[], index: number): T {
  return arr[index % arr.length];
}

function generateScore(index: number): number {
  if (index === 0) return 536;
  if (index === 1) return 328;
  if (index === 2) return 320;
  const base = 280 - index * 2.5;
  const noise = (index * 37) % 40;
  return Math.max(50, Math.round(base + noise));
}

export const MOCK_CONTRIBUTORS: Contributor[] = Array.from({ length: 100 }, (_, i) => {
  const firstName = pickRound(FIRST_NAMES, i * 7 + 3);
  const lastName = pickRound(LAST_NAMES, i * 11 + 5);
  const name = `${firstName} ${lastName}`;

  return {
    id: `contributor-${i + 1}`,
    name,
    title: pickRound(TITLES, i * 3 + 1),
    department: pickRound(DEPARTMENTS, i * 5 + 2),
    score: generateScore(i),
    presentations: Math.max(1, 17 - Math.floor(i / 6)),
    year: pickRound(YEARS, i),
    quarter: pickRound(QUARTERS, i),
    category: pickRound(CATEGORIES, i),
    avatarUrl: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
  };
});
