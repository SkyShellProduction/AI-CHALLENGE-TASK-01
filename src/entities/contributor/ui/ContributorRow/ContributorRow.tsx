import { makeStyles, mergeClasses, tokens, Text, Tooltip } from '@fluentui/react-components';
import {
  ChevronDownRegular,
  ChevronUpRegular,
} from '@fluentui/react-icons';
import type { FluentIcon } from '@fluentui/react-icons';
import { Avatar } from '@/shared/ui/Avatar';
import { StarScore } from '@/shared/ui/StarScore';
import type { Contributor, CategoryValue } from '../../model/types';
import { Icon } from '@fluentui/react/lib/Icon';

const PresentationIcon = () => <Icon style={ { fontSize:20 } } iconName="Presentation" />;
const EducationIcon = () => <Icon style={ { fontSize:20 } } iconName="Education" />;
const UniversityPartnershipIcon = () => <Icon style={ { fontSize:20 } } iconName="Emoji2" />;

const CATEGORY_ICON: Record<CategoryValue, FluentIcon> = {
  education: EducationIcon,
  public_speaking: PresentationIcon,
  university_partners: UniversityPartnershipIcon,
};

const CATEGORY_LABEL: Record<CategoryValue, string> = {
  education: 'Education',
  public_speaking: 'Public Speaking',
  university_partners: 'University Partners',
};

interface ContributorRowProps {
  contributor: Contributor;
  rank: number;
  isExpanded: boolean;
  onToggle: () => void;
}

const useStyles = makeStyles({
  block: {
    ":hover": {
        boxShadow: `0 0 2px ${tokens.colorPaletteBlueBorderActive}`,
        borderRadius: '12px',
      }
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 16px',
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: '12px',
    boxShadow: tokens.shadow2,
   
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
  expandButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    padding: '0',
    borderRadius: '50px',
    borderTopWidth: '1.5px',
    borderRightWidth: '1.5px',
    borderBottomWidth: '1.5px',
    borderLeftWidth: '1.5px',
    borderTopStyle: 'solid',
    borderRightStyle: 'solid',
    borderBottomStyle: 'solid',
    borderLeftStyle: 'solid',
    borderTopColor: tokens.colorNeutralStroke1,
    borderRightColor: tokens.colorNeutralStroke1,
    borderBottomColor: tokens.colorNeutralStroke1,
    borderLeftColor: tokens.colorNeutralStroke1,
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorBrandForeground1,
    cursor: 'pointer',
    flexShrink: 0,
    ':hover': {
      backgroundColor: tokens.colorBrandBackground2,
      borderTopColor: tokens.colorBrandStroke1,
      borderRightColor: tokens.colorBrandStroke1,
      borderBottomColor: tokens.colorBrandStroke1,
      borderLeftColor: tokens.colorBrandStroke1,
    },
  },
  categoryBadges: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    '@media (max-width: 480px)': {
      display: 'none',
    },
  },
  categoryBadge: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px',
    color: tokens.colorBrandForeground1,
  },
  categoryBadgeCount: {
    fontSize: '11px',
    fontWeight: '600',
    lineHeight: '1',
    color: tokens.colorBrandForeground1,
  },
  expanded: {
    padding: '12px 20px 16px',
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: '0 0 12px 12px',
    marginTop: '-4px',
  },
  recentActivityTitle: {
    display: 'block',
    fontSize: '11px',
    fontWeight: '700',
    color: tokens.colorNeutralForeground3,
    letterSpacing: '0.8px',
    textTransform: 'uppercase',
    paddingBottom: '10px',
  },
  activityGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 160px 130px 70px',
    '@media (max-width: 640px)': {
      gridTemplateColumns: '1fr 110px 90px',
    },
  },
  activityHeaderCell: {
    fontSize: '11px',
    fontWeight: '700',
    color: tokens.colorNeutralForeground3,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    padding: '0 8px 8px 0',
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  activityRow: {
    display: 'contents',
  },
  activityCell: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 8px 10px 0',
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    fontSize: '13px',
    color: tokens.colorNeutralForeground1,
  },
  activityPointsCell: {
    justifyContent: 'flex-end',
    color: tokens.colorBrandForeground1,
    fontWeight: '700',
    fontSize: '14px',
  },
  activityCategoryBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '2px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '500',
    whiteSpace: 'nowrap',
  },
  categoryEdu: { backgroundColor: '#FFF3E0', color: '#E65100' },
  categorySPK: { backgroundColor: '#F3E5F5', color: '#7B1FA2' },
  categoryUNI: { backgroundColor: '#E3F2FD', color: '#1565C0' },
});

export function ContributorRow({ contributor, rank, isExpanded, onToggle }: ContributorRowProps) {
  const styles = useStyles();

  return (
    <div className={styles.block}>
      <div className={styles.row}>
        <span className={styles.rank}>{rank}</span>
        <Avatar src={contributor.avatarUrl} name={contributor.name} size="sm" />
        <div className={styles.info}>
          <Text className={styles.name}>{contributor.name}</Text>
          <Text className={styles.title}>
            {contributor.title} ({contributor.department})
          </Text>
        </div>
        <div className={styles.rightSection}>
          <span className={styles.categoryBadges}>
            {contributor.categories.map((cat) => {
              const Icon = CATEGORY_ICON[cat];
              const count = Math.round(contributor.presentations / contributor.categories.length);
              return (
                <Tooltip key={cat} content={CATEGORY_LABEL[cat]} relationship="description">
                  <span className={styles.categoryBadge}>
                    <Icon fontSize={18} />
                    <span className={styles.categoryBadgeCount}>{count}</span>
                  </span>
                </Tooltip>
              );
            })}
          </span>
          <StarScore score={contributor.score} size="sm" />
          <button
            type="button"
            className={styles.expandButton}
            onClick={onToggle}
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? <ChevronUpRegular fontSize={16} /> : <ChevronDownRegular fontSize={16} />}
          </button>
        </div>
      </div>
      {isExpanded && (
        <div className={styles.expanded}>
          <span className={styles.recentActivityTitle}>Recent Activity</span>
          <div className={styles.activityGrid}>
            <div className={styles.activityHeaderCell}>Activity</div>
            <div className={styles.activityHeaderCell}>Category</div>
            <div className={styles.activityHeaderCell}>Date</div>
            <div className={mergeClasses(styles.activityHeaderCell, styles.activityPointsCell)}>
              Points
            </div>
            {contributor.activities.flatMap((activity, idx) => {
              const badgeVariant =
                activity.category === 'education'
                  ? styles.categoryEdu
                  : activity.category === 'public_speaking'
                    ? styles.categorySPK
                    : styles.categoryUNI;
              return [
                <div key={`n${idx}`} className={styles.activityCell}>
                  {activity.name}
                </div>,
                <div key={`c${idx}`} className={styles.activityCell}>
                  <span className={mergeClasses(styles.activityCategoryBadge, badgeVariant)}>
                    {CATEGORY_LABEL[activity.category]}
                  </span>
                </div>,
                <div key={`d${idx}`} className={styles.activityCell}>
                  {activity.date}
                </div>,
                <div
                  key={`p${idx}`}
                  className={mergeClasses(styles.activityCell, styles.activityPointsCell)}
                >
                  +{activity.points}
                </div>,
              ];
            })}
          </div>
        </div>
      )}
    </div>
  );
}
