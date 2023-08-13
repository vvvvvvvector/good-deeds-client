import { useRouter } from 'next/router';

import { signOut, useSession } from 'next-auth/react';

import toast from 'react-hot-toast';

export default function Me() {
  const router = useRouter();

  const session = useSession();

  console.log(session);

  const onClickSignOut = async () => {
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
    <div>
      <h1>hello world!</h1>
      <button onClick={onClickSignOut}>Sign out</button>
    </div>
  );
}
