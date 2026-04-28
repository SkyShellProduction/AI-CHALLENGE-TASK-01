import { makeStyles, tokens, Select, SearchBox, Label } from '@fluentui/react-components';
import { YEAR_OPTIONS, QUARTER_OPTIONS, CATEGORY_OPTIONS } from '@/shared/config/constants';
import type { FilterState } from '../../model/useLeaderboardFilters';
import type { CategoryKey, QuarterKey, YearKey } from '@/shared/config/constants';

interface FilterControlsProps {
  filters: FilterState;
  onYearChange: (year: YearKey) => void;
  onQuarterChange: (quarter: QuarterKey) => void;
  onCategoryChange: (category: CategoryKey) => void;
  onSearchChange: (search: string) => void;
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '12px',
    flexWrap: 'wrap',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    minWidth: '140px',
  },
  label: {
    fontSize: '12px',
    color: tokens.colorNeutralForeground3,
  },
  searchField: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    flex: 1,
    minWidth: '200px',
  },
  select: {
    width: '100%',
  },
});

export function FilterControls({
  filters,
  onYearChange,
  onQuarterChange,
  onCategoryChange,
  onSearchChange,
}: FilterControlsProps) {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div className={styles.field}>
        <Label className={styles.label}>Year</Label>
        <Select
          appearance='filled-darker'
          size='large'
          className={styles.select}
          value={filters.year}
          onChange={(_, data) => onYearChange(data.value as YearKey)}
        >
          {YEAR_OPTIONS.map((opt) => (
            <option key={opt.key} value={opt.key}>
              {opt.text}
            </option>
          ))}
        </Select>
      </div>

      <div className={styles.field}>
        <Label className={styles.label}>Quarter</Label>
        <Select
          appearance='filled-darker'
          size='large'
          className={styles.select}
          value={filters.quarter}
          onChange={(_, data) => onQuarterChange(data.value as QuarterKey)}
        >
          {QUARTER_OPTIONS.map((opt) => (
            <option key={opt.key} value={opt.key}>
              {opt.text}
            </option>
          ))}
        </Select>
      </div>

      <div className={styles.field}>
        <Label className={styles.label}>Category</Label>
        <Select
          appearance='filled-darker'
          size='large'
          className={styles.select}
          value={filters.category}
          onChange={(_, data) => onCategoryChange(data.value as CategoryKey)}
        >
          {CATEGORY_OPTIONS.map((opt) => (
            <option key={opt.key} value={opt.key}>
              {opt.text}
            </option>
          ))}
        </Select>
      </div>

      <div className={styles.searchField}>
        <Label className={styles.label}>Search employee</Label>
        <SearchBox
          appearance='filled-darker'
          size='large'
          placeholder="Search employee..."
          value={filters.search}
          onChange={(_, data) => onSearchChange(data.value)}
        />
      </div>
    </div>
  );
}
