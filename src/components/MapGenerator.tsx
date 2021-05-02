import React from 'react';

// import seedrandom from 'seedrandom';
import { generateLevel } from '../pcg/generateLevel';
import { CellData } from '../typings/cell';
import Map from './Map';

export const MapGenerator: React.FC = () => {
  const [gameMap, setGameMap] = React.useState<CellData[][] | null>(null);

  React.useEffect(() => {
    // We can seed the rng by providing a string to seedrandom():
    // const seed = seedrandom('hello');
    // const newMap = generateMap(String(seed()));
    const level = generateLevel();
    setGameMap(level.gameMap);
  }, []);

  if (gameMap === null) {
    return <div>loading...</div>;
  }

  return (
    <Map
      inViewport={false}
      playerPosition={[0, 0]}
      fogOfWar={false}
      moveDirection={'Up'}
      gameMap={gameMap}
      shouldPlayerAnimate={false}
    />
  );
};
