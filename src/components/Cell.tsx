import React from 'react';
import styled from 'styled-components';

import { CELL_WIDTH_IN_PIXELS } from '../constants/config';
import { CellContent, CellTile } from '../typings/cell';
import { MoveDirection } from '../typings/moveDirection';
import Player from './Player';

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
}

const Cell: React.FC<Props> = ({ content, moveDirection, tile }) => {
  const renderContent = () => {
    if (content === 'Player') {
      return <Player moveDirection={moveDirection} />;
    }
    return null;
  };

  const backgroundColor = tile === ' ' ? 'white' : 'black';

  return <Wrapper backgroundColor={backgroundColor}>{renderContent()}</Wrapper>;
};

export default Cell;
