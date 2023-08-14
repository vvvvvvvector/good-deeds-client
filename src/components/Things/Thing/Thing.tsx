import { FC } from 'react';

import * as Api from '@/pages/api/';

import { useRouter } from 'next/router';

import toast from 'react-hot-toast';

import styles from './Thing.module.scss';

interface ThingProps {
  index: number;
  token: string;
  thing: {
    id: number;
    text: string;
  };
}

const Thing: FC<ThingProps> = ({ token, thing, index }) => {
  const router = useRouter();

  const onClickEditThing = async (thingId: number, text: string) => {
    const input = window.prompt('Edit good thing here.', text);

    if (input) {
      const id = toast.loading('Adding...');

      try {
        await Api.things.updateThingById(thingId, input, token);

        toast.success('Thing was successfully updated.', { id });

        router.replace(router.asPath);
      } catch (error) {
        toast.error('Error while updating thing.', { id });
      }
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
    <li className={styles.thing}>
      <span>{`${index + 1}. ${thing.text}`}</span>
      <div>
        <button
          className='custom-button outlined green'
          onClick={() => onClickEditThing(thing.id, thing.text)}
        >
          Edit
        </button>
        <button
          className='custom-button outlined green'
          onClick={() => onClickDeleteThing(thing.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default Thing;
