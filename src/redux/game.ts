import { AnyAction } from 'redux';

import { GRID_WIDTH } from '../constants/grid';
import { MoveDirection } from '../typings/moveDirection';
import { Position } from '../typings/position';

// TYPES

const MOVE_PLAYER = '@game/MOVE_PLAYER';

// INITIAL_STATE

interface GameState {
  moveDirection: MoveDirection;
  playerPosition: Position;
}

const INITIAL_STATE: GameState = {
  moveDirection: 'Right',
  playerPosition: [0, 0],
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
        };
      }
      return {
        ...state,
        moveDirection: 'Down',
      };
    default: return state;
  }
};

export default function (state = INITIAL_STATE, action: AnyAction) {
  switch (action.type) {
    case MOVE_PLAYER:
      return reduceMovePlayer(state, action.payload);
    default:
      return INITIAL_STATE;
  }
}

// ACTIONS

const movePlayer = (direction: MoveDirection) => ({ type: MOVE_PLAYER, payload: direction });

export const actions = {
  movePlayer,
};
