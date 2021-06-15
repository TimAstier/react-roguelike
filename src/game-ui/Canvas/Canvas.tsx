import React from 'react';
import { Group, Layer, Stage } from 'react-konva';
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
import { GameAction } from '../../game-logic/game';
import { CellData } from '../../typings/cell';
import { Hit } from '../../typings/hit';
import { MoveDirection } from '../../typings/moveDirection';
import { Position } from '../../typings/position';
import { CanvasCell } from './CanvasCell';
import { Player } from './Player';

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
  hitsLastRound: Hit[],
  deathPositionsThisRound: string[],
  round: number,
  hoveredCreatureId: string,
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
          let creatureDiedThisRound = false;

          if (deathPositionsThisRound.includes(cellData.position)) {
            creatureDiedThisRound = true;
          }

          const highlighted =
            (cellData.creature?.id === hoveredCreatureId && cellData.visibility === 'clear') ||
            (cellData.content === 'Player' && hoveredCreatureId === 'Player');

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
              hitsLastRound={hitsLastRound}
              round={round}
              creatureDiedThisRound={creatureDiedThisRound}
              highlighted={highlighted}
            />
          );
        });
    });
};

interface Props {
  playerPosition: Position;
  gameMap: CellData[][];
  moveDirection: MoveDirection;
  hitsLastRound: Hit[];
  deathPositionsThisRound: Position[];
  round: number;
  dispatch: React.Dispatch<GameAction>;
  hoveredCreatureId: string;
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
            props.hitsLastRound,
            props.deathPositionsThisRound.map(String),
            props.round,
            props.hoveredCreatureId,
            props.dispatch
          )}
        </Group>
        <Player
          moveDirection={props.moveDirection}
          dispatch={props.dispatch}
          hitsLastRound={props.hitsLastRound}
          round={props.round}
        />
      </Layer>
    </Stage>
  );
});

Canvas.displayName = 'Canvas';
