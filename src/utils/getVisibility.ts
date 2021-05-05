import { CellData } from '../typings/cell';
import { Position } from '../typings/position';
import { Visibility } from '../typings/visibility';
import { isInsideCircle } from '../utils/isInsideCircle';
import { line } from './line';

interface Options {
  position: Position;
  playerPosition: Position;
  gameMap: CellData[][];
  maxClearVisibility: number;
  maxVisibility: number;
}

export const getVisibility = ({
  position,
  playerPosition,
  gameMap,
  maxClearVisibility,
  maxVisibility,
}: Options): Visibility => {
  const [posX, posY] = position;

  // Can see doors when standing on them
  if (gameMap[position[1]][position[0]].tile === '+' && playerPosition === position) {
    return 'clear';
  }

  // Prevent seing through walls and doors
  const inBetweenOpaqueTiles = line([posX, posY], playerPosition).filter(
    (p) =>
      gameMap[p[1]][p[0]].tile === '#' ||
      // Count doors as opaque when not standing on them
      (gameMap[p[1]][p[0]].tile === '+' && JSON.stringify(p) !== JSON.stringify(playerPosition))
  );

  const numberOfInBetweenOpaqueTiles = inBetweenOpaqueTiles.length;

  if (numberOfInBetweenOpaqueTiles >= 1) {
    if (
      (gameMap[position[1]][position[0]].tile !== '#' &&
        gameMap[position[1]][position[0]].tile !== '+') || // Do not darken adjacent walls and doors
      ((gameMap[position[1]][position[0]].tile === '#' ||
        gameMap[position[1]][position[0]].tile === '+') &&
        numberOfInBetweenOpaqueTiles >= 2) // Prevent seing walls/doors through walls/doors
    ) {
      return 'dark';
    }
  }

  if (isInsideCircle({ center: playerPosition, position, radius: maxClearVisibility })) {
    return 'clear';
  }

  if (isInsideCircle({ center: playerPosition, position, radius: maxVisibility })) {
    return 'dim';
  }

  return 'dark';
};
