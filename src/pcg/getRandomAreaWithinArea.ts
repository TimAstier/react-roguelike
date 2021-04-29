import { Area } from '../typings/area';

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
};

// const getRandomIntInclusive = (min: number, max: number) => {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
// };

export const getRandomAreaWithinArea = (area: Area): Area => {
  const originalWidth = area.end.x - area.origin.x;
  const originalHeight = area.end.y - area.origin.y;

  const width = getRandomInt(2, originalWidth - 1);
  const height = getRandomInt(2, originalHeight - 1);

  const originX = getRandomInt(area.origin.x, area.origin.x + originalWidth - width);
  const originY = getRandomInt(area.origin.y, area.origin.y + originalHeight - height);

  const origin = { x: originX, y: originY };
  const end = { x: originX + width, y: originY + height };

  return { origin, end };
};