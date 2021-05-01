import { MAX_CLEAR_VISIBILITY, MAX_VISIBILITY } from '../constants/config';
import { CellData } from '../typings/cell';
import { Position } from '../typings/position';
import { Visibility } from '../typings/visibility';
import { line } from './line';

interface Options {
  posX: number;
  posY: number;
  playerPosition: Position;
  gameMap: CellData[][];
}

// TODO: Use getSurroundingPositions to make sure it's the same areas between visible and revealed
export const getVisibility = ({ posX, posY, playerPosition, gameMap }: Options): Visibility => {
  const [playerX, playerY] = playerPosition;

  // We only consider points within MAX_VISIBILITY reach
  if (Math.abs(playerX - posX) > MAX_VISIBILITY || Math.abs(playerY - posY) > MAX_VISIBILITY) {
    return 'dark';
  }

  // Check if there is a wall between point and player

  const inBetweenPoints = line([posX, posY], playerPosition);
  // switched x y here?
  if (inBetweenPoints.some((position) => gameMap[position[0]][position[1]].tile === 'X')) {
    return 'dark';
  }

  // Check distance for clear / dim / dark definition

  // TODO: use getSurroundingPosition
  // This removes one square in the corners
  // Should use getSurroundingPositions here?
  if (
    Math.abs(playerX - posX) === MAX_CLEAR_VISIBILITY &&
    Math.abs(playerY - posY) === MAX_CLEAR_VISIBILITY
  ) {
    return 'dim';
  }

  if (
    Math.abs(playerX - posX) <= MAX_CLEAR_VISIBILITY &&
    Math.abs(playerY - posY) <= MAX_CLEAR_VISIBILITY
  ) {
    return 'clear';
  }

  // TODO: use getSurroundingPosition
  // This removes one square in the corners
  // Should use getSurroundingPositions here?
  if (Math.abs(playerX - posX) === MAX_VISIBILITY && Math.abs(playerY - posY) === MAX_VISIBILITY) {
    return 'dark';
  }

  if (Math.abs(playerX - posX) <= MAX_VISIBILITY && Math.abs(playerY - posY) <= MAX_VISIBILITY) {
    return 'dim';
  }

  return 'dark';
};

export const getPlayerVisibility = (options: Options): Visibility => {
  const visibility = getVisibility(options);
  if (visibility === 'dark' && options.gameMap[options.posX][options.posY].revealed === true) {
    return 'dim';
  }
  return visibility;
};
