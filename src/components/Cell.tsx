import React from 'react';
import styled from 'styled-components';

import { CELL_WIDTH_IN_PIXELS } from '../constants/config';
import { CellContent, CellTile } from '../typings/cell';
import { MoveDirection } from '../typings/moveDirection';
import { Visibility } from '../typings/visibility';
import { lightenDarkenColor } from '../utils/ligntenDarkenColor';
import { Player } from './Player';

const mapVisibilityToModifier: { [key in Visibility]: number } = {
  clear: 0,
  dim: -100,
  dark: -300,
};

interface StylingProps {
  backgroundColor: string;
}

const Wrapper = styled.div`
  border: solid 1px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  width: ${() => `${CELL_WIDTH_IN_PIXELS}px`};
  height: ${() => `${CELL_WIDTH_IN_PIXELS}px`};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(p: StylingProps) => p.backgroundColor};
`;

interface Props {
  content: CellContent;
  moveDirection: MoveDirection;
  tile: CellTile;
  shouldPlayerAnimate: boolean;
  visibility: Visibility;
}

const Cell: React.FC<Props> = ({
  content,
  moveDirection,
  tile,
  shouldPlayerAnimate,
  visibility,
}) => {
  const renderContent = () => {
    if (content === 'Player') {
      return <Player moveDirection={moveDirection} shouldPlayerAnimate={shouldPlayerAnimate} />;
    }
    return null;
  };

  const visibilityModifier = mapVisibilityToModifier[visibility];

  const backgroundColor =
    tile === ' ' ? lightenDarkenColor('#ffffff', visibilityModifier) : 'rgb(0,0,0,1)';

  return <Wrapper backgroundColor={backgroundColor}>{renderContent()}</Wrapper>;
};

export default Cell;
