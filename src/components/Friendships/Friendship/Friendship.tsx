import { FC } from 'react';

import styles from './Friendship.module.scss';
import FriendshipThings from './FriendshipThings/FriendshipThings';
import { IFriendship } from '@/types/shared';

interface FriendshipProps {
  friendship: IFriendship;
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
        <p>
          <b>{friendship.addressee.username}</b> doesnt't have any things yet.
        </p>
      )}
    </div>
  );
};

export default Friendship;
