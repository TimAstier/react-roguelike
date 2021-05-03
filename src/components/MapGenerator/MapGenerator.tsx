import React from 'react';
import styled from 'styled-components';

// import seedrandom from 'seedrandom';
import { generateLevel } from '../../pcg/generateLevel';
import { game } from '../../reducers';
import { gameActions, INITIAL_STATE } from '../../reducers/game';
import { CellContent, CellTile } from '../../typings/cell';
import { Position } from '../../typings/position';
import Map from '../Map';
import { Toolbar } from './Toolbar';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  user-select: none;
`;

export const MapGenerator: React.FC = () => {
  const [state, dispatch] = React.useReducer(game, INITIAL_STATE);
  const [selectedTile, setSelectedTile] = React.useState<CellTile | null>(null);
  const [selectedContent, setSelectedContent] = React.useState<CellContent | null>(null);

  React.useEffect(() => {
    // We can seed the rng by providing a string to seedrandom():
    // const seed = seedrandom('hello');
    // const newMap = generateMap(String(seed()));
    const level = generateLevel();
    // dispatch(gameActions.initPlayerSpawn(level.playerSpawn));
    dispatch(gameActions.setCurrentMap(level.gameMap));
  }, []);

  if (state.currentMap === null) {
    return <div>loading...</div>;
  }

  const handleSelectedTile = (tile: CellTile) => {
    setSelectedContent(null);
    setSelectedTile(tile);
  };

  const handleSelectedContent = (content: CellContent) => {
    setSelectedTile(null);
    setSelectedContent(content);
  };

  const handleCellClick = (position: Position) => {
    if (state.currentMap !== null) {
      const cellData = state.currentMap[position[1]][position[0]];

      if (selectedTile) {
        cellData.tile = selectedTile;
      }

      if (selectedContent) {
        cellData.content = selectedContent;
      }

      dispatch(gameActions.updateCell({ position, cellData }));
    }
  };

  return (
    <Wrapper>
      <Toolbar
        selectedTile={selectedTile}
        handleSelectedTile={handleSelectedTile}
        selectedContent={selectedContent}
        handleSelectedContent={handleSelectedContent}
      />
      <Map
        inViewport={false}
        playerPosition={[0, 0]}
        fogOfWar={false}
        moveDirection={'Up'}
        gameMap={state.currentMap}
        shouldPlayerAnimate={false}
        handleCellClick={handleCellClick}
      />
    </Wrapper>
  );
};
