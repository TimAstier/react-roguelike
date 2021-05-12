import { maps } from '../../data';
import { createGameMap } from '../../pcg/generateLevel';
import { Position } from '../../typings/position';
import { getVisibility } from '../getVisibility';

const maxClearVisibility = 4.5;
const maxVisibility = 6.5;

describe('getVisibility', () => {
  it('works for straight clear', () => {
    const gameMap = createGameMap(maps.testMap, [11, 3], 15, 8);
    const playerPosition: Position = [11, 3];
    const position: Position = [10, 3];
    const visibility = getVisibility({
      position,
      playerPosition,
      gameMap,
      maxClearVisibility,
      maxVisibility,
    });
    expect(visibility).toEqual('clear');
  });
  it('works for straight dim', () => {
    const gameMap = createGameMap(maps.testMap, [11, 3], 15, 8);
    const playerPosition: Position = [11, 3];
    const position: Position = [6, 3];
    const visibility = getVisibility({
      position,
      playerPosition,
      gameMap,
      maxClearVisibility,
      maxVisibility,
    });
    expect(visibility).toEqual('dim');
  });
  it('works for straight dark', () => {
    const gameMap = createGameMap(maps.testMap, [11, 3], 15, 8);
    const playerPosition: Position = [11, 3];
    const position: Position = [4, 3];
    const visibility = getVisibility({
      position,
      playerPosition,
      gameMap,
      maxClearVisibility,
      maxVisibility,
    });
    expect(visibility).toEqual('dark');
  });
  it('allows seeing adjacent walls', () => {
    const gameMap = createGameMap(maps.testMap, [11, 3], 15, 8);
    const playerPosition: Position = [11, 3];
    const position: Position = [11, 1];
    const visibility = getVisibility({
      position,
      playerPosition,
      gameMap,
      maxClearVisibility,
      maxVisibility,
    });
    expect(visibility).toEqual('clear');
  });
  it('prevents seing walls behind walls', () => {
    const gameMap = createGameMap(maps.testMap, [11, 3], 15, 8);
    const playerPosition: Position = [11, 3];
    const position: Position = [11, 0];
    const visibility = getVisibility({
      position,
      playerPosition,
      gameMap,
      maxClearVisibility,
      maxVisibility,
    });
    expect(visibility).toEqual('dark');
  });
  it('prevents seing through walls', () => {
    const gameMap = createGameMap(maps.testMap, [11, 3], 15, 8);
    const playerPosition: Position = [11, 3];
    const position: Position = [13, 3];
    const visibility = getVisibility({
      position,
      playerPosition,
      gameMap,
      maxClearVisibility,
      maxVisibility,
    });
    expect(visibility).toEqual('dark');
  });
  it('prevents seing through 1 wall diagonally', () => {
    const gameMap = createGameMap(maps.testMap, [11, 3], 15, 8);
    const playerPosition: Position = [11, 3];
    const position: Position = [11, 5];
    const visibility = getVisibility({
      position,
      playerPosition,
      gameMap,
      maxClearVisibility,
      maxVisibility,
    });
    expect(visibility).toEqual('dark');
  });
  it.skip('prevents seing through diagonals between walls', () => {
    const gameMap = createGameMap(maps.testMap, [1, 1], 15, 8);
    const playerPosition: Position = [1, 1];
    const position: Position = [2, 2];
    const visibility = getVisibility({
      position,
      playerPosition,
      gameMap,
      maxClearVisibility,
      maxVisibility,
    });
    expect(visibility).toEqual('dark');
  });
  it('prevents seing through walls in diagonal', () => {
    const gameMap = createGameMap(maps.testMap, [11, 3], 15, 8);
    const playerPosition: Position = [11, 3];
    const position: Position = [13, 5];
    const visibility = getVisibility({
      position,
      playerPosition,
      gameMap,
      maxClearVisibility,
      maxVisibility,
    });
    expect(visibility).toEqual('dark');
  });
  it('sees diagonal walls in corners', () => {
    const gameMap = createGameMap(maps.testMap, [11, 3], 15, 8);
    const playerPosition: Position = [11, 3];
    const position: Position = [12, 4];
    const visibility = getVisibility({
      position,
      playerPosition,
      gameMap,
      maxClearVisibility,
      maxVisibility,
    });
    expect(visibility).toEqual('clear');
  });
  it('prevents seing through doors', () => {
    const gameMap = createGameMap(maps.testMap, [11, 3], 15, 8);
    const playerPosition: Position = [1, 3];
    const position: Position = [1, 5];
    const visibility = getVisibility({
      position,
      playerPosition,
      gameMap,
      maxClearVisibility,
      maxVisibility,
    });
    expect(visibility).toEqual('dark');
  });
  it('allows seeing adjacent doors', () => {
    const gameMap = createGameMap(maps.testMap, [11, 3], 15, 8);
    const playerPosition: Position = [1, 3];
    const position: Position = [1, 4];
    const visibility = getVisibility({
      position,
      playerPosition,
      gameMap,
      maxClearVisibility,
      maxVisibility,
    });
    expect(visibility).toEqual('clear');
  });
  it('allows seeing both ways when standing on a door', () => {
    const gameMap = createGameMap(maps.testMap, [11, 3], 15, 8);
    const playerPosition: Position = [1, 4];
    const positionA: Position = [1, 3];
    const positionB: Position = [1, 4];
    const positionC: Position = [1, 5];
    const visibilityA = getVisibility({
      position: positionA,
      playerPosition,
      gameMap,
      maxClearVisibility,
      maxVisibility,
    });
    const visibilityB = getVisibility({
      position: positionB,
      playerPosition,
      gameMap,
      maxClearVisibility,
      maxVisibility,
    });
    const visibilityC = getVisibility({
      position: positionC,
      playerPosition,
      gameMap,
      maxClearVisibility,
      maxVisibility,
    });
    expect(visibilityA).toEqual('clear');
    expect(visibilityB).toEqual('clear');
    expect(visibilityC).toEqual('clear');
  });
});
