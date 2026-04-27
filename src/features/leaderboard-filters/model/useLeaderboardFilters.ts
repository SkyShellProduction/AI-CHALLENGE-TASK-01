import { useState, useMemo } from 'react';
import { MOCK_CONTRIBUTORS } from '@/entities/contributor';
import type { CategoryKey, QuarterKey, YearKey } from '@/shared/config/constants';

export interface FilterState {
  year: YearKey;
  quarter: QuarterKey;
  category: CategoryKey;
  search: string;
}

export function useLeaderboardFilters() {
  const [filters, setFilters] = useState<FilterState>({
    year: 'all',
    quarter: 'all',
    category: 'all',
    search: '',
  });

  const filtered = useMemo(() => {
    const q = filters.search.trim().toLowerCase();

    return MOCK_CONTRIBUTORS.filter((c) => {
      if (filters.year !== 'all' && c.year !== Number(filters.year)) return false;
      if (filters.quarter !== 'all' && c.quarter !== filters.quarter) return false;
      if (filters.category !== 'all' && !c.categories.includes(filters.category as Exclude<typeof filters.category, 'all'>)) return false;
      if (q && !c.name.toLowerCase().includes(q)) return false;
      return true;
    }).sort((a, b) => b.score - a.score);
  }, [filters]);

  function setYear(year: YearKey) {
    setFilters((prev) => ({ ...prev, year }));
  }

  function setQuarter(quarter: QuarterKey) {
    setFilters((prev) => ({ ...prev, quarter }));
  }

  function setCategory(category: CategoryKey) {
    setFilters((prev) => ({ ...prev, category }));
  }

  function setSearch(search: string) {
    setFilters((prev) => ({ ...prev, search }));
  }

  return { filters, filtered, setYear, setQuarter, setCategory, setSearch };
}
