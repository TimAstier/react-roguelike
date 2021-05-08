import React from 'react';

import { PAUSE_TIME_BETWEEN_MOVES } from '../constants/config';
import { gameActions } from '../reducers/game';
import { GameAction } from '../reducers/game';
import { MoveDirection } from '../typings/moveDirection';

const GAME_KEYS = ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'];

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

export const useGameKeys = (dispatch: React.Dispatch<GameAction>): void => {
  const lastMoveDate = React.useRef(Date.now());

  React.useEffect(() => {
    const handleKeyDown = (event: any) => {
      const key: string = event.key;

      // Prevent reacting to other keys
      if (!GAME_KEYS.includes(key)) {
        return;
      }

      event.preventDefault();

      // Prevent moving again before animation is finished
      if (Date.now() - lastMoveDate.current < PAUSE_TIME_BETWEEN_MOVES) {
        return;
      }

      // Perform the move
      lastMoveDate.current = Date.now();
      const direction = mapKeyCodeToDirection(key);
      if (direction) {
        dispatch(gameActions.movePlayer(direction));
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
};
