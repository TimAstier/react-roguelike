import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { CELL_WIDTH_IN_PIXELS } from '../../constants/config';
import { CellContent, CellTile } from '../../typings/cell';
import { Cell, CellProps } from '../Cell';

const Wrapper = styled.div`
  background-color: grey;
  width: 170px;
  height: 94%;
  padding: 10px 10px;
`;

interface CellWrapperProps {
  selected: boolean;
}

const CellWrapper = styled.div<CellWrapperProps>`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  border: ${(props) => (props.selected ? 'solid 2px blue' : 'solid 2px grey')};
  cursor: pointer;
  height: 27px;
  width: 128px;
  padding: 3px 3px 3px 3px;
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
  revealed: true,
};

interface Props {
  selectedTile: CellTile | null;
  handleSelectedTile: (tile: CellTile) => void;
  selectedContent: CellContent | null;
  handleSelectedContent: (content: CellContent) => void;
}

export const Toolbar: React.FC<Props> = (props) => {
  return (
    <Wrapper>
      <p>Tiles</p>
      <CellWrapper
        selected={props.selectedTile === '.'}
        onClick={() => props.handleSelectedTile('.')}
      >
        <Cell {...defaultCellProps} tile={'.'} />
        <Label>Ground</Label>
      </CellWrapper>
      <CellWrapper
        selected={props.selectedTile === '#'}
        onClick={() => props.handleSelectedTile('#')}
      >
        <Cell {...defaultCellProps} tile={'#'} />
        <Label>Wall</Label>
      </CellWrapper>
      <CellWrapper
        selected={props.selectedTile === '@'}
        onClick={() => props.handleSelectedTile('@')}
      >
        <Cell {...defaultCellProps} tile={'@'} />
        <Label>Spawn</Label>
      </CellWrapper>
      <CellWrapper
        selected={props.selectedTile === ' '}
        onClick={() => props.handleSelectedTile(' ')}
      >
        <Cell {...defaultCellProps} tile={' '} />
        <Label>Void</Label>
      </CellWrapper>

      <p>Contents</p>
      <CellWrapper
        selected={props.selectedContent === 'Player'}
        onClick={() => props.handleSelectedContent('Player')}
      >
        <Cell {...defaultCellProps} tile={'.'} content="Player" />
        <Label>Player</Label>
      </CellWrapper>
      <CellWrapper
        selected={props.selectedContent === 'Sword'}
        onClick={() => props.handleSelectedContent('Sword')}
      >
        <Cell {...defaultCellProps} tile={'.'} content="Sword" />
        <Label>Sword</Label>
      </CellWrapper>
      <CellWrapper
        selected={props.selectedContent === 'Ruby'}
        onClick={() => props.handleSelectedContent('Ruby')}
      >
        <Cell {...defaultCellProps} tile={'.'} content="Ruby" />
        <Label>Ruby</Label>
      </CellWrapper>
      <CellWrapper
        selected={props.selectedContent === 'Key'}
        onClick={() => props.handleSelectedContent('Key')}
      >
        <Cell {...defaultCellProps} tile={'.'} content="Key" />
        <Label>Key</Label>
      </CellWrapper>
      <p>----</p>
      <Link to="/">PLAY</Link>
    </Wrapper>
  );
};
