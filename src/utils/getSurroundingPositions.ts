import { GRID_HEIGHT, GRID_WIDTH } from '../constants/config';
import { Position } from '../typings/position';

export const getSurroundingPositions = (position: Position, radius: number): Position[] => {
  const positions: Position[] = [];

  for (let y = position[1] - radius; y <= position[1] + radius; y++) {
    for (let x = position[0] - radius; x <= position[0] + radius; x++) {
      if (x >= 0 && y >= 0 && x < GRID_WIDTH && y < GRID_HEIGHT) {
        // TODO: Remove corner
        positions.push([x, y]);
      }
    }
  }

  return positions;
};
