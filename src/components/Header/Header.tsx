import { useRouter } from 'next/router';

import { signOut } from 'next-auth/react';

import toast from 'react-hot-toast';

import styles from './Header.module.scss';

const Header = () => {
  const router = useRouter();

  const onClickSignedOut = async () => {
    const result = window.confirm('Are you sure you want to sign out?');

    if (result) {
      await signOut({
        redirect: false,
      });

      router.push('/');

      toast.success('Signed out successfully!');
    }
  };

  return (
    <div className={styles.header}>
      <header>
        <div>
          <ul>
            <li onClick={() => router.push('/me')}>My good things</li>
            <li onClick={() => router.push('/me/friends')}>
              My friends things
            </li>
            <li onClick={() => router.push('/me/profile')}>My profile</li>
          </ul>
        </div>
        <button
          className='custom-button outlined red'
          onClick={onClickSignedOut}
        >
          Sign out
        </button>
      </header>
    </div>
  );
};

export default Header;
