import { FC } from 'react';

import { IThing } from '@/types/shared';

import styles from './FriendshipThings.module.scss';

interface FriendshipThingsProps {
  things: IThing[];
}

const FriendshipThings: FC<FriendshipThingsProps> = ({ things }) => {
  return (
    <div className={styles.things}>
      <ul>
        {things.map((thing, index) => (
          <li key={thing.id}>{`${index + 1}. ${thing.text}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default FriendshipThings;
