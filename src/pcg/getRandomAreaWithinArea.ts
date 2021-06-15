import { Area } from '../typings/area';
import { getRandomIntInclusive } from '../utils/getRandomIntInclusive';

const MINIMUM_ROOM_DIMENSION = 2;

export const getRandomAreaWithinArea = (area: Area, rng: () => number): Area => {
  const originalWidth = area.end.x - area.origin.x;
  const originalHeight = area.end.y - area.origin.y;

  const width = getRandomIntInclusive(MINIMUM_ROOM_DIMENSION + 1, originalWidth - 1, rng);
  const height = getRandomIntInclusive(MINIMUM_ROOM_DIMENSION + 1, originalHeight - 1, rng);

  const originX = getRandomIntInclusive(area.origin.x, area.origin.x + originalWidth - width, rng);
  const originY = getRandomIntInclusive(
    area.origin.y,
    area.origin.y + originalHeight - height,
    rng
  );

  const origin = { x: originX, y: originY };
  const end = { x: originX + width, y: originY + height };

  return { origin, end };
};
