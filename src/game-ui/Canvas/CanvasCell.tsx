import React from 'react';
import { Circle, Group, Image, Rect, Text } from 'react-konva';

import { CELL_WIDTH_IN_PIXELS } from '../../constants/config';
import { getItem } from '../../constants/items';
import {
  DEFAULT_FONT_COLOR,
  getTile,
  NON_REVEALED_BACKGROUND_COLOR,
  TileType,
} from '../../constants/tiles';
import { GameAction, gameActions, HoverCellPayload } from '../../game-logic/game';
import { CellContent, CreatureData } from '../../typings/cell';
import { Position } from '../../typings/position';
import { Visibility } from '../../typings/visibility';
import { Flame } from './Flame';

export interface CellProps {
  content: CellContent;
  tileType: TileType;
  visibility: Visibility;
  revealed: boolean;
  dispatch: React.Dispatch<GameAction>;
  position: Position;
  itemsImage: HTMLImageElement | undefined;
  flameImage: HTMLImageElement | undefined;
  burning: boolean;
  creature?: CreatureData;
}

export const CanvasCell: React.FC<CellProps> = ({
  content,
  tileType,
  visibility,
  revealed,
  dispatch,
  position,
  itemsImage,
  flameImage,
  burning,
  creature,
}) => {
  const item = content !== 0 && content !== 'Player' ? getItem(content) : '';
  const tile = getTile(tileType);

  const renderFlame = () => (
    <Flame flameImage={flameImage} position={position} opacity={visibility === 'dim' ? 0.3 : 1} />
  );

  const getFontColor = () => {
    if (burning && visibility !== 'dark') {
      return 'white';
    }
    if (visibility === 'clear') {
      return tile?.clearFontColor || DEFAULT_FONT_COLOR;
    }
    if (visibility === 'dim' || revealed) {
      return tile?.dimFontColor || DEFAULT_FONT_COLOR;
    }
    return DEFAULT_FONT_COLOR;
  };

  const Item = () => {
    // TODO DRY with Creature
    if (content !== 0 && content !== 'Player') {
      if (visibility === 'dark' && !revealed) {
        return null;
      }
      if (visibility === 'dim' && !revealed) {
        return (
          <Circle
            x={position[0] * CELL_WIDTH_IN_PIXELS + CELL_WIDTH_IN_PIXELS / 2}
            y={position[1] * CELL_WIDTH_IN_PIXELS + CELL_WIDTH_IN_PIXELS / 2}
            radius={5}
            fill={DEFAULT_FONT_COLOR}
            opacity={0.3}
          />
        );
      }

      let opacity = 0;
      if (visibility === 'clear') {
        opacity = 1;
      } else if (visibility === 'dim' || revealed) {
        opacity = 0.3;
      }
      return item ? (
        <Image
          x={position[0] * CELL_WIDTH_IN_PIXELS + (CELL_WIDTH_IN_PIXELS - 16) / 2}
          y={position[1] * CELL_WIDTH_IN_PIXELS + (CELL_WIDTH_IN_PIXELS - 16) / 2}
          image={itemsImage}
          width={16}
          height={16}
          opacity={opacity}
          crop={{
            x: item.spritePosition[0] * 16,
            y: item.spritePosition[1] * 16,
            width: 16,
            height: 16,
          }}
        />
      ) : null;
    }
    return null;
  };

  const Creature = () => {
    // TODO DRY with Item
    // Unlike items, we don't "remember" creatures
    if (creature) {
      if (visibility === 'dark') {
        return null;
      }
      if (visibility === 'dim') {
        return (
          <Circle
            x={position[0] * CELL_WIDTH_IN_PIXELS + CELL_WIDTH_IN_PIXELS / 2}
            y={position[1] * CELL_WIDTH_IN_PIXELS + CELL_WIDTH_IN_PIXELS / 2}
            radius={5}
            fill={'orange'}
            opacity={0.3}
          />
        );
      }

      let opacity = 0;
      if (visibility === 'clear') {
        opacity = 1;
      } else if (visibility === 'dim') {
        opacity = 0.3;
      }
      return (
        <Text
          x={position[0] * CELL_WIDTH_IN_PIXELS + 7}
          y={position[1] * CELL_WIDTH_IN_PIXELS + 7}
          opacity={opacity}
          text={creature?.type.substr(0, 1)}
          fontFamily="UglyTerminal"
          fontSize={12}
          fill={'orange'}
        />
      );
    }
    return null;
  };

  const renderTile = () => {
    if (visibility !== 'dark' || revealed) {
      return (
        <Text
          x={position[0] * CELL_WIDTH_IN_PIXELS + 7}
          y={position[1] * CELL_WIDTH_IN_PIXELS + 7}
          text={tileType}
          fontFamily="UglyTerminal"
          fontSize={12}
          fill={getFontColor()}
        />
      );
    }
  };

  const renderContentOrTile = () => {
    if (visibility !== 'dark' && burning) {
      return renderFlame();
    }

    if (creature) {
      return <Creature />;
    }

    if (content !== 0 && content !== 'Player') {
      return <Item />;
    }
    return renderTile();
  };

  const getBackgroundColor = () => {
    if (!revealed && visibility === 'dark') {
      return NON_REVEALED_BACKGROUND_COLOR;
    }
    if (visibility === 'clear') {
      return tile?.clearBackgroundColor || NON_REVEALED_BACKGROUND_COLOR;
    }
    if (visibility === 'dim' || revealed) {
      return tile?.dimBackgroundColor || NON_REVEALED_BACKGROUND_COLOR;
    }
    return NON_REVEALED_BACKGROUND_COLOR;
  };

  const handleMouseEnter = (payload: HoverCellPayload) => {
    return dispatch(gameActions.hoverCell(payload));
  };

  const handleMouseLeave = () => {
    return dispatch(gameActions.hoverAwayFromCell());
  };

  return (
    <Group
      onMouseEnter={() => handleMouseEnter({ tileType, visibility, revealed, content, burning })}
      onMouseLeave={() => handleMouseLeave()}
    >
      <Rect
        width={CELL_WIDTH_IN_PIXELS}
        height={CELL_WIDTH_IN_PIXELS}
        fill={getBackgroundColor()}
        x={position[0] * CELL_WIDTH_IN_PIXELS}
        y={position[1] * CELL_WIDTH_IN_PIXELS}
        stroke={'rgba(0, 0, 0, 0.1)'}
        strokeWidth={2}
      />
      {renderContentOrTile()}
    </Group>
  );
};
