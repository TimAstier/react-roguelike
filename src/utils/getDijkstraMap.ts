// Performance degrades very fast on bigger maps:
// 5x4 ~ 0.23ms
// 25x21 ~ 32ms
// 30x30 ~ 926ms

// Idea: Use this only on a subset of the map (size of the viewport)?

import { TileType } from '../constants/tiles';
import { Position } from '../typings/position';

const getAdjacentPositions = (p: Position, mapWidth: number, mapHeight: number): Position[] => {
  const up: Position = [p[0], Math.max(0, p[1] - 1)];
  const down: Position = [p[0], Math.min(mapHeight - 1, p[1] + 1)];
  const left: Position = [Math.max(0, p[0] - 1), p[1]];
  const right: Position = [Math.min(p[0] + 1, mapWidth - 1), p[1]];
  return [up, down, left, right];
};

export const getDijkstraMap = (map: TileType[][], target: Position): string[][] => {
  // const t0 = performance.now();
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
      const adjacentPositions = getAdjacentPositions(position, mapWidth, mapHeight);
      adjacentPositions.forEach((p) => {
        if (map[p[1]][p[0]] !== '#' && result[p[1]][p[0]] === '') {
          newFrontier.push(p);
        }
      });
    });
    distance++;
    frontier = [...newFrontier];
  }
  // const t1 = performance.now();
  // console.log('Call to doSomething took ' + (t1 - t0) + ' milliseconds.');
  return result;
};
