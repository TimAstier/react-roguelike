import React from 'react';
import styled from 'styled-components';

import { TileType } from '../../constants/tiles';
// import seedrandom from 'seedrandom';
import { generateLevel } from '../../pcg/generateLevel';
import { gameActions } from '../../reducers/game';
import { GameAction, GameState } from '../../reducers/game';
import { CellContent, CellData } from '../../typings/cell';
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

  const handleSelectedTile = (tile: TileType) => {
    setSelectedContent(null);
    setSelectedTile(tile);
  };

  const handleSelectedContent = (content: CellContent) => {
    setSelectedTile(null);
    setSelectedContent(content);
  };

  const handleCellClick = (position: Position, cellData: CellData) => {
    const updatedCellData = { ...cellData };
    if (selectedTile) {
      updatedCellData.tile = selectedTile;
    }

    if (selectedContent) {
      updatedCellData.content = selectedContent;
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
      />
      <Map gameMap={props.state.currentMap} handleCellClick={handleCellClick} />
    </Wrapper>
  );
};
