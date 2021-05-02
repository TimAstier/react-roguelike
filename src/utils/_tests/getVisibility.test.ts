import { maps } from '../../data/maps';
import { createGameMap } from '../../pcg/generateLevel';
import { Position } from '../../typings/Position';
import { getVisibility } from '../getVisibility';

describe('getVisibility', () => {
  it('works for straight clear', () => {
    const gameMap = createGameMap(maps.testMap, [11, 3], 15, 8);
    const playerPosition: Position = [11, 3];
    const position: Position = [10, 3];
    const visibility = getVisibility({ position, playerPosition, gameMap });
    expect(visibility).toEqual('clear');
  });
  it('works for straight dim', () => {
    const gameMap = createGameMap(maps.testMap, [11, 3], 15, 8);
    const playerPosition: Position = [11, 3];
    const position: Position = [6, 3];
    const visibility = getVisibility({ position, playerPosition, gameMap });
    expect(visibility).toEqual('dim');
  });
  it('works for straight dark', () => {
    const gameMap = createGameMap(maps.testMap, [11, 3], 15, 8);
    const playerPosition: Position = [11, 3];
    const position: Position = [4, 3];
    const visibility = getVisibility({ position, playerPosition, gameMap });
    expect(visibility).toEqual('dark');
  });
  it('works for adjacent walls', () => {
    const gameMap = createGameMap(maps.testMap, [11, 3], 15, 8);
    const playerPosition: Position = [11, 3];
    const position: Position = [11, 1];
    const visibility = getVisibility({ position, playerPosition, gameMap });
    expect(visibility).toEqual('clear');
  });
  it('prevents seing walls behind walls', () => {
    const gameMap = createGameMap(maps.testMap, [11, 3], 15, 8);
    const playerPosition: Position = [11, 3];
    const position: Position = [11, 0];
    const visibility = getVisibility({ position, playerPosition, gameMap });
    expect(visibility).toEqual('dark');
  });
  it('prevents seing through walls', () => {
    const gameMap = createGameMap(maps.testMap, [11, 3], 15, 8);
    const playerPosition: Position = [11, 3];
    const position: Position = [13, 3];
    const visibility = getVisibility({ position, playerPosition, gameMap });
    expect(visibility).toEqual('dark');
  });
  it('prevents seing through 1 wall diagonally', () => {
    const gameMap = createGameMap(maps.testMap, [11, 3], 15, 8);
    const playerPosition: Position = [11, 3];
    const position: Position = [11, 5];
    const visibility = getVisibility({ position, playerPosition, gameMap });
    expect(visibility).toEqual('dark');
  });
  it.skip('prevents seing through diagonals between walls', () => {
    const gameMap = createGameMap(maps.testMap, [1, 1], 15, 8);
    const playerPosition: Position = [1, 1];
    const position: Position = [2, 2];
    const visibility = getVisibility({ position, playerPosition, gameMap });
    expect(visibility).toEqual('dark');
  });
  it('prevents seing through walls in diagonal', () => {
    const gameMap = createGameMap(maps.testMap, [11, 3], 15, 8);
    const playerPosition: Position = [11, 3];
    const position: Position = [13, 5];
    const visibility = getVisibility({ position, playerPosition, gameMap });
    expect(visibility).toEqual('dark');
  });
  it('sees diagonal walls in corners', () => {
    const gameMap = createGameMap(maps.testMap, [11, 3], 15, 8);
    const playerPosition: Position = [11, 3];
    const position: Position = [12, 4];
    const visibility = getVisibility({ position, playerPosition, gameMap });
    expect(visibility).toEqual('clear');
  });
});
