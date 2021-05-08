import { Area } from '../typings/area';
import { getRandomIntInclusive } from '../utils/getRandomIntInclusive';

const MINIMUM_ROOM_DIMENSION = 2;

// const getRandomInt = (min: number, max: number) => {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
// };

export const getRandomAreaWithinArea = (area: Area): Area => {
  const originalWidth = area.end.x - area.origin.x;
  const originalHeight = area.end.y - area.origin.y;

  const width = getRandomIntInclusive(MINIMUM_ROOM_DIMENSION + 1, originalWidth - 1);
  const height = getRandomIntInclusive(MINIMUM_ROOM_DIMENSION + 1, originalHeight - 1);

  const originX = getRandomIntInclusive(area.origin.x, area.origin.x + originalWidth - width);
  const originY = getRandomIntInclusive(area.origin.y, area.origin.y + originalHeight - height);

  const origin = { x: originX, y: originY };
  const end = { x: originX + width, y: originY + height };

  return { origin, end };
};
