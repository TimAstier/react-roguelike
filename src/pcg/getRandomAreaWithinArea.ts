import { Area } from '../typings/area';

export const getRandomAreaWithinArea = (area: Area): Area => {
  return {
    origin: { x: area.origin.x + 3, y: area.origin.y + 3 },
    end: { x: area.end.x - 3, y: area.end.y - 3 },
  };
};
