import { Position } from '../typings/position';
import { Visibility } from '../typings/visibility';

interface Options {
  posX: number;
  posY: number;
  playerPosition: Position;
}

export const getVisibility = ({ posX, posY, playerPosition }: Options): Visibility => {
  const [playerX, playerY] = playerPosition;

  // For all points potentially visible:
  //   - draw a "supercover line" between the point and the player
  //   - check if there is a wall in this line
  //   - if so, the point is not visible by the player
  // See: https://www.redblobgames.com/grids/line-drawing.html#supercover

  if (Math.abs(playerX - posX) === 2 && Math.abs(playerY - posY) === 2) {
    return 'dim';
  }

  if (Math.abs(playerX - posX) <= 2 && Math.abs(playerY - posY) <= 2) {
    return 'clear';
  }

  if (Math.abs(playerX - posX) === 4 && Math.abs(playerY - posY) === 4) {
    return 'dark';
  }

  if (Math.abs(playerX - posX) <= 4 && Math.abs(playerY - posY) <= 4) {
    return 'dim';
  }

  return 'dark';
};
