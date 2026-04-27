import { makeStyles, tokens, Text } from '@fluentui/react-components';
import { Avatar } from '@/shared/ui/Avatar';
import { StarScore } from '@/shared/ui/StarScore';
import type { Contributor } from '@/entities/contributor';

interface PodiumProps {
  top3: Contributor[];
}

const PODIUM_HEIGHTS = { 1: 140, 2: 110, 3: 110 };
const PODIUM_COLORS = {
  1: 'linear-gradient(160deg, #f9d969 0%, #e8a900 100%)',
  2: 'linear-gradient(160deg, #e8e8e8 0%, #b0b0b0 100%)',
  3: 'linear-gradient(160deg, #d4a96a 0%, #8b5e2e 100%)',
};

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: '12px',
    padding: '32px 16px 0',
    '@media (max-width: 480px)': {
      gap: '6px',
      padding: '16px 8px 0',
    },
  },
  slot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: '0 1 220px',
    minWidth: 0,
    '@media (max-width: 480px)': {
      flex: '0 1 100px',
    },
  },
  cardInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
    paddingBottom: '12px',
  },
  name: {
    fontWeight: '700',
    fontSize: '16px',
    textAlign: 'center',
    color: tokens.colorNeutralForeground1,
    '@media (max-width: 480px)': {
      fontSize: '12px',
    },
  },
  titleText: {
    fontSize: '12px',
    color: tokens.colorNeutralForeground3,
    textAlign: 'center',
    lineHeight: '1.3',
    '@media (max-width: 480px)': {
      display: 'none',
    },
  },
  podiumBlock: {
    width: '100%',
    borderRadius: '8px 8px 0 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  podiumNumber: {
    fontSize: '56px',
    fontWeight: '800',
    opacity: '0.25',
    color: '#fff',
    lineHeight: '1',
    userSelect: 'none',
    '@media (max-width: 480px)': {
      fontSize: '32px',
    },
  },
});

interface PodiumSlotProps {
  contributor: Contributor;
  rank: 1 | 2 | 3;
}

function PodiumSlot({ contributor, rank }: PodiumSlotProps) {
  const styles = useStyles();
  const height = PODIUM_HEIGHTS[rank];
  const avatarSize = rank === 1 ? 'lg' : 'md';

  return (
    <div className={styles.slot}>
      <div className={styles.cardInfo}>
        <Avatar src={contributor.avatarUrl} name={contributor.name} size={avatarSize} rank={rank} />
        <Text className={styles.name}>{contributor.name}</Text>
        <Text className={styles.titleText}>
          {contributor.title} ({contributor.department})
        </Text>
        <StarScore
          score={contributor.score}
          size={rank === 1 ? 'md' : 'sm'}
          variant={rank === 1 ? 'gold' : 'default'}
        />
      </div>
      <div className={styles.podiumBlock} style={{ height, background: PODIUM_COLORS[rank] }}>
        <span className={styles.podiumNumber}>{rank}</span>
      </div>
    </div>
  );
}

export function Podium({ top3 }: PodiumProps) {
  const styles = useStyles();

  if (top3.length === 0) return null;

  const first = top3[0];
  const second = top3[1];
  const third = top3[2];

  return (
    <div className={styles.root}>
      {second && <PodiumSlot contributor={second} rank={2} />}
      {first && <PodiumSlot contributor={first} rank={1} />}
      {third && <PodiumSlot contributor={third} rank={3} />}
    </div>
  );
}
