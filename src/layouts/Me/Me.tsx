import { FC } from 'react';

import Header from '@/components/Header/Header';

import styles from './Me.module.scss';

interface MeProps {
  children: React.ReactNode;
}

const Me: FC<MeProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.page}>{children}</div>
    </div>
  );
};

export default Me;
