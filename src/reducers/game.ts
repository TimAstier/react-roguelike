import { Reducer } from 'react';

import { GRID_HEIGHT, GRID_WIDTH, MAX_VISIBILITY } from '../constants/config';
import { CellData, CellTile } from '../typings/cell';
import { MoveDirection } from '../typings/moveDirection';
import { Position } from '../typings/position';
import { getSurroundingPositions } from '../utils/getSurroundingPositions';
import { getVisibility } from '../utils/getVisibility';

// ACTIONS

export type GameAction =
  | { type: '@@GAME/MOVE_PLAYER'; direction: MoveDirection }
  | { type: '@@GAME/SET_CURRENT_MAP'; currentMap: CellData[][] }
  | { type: '@@GAME/INIT_PLAYER_SPAWN'; playerSpawn: Position };

const movePlayer = (direction: MoveDirection): GameAction => ({
  type: '@@GAME/MOVE_PLAYER',
  direction,
});

const setCurrentMap = (currentMap: CellData[][]): GameAction => ({
  type: '@@GAME/SET_CURRENT_MAP',
  currentMap,
});

const initPlayerSpawn = (playerSpawn: Position): GameAction => ({
  type: '@@GAME/INIT_PLAYER_SPAWN',
  playerSpawn,
});

export const gameActions = {
  movePlayer,
  setCurrentMap,
  initPlayerSpawn,
};

// INITIAL_STATE

export interface GameState {
  currentMap: CellData[][] | null;
  moveDirection: MoveDirection;
  playerPosition: Position;
  playerPreviousPosition: Position;
  shouldPlayerAnimate: boolean;
}

export const INITIAL_STATE: GameState = {
  currentMap: null,
  moveDirection: 'Right',
  playerPosition: [0, 0],
  playerPreviousPosition: [0, 0],
  shouldPlayerAnimate: false,
};

// REDUCER

const reduceMovePlayer = (state = INITIAL_STATE, moveDirection: MoveDirection) => {
  let nextTileX: number;
  let nextTileY: number;
  let nextTile: CellTile;

  if (state.currentMap === null) {
    return state;
  }

  const moveToNewPosition = (position: Position) => {
    const newGameMap = state.currentMap;
    if (newGameMap) {
      // Empty previous location
      newGameMap[state.playerPosition[1]][state.playerPosition[0]].content = 0;

      // Move player
      newGameMap[position[1]][position[0]].content = 'Player';

      // TODO: Only set to 'dim' to cells that just went out of visibility
      // Then we should be able to remove "Set dark revealed cells to dim"
      // First reset all cells to dark
      newGameMap.forEach((row) => {
        row.forEach((cell) => {
          cell.visibility = 'dark';
        });
      });

      // Get surroundingPositions
      const surroundingPositions = getSurroundingPositions(position, MAX_VISIBILITY);

      // Visibility
      surroundingPositions.forEach((p) => {
        const visibility = getVisibility({
          position: p,
          playerPosition: position,
          gameMap: newGameMap,
        });
        newGameMap[p[1]][p[0]].visibility = visibility;

        // Update revealed for visible cells
        const visible = visibility === 'clear' || visibility === 'dim';
        if (visible && newGameMap[p[1]][p[0]].revealed === false) {
          newGameMap[p[1]][p[0]].revealed = true;
        }
      });

      // Set dark revealed cells to dim
      newGameMap.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell.visibility === 'dark' && cell.revealed === true) {
            newGameMap[y][x].visibility = 'dim';
          }
        });
      });

      return {
        ...state,
        currentMap: newGameMap,
        moveDirection,
        playerPosition: position,
        playerPreviousPosition: state.playerPosition,
        shouldPlayerAnimate: true,
      };
    }
    return state;
  };

  const moveAndStayAtSamePosition = () => ({ ...state, moveDirection, shouldPlayerAnimate: false });

  switch (moveDirection) {
    case 'Left':
      nextTileX =
        state.playerPosition[0] > 0 ? state.playerPosition[0] - 1 : state.playerPosition[0];
      nextTileY = state.playerPosition[1];
      nextTile = state.currentMap[nextTileY][nextTileX].tile;

      if (state.playerPosition[0] > 0 && nextTile !== '#') {
        return moveToNewPosition([nextTileX, nextTileY]);
      }
      return moveAndStayAtSamePosition();

    case 'Right':
      nextTileX =
        state.playerPosition[0] < GRID_WIDTH
          ? state.playerPosition[0] + 1
          : state.playerPosition[0];
      nextTileY = state.playerPosition[1];

      nextTile = state.currentMap[nextTileY][nextTileX].tile;

      if (state.playerPosition[0] < GRID_WIDTH - 1 && nextTile !== '#') {
        return moveToNewPosition([nextTileX, nextTileY]);
      }
      return moveAndStayAtSamePosition();

    case 'Up':
      nextTileX = state.playerPosition[0];
      nextTileY =
        state.playerPosition[1] > 0 ? state.playerPosition[1] - 1 : state.playerPosition[1];
      nextTile = state.currentMap[nextTileY][nextTileX].tile;

      if (state.playerPosition[1] > 0 && nextTile !== '#') {
        return moveToNewPosition([nextTileX, nextTileY]);
      }
      return moveAndStayAtSamePosition();

    case 'Down':
      nextTileX = state.playerPosition[0];
      nextTileY =
        state.playerPosition[1] < GRID_HEIGHT - 1
          ? state.playerPosition[1] + 1
          : state.playerPosition[1];
      nextTile = state.currentMap[nextTileY][nextTileX].tile;

      if (state.playerPosition[1] < GRID_HEIGHT - 1 && nextTile !== '#') {
        return moveToNewPosition([nextTileX, nextTileY]);
      }
      return moveAndStayAtSamePosition();

    default:
      return state;
  }
};

export const game: Reducer<GameState, GameAction> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case '@@GAME/MOVE_PLAYER':
      return reduceMovePlayer(state, action.direction);
    case '@@GAME/SET_CURRENT_MAP':
      return { ...state, currentMap: action.currentMap };
    case '@@GAME/INIT_PLAYER_SPAWN':
      return {
        ...state,
        playerPosition: action.playerSpawn,
        playerPreviousPosition: action.playerSpawn,
      };
    default:
      return INITIAL_STATE;
  }
};
