import React from 'react';
import styled from 'styled-components';

import { Sprite } from '../../components/Sprite';
import { getItem } from '../../constants/items';
import { DEFAULT_FONT_COLOR, getTile, NON_REVEALED_BACKGROUND_COLOR } from '../../constants/tiles';
import { CellContent } from '../../typings/cell';
import { MoveDirection } from '../../typings/moveDirection';
import { TileType } from '../../typings/tileType';
import { Player } from '.././Player';

interface StylingProps {
  backgroundColor: string;
  cellWidth: number;
  color: string;
}

const Wrapper = styled.div<StylingProps>`
  border: solid 1px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  width: ${(p) => `${p.cellWidth}px`};
  height: ${(p) => `${p.cellWidth}px`};
  min-width: ${(p) => `${p.cellWidth}px`};
  min-height: ${(p) => `${p.cellWidth}px`};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(p) => p.backgroundColor};
  font-size: 8px;
  color: ${(p) => p.color};
`;

export interface CellProps {
  content: CellContent;
  moveDirection: MoveDirection;
  tileType: TileType;
  cellWidth: number;
  handleClick: () => void;
}

export const Cell: React.FC<CellProps> = ({
  content,
  moveDirection,
  tileType,
  cellWidth,
  handleClick,
}) => {
  const tile = getTile(tileType);

  const renderPlayer = () => {
    return <Player moveDirection={moveDirection} shouldPlayerAnimate={false} />;
  };

  const renderItem = () => {
    if (content !== 0 && content !== 'Player') {
      const item = getItem(content);
      return (
        item && (
          <Sprite imageSrc={item.imageSrc} position={item.spritePosition} pixelDimensions={16} />
        )
      );
    }
  };

  const renderTile = () => tileType;

  const renderContentOrTile = () => {
    if (content === 'Player') {
      return renderPlayer();
    }
    if (content !== 0) {
      return renderItem();
    }
    return renderTile();
  };

  // const handleMouseEnter = (payload: HoverCellPayload) => {
  //   if (dispatch !== undefined) {
  //     return dispatch(gameActions.hoverCell(payload));
  //   }
  // };

  // const handleMouseLeave = () => {
  //   if (dispatch !== undefined) {
  //     return dispatch(gameActions.hoverAwayFromCell());
  //   }
  // };

  return (
    <Wrapper
      // onMouseEnter={() => handleMouseEnter({ tileType, visibility, revealed, content })}
      // onMouseLeave={() => handleMouseLeave()}
      onClick={handleClick}
      backgroundColor={tile?.clearBackgroundColor || NON_REVEALED_BACKGROUND_COLOR}
      cellWidth={cellWidth}
      color={tile?.clearFontColor || DEFAULT_FONT_COLOR}
    >
      {renderContentOrTile()}
    </Wrapper>
  );
};
