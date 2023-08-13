import { FC } from 'react';

import * as Api from '@/pages/api/';

import { useRouter } from 'next/router';

import toast from 'react-hot-toast';

interface ThingsListProps {
  token: string;
  things: {
    id: number;
    text: string;
  }[];
}

const ThingsList: FC<ThingsListProps> = ({ things, token }) => {
  const router = useRouter();

  const onClickEditThing = async (thingId: number, text: string) => {
    const id = toast.loading('Adding...');
    try {
      await Api.things.updateThingById(thingId, text, token);

      toast.success('Thing was successfully updated.', { id });

      router.replace(router.asPath);
    } catch (error) {
      toast.error('Error while updating thing.', { id });
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
    <ul className='flex flex-col gap-11 text-xl'>
      {things.map((thing, index) => (
        <li className='flex justify-between items-center' key={thing.id}>
          {`${index + 1}. ${thing.text}`}
          <span></span>
          <div className='flex gap-5'>
            <button
              onClick={() => {
                const input = window.prompt(
                  'Edit good thing here.',
                  thing.text
                );

                if (input) {
                  onClickEditThing(thing.id, input);
                }
              }}
              className='bg-transparent hover:bg-sky-100 border border-sky-500 rounded px-5 py-1 text-sky-500 font-medium'
            >
              Edit
            </button>
            <button
              className='bg-transparent border hover:bg-sky-100 border-sky-500 rounded px-5 py-1 text-sky-500 font-medium'
              onClick={() => onClickDeleteThing(thing.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ThingsList;
