import React from 'react';
import styled from 'styled-components';

import { CELL_WIDTH_IN_PIXELS } from '../constants/grid';
import { CellContent } from '../typings/cellContent';
import { MoveDirection } from '../typings/moveDirection';
import Player from './Player';

const Wrapper = styled.div`
  border: solid 1px black;
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
