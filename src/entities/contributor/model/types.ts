import type { CategoryKey, QuarterKey } from '@/shared/config/constants';

export type CategoryValue = Exclude<CategoryKey, 'all'>;

export interface Activity {
  name: string;
  category: CategoryValue;
  date: string;
  points: number;
}

export interface Contributor {
  id: string;
  name: string;
  title: string;
  department: string;
  score: number;
  presentations: number;
  year: 2024 | 2025;
  quarter: Exclude<QuarterKey, 'all'>;
  categories: CategoryValue[];
  avatarUrl: string;
  activities: Activity[];
}
