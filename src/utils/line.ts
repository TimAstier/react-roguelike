// From: https://www.redblobgames.com/grids/line-drawing.html#supercover

interface Point {
  x: number;
  y: number;
}

const diagonalDistance = (p0: Point, p1: Point) => {
  const dx = p1.x - p0.x;
  const dy = p1.y - p0.y;
  return Math.max(Math.abs(dx), Math.abs(dy));
};

const roundPoint = (p: Point) => {
  return { x: Math.round(p.x), y: Math.round(p.y) } as Point;
};

const lerp = (start: number, end: number, t: number) => {
  return start + t * (end - start);
};

const lerpPoint = (p0: Point, p1: Point, t: number) => {
  return { x: lerp(p0.x, p1.x, t), y: lerp(p0.y, p1.y, t) } as Point;
};

export const line = (p0: Point, p1: Point): Point[] => {
  const points: Point[] = [];
  const N = diagonalDistance(p0, p1);
  for (let step = 0; step <= N; step++) {
    const t = N === 0 ? 0.0 : step / N;
    points.push(roundPoint(lerpPoint(p0, p1, t)));
  }
  return points;
};
