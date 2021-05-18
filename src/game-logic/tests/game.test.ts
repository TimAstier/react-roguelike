import { produce } from 'immer';

import {
  BIG_GOLD_AMOUNT,
  BIG_GOLD_MODIFIER,
  SMALL_GOLD_AMOUNT,
  SMALL_GOLD_MODIFIER,
} from '../../constants/config';
import { TileType } from '../../constants/tiles';
import { createGameMap } from '../../pcg/generateLevel';
import { game, gameActions, GameState, INITIAL_STATE } from '../game';
import { HoverCellPayload } from '../reduceHoverCell';

// prettier-ignore

const mapA: TileType[][] = [
  ['.', '.', '.'],
  ['.', '.', '.'],
  ['.', '.', '.'],
];

const gameMapA = createGameMap(mapA, [1, 1], 3, 3);

export const mapB: TileType[][] = [
  ['.', '#', '.'],
  ['#', '.', '#'],
  ['.', '#', '.'],
];

const gameMapB = createGameMap(mapB, [1, 1], 3, 3);

describe('game reducer', () => {
  describe('player movement', () => {
    it('moves player to the right', () => {
      const state: GameState = { ...INITIAL_STATE, currentMap: gameMapA, playerPosition: [1, 1] };
      const action = gameActions.movePlayer('Right');
      const newState = produce(game)(state, action);
      expect(newState.playerPosition).toEqual([2, 1]);
      expect(newState.moveDirection).toEqual('Right');
    });
    it('moves player to the left', () => {
      const state: GameState = { ...INITIAL_STATE, currentMap: gameMapA, playerPosition: [1, 1] };
      const action = gameActions.movePlayer('Left');
      const newState = produce(game)(state, action);
      expect(newState.playerPosition).toEqual([0, 1]);
      expect(newState.moveDirection).toEqual('Left');
    });
    it('moves player up', () => {
      const state: GameState = { ...INITIAL_STATE, currentMap: gameMapA, playerPosition: [1, 1] };
      const action = gameActions.movePlayer('Up');
      const newState = produce(game)(state, action);
      expect(newState.playerPosition).toEqual([1, 0]);
      expect(newState.moveDirection).toEqual('Up');
    });
    it('moves player down', () => {
      const state: GameState = { ...INITIAL_STATE, currentMap: gameMapA, playerPosition: [1, 1] };
      const action = gameActions.movePlayer('Down');
      const newState = produce(game)(state, action);
      expect(newState.playerPosition).toEqual([1, 2]);
      expect(newState.moveDirection).toEqual('Down');
    });
    it('stays in place if there is a wall on the right', () => {
      const state: GameState = { ...INITIAL_STATE, currentMap: gameMapB, playerPosition: [1, 1] };
      const action = gameActions.movePlayer('Right');
      const newState = produce(game)(state, action);
      expect(newState.playerPosition).toEqual([1, 1]);
      expect(newState.moveDirection).toEqual('Right');
    });
    it('stays in place if there is a wall on the left', () => {
      const state: GameState = { ...INITIAL_STATE, currentMap: gameMapB, playerPosition: [1, 1] };
      const action = gameActions.movePlayer('Left');
      const newState = produce(game)(state, action);
      expect(newState.playerPosition).toEqual([1, 1]);
      expect(newState.moveDirection).toEqual('Left');
    });
    it('stays in place if there is a wall up', () => {
      const state: GameState = { ...INITIAL_STATE, currentMap: gameMapB, playerPosition: [1, 1] };
      const action = gameActions.movePlayer('Up');
      const newState = produce(game)(state, action);
      expect(newState.playerPosition).toEqual([1, 1]);
      expect(newState.moveDirection).toEqual('Up');
    });
    it('stays in place if there is a wall down', () => {
      const state: GameState = { ...INITIAL_STATE, currentMap: gameMapB, playerPosition: [1, 1] };
      const action = gameActions.movePlayer('Down');
      const newState = produce(game)(state, action);
      expect(newState.playerPosition).toEqual([1, 1]);
      expect(newState.moveDirection).toEqual('Down');
    });
    it('empties the initial interractionText', () => {
      const state: GameState = { ...INITIAL_STATE, currentMap: gameMapA, playerPosition: [1, 1] };
      expect(state.interactionText).toEqual('You enter the dungeon.');
      const action = gameActions.movePlayer('Down');
      const newState = produce(game)(state, action);
      expect(newState.interactionText).toEqual('');
    });
  });
  describe('setCurrentMap', () => {
    it('sets current map', () => {
      const state = INITIAL_STATE;
      const action = gameActions.setCurrentMap(gameMapA);
      const newState = produce(game)(state, action);
      expect(newState.currentMap).toEqual(gameMapA);
    });
  });
  describe('hoverCell', () => {
    it('says "This is you."', () => {
      const state = INITIAL_STATE;
      const payload: HoverCellPayload = {
        tileType: '.',
        visibility: 'clear',
        revealed: true,
        content: 'Player',
        burning: false,
      };
      const action = gameActions.hoverCell(payload);
      const newState = produce(game)(state, action);
      expect(newState.interactionText).toEqual('This is you.');
    });
    it('says "You see a sword."', () => {
      const state = INITIAL_STATE;
      const payload: HoverCellPayload = {
        tileType: '.',
        visibility: 'clear',
        revealed: true,
        content: 'Sword',
        burning: false,
      };
      const action = gameActions.hoverCell(payload);
      const newState = produce(game)(state, action);
      expect(newState.interactionText).toEqual('You see a sword.');
    });
    it('says "You get a glimpse of a sword."', () => {
      const state = INITIAL_STATE;
      const payload: HoverCellPayload = {
        tileType: '.',
        visibility: 'dim',
        revealed: true,
        content: 'Sword',
        burning: false,
      };
      const action = gameActions.hoverCell(payload);
      const newState = produce(game)(state, action);
      expect(newState.interactionText).toEqual('You get a glimpse of a sword.');
    });
    it('says "You remember seeing a sword here."', () => {
      const state = INITIAL_STATE;
      const payload: HoverCellPayload = {
        tileType: '.',
        visibility: 'dark',
        revealed: true,
        content: 'Sword',
        burning: false,
      };
      const action = gameActions.hoverCell(payload);
      const newState = produce(game)(state, action);
      expect(newState.interactionText).toEqual('You remember seeing a sword over there.');
    });
    it('says "You discern something on the ground."', () => {
      const state = INITIAL_STATE;
      const payload: HoverCellPayload = {
        tileType: '.',
        visibility: 'dim',
        revealed: false,
        content: 'Sword',
        burning: false,
      };
      const action = gameActions.hoverCell(payload);
      const newState = produce(game)(state, action);
      expect(newState.interactionText).toEqual('You discern something on the ground.');
    });
    it('says "You see a wall."', () => {
      const state = INITIAL_STATE;
      const payload: HoverCellPayload = {
        tileType: '#',
        visibility: 'clear',
        revealed: true,
        content: 0,
        burning: false,
      };
      const action = gameActions.hoverCell(payload);
      const newState = produce(game)(state, action);
      expect(newState.interactionText).toEqual('You see a wall.');
    });
    it('says "You get a glimpse of a wall."', () => {
      const state = INITIAL_STATE;
      const payload: HoverCellPayload = {
        tileType: '#',
        visibility: 'dim',
        revealed: true,
        content: 0,
        burning: false,
      };
      const action = gameActions.hoverCell(payload);
      const newState = produce(game)(state, action);
      expect(newState.interactionText).toEqual('You get a glimpse of a wall.');
    });
    it('says "You remember seeing a wall here."', () => {
      const state = INITIAL_STATE;
      const payload: HoverCellPayload = {
        tileType: '#',
        visibility: 'dark',
        revealed: true,
        content: 0,
        burning: false,
      };
      const action = gameActions.hoverCell(payload);
      const newState = produce(game)(state, action);
      expect(newState.interactionText).toEqual('You remember seeing a wall over there.');
    });
    it('says "You see some grass burning."', () => {
      const state = INITIAL_STATE;
      const payload: HoverCellPayload = {
        tileType: '"',
        visibility: 'clear',
        revealed: true,
        content: 0,
        burning: true,
      };
      const action = gameActions.hoverCell(payload);
      const newState = produce(game)(state, action);
      expect(newState.interactionText).toEqual('You see some grass burning.');
    });
    it('does not say "burning" for tiles you remember', () => {
      const state = INITIAL_STATE;
      const payload: HoverCellPayload = {
        tileType: '"',
        visibility: 'dark',
        revealed: true,
        content: 0,
        burning: true,
      };
      const action = gameActions.hoverCell(payload);
      const newState = produce(game)(state, action);
      expect(newState.interactionText).toEqual('You remember seeing some grass over there.');
    });
    it('says "You see something standing in the shadows."', () => {
      const state = INITIAL_STATE;
      const payload: HoverCellPayload = {
        tileType: '.',
        visibility: 'dim',
        revealed: false,
        content: 0,
        burning: false,
        creature: { id: '1', type: 'goblin' },
      };
      const action = gameActions.hoverCell(payload);
      const newState = produce(game)(state, action);
      expect(newState.interactionText).toEqual('You see something standing in the shadows.');
    });
    it('says "You see a goblin!"', () => {
      const state = INITIAL_STATE;
      const payload: HoverCellPayload = {
        tileType: '.',
        visibility: 'clear',
        revealed: false,
        content: 0,
        burning: false,
        creature: { id: '1', type: 'goblin' },
      };
      const action = gameActions.hoverCell(payload);
      const newState = produce(game)(state, action);
      expect(newState.interactionText).toEqual('You see a goblin!');
    });
  });
  describe('hoverAwayFromCell', () => {
    it('empties the interactionText', () => {
      const state: GameState = { ...INITIAL_STATE, interactionText: 'bla' };
      const action = gameActions.hoverAwayFromCell();
      const newState = produce(game)(state, action);
      expect(newState.interactionText).toEqual('');
    });
  });
  describe('loot items', () => {
    it('adds ruby to inventory', () => {
      const currentMap = gameMapA.map((arr) => arr.slice());
      currentMap[1][1] = {
        content: 'Ruby',
        tile: '.',
        revealed: true,
        visibility: 'clear',
        burningRounds: 0,
      };
      const state: GameState = { ...INITIAL_STATE, currentMap, playerPosition: [0, 1] };
      const action = gameActions.movePlayer('Right');
      const newStateA = produce(game)(state, action);
      const newStateB = produce(game)(newStateA, action);
      expect(newStateB.eventLogs).toEqual(['You found a ruby.']);
      expect(newStateB.inventory).toEqual(['Ruby']);
      if (newStateB.currentMap !== null) {
        expect(newStateB.currentMap[1][1].content).toEqual(0);
      }
    });
    it('loots SmallGold', () => {
      const currentMap = gameMapA.map((arr) => arr.slice());
      currentMap[1][1] = {
        content: 'SmallGold',
        tile: '.',
        revealed: true,
        visibility: 'clear',
        burningRounds: 0,
      };
      const state: GameState = { ...INITIAL_STATE, currentMap, playerPosition: [0, 1] };
      const action = gameActions.movePlayer('Right');
      const newStateA = produce(game)(state, action);
      const newStateB = produce(game)(newStateA, action);
      expect(newStateB.eventLogs[0]).toContain('You found');
      expect(newStateB.eventLogs[0]).toContain('gold.');
      expect(newStateB.inventory).toEqual([]);
      if (newStateB.currentMap !== null) {
        expect(newStateB.currentMap[1][1].content).toEqual(0);
      }
      expect(newStateB.gold).toBeGreaterThanOrEqual(SMALL_GOLD_AMOUNT - SMALL_GOLD_MODIFIER);
    });
    it('loots BigGold', () => {
      const currentMap = gameMapA.map((arr) => arr.slice());
      currentMap[1][1] = {
        content: 'BigGold',
        tile: '.',
        revealed: true,
        visibility: 'clear',
        burningRounds: 0,
      };
      const state: GameState = { ...INITIAL_STATE, currentMap, playerPosition: [0, 1] };
      const action = gameActions.movePlayer('Right');
      const newStateA = produce(game)(state, action);
      const newStateB = produce(game)(newStateA, action);
      expect(newStateB.eventLogs[0]).toContain('You found');
      expect(newStateB.eventLogs[0]).toContain('gold!');
      expect(newStateB.inventory).toEqual([]);
      if (newStateB.currentMap !== null) {
        expect(newStateB.currentMap[1][1].content).toEqual(0);
      }
      expect(newStateB.gold).toBeGreaterThanOrEqual(BIG_GOLD_AMOUNT - BIG_GOLD_MODIFIER);
    });
  });
});

// TODO: Visibility
