import { Position } from '../typings/position';
import { Visibility } from '../typings/visibility';

interface Options {
  posX: number;
  posY: number;
  playerPosition: Position;
}

export const getVisibility = ({ posX, posY, playerPosition }: Options): Visibility => {
  const [playerX, playerY] = playerPosition;

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
