import { FC } from 'react';

import Header from '@/components/Header';

interface MeProps {
  children: React.ReactNode;
}

const MeLayout: FC<MeProps> = ({ children }) => {
  return (
    <>
      <Header />
      <div className='flex flex-col gap-8 box-border px-4 max-w-[750px] w-full'>
        {children}
      </div>
    </>
  );
};

export default MeLayout;
