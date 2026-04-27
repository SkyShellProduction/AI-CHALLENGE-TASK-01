import { makeStyles, tokens, Text } from '@fluentui/react-components';
import { ContributorRow } from '@/entities/contributor';
import type { Contributor } from '@/entities/contributor';

interface RankingListProps {
  contributors: Contributor[];
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    paddingTop: '16px',
    paddingBottom: '32px',
  },
  empty: {
    textAlign: 'center',
    padding: '48px 16px',
    color: tokens.colorNeutralForeground3,
    fontSize: '16px',
  },
});

export function RankingList({ contributors }: RankingListProps) {
  const styles = useStyles();

  if (contributors.length === 0) {
    return (
      <div className={styles.root}>
        <Text className={styles.empty}>No contributors match the selected filters.</Text>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      {contributors.map((contributor, index) => (
        <ContributorRow key={contributor.id} contributor={contributor} rank={index + 1} />
      ))}
    </div>
  );
}
