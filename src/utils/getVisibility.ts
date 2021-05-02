import { MAX_CLEAR_VISIBILITY, MAX_VISIBILITY } from '../constants/config';
import { CellData } from '../typings/cell';
import { Position } from '../typings/position';
import { Visibility } from '../typings/visibility';
import { isInsideCircle } from '../utils/isInsideCircle';
import { line } from './line';

interface Options {
  position: Position;
  playerPosition: Position;
  gameMap: CellData[][];
}

export const getVisibility = ({ position, playerPosition, gameMap }: Options): Visibility => {
  const [posX, posY] = position;

  // Prevent seing through walls
  const inBetweenWalls = line([posX, posY], playerPosition).filter(
    (p) => gameMap[p[1]][p[0]].tile === '#'
  );

  if (inBetweenWalls.length >= 1) {
    if (
      gameMap[position[1]][position[0]].tile !== '#' || // Do not darken adjacent walls
      (gameMap[position[1]][position[0]].tile === '#' && inBetweenWalls.length >= 2) // Prevent seing walls through walls
    ) {
      return 'dark';
    }
  }

  if (isInsideCircle({ center: playerPosition, position, radius: MAX_CLEAR_VISIBILITY })) {
    return 'clear';
  }

  if (isInsideCircle({ center: playerPosition, position, radius: MAX_VISIBILITY })) {
    return 'dim';
  }

  return 'dark';
};
