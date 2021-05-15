import { TileType } from '../constants/tiles';
import { Position } from '../typings/position';
import { getSurroundingPositions } from './getSurroundingPositions';

export const getDijkstraMap = (map: TileType[][], target: Position): string[][] => {
  const mapWidth = map[0].length;
  const mapHeight = map.length;
  const result: string[][] = map.map((row) => row.map((cell) => (cell === '#' ? '#' : '')));

  let frontier: Position[] = [target];
  let distance = 0;
  const getDistance = () => distance;

  while (frontier.length !== 0) {
    const newFrontier: Position[] = [];
    frontier.forEach((position) => {
      result[position[1]][position[0]] = String(getDistance());
      const surroundingPositions = getSurroundingPositions({
        // TODO: Use simpler func to get neighboors
        position,
        radius: 1,
        mapWidth,
        mapHeight,
      });
      surroundingPositions.forEach((p) => {
        if (map[p[1]][p[0]] !== '#' && result[p[1]][p[0]] === '') {
          // TODO: Exclude origin removes need for this check
          newFrontier.push(p);
        }
      });
    });
    distance++;
    frontier = [...newFrontier];
  }
  return result;
};
