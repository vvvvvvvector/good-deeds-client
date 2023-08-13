import { useState, FC } from 'react';

import { useRouter } from 'next/router';

import * as Api from '@/pages/api';

import toast from 'react-hot-toast';

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

      router.replace(router.asPath);
    } catch (error) {
      toast.error('Error while adding thing.', { id });
    }
  };

  return (
    <div className='flex gap-4 justify-between'>
      <input
        value={newThing}
        onChange={(e) => setNewThing(e.target.value)}
        placeholder='New good thing text here...'
        className='w-[80%] rounded border border-zinc-400 p-3 bg-none'
      />
      <button
        disabled={newThing.length === 0}
        className='flex-1 disabled:disabled:bg-gray-200 rounded text-white font-medium transition-[background-color] bg-sky-500 hover:bg-sky-600 p-2'
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
