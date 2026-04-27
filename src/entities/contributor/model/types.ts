import type { CategoryKey, QuarterKey } from '@/shared/config/constants';

export interface Contributor {
  id: string;
  name: string;
  title: string;
  department: string;
  score: number;
  presentations: number;
  year: 2024 | 2025;
  quarter: Exclude<QuarterKey, 'all'>;
  category: Exclude<CategoryKey, 'all'>;
  avatarUrl: string;
}
