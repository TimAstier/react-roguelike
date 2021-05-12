// Based on https://www.redblobgames.com/grids/circle-drawing/

import { Position } from '../typings/position';
import { isInsideCircle } from '../utils/isInsideCircle';

export interface GetSurroundingPositionsOptions {
  position: Position;
  radius: number;
  mapWidth: number;
  mapHeight: number;
}

export const getSurroundingPositions = (options: GetSurroundingPositionsOptions): Position[] => {
  const { position, radius, mapWidth, mapHeight } = options;
  const positions: Position[] = [];

  const top = Math.floor(position[1] - radius);
  const bottom = Math.ceil(position[1] + radius);
  const left = Math.floor(position[0] - radius);
  const right = Math.ceil(position[0] + radius);

  // Can be optimized further? See article.
  for (let y = top; y <= bottom; y++) {
    for (let x = left; x <= right; x++) {
      if (isInsideCircle({ center: position, position: [x, y], radius })) {
        if (x >= 0 && y >= 0 && x < mapWidth && y < mapHeight) {
          positions.push([x, y]);
        }
      }
    }
  }

  return positions;
};
