import React from 'react';

import { PAUSE_TIME_BETWEEN_MOVES } from '../../constants/config';
import { PLAYER_ACTION_SHORTCUTS, PLAYER_ACTIONS } from '../../constants/playerActions';
import { GameAction, gameActions } from '../../game-logic/game';
import { GameStatus } from '../../typings/gameStatus';
import { MoveDirection } from '../../typings/moveDirection';

const GAME_KEYS = ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'w'];

const mapKeyCodeToDirection = (key: string): MoveDirection | undefined => {
  if (!GAME_KEYS.includes(key)) {
    return undefined;
  }
  switch (key) {
    case 'ArrowLeft':
      return 'Left';
    case 'ArrowRight':
      return 'Right';
    case 'ArrowUp':
      return 'Up';
    case 'ArrowDown':
      return 'Down';
  }
};

export const useGameKeys = (dispatch: React.Dispatch<GameAction>, gameStatus: GameStatus): void => {
  const lastRoundDate = React.useRef(Date.now());

  React.useEffect(() => {
    const handleKeyDown = (event: any) => {
      const key: string = event.key;

      // Prevent reacting to other keys
      if (!GAME_KEYS.includes(key)) {
        return;
      }

      event.preventDefault();

      // Prevent moving again before animation is finished
      if (Date.now() - lastRoundDate.current < PAUSE_TIME_BETWEEN_MOVES) {
        return;
      }

      if (gameStatus === 'gameover') {
        return;
      }

      // Perform the action
      lastRoundDate.current = Date.now();

      const playerAction = PLAYER_ACTIONS.find((a) => a.gameKey === key);
      if (playerAction) {
        return dispatch(gameActions.doPlayerAction(playerAction.type));
      }

      const direction = mapKeyCodeToDirection(key);
      if (direction) {
        dispatch(gameActions.movePlayer(direction));
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameStatus]);
};
