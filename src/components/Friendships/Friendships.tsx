import { FC } from 'react';

import { IFriendship } from '@/types/shared';

import styles from './Friendships.module.scss';
import Friendship from './Friendship/Friendship';

interface FriendshipsProps {
  friendships: IFriendship[];
}

const Friendships: FC<FriendshipsProps> = ({ friendships }) => {
  return (
    <div className={styles.friendships}>
      {friendships.length > 0 ? (
        <ul>
          {friendships.map((friendship) => (
            <Friendship key={friendship.id} friendship={friendship} />
          ))}
        </ul>
      ) : (
        <p>You don't have any friends yet.</p>
      )}
    </div>
  );
};

export default Friendships;
