import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { ANIMATION_SPEED, PAUSE_TIME_BETWEEN_MOVES } from '../constants/config';
import { generateLevel } from '../pcg/generateLevel';
import { GameAction, GameState } from '../reducers/game';
import { gameActions } from '../reducers/game';
import { MoveDirection } from '../typings/moveDirection';
import { DoubleBorders } from './DoubleBorders';
import { EventLogs } from './EventLogs';
import { InteractionText } from './InteractionText';
import { Inventory } from './Inventory';
import Map from './Map';
import { PlayerStats } from './PlayerStats';
import Viewport from './Viewport';

const Wrapper = styled.div`
  display: flex;
`;

const SideWrapper = styled.div`
  width: 230px;
  background-color: black;
  color: white;
`;

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
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  withBackgroundMusic: boolean;
  setWithBackgroundMusic: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Game: React.FC<Props> = (props) => {
  const lastMoveDate = useRef(Date.now());

  useEffect(() => {
    if (props.state.currentMap === null) {
      const level = generateLevel();
      props.dispatch(gameActions.initPlayerSpawn(level.playerSpawn));
      props.dispatch(gameActions.setCurrentMap(level.gameMap));
    }
    props.dispatch(gameActions.initVisibility());
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
        props.dispatch(gameActions.movePlayer(direction));
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const renderGameContent = () => {
    return props.state.currentMap ? (
      <Map
        inViewport={true}
        playerPosition={props.state.playerPosition}
        fogOfWar={true}
        moveDirection={props.state.moveDirection}
        gameMap={props.state.currentMap}
        shouldPlayerAnimate={props.state.shouldPlayerAnimate}
        dispatch={props.dispatch}
      />
    ) : null;
  };

  return (
    <div style={{ userSelect: 'none' }}>
      <EventLogs eventLogs={props.state.eventLogs} />
      <Wrapper>
        <SideWrapper
          style={{
            marginRight: '15px',
            paddingRight: 5,
            paddingLeft: 5,
            boxSizing: 'border-box',
          }}
        >
          <PlayerStats
            characterName={props.state.characterName}
            hp={props.state.hp}
            maxHp={props.state.maxHp}
            gold={props.state.gold}
            equipedItems={props.state.equipedItems}
            withBackgroundMusic={props.withBackgroundMusic}
            setWithBackgroundMusic={props.setWithBackgroundMusic}
          />
        </SideWrapper>
        <div>
          <DoubleBorders>
            <Viewport>{renderGameContent()}</Viewport>
          </DoubleBorders>
        </div>
        <SideWrapper
          style={{
            marginLeft: '15px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Inventory inventory={props.state.inventory} />
        </SideWrapper>
      </Wrapper>
      <InteractionText interactionText={props.state.interactionText} />
    </div>
  );
};
