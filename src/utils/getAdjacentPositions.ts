import { Position } from '../typings/position';

export const getAdjacentPositions = (
  p: Position,
  mapWidth: number,
  mapHeight: number
): Position[] => {
  const up: Position = [p[0], Math.max(0, p[1] - 1)];
  const down: Position = [p[0], Math.min(mapHeight - 1, p[1] + 1)];
  const left: Position = [Math.max(0, p[0] - 1), p[1]];
  const right: Position = [Math.min(p[0] + 1, mapWidth - 1), p[1]];
  return [up, down, left, right];
};
