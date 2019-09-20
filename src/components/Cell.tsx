import React from 'react';
import styled from 'styled-components';

import { CELL_WIDTH_IN_PIXELS } from '../constants/config';
import { CellContent } from '../typings/cellContent';
import { MoveDirection } from '../typings/moveDirection';
import Player from './Player';

const Wrapper = styled.div`
  border: solid 1px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  width: ${() => `${CELL_WIDTH_IN_PIXELS}px`};
  height: ${() => `${CELL_WIDTH_IN_PIXELS}px`};
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface Props {
  content: CellContent;
  moveDirection: MoveDirection;
}

const Cell: React.FC<Props> = ({ content, moveDirection }) => {
  const renderContent = () => {
    if (content === 'Player') {
      return <Player moveDirection={moveDirection} />;
    }
    return null;
  };

  return <Wrapper>{renderContent()}</Wrapper>;
};

export default Cell;
