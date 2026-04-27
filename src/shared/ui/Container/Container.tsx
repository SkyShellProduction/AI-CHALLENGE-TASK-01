import { makeStyles } from '@fluentui/react-components';
import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

const useStyles = makeStyles({
  root: {
    maxWidth: '1500px',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '16px',
    paddingRight: '16px',
    width: '100%',
    boxSizing: 'border-box',
    '@media (min-width: 768px)': {
      paddingLeft: '24px',
      paddingRight: '24px',
    },
    '@media (min-width: 1024px)': {
      paddingLeft: '32px',
      paddingRight: '32px',
    },
  },
});

export function Container({ children }: ContainerProps) {
  const styles = useStyles();
  return <div className={styles.root}>{children}</div>;
}
