import { makeStyles, tokens } from '@fluentui/react-components';
import { FilterControls } from '@/features/leaderboard-filters';
import type { FilterState } from '@/features/leaderboard-filters';
import type { CategoryKey, QuarterKey, YearKey } from '@/shared/config/constants';

interface FilterBarProps {
  filters: FilterState;
  onYearChange: (year: YearKey) => void;
  onQuarterChange: (quarter: QuarterKey) => void;
  onCategoryChange: (category: CategoryKey) => void;
  onSearchChange: (search: string) => void;
}

const useStyles = makeStyles({
  root: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: '12px',
    padding: '16px 20px',
    boxShadow: tokens.shadow4,
    marginBottom: '0',
  },
});

export function FilterBar(props: FilterBarProps) {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <FilterControls {...props} />
    </div>
  );
}
