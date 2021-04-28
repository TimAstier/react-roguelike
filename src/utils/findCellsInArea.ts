import { Area } from '../typings/area';
import { CellTile } from '../typings/cell';
import { Position } from '../typings/position';

interface Options {
  area: Area;
  map: CellTile[][];
  cellTile: CellTile;
}

export const findCellsInArea = ({ area, map, cellTile }: Options): Position[] => {
  const positions: Position[] = [];

  for (let j = area.origin.y; j <= area.end.y; j++) {
    for (let i = area.origin.x; i <= area.end.x; i++) {
      if (map[j][i] === cellTile) {
        positions.push([i, j]);
      }
    }
  }
  return positions;
};
