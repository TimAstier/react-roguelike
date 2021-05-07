import React from 'react';
import styled from 'styled-components';

import { GRID_HEIGHT, GRID_WIDTH } from '../../constants/config';
import { CellData } from '../../typings/cell';
import { Position } from '../../typings/position';
import { Cell } from './Cell';

const CELL_WIDTH_MAP_GENERATOR = 20;

interface StylingProps {
  cellWidth: number;
}

const Wrapper = styled.div<StylingProps>`
  width: ${(p) => `${p.cellWidth * GRID_WIDTH}px`};
  height: ${(p) => `${p.cellWidth * GRID_HEIGHT}px`};
  min-width: ${(p) => `${p.cellWidth * GRID_WIDTH}px`};
  min-height: ${(p) => `${p.cellWidth * GRID_HEIGHT}px`};
  display: flex;
  flex-wrap: wrap;
  border: solid 1px black;
  background-color: white;
`;

interface Props {
  gameMap: CellData[][];
  handleCellClick: (position: Position, cellData: CellData) => void;
}

const Map: React.FC<Props> = ({ gameMap, handleCellClick }) => {
  const renderCells = () => {
    return gameMap.map((col, posY) => {
      return col.map((cellData, posX) => {
        const position = `${posX}-${posY}`;
        return (
          <Cell
            key={position}
            content={cellData.content}
            moveDirection={'Up'}
            tileType={cellData.tile}
            cellWidth={CELL_WIDTH_MAP_GENERATOR}
            handleClick={() => handleCellClick([posX, posY], cellData)}
          />
        );
      });
    });
  };

  return <Wrapper cellWidth={CELL_WIDTH_MAP_GENERATOR}>{renderCells()}</Wrapper>;
};

export default Map;
