import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';

import * as Api from '@/pages/api';

import { authOptions } from '@/pages/api/auth/[...nextauth]';

import MeLayout from '@/layouts/MeLayout';

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
  return (
    <MeLayout>
      <h1 className='text-center'>{`Hello ${user.username}!`}</h1>
    </MeLayout>
  );
}
