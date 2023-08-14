import { useState, FC } from 'react';

import { useRouter } from 'next/router';

import * as Api from '@/pages/api';

import toast from 'react-hot-toast';

import styles from './AddNewThing.module.scss';

interface AddNewThingProps {
  token: string;
}

const AddNewThing: FC<AddNewThingProps> = ({ token }) => {
  const router = useRouter();

  const [newThing, setNewThing] = useState('');

  const onClickAddNewThing = async (text: string) => {
    const id = toast.loading('Adding...');
    try {
      await Api.things.addNewThing(text, token);

      toast.success('Thing was successfully added.', { id });

      router.replace(router.asPath, undefined, { scroll: false });
    } catch (error) {
      toast.error('Error while adding thing.', { id });
    }
  };

  return (
    <div className={styles.container}>
      <input
        value={newThing}
        onChange={(e) => setNewThing(e.target.value)}
        placeholder='New good thing text here...'
        className='custom-input add'
      />
      <button
        disabled={newThing.length === 0}
        className='custom-button filled green'
        onClick={() => {
          onClickAddNewThing(newThing);

          setNewThing('');
        }}
      >
        Add new
      </button>
    </div>
  );
};

export default AddNewThing;
