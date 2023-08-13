import { FC } from 'react';

import { useRouter } from 'next/router';

interface AuthProps {
  children: React.ReactNode;
}

const Auth: FC<AuthProps> = ({ children }) => {
  const router = useRouter();

  return (
    <div className='flex flex-col gap-10 text-lg w-1/4'>
      {children}
      <div className='flex gap-3'>
        <span>
          {router.asPath === '/'
            ? "Don't have an account?"
            : 'Already have an account?'}
        </span>
        <button
          className='text-teal-500 hover:text-teal-600 hover:underline'
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
