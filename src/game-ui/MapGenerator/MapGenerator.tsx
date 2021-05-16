import React from 'react';
import seedrandom from 'seedrandom';
import styled from 'styled-components';

import { NUMBER_OF_ROUNDS_BURNING } from '../../constants/config';
import { CreatureType } from '../../constants/creatures';
import { TileType } from '../../constants/tiles';
import { gameActions } from '../../game-logic/game';
import { GameAction, GameState } from '../../game-logic/game';
import { generateLevel } from '../../pcg/generateLevel';
import { CellContent, CellData } from '../../typings/cell';
import { Effect } from '../../typings/effect';
import { Position } from '../../typings/position';
import { getRandomString } from '../../utils/getRandomString';
import Map from './Map';
import { Toolbar } from './Toolbar';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  user-select: none;
`;

interface Props {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

export const MapGenerator: React.FC<Props> = (props) => {
  const [selectedTile, setSelectedTile] = React.useState<TileType | null>(null);
  const [selectedContent, setSelectedContent] = React.useState<CellContent | null>(null);
  const [selectedCreature, setSelectedCreature] = React.useState<CreatureType | null>(null);
  const [selectedEffect, setSelectedEffect] = React.useState<Effect | null>(null);
  const [currentSeed, setCurrentSeed] = React.useState('');

  const load = (seed: string) => {
    const rng = seedrandom(seed);
    const level = generateLevel(rng);
    props.dispatch(gameActions.initPlayerSpawn(level.playerSpawn));
    props.dispatch(gameActions.setSeed(seed));
    props.dispatch(gameActions.setCurrentMap(level.gameMap));
  };

  React.useEffect(() => {
    const seed = getRandomString();
    setCurrentSeed(seed);
    load(seed);
  }, []);

  if (props.state.currentMap === null) {
    return <div>loading...</div>;
  }

  const resetSelected = () => {
    setSelectedTile(null);
    setSelectedContent(null);
    setSelectedCreature(null);
    setSelectedEffect(null);
  };

  const handleSelectedTile = (tile: TileType) => {
    resetSelected();
    setSelectedTile(tile);
  };

  const handleSelectedContent = (content: CellContent) => {
    resetSelected();
    setSelectedContent(content);
  };

  const handleSelectedCreature = (creatureType: CreatureType) => {
    resetSelected();
    setSelectedCreature(creatureType);
  };

  const handleSelectedEffect = (effect: Effect) => {
    resetSelected();
    setSelectedEffect(effect);
  };

  const handleCellClick = (position: Position, cellData: CellData) => {
    const updatedCellData = { ...cellData };
    if (selectedTile) {
      updatedCellData.tile = selectedTile;
    }

    if (selectedContent) {
      updatedCellData.content = selectedContent;
    }

    if (selectedCreature) {
      updatedCellData.creature = { id: 'temp_id', type: selectedCreature };
    }

    if (selectedEffect) {
      if (updatedCellData.burningRounds === 0) {
        updatedCellData.burningRounds = NUMBER_OF_ROUNDS_BURNING;
      } else {
        updatedCellData.burningRounds = 0;
      }
    }

    props.dispatch(gameActions.updateCell({ position, cellData: updatedCellData }));
  };

  return (
    <Wrapper>
      <Toolbar
        selectedTile={selectedTile}
        handleSelectedTile={handleSelectedTile}
        selectedContent={selectedContent}
        handleSelectedContent={handleSelectedContent}
        selectedCreature={selectedCreature}
        handleSelectedCreature={handleSelectedCreature}
        selectedEffect={selectedEffect}
        handleSelectedEffect={handleSelectedEffect}
        seed={currentSeed}
        setSeed={setCurrentSeed}
        load={() => load(currentSeed)}
      />
      <Map gameMap={props.state.currentMap} handleCellClick={handleCellClick} />
    </Wrapper>
  );
};
