import React from 'react';
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

const GAME_KEYS = ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'Escape', 'i'];

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

interface Props {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  withBackgroundMusic: boolean;
  setWithBackgroundMusic: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Game: React.FC<Props> = (props) => {
  const lastMoveDate = React.useRef(Date.now());
  const [pointerEvents, setPointerEvents] = React.useState<'auto' | 'none'>('auto');

  React.useEffect(() => {
    if (props.state.currentMap === null) {
      const level = generateLevel();
      props.dispatch(gameActions.initPlayerSpawn(level.playerSpawn));
      props.dispatch(gameActions.setCurrentMap(level.gameMap));
    }
    props.dispatch(gameActions.initVisibility());
  }, []);

  React.useEffect(() => {
    // We prevent pointer events while the player is moving to avoid lags
    const value = props.state.gameMode === 'move' ? 'none' : 'auto';
    setPointerEvents(value);
  }, [props.state.gameMode]);

  React.useEffect(() => {
    const handleKeyDown = (event: any) => {
      const key: string = event.key;

      // Prevent reacting to other keys
      if (!GAME_KEYS.includes(key)) {
        return;
      }

      if (key === 'i') {
        return props.dispatch(gameActions.updateGameMode('inspect'));
      }

      if (key === 'Escape') {
        return props.dispatch(gameActions.updateGameMode('move'));
      }

      event.preventDefault();

      // Prevent moving again before animation is finished
      if (Date.now() - lastMoveDate.current < ANIMATION_SPEED + PAUSE_TIME_BETWEEN_MOVES) {
        return;
      }

      props.dispatch(gameActions.updateGameMode('move'));

      // Perform the move
      lastMoveDate.current = Date.now();
      const direction = mapKeyCodeToDirection(key);
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

  const cursor = props.state.gameMode === 'move' ? 'default' : 'help';

  return (
    <div style={{ userSelect: 'none', cursor }}>
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
        <div style={{ pointerEvents }}>
          <DoubleBorders>
            <Viewport>{renderGameContent()}</Viewport>
          </DoubleBorders>
        </div>
        <SideWrapper
          style={{
            marginLeft: '15px',
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
          }}
        >
          <Inventory inventory={props.state.inventory} />
          <div>
            <DoubleBorders>
              <p
                style={{ cursor: 'pointer' }}
                onClick={() => props.dispatch(gameActions.updateGameMode('inspect'))}
              >
                <span style={{ color: 'gold' }}>I</span>
                <span style={{ color: props.state.gameMode === 'inspect' ? 'gold' : 'white' }}>
                  nspect
                </span>
              </p>
            </DoubleBorders>
          </div>
        </SideWrapper>
      </Wrapper>
      <InteractionText interactionText={props.state.interactionText} />
    </div>
  );
};
