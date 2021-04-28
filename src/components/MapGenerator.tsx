import React from 'react';

// import seedrandom from 'seedrandom';
import { generateLevel } from '../pcg/generateLevel';
import { CellTile } from '../typings/cell';
import Map from './Map';

export const MapGenerator: React.FC = () => {
  const [map, setMap] = React.useState<CellTile[][] | null>(null);

  React.useEffect(() => {
    // We can seed the rng by providing a string to seedrandom():
    // const seed = seedrandom('hello');
    // const newMap = generateMap(String(seed()));
    const level = generateLevel();
    setMap(level.map);
  }, []);

  if (map === null) {
    return <div>loading...</div>;
  }

  return (
    <Map
      inViewport={false}
      playerPosition={[0, 0]}
      fogOfWar={false}
      moveDirection={'Up'}
      tiles={map}
      shouldPlayerAnimate={false}
    />
  );
};
