import { makeStyles, tokens } from '@fluentui/react-components';

interface AvatarProps {
  src: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  rank?: number;
}

const SIZE_MAP = { sm: 40, md: 52, lg: 72 };

const RANK_COLORS: Record<number, string> = {
  1: '#F0A500',
  2: '#9E9E9E',
  3: '#7D4E00',
};

const useStyles = makeStyles({
  wrapper: {
    position: 'relative',
    display: 'inline-flex',
    flexShrink: 0,
  },
  img: {
    borderRadius: '50%',
    objectFit: 'cover',
    border: `2px solid ${tokens.colorNeutralBackground1}`,
    display: 'block',
  },
  badge: {
    position: 'absolute',
    bottom: '-2px',
    right: '-2px',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    fontWeight: '700',
    color: '#fff',
    lineHeight: '1',
    border: `2px solid ${tokens.colorNeutralBackground1}`,
  },
});

export function Avatar({ src, name, size = 'md', rank }: AvatarProps) {
  const styles = useStyles();
  const px = SIZE_MAP[size];
  const badgeColor = rank !== undefined ? (RANK_COLORS[rank] ?? tokens.colorBrandBackground) : '';

  return (
    <div className={styles.wrapper}>
      <img
        src={src}
        alt={name}
        className={styles.img}
        style={{ width: px, height: px }}
        onError={(e) => {
          const target = e.currentTarget;
          target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=${px}&background=random`;
        }}
      />
      {rank !== undefined && (
        <span className={styles.badge} style={{ backgroundColor: badgeColor }}>
          {rank}
        </span>
      )}
    </div>
  );
}
