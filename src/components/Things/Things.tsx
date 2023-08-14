import { FC } from 'react';

import { IThing } from '@/types/shared';

import Thing from './Thing/Thing';

import styles from './Things.module.scss';

interface ThingsProps {
  token: string;
  things: IThing[];
}

const Things: FC<ThingsProps> = ({ things, token }) => {
  return (
    <div className={styles.thingsList}>
      {things.length > 0 ? (
        <ul>
          {things.map((thing, index) => (
            <Thing key={thing.id} token={token} index={index} thing={thing} />
          ))}
        </ul>
      ) : (
        <p>You don't have any things yet.</p>
      )}
    </div>
  );
};

export default Things;
