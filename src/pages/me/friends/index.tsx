import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';

import * as Api from '@/pages/api';

import { authOptions } from '@/pages/api/auth/[...nextauth]';

import Me from '@/layouts/Me/Me';
import AddNewFriend from '@/components/AddNewFriend/AddNewFriend';
import Friendships from '@/components/Friendships/Friendships';
import { IFriendship } from '@/types/shared';

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
  friendships: IFriendship[];
}) {
  return (
    <Me>
      <AddNewFriend token={token} />
      <Friendships friendships={friendships} />
    </Me>
  );
}
