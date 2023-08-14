import { FC } from 'react';

import styles from './Friendship.module.scss';
import FriendshipThings from './FriendshipThings/FriendshipThings';

interface FriendshipProps {
  friendship: {
    id: number;
    addressee: {
      username: string;
      things: {
        id: number;
        text: string;
      }[];
    };
  };
}

const Friendship: FC<FriendshipProps> = ({ friendship }) => {
  return (
    <div className={styles.friendship}>
      <li className={styles.friendUsername}>{friendship.addressee.username}</li>
      {friendship.addressee.things.length > 0 ? (
        <FriendshipThings
          key={friendship.id}
          things={friendship.addressee.things}
        />
      ) : (
        <p>This friend don't have any things yet.</p>
      )}
    </div>
  );
};

export default Friendship;
