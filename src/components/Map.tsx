import React from 'react';
import styled from 'styled-components';

import { ANIMATION_SPEED } from '../constants/config';
import {
  CELL_WIDTH_IN_PIXELS,
  GRID_HEIGHT,
  GRID_WIDTH,
  NUMBER_OF_CELLS_IN_VIEWPORT,
} from '../constants/config';
import { CellData, CellTile } from '../typings/cell';
import { MoveDirection } from '../typings/moveDirection';
import { Position } from '../typings/position';
import { getVisibility } from '../utils/getVisibility';
import Cell from './Cell';

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
  tiles: CellTile[][];
  shouldPlayerAnimate: boolean;
  inViewport: boolean;
}

const Map: React.FC<Props> = ({
  moveDirection,
  playerPosition,
  fogOfWar,
  tiles,
  shouldPlayerAnimate,
  inViewport,
}) => {
  const cellWidth = inViewport ? CELL_WIDTH_IN_PIXELS : 15;

  const createMapContent = () => {
    const mapContent: CellData[][] = [];
    for (let j = 0; j < GRID_HEIGHT; j += 1) {
      mapContent[j] = [];
      for (let i = 0; i < GRID_WIDTH; i += 1) {
        mapContent[j][i] = { content: 0, tile: ' ' };
        mapContent[j][i].tile = tiles[j][i];
        if (i === playerPosition[0] && j === playerPosition[1]) {
          if (inViewport) {
            mapContent[j][i].content = 'Player';
          }
        }
      }
    }
    return mapContent;
  };

  const renderCells = () => {
    return createMapContent().map((row, posX) => {
      return row.map((column, posY) => {
        const position = `${posX}-${posY}`;
        const visibility = fogOfWar
          ? getVisibility({
              posX,
              posY,
              playerPosition: [playerPosition[1], playerPosition[0]], // One last weird thing
              tiles,
            })
          : 'clear';
        return (
          <Cell
            visibility={visibility}
            key={position}
            content={column.content}
            moveDirection={moveDirection}
            tile={column.tile}
            shouldPlayerAnimate={shouldPlayerAnimate}
            cellWidth={cellWidth}
            inViewport={inViewport}
          />
        );
      });
    });
  };

  // Note: Should this logic be part of the Viewport?
  // TODO: Depend on number of cells?
  const mapLeftPosition =
    (-playerPosition[0] + Math.floor(NUMBER_OF_CELLS_IN_VIEWPORT / 2)) * cellWidth;
  const mapUpPosition =
    (-playerPosition[1] + Math.floor(NUMBER_OF_CELLS_IN_VIEWPORT / 2)) * cellWidth;

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
