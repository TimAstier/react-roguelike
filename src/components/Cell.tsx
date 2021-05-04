import React from 'react';
import styled from 'styled-components';

import { Sprite } from '../components/Sprite';
import { getItem } from '../constants/items';
import { DEFAULT_FONT_COLOR, getTile, NON_REVEALED_BACKGROUND_COLOR } from '../constants/tiles';
import { GameAction, gameActions, HoverCellPayload } from '../reducers/game';
import { CellContent } from '../typings/cell';
import { MoveDirection } from '../typings/moveDirection';
import { TileType } from '../typings/tileType';
import { Visibility } from '../typings/visibility';
import { Player } from './Player';

interface StylingProps {
  backgroundColor: string;
  cellWidth: number;
  inViewport: boolean;
  color: string;
}

const Wrapper = styled.div<StylingProps>`
  border: solid 1px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  width: ${(p) => `${p.cellWidth}px`};
  height: ${(p) => `${p.cellWidth}px`};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(p) => p.backgroundColor};
  font-size: ${(p) => (p.inViewport ? '12px' : '8px')};
  color: ${(p) => p.color};
`;

export interface CellProps {
  content: CellContent;
  moveDirection: MoveDirection;
  tileType: TileType;
  shouldPlayerAnimate: boolean;
  visibility: Visibility;
  cellWidth: number;
  inViewport: boolean;
  handleClick?: () => void;
  revealed: boolean;
  dispatch?: React.Dispatch<GameAction>;
}

export const Cell: React.FC<CellProps> = ({
  content,
  moveDirection,
  tileType,
  shouldPlayerAnimate,
  visibility,
  cellWidth,
  inViewport,
  handleClick,
  revealed,
  dispatch,
}) => {
  const tile = getTile(tileType);

  const renderPlayer = () => {
    return <Player moveDirection={moveDirection} shouldPlayerAnimate={shouldPlayerAnimate} />;
  };

  const renderItem = () => {
    if ((revealed || !inViewport) && content !== 0 && content !== 'Player') {
      const item = getItem(content);
      return (
        item && (
          <Sprite imageSrc={item.imageSrc} position={item.spritePosition} pixelDimensions={16} />
        )
      );
    }
  };

  const renderTile = () => {
    if (visibility !== 'dark' || revealed) {
      return tileType;
    }
  };

  const renderContentOrTile = () => {
    if (content === 'Player') {
      return renderPlayer();
    }
    if (content !== 0 && (revealed || !inViewport)) {
      return renderItem();
    }
    return renderTile();
  };

  const getBackgroundColor = () => {
    if (!revealed && inViewport) {
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

  const getFontColor = () => {
    if (visibility === 'clear') {
      return tile?.clearFontColor || DEFAULT_FONT_COLOR;
    }
    if (visibility === 'dim' || revealed) {
      return tile?.dimFontColor || DEFAULT_FONT_COLOR;
    }
    return DEFAULT_FONT_COLOR;
  };

  const handleMouseEnter = (payload: HoverCellPayload) => {
    if (dispatch !== undefined) {
      return dispatch(gameActions.hoverCell(payload));
    }
  };

  const handleMouseLeave = () => {
    if (dispatch !== undefined) {
      return dispatch(gameActions.hoverAwayFromCell());
    }
  };

  return (
    <Wrapper
      onMouseEnter={() => handleMouseEnter({ tileType, visibility, revealed, content })}
      onMouseLeave={() => handleMouseLeave()}
      onClick={handleClick}
      backgroundColor={getBackgroundColor()}
      cellWidth={cellWidth}
      inViewport={inViewport}
      color={getFontColor()}
    >
      {renderContentOrTile()}
    </Wrapper>
  );
};
