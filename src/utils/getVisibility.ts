import { MAX_CLEAR_VISIBILITY } from '../constants/config';
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

  // Check if there is a wall between point and player
  const inBetweenPoints = line([posX, posY], playerPosition);
  if (inBetweenPoints.some((p) => gameMap[p[1]][p[0]].tile === 'X')) {
    return 'dark';
  }

  // Use isInCircle

  if (isInsideCircle({ center: playerPosition, position, radius: MAX_CLEAR_VISIBILITY })) {
    return 'clear';
  }

  return 'dim';
};
