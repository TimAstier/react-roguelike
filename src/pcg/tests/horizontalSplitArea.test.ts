import { horizontalSplitArea } from '../horizontalSplitArea';

describe('horizontalSplitArea', () => {
  it('works for 4x4 square', () => {
    const initialArea = { origin: { x: 0, y: 0 }, end: { x: 4, y: 4 } };
    const expectedResult = [
      { origin: { x: 0, y: 0 }, end: { x: 4, y: 2 } },
      { origin: { x: 0, y: 2 }, end: { x: 4, y: 4 } },
    ];
    expect(horizontalSplitArea(initialArea)).toEqual(expectedResult);
  });
  it('rounds down if odd number', () => {
    const initialArea = { origin: { x: 0, y: 0 }, end: { x: 3, y: 3 } };
    const expectedResult = [
      { origin: { x: 0, y: 0 }, end: { x: 3, y: 1 } },
      { origin: { x: 0, y: 1 }, end: { x: 3, y: 3 } },
    ];
    expect(horizontalSplitArea(initialArea)).toEqual(expectedResult);
  });
  it('works on bigger cases', () => {
    const initialArea = { origin: { x: 40, y: 15 }, end: { x: 80, y: 30 } };
    const expectedResult = [
      { origin: { x: 40, y: 15 }, end: { x: 80, y: 22 } },
      { origin: { x: 40, y: 22 }, end: { x: 80, y: 30 } },
    ];
    expect(horizontalSplitArea(initialArea)).toEqual(expectedResult);
  });
});
