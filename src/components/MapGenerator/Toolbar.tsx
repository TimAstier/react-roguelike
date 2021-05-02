import React from 'react';
import styled from 'styled-components';

import { CELL_WIDTH_IN_PIXELS } from '../../constants/config';
import { Cell, CellProps } from '../Cell';

const Wrapper = styled.div`
  background-color: grey;
  width: 170px;
  height: 94%;
  padding: 10px 10px;
`;

const CellWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Label = styled.div`
  font-size: 12px;
  margin-left: 10px;
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
        <Cell {...defaultCellProps} tile={'.'} />
        <Label>Ground</Label>
      </CellWrapper>
      <CellWrapper>
        <Cell {...defaultCellProps} tile={'#'} />
        <Label>Wall</Label>
      </CellWrapper>
      <CellWrapper>
        <Cell {...defaultCellProps} tile={'@'} />
        <Label>Spawn</Label>
      </CellWrapper>
      <CellWrapper>
        <Cell {...defaultCellProps} tile={' '} />
        <Label>Void</Label>
      </CellWrapper>

      <p>Contents</p>
      <CellWrapper>
        <Cell {...defaultCellProps} tile={'.'} content="Player" />
        <Label>Player</Label>
      </CellWrapper>
    </Wrapper>
  );
};
