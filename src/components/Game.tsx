import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { ANIMATION_SPEED, PAUSE_TIME_BETWEEN_MOVES } from '../constants/config';
import maps from '../data/maps';
import { game } from '../reducers';
import { gameActions, INITIAL_STATE } from '../reducers/game';
import { MoveDirection } from '../typings/moveDirection';
import Map from './Map';
import Viewport from './Viewport';

const Wrapper = styled.div`
  display: flex;
`;

const SideWrapper = styled.div`
  background-color: yellow;
  width: 200px;
  padding-left: 20px;
  padding-right: 20px;
`;

const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
};

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

interface Props {
  withBackgroundMusic: boolean;
  setWithBackgroundMusic: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Game: React.FC<Props> = (props) => {
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
        inViewport={true}
        playerPosition={state.playerPosition}
        fogOfWar={true}
        moveDirection={state.moveDirection}
        tiles={state.currentMap}
        shouldPlayerAnimate={state.shouldPlayerAnimate}
      />
    ) : null;
  };

  return (
    <Wrapper>
      <SideWrapper>
        <p>HP: 11/50</p>
        <p>FO: 82/90</p>
        <p>-----</p>
        <p>STR: 13</p>
        <p>DEX: 14</p>
        <p>CON: 10</p>
        <p>INT: 11</p>
        <p>WIS: 8</p>
        <p>CHA: 9</p>
        <p>-----</p>

        <div style={{ cursor: 'pointer' }} onClick={() => toggleFullScreen()}>
          FULL SCREEN
        </div>
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => props.setWithBackgroundMusic(!props.withBackgroundMusic)}
        >
          {props.withBackgroundMusic ? 'BGM: ON' : 'BGM: OFF'}
        </div>
      </SideWrapper>
      <Viewport>{renderGameContent()}</Viewport>
      <SideWrapper>:)</SideWrapper>
    </Wrapper>
  );
};
