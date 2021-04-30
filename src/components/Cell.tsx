import React from 'react';
import styled from 'styled-components';

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

interface Props {
  content: CellContent;
  moveDirection: MoveDirection;
  tile: CellTile;
  shouldPlayerAnimate: boolean;
  visibility: Visibility;
  cellWidth: number;
  inViewport: boolean;
}

const Cell: React.FC<Props> = ({
  content,
  moveDirection,
  tile,
  shouldPlayerAnimate,
  visibility,
  cellWidth,
  inViewport,
}) => {
  const renderContent = () => {
    if (content === 'Player') {
      return <Player moveDirection={moveDirection} shouldPlayerAnimate={shouldPlayerAnimate} />;
    }
    if (tile === 'X') {
      return ''; // return '#';
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
      backgroundColor={backgroundColor}
      cellWidth={cellWidth}
      inViewport={inViewport}
      color={tile === 'X' ? 'white' : 'black'}
    >
      {renderContent()}
    </Wrapper>
  );
};

export default Cell;
