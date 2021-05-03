import React from 'react';
import styled from 'styled-components';

import { ANIMATION_SPEED } from '../constants/config';
import {
  CELL_WIDTH_IN_PIXELS,
  GRID_HEIGHT,
  GRID_WIDTH,
  NUMBER_OF_CELLS_IN_VIEWPORT_X,
  NUMBER_OF_CELLS_IN_VIEWPORT_Y,
} from '../constants/config';
import { CellData } from '../typings/cell';
import { MoveDirection } from '../typings/moveDirection';
import { Position } from '../typings/position';
import { Cell } from './Cell';

interface StylingProps {
  left: number;
  top: number;
  inViewport: boolean;
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
  position: ${(p) => (p.inViewport ? 'relative' : undefined)};
  left: ${(p) => (p.inViewport ? `${p.left}px` : undefined)};
  top: ${(p) => (p.inViewport ? `${p.top}px` : undefined)};
  transition: ${() => `top ${ANIMATION_SPEED / 1000}s, left ${ANIMATION_SPEED / 1000}s`};
  background-color: white;
`;

interface Props {
  moveDirection: MoveDirection;
  playerPosition: Position;
  fogOfWar: boolean;
  gameMap: CellData[][];
  shouldPlayerAnimate: boolean;
  inViewport: boolean;
  handleCellClick?: (position: Position, cellData: CellData) => void;
}

const Map: React.FC<Props> = ({
  moveDirection,
  playerPosition,
  fogOfWar,
  gameMap,
  shouldPlayerAnimate,
  inViewport,
  handleCellClick,
}) => {
  const cellWidth = inViewport ? CELL_WIDTH_IN_PIXELS : 16;

  const renderCells = () => {
    return gameMap.map((row, posX) => {
      return row.map((cellData, posY) => {
        const position = `${posX}-${posY}`;
        const visibility = fogOfWar ? cellData.visibility : 'clear';
        return (
          <Cell
            visibility={visibility}
            key={position}
            content={cellData.content}
            moveDirection={moveDirection}
            tile={cellData.tile}
            shouldPlayerAnimate={shouldPlayerAnimate}
            cellWidth={cellWidth}
            inViewport={inViewport}
            handleClick={
              handleCellClick ? () => handleCellClick([posY, posX], cellData) : undefined
            }
          />
        );
      });
    });
  };

  // Note: Should this logic be part of the Viewport?
  const mapLeftPosition =
    (-playerPosition[0] + Math.floor(NUMBER_OF_CELLS_IN_VIEWPORT_X / 2)) * cellWidth;
  const mapUpPosition =
    (-playerPosition[1] + Math.floor(NUMBER_OF_CELLS_IN_VIEWPORT_Y / 2)) * cellWidth;

  return (
    <Wrapper
      left={mapLeftPosition}
      top={mapUpPosition}
      inViewport={inViewport}
      cellWidth={cellWidth}
    >
      {renderCells()}
    </Wrapper>
  );
};

export default Map;
