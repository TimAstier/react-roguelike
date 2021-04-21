import React, { useEffect, useRef } from 'react';

import { ANIMATION_SPEED, PAUSE_TIME_BETWEEN_MOVES } from '../constants/config';
import maps from '../data/maps';
import { game } from '../reducers';
import { gameActions, INITIAL_STATE } from '../reducers/game';
import { MoveDirection } from '../typings/moveDirection';
import Map from './Map';
import Viewport from './Viewport';

const LEFT_KEYCODE = 37;
const UP_KEYCODE = 38;
const RIGHT_KEYCODE = 39;
const DOWN_KEYCODE = 40;

const GAME_KEYS = [LEFT_KEYCODE, RIGHT_KEYCODE, UP_KEYCODE, DOWN_KEYCODE];

const mapKeyCodeToDirection = (keyCode: number): MoveDirection | undefined => {
  if (!GAME_KEYS.includes(keyCode)) {
    return undefined;
  }
  switch (keyCode) {
    case LEFT_KEYCODE:
      return 'Left';
    case RIGHT_KEYCODE:
      return 'Right';
    case UP_KEYCODE:
      return 'Up';
    case DOWN_KEYCODE:
      return 'Down';
  }
};

export const Game: React.FC = () => {
  const [state, dispatch] = React.useReducer(game, INITIAL_STATE);
  const lastMoveDate = useRef(Date.now());

  useEffect(() => {
    dispatch(gameActions.setCurrentMap(maps.intro));
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      const keyCode: number = event.keyCode;

      // Prevent reacting to other keys
      if (!GAME_KEYS.includes(keyCode)) {
        return;
      }

      event.preventDefault();

      // Prevent moving again before animation is finished
      if (Date.now() - lastMoveDate.current < ANIMATION_SPEED + PAUSE_TIME_BETWEEN_MOVES) {
        return;
      }

      // Perform the move
      lastMoveDate.current = Date.now();
      const direction = mapKeyCodeToDirection(keyCode);
      if (direction) {
        dispatch(gameActions.movePlayer(direction));
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const renderGameContent = () => {
    return state.currentMap ? (
      <Map
        playerPosition={state.playerPosition}
        moveDirection={state.moveDirection}
        tiles={state.currentMap}
        shouldPlayerAnimate={state.shouldPlayerAnimate}
      />
    ) : null;
  };

  return <Viewport>{renderGameContent()}</Viewport>;
};
