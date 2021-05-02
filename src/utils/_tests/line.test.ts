import { Position } from '../../typings/position';
import { line } from '../line';

describe('line', () => {
  it('returns start and end for two adjacent positions', () => {
    const p0: Position = [0, 0];
    const p1: Position = [1, 0];
    const expectedResult = [
      [0, 0],
      [1, 0],
    ];
    expect(line(p0, p1)).toEqual(expectedResult);
  });

  it('works for two positions on same x axis', () => {
    const p0: Position = [0, 0];
    const p1: Position = [3, 0];
    const expectedResult = [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
    ];
    expect(line(p0, p1)).toEqual(expectedResult);
  });
  it('works on advanced case', () => {
    const p0: Position = [1, 9];
    const p1: Position = [6, 0];
    const expectedResult = [
      [1, 9],
      [2, 8],
      [2, 7],
      [3, 6],
      [3, 5],
      [4, 4],
      [4, 3],
      [5, 2],
      [5, 1],
      [6, 0],
    ];
    expect(line(p0, p1)).toEqual(expectedResult);
  });
});
