import { Position } from '../typings/position';

interface Options {
  center: Position;
  position: Position;
  radius: number;
}

export const isInsideCircle = ({ center, position, radius }: Options): boolean => {
  const dx = center[0] - position[0];
  const dy = center[1] - position[1];
  const distanceSquared = dx * dx + dy * dy;
  return distanceSquared <= radius * radius;
};
