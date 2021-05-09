import React from 'react';
import styled from 'styled-components';

import { NUMBER_OF_ROUNDS_BURNING } from '../../constants/config';
import { TileType } from '../../constants/tiles';
// import seedrandom from 'seedrandom';
import { generateLevel } from '../../pcg/generateLevel';
import { gameActions } from '../../reducers/game';
import { GameAction, GameState } from '../../reducers/game';
import { CellContent, CellData } from '../../typings/cell';
import { Effect } from '../../typings/effect';
import { Position } from '../../typings/position';
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
  const [selectedEffect, setSelectedEffect] = React.useState<Effect | null>(null);

  React.useEffect(() => {
    // We can seed the rng by providing a string to seedrandom():
    // const seed = seedrandom('hello');
    // const newMap = generateMap(String(seed()));
    const level = generateLevel();
    props.dispatch(gameActions.initPlayerSpawn(level.playerSpawn));
    props.dispatch(gameActions.setCurrentMap(level.gameMap));
  }, []);

  if (props.state.currentMap === null) {
    return <div>loading...</div>;
  }

  const resetSelected = () => {
    setSelectedTile(null);
    setSelectedContent(null);
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
        selectedEffect={selectedEffect}
        handleSelectedEffect={handleSelectedEffect}
      />
      <Map gameMap={props.state.currentMap} handleCellClick={handleCellClick} />
    </Wrapper>
  );
};
