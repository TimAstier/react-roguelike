import React from 'react';
import styled from 'styled-components';

import { ANIMATION_SPEED } from '../constants/config';
import { CELL_WIDTH_IN_PIXELS, GRID_HEIGHT, GRID_WIDTH } from '../constants/config';
import { CellData, CellTile } from '../typings/cell';
import { MoveDirection } from '../typings/moveDirection';
import { Position } from '../typings/position';
import { getVisibility } from '../utils/getVisibility';
import Cell from './Cell';

interface StylingProps {
  left: number;
  top: number;
}

const Wrapper = styled.div`
  width: ${() => `${CELL_WIDTH_IN_PIXELS * GRID_HEIGHT}px`};
  height: ${() => `${CELL_WIDTH_IN_PIXELS * GRID_WIDTH}px`};
  display: flex;
  flex-wrap: wrap;
  border: solid 1px black;
  position: relative;
  left: ${(p: StylingProps) => `${p.left}px`};
  top: ${(p: StylingProps) => `${p.top}px`};
  transition: ${() => `top ${ANIMATION_SPEED / 1000}s, left ${ANIMATION_SPEED / 1000}s`};
  background-color: white;
`;

interface Props {
  moveDirection: MoveDirection;
  playerPosition: Position;
  fogOfWar: boolean;
  tiles: CellTile[][];
  shouldPlayerAnimate: boolean;
}

const Map: React.FC<Props> = ({
  moveDirection,
  playerPosition,
  fogOfWar,
  tiles,
  shouldPlayerAnimate,
}) => {
  const createMapContent = () => {
    const mapContent: CellData[][] = [];
    for (let i = 0; i < GRID_WIDTH; i += 1) {
      mapContent[i] = [];
      for (let j = 0; j < GRID_HEIGHT; j += 1) {
        mapContent[i][j] = { content: 0, tile: ' ' };
        mapContent[i][j].tile = tiles[i][j];
        if (i === playerPosition[0] && j === playerPosition[1]) {
          mapContent[i][j].content = 'Player';
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
          ? getVisibility({ posX, posY, playerPosition, tiles })
          : 'clear';
        return (
          <Cell
            visibility={visibility}
            key={position}
            content={column.content}
            moveDirection={moveDirection}
            tile={column.tile}
            shouldPlayerAnimate={shouldPlayerAnimate}
          />
        );
      });
    });
  };

  const mapLeftPosition = (-playerPosition[1] + 5) * CELL_WIDTH_IN_PIXELS;
  const mapUpPosition = (-playerPosition[0] + 5) * CELL_WIDTH_IN_PIXELS;

  return (
    <Wrapper left={mapLeftPosition} top={mapUpPosition}>
      {renderCells()}
    </Wrapper>
  );
};

export default Map;
