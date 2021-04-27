import React from 'react';
import seedrandom from 'seedrandom';

import maps from '../data/maps';
import Map from './Map';

export const MapGenerator: React.FC = () => {
  React.useEffect(() => {
    const seed = seedrandom();
    const value = seed();
    console.log(value);
    const rng = seedrandom(String(value));
    console.log(rng());
    console.log(rng());
    console.log(rng());
  }, []);

  return (
    <Map
      inViewport={false}
      playerPosition={[0, 0]}
      fogOfWar={false}
      moveDirection={'Up'}
      tiles={maps.intro}
      shouldPlayerAnimate={false}
    />
  );
};
