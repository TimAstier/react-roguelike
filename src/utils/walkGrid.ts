// From https://www.redblobgames.com/grids/line-drawing.html#stepping

import { Point } from '../typings/point';

export const walkGrid = (p0: Point, p1: Point): Point[] => {
  const dx = p1.x - p0.x;
  const dy = p1.y - p0.y;
  const nx = Math.abs(dx);
  const ny = Math.abs(dy);
  const signX = dx > 0 ? 1 : -1;
  const signY = dy > 0 ? 1 : -1;

  const p = { x: p0.x, y: p0.y };
  const points = [{ x: p.x, y: p.y }];
  for (let ix = 0, iy = 0; ix < nx || iy < ny; ) {
    if ((0.5 + ix) / nx < (0.5 + iy) / ny) {
      // next step is horizontal
      p.x += signX;
      ix++;
    } else {
      // next step is vertical
      p.y += signY;
      iy++;
    }
    points.push({ x: p.x, y: p.y });
  }
  return points;
};
