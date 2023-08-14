import { FC, useState } from 'react';

import { useRouter } from 'next/router';

import * as Api from '@/pages/api';

import { toast } from 'react-hot-toast';

import styles from './AddNewFriend.module.scss';

interface AddNewFriendProps {
  token: string;
}

const AddNewFriend: FC<AddNewFriendProps> = ({ token }) => {
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
    <div className={styles.container}>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder='Friend You want to add username here...'
        className='custom-input add'
      />
      <button
        onClick={onClickAddFriend}
        disabled={username === ''}
        className='custom-button filled green'
      >
        Add friend
      </button>
    </div>
  );
};

export default AddNewFriend;
