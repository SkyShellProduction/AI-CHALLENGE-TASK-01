import { makeStyles, tokens, Text } from '@fluentui/react-components';
import { ChevronDownRegular, ChevronUpRegular, DesktopRegular } from '@fluentui/react-icons';
import { useState } from 'react';
import { Avatar } from '@/shared/ui/Avatar';
import { StarScore } from '@/shared/ui/StarScore';
import type { Contributor } from '../../model/types';

interface ContributorRowProps {
  contributor: Contributor;
  rank: number;
}

const useStyles = makeStyles({
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 16px',
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: '12px',
    boxShadow: tokens.shadow2,
    cursor: 'pointer',
    transition: 'box-shadow 0.15s ease',
    ':hover': {
      boxShadow: tokens.shadow4,
    },
  },
  rank: {
    minWidth: '28px',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: '15px',
    color: tokens.colorNeutralForeground3,
    flexShrink: 0,
  },
  info: {
    flex: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  name: {
    fontWeight: '600',
    fontSize: '15px',
    color: tokens.colorNeutralForeground1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  title: {
    fontSize: '13px',
    color: tokens.colorNeutralForeground3,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexShrink: 0,
    marginLeft: 'auto',
  },
  presentations: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: tokens.colorNeutralForeground3,
    fontSize: '14px',
    '@media (max-width: 480px)': {
      display: 'none',
    },
  },
  chevron: {
    color: tokens.colorNeutralForeground3,
    fontSize: '18px',
  },
  expanded: {
    padding: '12px 16px 16px',
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: '0 0 12px 12px',
    marginTop: '-4px',
    display: 'flex',
    gap: '24px',
    flexWrap: 'wrap',
  },
  expandedItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  expandedLabel: {
    fontSize: '12px',
    color: tokens.colorNeutralForeground3,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  expandedValue: {
    fontSize: '14px',
    fontWeight: '600',
    color: tokens.colorNeutralForeground1,
  },
});

export function ContributorRow({ contributor, rank }: ContributorRowProps) {
  const styles = useStyles();
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <div
        className={styles.row}
        onClick={() => setExpanded((v) => !v)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setExpanded((v) => !v)}
      >
        <span className={styles.rank}>{rank}</span>
        <Avatar src={contributor.avatarUrl} name={contributor.name} size="sm" />
        <div className={styles.info}>
          <Text className={styles.name}>{contributor.name}</Text>
          <Text className={styles.title}>
            {contributor.title} ({contributor.department})
          </Text>
        </div>
        <div className={styles.rightSection}>
          <span className={styles.presentations}>
            <DesktopRegular fontSize={16} />
            {contributor.presentations}
          </span>
          <StarScore score={contributor.score} size="sm" />
          {expanded ? (
            <ChevronUpRegular className={styles.chevron} />
          ) : (
            <ChevronDownRegular className={styles.chevron} />
          )}
        </div>
      </div>
      {expanded && (
        <div className={styles.expanded}>
          <div className={styles.expandedItem}>
            <span className={styles.expandedLabel}>Year</span>
            <span className={styles.expandedValue}>{contributor.year}</span>
          </div>
          <div className={styles.expandedItem}>
            <span className={styles.expandedLabel}>Quarter</span>
            <span className={styles.expandedValue}>{contributor.quarter}</span>
          </div>
          <div className={styles.expandedItem}>
            <span className={styles.expandedLabel}>Category</span>
            <span className={styles.expandedValue}>
              {contributor.category.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
            </span>
          </div>
          <div className={styles.expandedItem}>
            <span className={styles.expandedLabel}>Presentations</span>
            <span className={styles.expandedValue}>{contributor.presentations}</span>
          </div>
        </div>
      )}
    </div>
  );
}
