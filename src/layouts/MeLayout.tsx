import { FC } from 'react';

import Header from '@/components/Header';

interface MeProps {
  children: React.ReactNode;
}

const MeLayout: FC<MeProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default MeLayout;
