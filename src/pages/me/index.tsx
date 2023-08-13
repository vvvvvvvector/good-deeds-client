import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { useRouter } from 'next/router';

import * as Api from '@/pages/api';

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { signOut } from 'next-auth/react';

import toast from 'react-hot-toast';

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
  const router = useRouter();

  const onClickUpdateThing = async (thingId: number, text: string) => {
    const id = toast.loading('Adding...');
    try {
      await Api.things.updateThingById(thingId, text, token);

      toast.success('Thing was successfully updated.', { id });

      router.replace(router.asPath);
    } catch (error) {
      toast.error('Error while updating thing.', { id });
    }
  };

  const onClickAddNewThing = async (text: string) => {
    const id = toast.loading('Adding...');
    try {
      await Api.things.addNewThing(text, token);

      toast.success('Thing was successfully added.', { id });

      router.replace(router.asPath);
    } catch (error) {
      toast.error('Error while adding thing.', { id });
    }
  };

  const onClickDeleteThing = async (thingId: number) => {
    const id = toast.loading('Deleting...');
    try {
      await Api.things.deleteThingById(thingId, token);

      toast.success('Thing was successfully deleted.', { id });

      router.replace(router.asPath);
    } catch (error) {
      toast.error('Error while deleting thing.', { id });
    }
  };

  return (
    <div className='flex flex-col gap-8'>
      <button onClick={() => onClickAddNewThing('hello world')}>
        add new thing
      </button>
      <ul className='flex flex-col gap-11'>
        {things.map((thing) => (
          <li key={thing.id} onClick={() => onClickDeleteThing(thing.id)}>
            {thing.text}
          </li>
        ))}
      </ul>
      <button
        className='rounded text-white font-medium bg-red-500 p-3'
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
    </div>
  );
}
