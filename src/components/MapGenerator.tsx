import React from 'react';
import seedrandom from 'seedrandom';

import maps from '../data/maps';
import Map from './Map';

// Note: 80 x 30 for map size?

export const MapGenerator: React.FC = () => {
  React.useEffect(() => {
    // We can seed the rng by providing a string to seedrandom():
    const seed = seedrandom('hello');
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
