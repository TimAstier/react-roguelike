import { Position } from '../../typings/position';
import { getSurroundingPositions } from '../getSurroundingPositions';

const mapWidth = 25;
const mapHeight = 25;

describe('getSurroundingPositions', () => {
  it('works for r = 0', () => {
    const radius = 0;
    const position: Position = [10, 10];
    const expectedPositions = [[10, 10]];
    const options = { position, radius, mapWidth, mapHeight };
    expect(getSurroundingPositions(options)).toEqual(expectedPositions);
  });
  it('works for r = 1', () => {
    const radius = 1;
    const position: Position = [10, 10];
    const expectedPositions = [
      [10, 9],
      [9, 10],
      [10, 10],
      [11, 10],
      [10, 11],
    ];
    const options = { position, radius, mapWidth, mapHeight };
    expect(getSurroundingPositions(options)).toEqual(expectedPositions);
  });
  it('works for r = 1 close in top-left corner of grid', () => {
    const radius = 1;
    const position: Position = [0, 0];
    const expectedPositions = [
      [0, 0],
      [1, 0],
      [0, 1],
    ];
    const options = { position, radius, mapWidth, mapHeight };
    expect(getSurroundingPositions(options)).toEqual(expectedPositions);
  });

  it('works for r = 1 close in bottom-right corner of grid', () => {
    const radius = 1;
    const position: Position = [mapWidth - 1, mapHeight - 1];
    const expectedPositions = [
      [mapWidth - 1, mapHeight - 2],
      [mapWidth - 2, mapHeight - 1],
      [mapWidth - 1, mapHeight - 1],
    ];
    const options = { position, radius, mapWidth, mapHeight };
    expect(getSurroundingPositions(options)).toEqual(expectedPositions);
  });
});
