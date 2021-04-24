import { CellTile } from '../typings/cell';
import { Position } from '../typings/position';
import { Visibility } from '../typings/visibility';
import { line } from './line';

interface Options {
  posX: number;
  posY: number;
  playerPosition: Position;
  tiles: CellTile[][];
}

const MAX_CLEAR_VISIBILITY = 2;
const MAX_VISIBILITY = 4;

export const getVisibility = ({ posX, posY, playerPosition, tiles }: Options): Visibility => {
  const [playerX, playerY] = playerPosition;

  // We only consider points within MAX_VISIBILITY reach
  if (Math.abs(playerX - posX) > MAX_VISIBILITY || Math.abs(playerY - posY) > MAX_VISIBILITY) {
    return 'dark';
  }

  // Check if there is a wall between point and player

  const p0 = { x: posX, y: posY };
  const [p1x, p1y] = playerPosition;
  const p1 = { x: p1x, y: p1y };
  const inBetweenPoints = line(p0, p1);

  if (inBetweenPoints.some((point) => tiles[point.x][point.y] === 'X')) {
    return 'dark';
  }

  // Check distance for clear / dim / dark definition

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

  if (Math.abs(playerX - posX) === MAX_VISIBILITY && Math.abs(playerY - posY) === MAX_VISIBILITY) {
    return 'dark';
  }

  if (Math.abs(playerX - posX) <= MAX_VISIBILITY && Math.abs(playerY - posY) <= MAX_VISIBILITY) {
    return 'dim';
  }

  return 'dark';
};
