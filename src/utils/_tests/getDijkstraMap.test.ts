import { TileType } from '../../constants/tiles';
import { Position } from '../../typings/position';
import { getDijkstraMap } from '../getDijkstraMap';

describe('getDijkstraMap', () => {
  it('works on basic map', () => {
    const map: TileType[][] = [
      ['#', '#', '#', '.', '.'],
      ['.', '.', '.', '.', '#'],
      ['.', '.', '.', '.', '#'],
      ['.', '#', '.', '.', '.'],
    ];
    const target: Position = [0, 2];
    const expectedResult = [
      ['#', '#', '#', '5', '6'],
      ['1', '2', '3', '4', '#'],
      ['0', '1', '2', '3', '#'],
      ['1', '#', '3', '4', '5'],
    ];
    const dijkstraMap = getDijkstraMap(map, target);
    expect(dijkstraMap).toEqual(expectedResult);
  });
});
