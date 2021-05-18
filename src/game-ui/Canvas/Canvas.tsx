import React from 'react';
import { Group, Layer, Rect, Stage } from 'react-konva';
import useImage from 'use-image';

import flame from '../../assets/images/flames.png';
import roguelikecreatures from '../../assets/images/roguelikecreatures.png';
import roguelikeitems from '../../assets/images/roguelikeitems.png';
import {
  CELL_WIDTH_IN_PIXELS,
  NUMBER_OF_CELLS_IN_VIEWPORT_X,
  NUMBER_OF_CELLS_IN_VIEWPORT_Y,
  VIEWPORT_HEIGHT_IN_PIXELS,
  VIEWPORT_WIDTH_IN_PIXELS,
} from '../../constants/config';
import { GameAction, gameActions } from '../../game-logic/game';
import { CellData } from '../../typings/cell';
import { MoveDirection } from '../../typings/moveDirection';
import { Position } from '../../typings/position';
import { CanvasCell } from './CanvasCell';

const getOffsetX = (playerPositionX: number) => {
  return playerPositionX < Math.floor(NUMBER_OF_CELLS_IN_VIEWPORT_X / 2)
    ? -(Math.floor(NUMBER_OF_CELLS_IN_VIEWPORT_X / 2) - playerPositionX) * CELL_WIDTH_IN_PIXELS
    : 0;
};

const getOffsetY = (playerPositionY: number) => {
  return playerPositionY < Math.floor(NUMBER_OF_CELLS_IN_VIEWPORT_Y / 2)
    ? -(Math.floor(NUMBER_OF_CELLS_IN_VIEWPORT_Y / 2) - playerPositionY) * CELL_WIDTH_IN_PIXELS
    : 0;
};

const renderCells = (
  gameMap: CellData[][],
  itemsImage: HTMLImageElement | undefined,
  flameImage: HTMLImageElement | undefined,
  creaturesImage: HTMLImageElement | undefined,
  playerPosition: Position,
  dispatch: React.Dispatch<GameAction>
) => {
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
              creaturesImage={creaturesImage}
              itemsImage={itemsImage}
              flameImage={flameImage}
              dispatch={dispatch}
              burning={cellData.burningRounds > 0}
              creature={cellData.creature}
            />
          );
        });
    });
};

const renderPlayer = (moveDirection: MoveDirection, dispatch: React.Dispatch<GameAction>) => {
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

  const handleMouseEnter = () =>
    dispatch(
      gameActions.hoverCell({
        tileType: '.',
        visibility: 'clear',
        revealed: true,
        content: 'Player',
        burning: false,
      })
    );

  const handleMouseLeave = () => dispatch(gameActions.hoverAwayFromCell());

  return (
    <Group onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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

// We use React.memo() here to avoid re-rendering the canvas on game-state updates that are not related to the canvas
// Without this, things like Sprites will flicker when hovering over the canvas with events
export const Canvas: React.FC<Props> = React.memo((props) => {
  const [itemsImage] = useImage(roguelikeitems);
  const [creaturesImage] = useImage(roguelikecreatures);
  const [flameImage] = useImage(flame);

  const offsetX = getOffsetX(props.playerPosition[0]);
  const offsetY = getOffsetY(props.playerPosition[1]);

  return (
    <Stage width={VIEWPORT_WIDTH_IN_PIXELS} height={VIEWPORT_HEIGHT_IN_PIXELS}>
      <Layer imageSmoothingEnabled={false}>
        <Group offsetX={offsetX} offsetY={offsetY}>
          {renderCells(
            props.gameMap,
            itemsImage,
            flameImage,
            creaturesImage,
            props.playerPosition,
            props.dispatch
          )}
        </Group>
        {renderPlayer(props.moveDirection, props.dispatch)}
      </Layer>
    </Stage>
  );
});

Canvas.displayName = 'Canvas';
