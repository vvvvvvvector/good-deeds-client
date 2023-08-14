import { FC } from 'react';

import styles from './Friendships.module.scss';
import Friendship from './Friendship/Friendship';

interface FriendshipsProps {
  friendships: {
    id: number;
    addressee: {
      username: string;
      things: {
        id: number;
        text: string;
      }[];
    };
  }[];
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
