import { GRID_HEIGHT, GRID_WIDTH } from '../../constants/config';
import { Position } from '../../typings/position';
import { getSurroundingPositions } from '../getSurroundingPositions';

describe('getSurroundingPositions', () => {
  it('works for r = 0', () => {
    const radius = 0;
    const position: Position = [10, 10];
    const expectedPositions = [[10, 10]];
    expect(getSurroundingPositions(position, radius)).toEqual(expectedPositions);
  });
  it('works for r = 1', () => {
    const radius = 1;
    const position: Position = [10, 10];
    const expectedPositions = [
      [9, 9],
      [10, 9],
      [11, 9],
      [9, 10],
      [10, 10],
      [11, 10],
      [9, 11],
      [10, 11],
      [11, 11],
    ];
    expect(getSurroundingPositions(position, radius)).toEqual(expectedPositions);
  });
  it('works for r = 1 close to top-left corner of grid', () => {
    const radius = 1;
    const position: Position = [0, 0];
    const expectedPositions = [
      [0, 0],
      [1, 0],
      [0, 1],
      [1, 1],
    ];
    expect(getSurroundingPositions(position, radius)).toEqual(expectedPositions);
  });

  it('works for r = 1 close to bottom-right corner of grid', () => {
    const radius = 1;
    const position: Position = [GRID_WIDTH - 1, GRID_HEIGHT - 1];
    const expectedPositions = [
      [GRID_WIDTH - 2, GRID_HEIGHT - 2],
      [GRID_WIDTH - 1, GRID_HEIGHT - 2],
      [GRID_WIDTH - 2, GRID_HEIGHT - 1],
      [GRID_WIDTH - 1, GRID_HEIGHT - 1],
    ];
    expect(getSurroundingPositions(position, radius)).toEqual(expectedPositions);
  });
});
