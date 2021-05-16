import React from 'react';
import styled from 'styled-components';

import { CREATURES, CreatureType } from '../../constants/creatures';
import { getItem } from '../../constants/items';
import { DEFAULT_FONT_COLOR, getTile, NON_REVEALED_BACKGROUND_COLOR } from '../../constants/tiles';
import { TileType } from '../../constants/tiles';
import { CellContent } from '../../typings/cell';
import { MoveDirection } from '../../typings/moveDirection';
import { Sprite } from '../Shared/Sprite';
import { Player } from './Player';

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
  creature?: CreatureType;
  content: CellContent;
  moveDirection: MoveDirection;
  tileType: TileType;
  cellWidth: number;
  handleClick: () => void;
  burning: boolean;
}

export const Cell: React.FC<CellProps> = ({
  burning,
  content,
  tileType,
  cellWidth,
  handleClick,
  creature,
}) => {
  const tile = getTile(tileType);

  const renderPlayer = () => {
    return <Player />;
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

  const renderCreature = (type: CreatureType) => {
    const { imageSrc, spritePosition } = CREATURES[type];
    return <Sprite imageSrc={imageSrc} position={spritePosition} pixelDimensions={16} />;
  };

  const renderTile = () => tileType;

  const renderContentOrTile = () => {
    if (burning) {
      return '^';
    }

    if (content === 'Player') {
      return renderPlayer();
    }

    if (creature) {
      return renderCreature(creature);
    }

    if (content !== 0) {
      return renderItem();
    }
    return renderTile();
  };

  const getColor = () => {
    if (creature) {
      return 'orange';
    }
    return tile?.clearFontColor || DEFAULT_FONT_COLOR;
  };

  return (
    <Wrapper
      onClick={handleClick}
      backgroundColor={tile?.clearBackgroundColor || NON_REVEALED_BACKGROUND_COLOR}
      cellWidth={cellWidth}
      color={getColor()}
    >
      {renderContentOrTile()}
    </Wrapper>
  );
};
