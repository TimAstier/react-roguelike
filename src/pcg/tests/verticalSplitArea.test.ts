import { verticalSplitArea } from '../verticalSplitArea';

describe(verticalSplitArea, () => {
  it('works for 4x4 square', () => {
    const initialArea = { origin: { x: 0, y: 0 }, end: { x: 4, y: 4 } };
    const expectedResult = [
      { origin: { x: 0, y: 0 }, end: { x: 2, y: 4 } },
      { origin: { x: 2, y: 0 }, end: { x: 4, y: 4 } },
    ];
    expect(verticalSplitArea(initialArea)).toEqual(expectedResult);
  });
  it('rounds down if odd number', () => {
    const initialArea = { origin: { x: 0, y: 0 }, end: { x: 3, y: 3 } };
    const expectedResult = [
      { origin: { x: 0, y: 0 }, end: { x: 1, y: 3 } },
      { origin: { x: 1, y: 0 }, end: { x: 3, y: 3 } },
    ];
    expect(verticalSplitArea(initialArea)).toEqual(expectedResult);
  });
  it('works on bigger cases', () => {
    const initialArea = { origin: { x: 40, y: 15 }, end: { x: 80, y: 30 } };
    const expectedResult = [
      { origin: { x: 40, y: 15 }, end: { x: 60, y: 30 } },
      { origin: { x: 60, y: 15 }, end: { x: 80, y: 30 } },
    ];
    expect(verticalSplitArea(initialArea)).toEqual(expectedResult);
  });
});
