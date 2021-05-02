import { Area } from '../../typings/area';
import { CellTile } from '../../typings/cell';
import { Position } from '../../typings/position';
import { findCellsInArea } from '../findCellsInArea';

const map: CellTile[][] = [
  [' ', ' ', '.', ' ', '#', ' ', ' '],
  [' ', '.', '.', '#', ' ', ' ', '#'],
  ['#', '#', '.', ' ', ' ', '.', '.'],
];

describe('findCellsInArea', () => {
  it('works for area covering the whole map', () => {
    const area: Area = { origin: { x: 0, y: 0 }, end: { x: 6, y: 2 } };
    const cellTile: CellTile = '.';
    const expectedPositions: Position[] = [
      [2, 0],
      [1, 1],
      [2, 1],
      [2, 2],
      [5, 2],
      [6, 2],
    ];
    expect(findCellsInArea({ area, map, cellTile })).toEqual(expectedPositions);
  });
  it('works for partial area', () => {
    const area: Area = { origin: { x: 2, y: 0 }, end: { x: 5, y: 1 } };
    const cellTile: CellTile = '#';
    const expectedPositions: Position[] = [
      [4, 0],
      [3, 1],
    ];
    expect(findCellsInArea({ area, map, cellTile })).toEqual(expectedPositions);
  });
  it('works for partial in lower right corner', () => {
    const area: Area = { origin: { x: 2, y: 1 }, end: { x: 6, y: 2 } };
    const cellTile: CellTile = ' ';
    const expectedPositions: Position[] = [
      [4, 1],
      [5, 1],
      [3, 2],
      [4, 2],
    ];
    expect(findCellsInArea({ area, map, cellTile })).toEqual(expectedPositions);
  });
});
