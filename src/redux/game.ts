import { AnyAction } from 'redux';

import { GRID_WIDTH } from '../constants/grid';
import { MoveDirection } from '../typings/moveDirection';
import { Position } from '../typings/position';

// TYPES

const MOVE_PLAYER = '@game/MOVE_PLAYER';

// INITIAL_STATE

export interface GameState {
  moveDirection: MoveDirection;
  playerPosition: Position;
  playerPreviousPosition: Position;
}

const INITIAL_STATE: GameState = {
  moveDirection: 'Right',
  playerPosition: [0, 0],
  playerPreviousPosition: [0, 0],
};

// REDUCER

const reduceMovePlayer = (state = INITIAL_STATE, direction: MoveDirection) => {
  switch (direction) {
    case 'Left':
      if (state.playerPosition[1] > 0) {
        return {
          ...state,
          moveDirection: 'Left',
          playerPosition: [state.playerPosition[0], state.playerPosition[1] - 1],
          playerPreviousPosition: state.playerPosition,
        };
      }
      return {
        ...state,
        moveDirection: 'Left',
      };
    case 'Right':
      if (state.playerPosition[1] < GRID_WIDTH - 1) {
        return {
          moveDirection: 'Right',
          playerPosition: [state.playerPosition[0], state.playerPosition[1] + 1],
          playerPreviousPosition: state.playerPosition,
        };
      }
      return {
        ...state,
        moveDirection: 'Right',
      };
    case 'Up':
      if (state.playerPosition[0] > 0) {
        return {
          moveDirection: 'Up',
          playerPosition: [state.playerPosition[0] - 1, state.playerPosition[1]],
          playerPreviousPosition: state.playerPosition,
        };
      }
      return {
        ...state,
        moveDirection: 'Up',
      };
    case 'Down':
      if (state.playerPosition[0] < GRID_WIDTH - 1) {
        return {
          moveDirection: 'Down',
          playerPosition: [state.playerPosition[0] + 1, state.playerPosition[1]],
          playerPreviousPosition: state.playerPosition,
        };
      }
      return {
        ...state,
        moveDirection: 'Down',
      };
    default:
      return state;
  }
};

export default function(state = INITIAL_STATE, action: AnyAction) {
  switch (action.type) {
    case MOVE_PLAYER:
      return reduceMovePlayer(state, action.payload);
    default:
      return INITIAL_STATE;
  }
}

// ACTIONS

const movePlayer = (direction: MoveDirection) => ({
  type: MOVE_PLAYER,
  payload: direction,
});

export const gameActions = {
  movePlayer,
};

// SELECTORS

const getShouldPlayerAnimate = (state: GameState) => {
  if (state.moveDirection === 'Left' && state.playerPosition[1] === 0) {
    if (state.playerPreviousPosition[1] === 1) {
      return true;
    }
    return false;
  }
  if (state.moveDirection === 'Right' && state.playerPosition[1] === GRID_WIDTH - 1) {
    if (state.playerPreviousPosition[1] === GRID_WIDTH - 2) {
      return true;
    }
    return false;
  }
  if (state.moveDirection === 'Up' && state.playerPosition[0] === 0) {
    if (state.playerPreviousPosition[0] === 1) {
      return true;
    }
    return false;
  }
  if (state.moveDirection === 'Down' && state.playerPosition[0] === GRID_WIDTH - 1) {
    if (state.playerPreviousPosition[0] === GRID_WIDTH - 2) {
      return true;
    }
    return false;
  }
  return true;
};

export const gameSelectors = {
  getShouldPlayerAnimate,
};
