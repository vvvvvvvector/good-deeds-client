import { FC } from 'react';

import { useRouter } from 'next/router';

import styles from './Auth.module.scss';

interface AuthProps {
  children: React.ReactNode;
}

const Auth: FC<AuthProps> = ({ children }) => {
  const router = useRouter();

  return (
    <div className={styles.layout}>
      {children}
      <div>
        <span>
          {router.asPath === '/'
            ? "Don't have an account?"
            : 'Already have an account?'}
        </span>
        <button
          onClick={
            router.asPath === '/'
              ? () => router.push('/signup')
              : () => router.push('/')
          }
        >
          {router.asPath === '/' ? 'Sign up' : 'Sign in'}
        </button>
      </div>
    </div>
  );
};

export default Auth;
