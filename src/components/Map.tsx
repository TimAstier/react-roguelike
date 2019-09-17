import React from 'react';
import styled from 'styled-components';

import { CELL_WIDTH_IN_PIXELS, GRID_HEIGHT, GRID_WIDTH } from '../constants/grid';
import { CellContent } from '../typings/cellContent';
import { MoveDirection } from '../typings/moveDirection';
import { Position } from '../typings/position';
import Cell from './Cell';

const Wrapper = styled.div`
  width: ${() => `${CELL_WIDTH_IN_PIXELS * GRID_HEIGHT}px`};
  height: ${() => `${CELL_WIDTH_IN_PIXELS * GRID_WIDTH}px`};
  display: flex;
  flex-wrap: wrap;
  border: solid 1px black;
`;

interface Props {
  moveDirection: MoveDirection;
  playerPosition: Position;
}

const Map: React.FC<Props> = ({ moveDirection, playerPosition }) => {
  const createCellsContent = () => {
    const cells: CellContent[][] = [];
    for (let i = 0; i < GRID_WIDTH; i += 1) {
      cells[i] = [];
      for (let j = 0; j < GRID_HEIGHT; j += 1) {
        if (i === playerPosition[0] && j === playerPosition[1]) {
          cells[i][j] = 'Player';
        } else {
          cells[i][j] = 0;
        }
      }
    }
    return cells;
  };

  const renderCells = () => {
    return createCellsContent()
      .map((row, posX) => {
        return row.map((column, posY) => {
          const position = `${posX}-${posY}`;
          return <Cell key={position} content={column} moveDirection={moveDirection} />;
        });
      });
  };

  return <Wrapper>{renderCells()}</Wrapper>;
};

export default Map;
