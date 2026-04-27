import { makeStyles, mergeClasses, tokens } from '@fluentui/react-components';
import { StarFilled } from '@fluentui/react-icons';

interface StarScoreProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'gold';
}

const useStyles = makeStyles({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    borderRadius: '20px',
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1.5px solid ${tokens.colorNeutralStroke2}`,
    paddingTop: '4px',
    paddingBottom: '4px',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  rootGold: {
    border: `1.5px solid #F0A500`,
    backgroundColor: '#FFF8E1',
  },
  icon: {
    color: '#4A90D9',
    flexShrink: 0,
  },
  iconGold: {
    color: '#F0A500',
  },
  score: {
    fontWeight: '700',
    color: tokens.colorNeutralForeground1,
    lineHeight: '1',
  },
});

const FONT_SIZE: Record<'sm' | 'md' | 'lg', string> = {
  sm: '13px',
  md: '15px',
  lg: '18px',
};

const ICON_SIZE: Record<'sm' | 'md' | 'lg', number> = { sm: 14, md: 16, lg: 20 };

export function StarScore({ score, size = 'md', variant = 'default' }: StarScoreProps) {
  const styles = useStyles();
  const isGold = variant === 'gold';

  return (
    <span className={mergeClasses(styles.root ,isGold ? styles.rootGold : '')}>
      <StarFilled
        className={mergeClasses(styles.icon, isGold ? styles.iconGold : '')}
        style={{ fontSize: ICON_SIZE[size] }}
      />
      <span className={styles.score} style={{ fontSize: FONT_SIZE[size] }}>
        {score}
      </span>
    </span>
  );
}
