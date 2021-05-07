import React from 'react';
import { Group, Layer, Rect, Stage } from 'react-konva';
import useImage from 'use-image';

import roguelikeitems from '../assets/images/roguelikeitems.png';
import {
  CELL_WIDTH_IN_PIXELS,
  NUMBER_OF_CELLS_IN_VIEWPORT_X,
  NUMBER_OF_CELLS_IN_VIEWPORT_Y,
  VIEWPORT_HEIGHT_IN_PIXELS,
  VIEWPORT_WIDTH_IN_PIXELS,
} from '../constants/config';
import { GameAction } from '../reducers/game';
import { CellData } from '../typings/cell';
import { MoveDirection } from '../typings/moveDirection';
import { Position } from '../typings/position';
import { CanvasCell } from './CanvasCell';

const renderCells = (
  gameMap: CellData[][],
  itemsImage: HTMLImageElement | undefined,
  playerPosition: Position,
  dispatch: React.Dispatch<GameAction>
) => {
  // BUG When reaching sides of the map
  const cellsToSideX = Math.floor(NUMBER_OF_CELLS_IN_VIEWPORT_X / 2);
  const cellsToSideY = Math.floor(NUMBER_OF_CELLS_IN_VIEWPORT_Y / 2);

  // We only render the cells that are visible in the viewport
  return gameMap
    .filter(
      (_row, index) =>
        index >= playerPosition[1] - cellsToSideY && index <= playerPosition[1] + cellsToSideY
    )
    .map((row, posY) => {
      return row
        .filter(
          (_cellData, index) =>
            index >= playerPosition[0] - cellsToSideX && index <= playerPosition[0] + cellsToSideX
        )
        .map((cellData, posX) => {
          const position = `${posX}-${posY}`;
          const visibility = cellData.visibility;
          return (
            <CanvasCell
              visibility={visibility}
              revealed={cellData.revealed}
              key={position}
              content={cellData.content}
              tileType={cellData.tile}
              position={[posX, posY]}
              itemsImage={itemsImage}
              dispatch={dispatch}
            />
          );
        });
    });
};

const renderPlayer = (moveDirection: MoveDirection) => {
  const playerWidth = 0.6 * CELL_WIDTH_IN_PIXELS;
  const frontWidth = 0.3 * CELL_WIDTH_IN_PIXELS;
  let frontXModifier: number;
  let frontYModifier: number;

  switch (moveDirection) {
    case 'Up':
      frontXModifier = frontWidth / 2;
      frontYModifier = playerWidth - frontWidth;
      break;
    case 'Down':
      frontXModifier = frontWidth / 2;
      frontYModifier = -playerWidth + frontWidth * 2;
      break;
    case 'Left':
      frontXModifier = playerWidth - frontWidth;
      frontYModifier = frontWidth / 2;
      break;
    case 'Right':
      frontXModifier = -playerWidth + frontWidth * 2;
      frontYModifier = frontWidth / 2;
      break;
  }

  return (
    <Group>
      <Rect
        width={playerWidth}
        height={playerWidth}
        fill={'blue'}
        x={(CELL_WIDTH_IN_PIXELS * NUMBER_OF_CELLS_IN_VIEWPORT_X) / 2 - playerWidth / 2}
        y={(CELL_WIDTH_IN_PIXELS * NUMBER_OF_CELLS_IN_VIEWPORT_Y) / 2 - playerWidth / 2}
      />
      <Rect
        width={frontWidth}
        height={frontWidth}
        fill={'black'}
        x={(CELL_WIDTH_IN_PIXELS * NUMBER_OF_CELLS_IN_VIEWPORT_X) / 2 - frontXModifier}
        y={(CELL_WIDTH_IN_PIXELS * NUMBER_OF_CELLS_IN_VIEWPORT_Y) / 2 - frontYModifier}
      />
    </Group>
  );
};

interface Props {
  playerPosition: Position;
  gameMap: CellData[][];
  moveDirection: MoveDirection;
  dispatch: React.Dispatch<GameAction>;
}

export const GameCanvas: React.FC<Props> = (props) => {
  const [itemsImage] = useImage(roguelikeitems);

  let offsetX = 0;
  let offsetY = 0;

  if (props.playerPosition[0] < Math.floor(NUMBER_OF_CELLS_IN_VIEWPORT_X / 2)) {
    offsetX =
      -(Math.floor(NUMBER_OF_CELLS_IN_VIEWPORT_X / 2) - props.playerPosition[0]) *
      CELL_WIDTH_IN_PIXELS;
  }

  if (props.playerPosition[1] < Math.floor(NUMBER_OF_CELLS_IN_VIEWPORT_Y / 2)) {
    offsetY =
      -(Math.floor(NUMBER_OF_CELLS_IN_VIEWPORT_Y / 2) - props.playerPosition[1]) *
      CELL_WIDTH_IN_PIXELS;
  }

  return (
    <Stage width={VIEWPORT_WIDTH_IN_PIXELS} height={VIEWPORT_HEIGHT_IN_PIXELS}>
      <Layer>
        <Group offsetX={offsetX} offsetY={offsetY}>
          {renderCells(props.gameMap, itemsImage, props.playerPosition, props.dispatch)}
        </Group>
        {renderPlayer(props.moveDirection)}
      </Layer>
    </Stage>
  );
};
