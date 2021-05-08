import { Area } from '../typings/area';

export const verticalSplitArea = (area: Area): [Area, Area] => {
  const firstArea = {
    origin: { x: area.origin.x, y: area.origin.y },
    end: { x: Math.floor((area.end.x + area.origin.x) / 2), y: area.end.y },
  };
  const secondArea = {
    origin: { x: Math.floor((area.end.x + area.origin.x) / 2), y: area.origin.y },
    end: { x: area.end.x, y: area.end.y },
  };
  return [firstArea, secondArea];
};
