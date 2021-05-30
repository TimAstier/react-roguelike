import React from 'react';
import seedrandom from 'seedrandom';
import styled from 'styled-components';

import { GameAction, gameActions, GameState } from '../../game-logic/game';
import { generateLevel } from '../../pcg/generateLevel';
import { getRandomString } from '../../utils/getRandomString';
import { sortCreatures } from '../../utils/sortCreatures';
import { Canvas } from '../Canvas';
import { useAreFontLoaded } from '../hooks/useAreFontsLoaded';
import { useGameKeys } from '../hooks/useGameKeys';
import { DoubleBorders } from '../Shared/DoubleBorders';
import { Viewport } from '../Shared/Viewport';
import { CreatureBlocks } from './CreatureBlocks';
import { EquipedItems } from './EquipedItems';
import { EventLogs } from './EventLogs';
import { GameOver } from './GameOver';
import { InteractionText } from './InteractionText';
import { Inventory } from './Inventory';
import { PlayerStats } from './PlayerStats';

const Wrapper = styled.div`
  height: 789px;
  user-select: none;
  width: 100%;
`;

const InnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-width: 1200px;
  max-width: 1400px;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
`;

const SideWrapper = styled.div`
  width: 230px;
  background-color: black;
  color: white;
`;

interface Props {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  withBackgroundMusic: boolean;
  setWithBackgroundMusic: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Game: React.FC<Props> = (props) => {
  const areFontsLoaded = useAreFontLoaded();
  useGameKeys(props.dispatch, props.state.gameStatus);

  React.useEffect(() => {
    if (props.state.currentMap.length === 0) {
      const seed = getRandomString();
      const rng = seedrandom(seed);
      const level = generateLevel(rng);
      props.dispatch(gameActions.setSeed(seed));
      props.dispatch(gameActions.setCurrentMap(level.gameMap));
      props.dispatch(gameActions.initPlayerSpawn(level.playerSpawn));
    }
    props.dispatch(gameActions.initVisibility());
    props.dispatch(gameActions.initCreatures());
  }, []);

  if (!areFontsLoaded) {
    return null;
  }

  const visibleEntities = sortCreatures({
    creatures: props.state.creatures,
    currentMap: props.state.currentMap,
    hitsLastRound: props.state.hitsLastRound,
  });

  return (
    <Wrapper>
      <InnerWrapper>
        <SideWrapper
          style={{
            marginRight: '15px',
            paddingRight: 5,
            paddingLeft: 5,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <PlayerStats
            characterName={props.state.characterName}
            hp={props.state.hp}
            maxHp={props.state.maxHp}
            gold={props.state.gold}
            withBackgroundMusic={props.withBackgroundMusic}
            setWithBackgroundMusic={props.setWithBackgroundMusic}
            playerConditions={props.state.playerConditions}
          />
          <CreatureBlocks entities={visibleEntities} />
        </SideWrapper>
        <div>
          <EventLogs eventLogs={props.state.eventLogs} />
          <div>
            <DoubleBorders>
              <Viewport>
                {props.state.currentMap && props.state.gameStatus === 'playing' && (
                  <Canvas
                    playerPosition={props.state.playerPosition}
                    gameMap={props.state.currentMap}
                    moveDirection={props.state.moveDirection}
                    hitsLastRound={props.state.hitsLastRound}
                    round={props.state.round}
                    dispatch={props.dispatch}
                  />
                )}
                {props.state.gameStatus === 'gameover' && (
                  <GameOver deathText={props.state.deathText} />
                )}
              </Viewport>
            </DoubleBorders>
          </div>
        </div>
        <SideWrapper
          style={{
            marginLeft: '15px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            height: 627,
            marginTop: 90,
          }}
        >
          <EquipedItems equipedItems={props.state.equipedItems} />
          <Inventory inventory={props.state.inventory} />
        </SideWrapper>
      </InnerWrapper>
      <InteractionText
        interactionText={props.state.gameStatus === 'playing' ? props.state.interactionText : ''}
      />
    </Wrapper>
  );
};
