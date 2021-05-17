// Performance benchmark
// 5x4 ~ 0.24ms
// 25x21 ~ 1.21ms
// 30x30 ~ 2.21ms

// Some ideas to optimize this function even further:
// https://www.reddit.com/r/roguelikedev/comments/nck6ur/sharing_saturday_362/gyfk38l/?utm_source=reddit&utm_medium=web2x&context=3

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
          // NOTE: This next comparison is key to not have duplicates
          // NOTE: Using JSON.stringify is not very performant
          if (!newFrontier.map((obj) => JSON.stringify(obj)).includes(JSON.stringify(p))) {
            newFrontier.push(p);
          }
        }
      });
    });
    distance++;
    frontier = [...newFrontier];
  }
  // const t1 = performance.now();
  // console.log('Time: ', `${t1 - t0}ms`);
  return result;
};
