import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';

import * as Api from '@/pages/api';

import { authOptions } from '@/pages/api/auth/[...nextauth]';

import Me from '@/layouts/Me/Me';

import { IThing } from '@/types/shared';

import Things from '@/components/Things/Things';
import AddNewThing from '@/components/AddNewThing/AddNewThing';

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
    const things = await Api.things.getAllUserThings(session.user.token);

    things.sort((a, b) => {
      return a.id - b.id;
    });

    return {
      props: {
        token: session.user.token,
        things,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      props: {
        token: '',
        things: [],
      },
    };
  }
};

export default function Home({
  things,
  token,
}: {
  token: string;
  things: IThing[];
}) {
  return (
    <Me>
      <AddNewThing token={token} />
      <Things things={things} token={token} />
    </Me>
  );
}
