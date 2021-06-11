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
import { CreatureBlocks } from './CreatureBlocks';
import { EquipedItems } from './EquipedItems';
import { EventLogs } from './EventLogs';
import { GameOver } from './GameOver';
import { InteractionText } from './InteractionText';
import { Inventory } from './Inventory';
import { PlayerStats } from './PlayerStats';
import { ShakeLayer } from './ShakeLayer';
import { Viewport } from './Viewport';

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
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
`;

const SideWrapper = styled.div`
  width: 230px;
  background-color: black;
  color: white;
`;

const BottomBar = styled.div`
  height: 18px;
  padding-left: 25px;
  padding-right: 25px;
  width: 100%;
  min-width: 1200px;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
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

  const initMap = () => {
    const seed = props.state.seed
      ? props.state.seed.concat(String(props.state.depth))
      : getRandomString();
    const rng = seedrandom(seed);
    const level = generateLevel(rng);
    props.dispatch(gameActions.setSeed(seed));
    // NOTE: Maybe generate level should also init the initial state?
    props.dispatch(gameActions.setCurrentMap(level.gameMap));
    props.dispatch(gameActions.initPlayerSpawn(level.playerSpawn));
  };

  const initGameState = () => {
    props.dispatch(gameActions.initVisibility());
    props.dispatch(gameActions.initCreatures());
  };

  // Initialise first depth
  React.useEffect(() => {
    // Don't generate new map if coming from MapGenerator
    if (props.state.currentMap.length === 0) {
      initMap();
    }
    initGameState();
  }, []);

  // Initialise depths > 1
  React.useEffect(() => {
    if (props.state.depth > 1) {
      initMap();
      initGameState();
    }
  }, [props.state.depth]);

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
            dispatch={props.dispatch}
            hoveredCreatureId={props.state.hoveredCreatureId}
          />
          <CreatureBlocks
            entities={visibleEntities}
            dispatch={props.dispatch}
            hoveredCreatureId={props.state.hoveredCreatureId}
          />
        </SideWrapper>
        <div>
          <EventLogs eventLogs={props.state.eventLogs} />
          <ShakeLayer
            shake={props.state.hitsLastRound.filter((h) => h.creatureId !== 'player').length !== 0}
            round={props.state.round}
          >
            <DoubleBorders>
              <Viewport depth={props.state.depth}>
                {props.state.currentMap && props.state.gameStatus === 'playing' && (
                  <Canvas
                    playerPosition={props.state.playerPosition}
                    gameMap={props.state.currentMap}
                    moveDirection={props.state.moveDirection}
                    hitsLastRound={props.state.hitsLastRound}
                    deathPositionsThisRound={props.state.deathPositionsThisRound}
                    round={props.state.round}
                    dispatch={props.dispatch}
                    hoveredCreatureId={props.state.hoveredCreatureId}
                  />
                )}
                {props.state.gameStatus === 'gameover' && (
                  <GameOver deathText={props.state.deathText} />
                )}
              </Viewport>
            </DoubleBorders>
          </ShakeLayer>
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
      <BottomBar>
        <div style={{ color: 'white' }}>-- Depth {props.state.depth} --</div>
      </BottomBar>
    </Wrapper>
  );
};
