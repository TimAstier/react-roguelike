import { TileType } from '../../constants/tiles';
import { createGameMap } from '../../pcg/generateLevel';
import { updateBurningTiles } from '../updateBurningTiles';

const mapA: TileType[][] = [
  ['.', '.', '.'],
  ['.', '"', '.'],
  ['.', '.', '.'],
];

const mapB: TileType[][] = [
  ['"', '"', '"'],
  ['"', '"', '"'],
  ['"', '"', '"'],
];

const mapC: TileType[][] = [
  ['.', '"', '.'],
  ['"', '"', '"'],
  ['.', '"', '.'],
];

const mapD: TileType[][] = [
  ['.', '.', '.', '.', '.'],
  ['.', '.', '.', '"', '.'],
  ['.', '.', '"', '"', '"'],
];

const mapE: TileType[][] = [
  ['"', '"', '"', '"'],
  ['.', '.', '.', '.'],
  ['"', '"', '"', '"'],
];

const mapF: TileType[][] = [
  ['"', '.', '"'],
  ['"', '.', '"'],
  ['"', '.', '"'],
  ['"', '.', '"'],
  ['"', '.', '"'],
];

const gameMapA = createGameMap(mapA, [1, 1], 3, 3);
const gameMapB = createGameMap(mapB, [1, 1], 3, 3);
const gameMapC = createGameMap(mapC, [1, 1], 3, 3);
const gameMapD = createGameMap(mapD, [1, 1], 5, 3);
const gameMapE = createGameMap(mapE, [1, 1], 4, 3);
const gameMapF = createGameMap(mapF, [1, 1], 3, 4);

describe('updateBurningTiles', () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.123456789);
  });
  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
  });
  it('decreases burningRounds of burning tiles', () => {
    const gameMap = gameMapA.map((arr) => arr.slice());
    gameMap[1][1] = { ...gameMap[1][1], burningRounds: 3 };
    const nextMap = updateBurningTiles(gameMap);
    expect(nextMap[1][1].burningRounds).toBeLessThan(3);
  });
  it('propagates to flammable tiles', () => {
    const gameMap = JSON.parse(JSON.stringify(gameMapC));
    gameMap[1][1] = { ...gameMap[1][1], burningRounds: 3 };
    const nextMap = updateBurningTiles(gameMap);
    expect(nextMap[1][2].burningRounds).toBeGreaterThan(0);
    expect(nextMap[1][0].burningRounds).toBeGreaterThan(0);
    expect(nextMap[0][1].burningRounds).toBeGreaterThan(0);
    expect(nextMap[2][1].burningRounds).toBeGreaterThan(0);
  });
  it('propagates to flammable tiles', () => {
    const gameMap = JSON.parse(JSON.stringify(gameMapD));
    gameMap[2][3] = { ...gameMap[2][3], burningRounds: 3 };
    const nextMap = updateBurningTiles(gameMap);
    expect(nextMap[2][4].burningRounds).toBeGreaterThan(0);
    expect(nextMap[2][2].burningRounds).toBeGreaterThan(0);
    expect(nextMap[1][3].burningRounds).toBeGreaterThan(0);
  });
  it('does not propagate to non-flammable tiles', () => {
    const gameMap = gameMapA.map((arr) => arr.slice());
    gameMap[1][1] = { ...gameMap[1][1], burningRounds: 3 };
    const nextMap = updateBurningTiles(gameMap);
    expect(nextMap[2][1].burningRounds).toEqual(0);
  });
  it('creates ashes when tile finishes burning', () => {
    const gameMap = gameMapA.map((arr) => arr.slice());
    gameMap[1][1] = { ...gameMap[1][1], burningRounds: 1 };
    const nextMap = updateBurningTiles(gameMap);
    expect(nextMap[1][1].burningRounds).toEqual(0);
    expect(nextMap[1][1].tile).toEqual("'");
  });
  it('does not propagates from tiles that just became on fire', () => {
    const gameMap = JSON.parse(JSON.stringify(gameMapB));
    gameMap[1][1] = { ...gameMap[1][1], burningRounds: 3 };
    const nextMap = updateBurningTiles(gameMap);
    expect(nextMap[0][0].burningRounds).toEqual(0);
    expect(nextMap[2][2].burningRounds).toEqual(0);
    expect(nextMap[0][2].burningRounds).toEqual(0);
    expect(nextMap[2][0].burningRounds).toEqual(0);
  });
  it('does not propagates horizontally from tiles that just became on fire', () => {
    const gameMap = JSON.parse(JSON.stringify(gameMapE));
    gameMap[0][0] = { ...gameMap[0][0], burningRounds: 3 };
    gameMap[2][3] = { ...gameMap[2][3], burningRounds: 3 };
    const nextMap = updateBurningTiles(gameMap);
    expect(nextMap[0][3].burningRounds).toEqual(0);
    expect(nextMap[2][0].burningRounds).toEqual(0);
  });
  it('does not propagates vertically from tiles that just became on fire', () => {
    const gameMap = JSON.parse(JSON.stringify(gameMapF));
    gameMap[0][0] = { ...gameMap[0][0], burningRounds: 3 };
    gameMap[3][2] = { ...gameMap[3][2], burningRounds: 3 };
    const nextMap = updateBurningTiles(gameMap);
    expect(nextMap[3][0].burningRounds).toEqual(0);
    expect(nextMap[0][2].burningRounds).toEqual(0);
  });
  it('takesFlammability into account to randomly propagates', () => {});
  // Not decrement tiles that started burning
});
