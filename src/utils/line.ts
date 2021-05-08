// From: https://www.redblobgames.com/grids/line-drawing.html#supercover

import { Position } from '../typings/position';

const diagonalDistance = (p0: Position, p1: Position) => {
  const dx = p1[0] - p0[0];
  const dy = p1[1] - p0[1];
  return Math.max(Math.abs(dx), Math.abs(dy));
};

const roundPosition = (p: Position): Position => {
  return [Math.round(p[0]), Math.round(p[1])];
};

const lerp = (start: number, end: number, t: number) => {
  return start + t * (end - start);
};

const lerpPoint = (p0: Position, p1: Position, t: number): Position => {
  return [lerp(p0[0], p1[0], t), lerp(p0[1], p1[1], t)];
};

export const line = (p0: Position, p1: Position): Position[] => {
  const positions: Position[] = [];
  const N = diagonalDistance(p0, p1);
  for (let step = 0; step <= N; step++) {
    const t = N === 0 ? 0.0 : step / N;
    positions.push(roundPosition(lerpPoint(p0, p1, t)));
  }
  return positions;
};
