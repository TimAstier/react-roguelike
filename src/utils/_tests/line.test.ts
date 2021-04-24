import { line } from '../line';

describe('line', () => {
  it('returns start and end for two adjacent points', () => {
    const p0 = { x: 0, y: 0 };
    const p1 = { x: 1, y: 0 };
    const expectedResult = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ];
    expect(line(p0, p1)).toEqual(expectedResult);
  });

  it('works for two points on same x axis', () => {
    const p0 = { x: 0, y: 0 };
    const p1 = { x: 3, y: 0 };
    const expectedResult = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
    ];
    expect(line(p0, p1)).toEqual(expectedResult);
  });
  it('works on advanced case', () => {
    const p0 = { x: 1, y: 9 };
    const p1 = { x: 6, y: 0 };
    const expectedResult = [
      { x: 1, y: 9 },
      { x: 2, y: 8 },
      { x: 2, y: 7 },
      { x: 3, y: 6 },
      { x: 3, y: 5 },
      { x: 4, y: 4 },
      { x: 4, y: 3 },
      { x: 5, y: 2 },
      { x: 5, y: 1 },
      { x: 6, y: 0 },
    ];
    expect(line(p0, p1)).toEqual(expectedResult);
  });
});
