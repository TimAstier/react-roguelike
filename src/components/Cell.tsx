import React from 'react';
import styled from 'styled-components';

import sword from '../assets/images/sword.png';
import { CellContent, CellTile } from '../typings/cell';
import { MoveDirection } from '../typings/moveDirection';
import { Visibility } from '../typings/visibility';
import { lightenDarkenColor } from '../utils/lightenDarkenColor';
import { Player } from './Player';

const mapVisibilityToModifier: { [key in Visibility]: number } = {
  clear: 0,
  dim: -100,
  dark: -300,
};

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
  tile: CellTile;
  shouldPlayerAnimate: boolean;
  visibility: Visibility;
  cellWidth: number;
  inViewport: boolean;
  handleClick?: () => void;
}

export const Cell: React.FC<CellProps> = ({
  content,
  moveDirection,
  tile,
  shouldPlayerAnimate,
  visibility,
  cellWidth,
  inViewport,
  handleClick,
}) => {
  const renderContent = () => {
    // TODO Hide content and tiles that are not visible
    if (content === 'Player' && inViewport) {
      return <Player moveDirection={moveDirection} shouldPlayerAnimate={shouldPlayerAnimate} />;
    }

    if (content === 'Sword') {
      return <img style={{ height: '100%', width: '100%' }} src={sword} />;
    }

    if (tile === '#') {
      if (visibility !== 'dark') {
        return '#';
      }
      return '';
    }
    if (tile === ' ') {
      return '';
    }
    if (tile === '@') {
      return '@';
    }
    return '.';
  };

  const visibilityModifier = mapVisibilityToModifier[visibility];

  const backgroundColor =
    tile === '.' || tile === '@'
      ? lightenDarkenColor('#ffffff', visibilityModifier)
      : 'rgb(0,0,0,1)';

  return (
    <Wrapper
      onClick={handleClick}
      backgroundColor={backgroundColor}
      cellWidth={cellWidth}
      inViewport={inViewport}
      color={tile === '#' ? 'white' : 'black'}
    >
      {renderContent()}
    </Wrapper>
  );
};
