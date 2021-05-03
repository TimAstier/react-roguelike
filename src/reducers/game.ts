import { Reducer } from 'react';

import { GRID_HEIGHT, GRID_WIDTH } from '../constants/config';
import { CellData, CellTile } from '../typings/cell';
import { MoveDirection } from '../typings/moveDirection';
import { Position } from '../typings/position';
import { updateVisibility } from '../utils/updateVisibility';

// ACTIONS

interface UpdateCellPayload {
  cellData: CellData;
  position: Position;
}

export type GameAction =
  | { type: '@@GAME/MOVE_PLAYER'; direction: MoveDirection }
  | { type: '@@GAME/SET_CURRENT_MAP'; currentMap: CellData[][] }
  | { type: '@@GAME/INIT_PLAYER_SPAWN'; playerSpawn: Position }
  | { type: '@@GAME/UPDATE_CELL'; payload: UpdateCellPayload };

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

const updateCell = (payload: UpdateCellPayload): GameAction => ({
  type: '@@GAME/UPDATE_CELL',
  payload,
});

export const gameActions = {
  movePlayer,
  setCurrentMap,
  initPlayerSpawn,
  updateCell,
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
    let newGameMap = state.currentMap;
    if (newGameMap) {
      // Empty previous location
      newGameMap[state.playerPosition[1]][state.playerPosition[0]].content = 0;

      // Move player
      newGameMap[position[1]][position[0]].content = 'Player';

      // Update visibility
      newGameMap = updateVisibility(position, newGameMap);

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

const reduceUpdateCell = (state = INITIAL_STATE, payload: UpdateCellPayload) => {
  // TODO: Make state immutable?
  const gameMap = state.currentMap;
  const { position, cellData } = payload;

  if (gameMap !== null) {
    gameMap[position[1]][position[0]] = cellData;
  }

  return {
    ...state,
    gameMap,
  };
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
    case '@@GAME/UPDATE_CELL':
      return reduceUpdateCell(state, action.payload);
    default:
      return INITIAL_STATE;
  }
};
