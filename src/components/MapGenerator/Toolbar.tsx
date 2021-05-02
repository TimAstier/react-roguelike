import React from 'react';
import styled from 'styled-components';

import { CELL_WIDTH_IN_PIXELS } from '../../constants/config';
import { Cell, CellProps } from '../Cell';

const Wrapper = styled.div`
  background-color: grey;
  width: 170px;
  border: red 2px solid;
  height: 94%;
  padding: 10px 10px;
`;

const CellWrapper = styled.div`
  display: flex;
  background-color: yellow;
`;

const defaultCellProps: CellProps = {
  content: 0,
  moveDirection: 'Up',
  tile: '.',
  shouldPlayerAnimate: false,
  visibility: 'clear',
  cellWidth: CELL_WIDTH_IN_PIXELS,
  inViewport: true,
};

export const Toolbar: React.FC = () => {
  return (
    <Wrapper>
      <p>Tiles</p>
      <CellWrapper>
        <Cell {...defaultCellProps} tile={'.'} /> <div style={{ fontSize: 8 }}>Ground</div>
      </CellWrapper>
      <Cell {...defaultCellProps} tile={'#'} />
      <Cell {...defaultCellProps} tile={'@'} />
      <Cell {...defaultCellProps} tile={' '} />
      <p>Contents</p>
      <Cell {...defaultCellProps} tile={'.'} content="Player" />
    </Wrapper>
  );
};
