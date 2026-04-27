import { makeStyles, tokens, Text } from '@fluentui/react-components';
import { useLeaderboardFilters } from '@/features/leaderboard-filters';
import { FilterBar } from '@/widgets/filter-bar';
import { Podium } from '@/widgets/podium';
import { RankingList } from '@/widgets/ranking-list';
import { Container } from '@/shared/ui/Container';

const useStyles = makeStyles({
  page: {
    minHeight: '100vh',
    backgroundColor: tokens.colorNeutralBackground2,
    paddingTop: '32px',
  },
  header: {
    marginBottom: '24px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: tokens.colorNeutralForeground1,
    display: 'block',
    marginBottom: '4px',
    '@media (min-width: 768px)': {
      fontSize: '34px',
    },
  },
  subtitle: {
    fontSize: '14px',
    color: tokens.colorNeutralForeground3,
    display: 'block',
  },
  filterSection: {
    marginBottom: '8px',
  },
  podiumSection: {
    marginBottom: '8px',
  },
});

export function LeaderboardPage() {
  const styles = useStyles();
  const { filters, filtered, setYear, setQuarter, setCategory, setSearch } =
    useLeaderboardFilters();

  const top3 = filtered.slice(0, 3);

  return (
    <div className={styles.page}>
      <Container>
        <div className={styles.header}>
          <Text as="h1" className={styles.title}>
            Leaderboard
          </Text>
          <Text as="p" className={styles.subtitle}>
            Top performers based on contributions and activity
          </Text>
        </div>

        <div className={styles.filterSection}>
          <FilterBar
            filters={filters}
            onYearChange={setYear}
            onQuarterChange={setQuarter}
            onCategoryChange={setCategory}
            onSearchChange={setSearch}
          />
        </div>

        <div className={styles.podiumSection}>
          <Podium top3={top3} />
        </div>

        <RankingList contributors={filtered} />
      </Container>
    </div>
  );
}
