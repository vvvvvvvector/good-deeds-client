import { useState } from 'react';

import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { useRouter } from 'next/router';

import * as Api from '@/pages/api';

import { authOptions } from '@/pages/api/auth/[...nextauth]';

import MeLayout from '@/layouts/MeLayout';

import { toast } from 'react-hot-toast';

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
    const friendships = await Api.friendships.getMyFriendsGoodThings(
      session.user.token
    );

    return {
      props: {
        token: session.user.token,
        friendships,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      props: {
        token: session.user.token,
        friendships: [],
      },
    };
  }
};

export default function Friends({
  token,
  friendships,
}: {
  token: string;
  friendships: {
    id: number;
    addressee: {
      username: string;
      things: {
        id: number;
        text: string;
      }[];
    };
  }[];
}) {
  const router = useRouter();

  const [username, setUsername] = useState('');

  const onClickAddFriend = async () => {
    const id = toast.loading('Adding...');

    try {
      await Api.friendships.addNewFriendByUsername(username, token);

      toast.success('New friend was successfully added.', { id });

      router.replace(router.asPath);
    } catch (error: any) {
      console.log(error);

      toast.error('Error occured while adding new friend.', { id });
    }
  };

  return (
    <MeLayout>
      <div className='flex gap-4 justify-between'>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Friend You want to add username here...'
          className='w-[80%] rounded border border-zinc-400 p-3 bg-none'
        />
        <button
          onClick={onClickAddFriend}
          disabled={username === ''}
          className='flex-1 disabled:disabled:bg-gray-200 rounded text-white font-medium transition-[background-color] bg-sky-500 hover:bg-sky-600 p-2'
        >
          Add friend
        </button>
      </div>
      <ul className='flex flex-col text-lg gap-9'>
        {friendships.length > 0 ? (
          friendships.map((friendship) => (
            <div key={friendship.id}>
              <li className='uppercase underline decoration-wavy text-center mb-5'>
                {friendship.addressee.username}
              </li>
              <ul className='flex flex-col' key={friendship.id}>
                {friendship.addressee.things.map((thing, index) => (
                  <li key={thing.id}>{`${index + 1}. ${thing.text}`}</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className='text-lg text-center'>You don't have any friends yet.</p>
        )}
      </ul>
    </MeLayout>
  );
}
