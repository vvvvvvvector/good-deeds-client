import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';

import * as Api from '@/pages/api';

import { authOptions } from '@/pages/api/auth/[...nextauth]';

import MeLayout from '@/layouts/MeLayout';
import { useState } from 'react';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/refused',
        permanent: false,
      },
    };
  }

  try {
    const user = await Api.users.getMyEmailAndUsername(session.user.token);

    return {
      props: {
        user,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      props: {
        user: null,
      },
    };
  }
};

export default function Profile({
  user,
}: {
  user: {
    email: string;
    username: string;
  };
}) {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');

  return (
    <MeLayout>
      <h1 className='text-lg text-center'>{`Hello ${user.username}!`}</h1>
      <div className='flex flex-col gap-2'>
        <label htmlFor=''>Username</label>
        <input
          id='username'
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='rounded border border-zinc-400 p-3 bg-none'
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          type='text'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='rounded border border-zinc-400 p-3 bg-none'
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor='password'>Password</label>
        <input
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type='password'
          placeholder='New password here...'
          className='rounded border border-zinc-400 p-3 bg-none'
        />
      </div>
      <div className='flex justify-center'>
        <button className='w-[50%] rounded text-white transition-[background-color] disabled:bg-gray-200 font-medium bg-teal-500 hover:bg-teal-600 p-3'>
          Save
        </button>
      </div>
    </MeLayout>
  );
}
