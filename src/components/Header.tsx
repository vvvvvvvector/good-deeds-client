import { useRouter } from 'next/router';

import { signOut } from 'next-auth/react';

import toast from 'react-hot-toast';

const Header = () => {
  const router = useRouter();

  return (
    <div className='flex justify-center fixed top-0 p-4 bg-white w-full shadow-sm'>
      <header className='flex justify-between items-center max-w-[750px] w-full'>
        <div>
          <ul className='flex gap-10'>
            <li
              onClick={() => router.push('/me')}
              className='cursor-pointer hover:underline'
            >
              My good things
            </li>
            <li
              onClick={() => router.push('/me/friends')}
              className='cursor-pointer hover:underline'
            >
              My Friends
            </li>
            <li
              onClick={() => router.push('/me/profile')}
              className='cursor-pointer hover:underline'
            >
              My profile
            </li>
          </ul>
        </div>
        <button
          onClick={async () => {
            const result = window.confirm('Are you sure you want to sign out?');

            if (result) {
              await signOut({
                redirect: false,
              });

              router.push('/');

              toast.success('Signed out successfully!');
            }
          }}
        >
          Sign out
        </button>
      </header>
    </div>
  );
};

export default Header;
