import type { Contributor, Activity, CategoryValue } from './types';

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
  'Campbell',
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

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;

const MENTEE_NAMES = [
  'James Carter', 'Emma Robinson', 'Noah Mitchell', 'Olivia Bennett',
  'Liam Foster', 'Ava Richardson', 'William Hayes', 'Sophia Coleman',
  'Benjamin Reed', 'Isabella Ward', 'Lucas Griffin', 'Charlotte Morgan',
];

const TOPICS = [
  'React Best Practices', 'TypeScript Advanced', 'System Design',
  'CI/CD Pipelines', 'Clean Architecture', 'API Design',
  'Database Optimization', 'DevOps Fundamentals', 'Testing Strategies',
  'Cloud Architecture', 'Microservices', 'Performance Tuning',
];

const EVENTS = [
  'DevFest Tashkent', 'TechTalks 2025', 'WebConf Europe',
  'JS Nation', 'Frontend Masters Summit', 'Cloud Summit 2025',
  'AI/ML Forum', 'DeveloperWeek', 'NodeConf', 'VueConf',
];

const UNIVERSITIES = [
  'Najot Talim', 'INHA University', 'Westminster Tashkent',
  'TUIT', 'Turin Polytechnic', 'WIUT',
  'Management Development Institute', 'New Uzbekistan University',
];

type ActivityTemplate = (i: number, j: number) => string;

const ACTIVITY_NAME: Record<CategoryValue, ActivityTemplate[]> = {
  education: [
    (i, j) => `[REG] Mentoring of ${MENTEE_NAMES[(i * 3 + j) % MENTEE_NAMES.length]}`,
    (i, j) => `[REG] Workshop: ${TOPICS[(i * 2 + j) % TOPICS.length]}`,
    (i, j) => `[REG] Code review: ${TOPICS[(i + j * 3) % TOPICS.length]}`,
    (i, j) => `[REG] Team training on ${TOPICS[(i * 3 + j) % TOPICS.length]}`,
  ],
  public_speaking: [
    (i, j) => `[SPK] Talk at ${EVENTS[(i + j) % EVENTS.length]}`,
    (i, j) => `[SPK] Webinar: ${TOPICS[(i + j * 2) % TOPICS.length]}`,
    (i, j) => `[SPK] Podcast: ${TOPICS[(i * 2 + j) % TOPICS.length]}`,
    (i, j) => `[SPK] Panel at ${EVENTS[(i * 3 + j) % EVENTS.length]}`,
  ],
  university_partners: [
    (i, j) => `[UNI] Lecture for guests from ${UNIVERSITIES[(i + j) % UNIVERSITIES.length]}`,
    (i, j) => `[UNI] Workshop at ${UNIVERSITIES[(i + j * 2) % UNIVERSITIES.length]}`,
    (i, j) => `[UNI] Guest session for ${UNIVERSITIES[(i * 2 + j) % UNIVERSITIES.length]}`,
    (i, j) => `[UNI] Mentoring: ${UNIVERSITIES[(i * 3 + j) % UNIVERSITIES.length]} cohort`,
  ],
};

function generateDate(i: number, j: number): string {
  const year = 2024 + ((i * 3 + j) % 2);
  const monthIdx = (i * 3 + j * 7) % 12;
  const day = 1 + ((i * 11 + j * 5) % 28);
  return `${String(day).padStart(2, '0')}-${MONTHS[monthIdx]}-${year}`;
}

function generateActivities(i: number, score: number, cats: CategoryValue[]): Activity[] {
  const n = 2 + (i % 3);
  const weights = Array.from({ length: n }, (_, j) => 1 + ((i * 7 + j * 13) % 5));
  const totalW = weights.reduce((a, b) => a + b, 0);

  const points: number[] = Array.from({ length: n - 1 }, (_, j) =>
    Math.max(5, Math.round((weights[j] / totalW) * score)),
  );
  points.push(Math.max(5, score - points.reduce((a, b) => a + b, 0)));

  return Array.from({ length: n }, (_, j) => {
    const cat = cats[j % cats.length];
    const templates = ACTIVITY_NAME[cat];
    return {
      name: templates[(i * 5 + j * 3) % templates.length](i, j),
      category: cat,
      date: generateDate(i, j),
      points: points[j],
    };
  });
}

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

  const primaryIdx = i % CATEGORIES.length;
  const extra1 = CATEGORIES[(primaryIdx + 1) % CATEGORIES.length];
  const extra2 = CATEGORIES[(primaryIdx + 2) % CATEGORIES.length];
  const categories =
    i % 20 === 5
      ? [CATEGORIES[primaryIdx], extra1, extra2]
      : i % 10 === 0
        ? [CATEGORIES[primaryIdx], extra1]
        : [CATEGORIES[primaryIdx]];

  const score = generateScore(i);

  return {
    id: `contributor-${i + 1}`,
    name,
    title: pickRound(TITLES, i * 3 + 1),
    department: pickRound(DEPARTMENTS, i * 5 + 2),
    score,
    presentations: Math.max(1, 17 - Math.floor(i / 6)),
    year: pickRound(YEARS, i),
    quarter: pickRound(QUARTERS, i),
    categories,
    avatarUrl: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
    activities: generateActivities(i, score, categories),
  };
});
