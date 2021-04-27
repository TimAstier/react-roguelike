import { Area } from '../typings/area';

export const horizontalSplitArea = (area: Area): [Area, Area] => {
  const firstArea = {
    origin: { x: area.origin.x, y: area.origin.y },
    end: { x: area.end.x, y: Math.floor((area.end.y + area.origin.y) / 2) },
  };
  const secondArea = {
    origin: { x: area.origin.x, y: Math.floor((area.end.y + area.origin.y) / 2) },
    end: { x: area.end.x, y: area.end.y },
  };
  return [firstArea, secondArea];
};
