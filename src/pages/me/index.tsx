import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';

import * as Api from '@/pages/api';

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import MeLayout from '@/layouts/MeLayout';
import ThingsList from '@/components/ThingsList';
import AddNewThing from '@/components/AddNewThing';

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
        things: [],
      },
    };
  }
};

export default function Me({
  things,
  token,
}: {
  token: string;
  things: {
    id: number;
    text: string;
  }[];
}) {
  return (
    <MeLayout>
      <div className='flex flex-col gap-8 w-[750px]'>
        <AddNewThing token={token} />
        <ThingsList things={things} token={token} />
      </div>
    </MeLayout>
  );
}
