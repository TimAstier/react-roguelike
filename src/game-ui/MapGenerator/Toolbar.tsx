import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { CELL_WIDTH_IN_PIXELS } from '../../constants/config';
import { CREATURES, CreatureType } from '../../constants/creatures';
import { ITEMS } from '../../constants/items';
import { TILES, TileType } from '../../constants/tiles';
import { CellContent } from '../../typings/cell';
import { Effect } from '../../typings/effect';
import { Cell, CellProps } from './Cell';

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
  tileType: '.',
  cellWidth: CELL_WIDTH_IN_PIXELS,
  handleClick: () => false,
  burning: false,
};

interface Props {
  selectedTile: TileType | null;
  handleSelectedTile: (tile: TileType) => void;
  selectedContent: CellContent | null;
  handleSelectedContent: (content: CellContent) => void;
  selectedCreature: CreatureType | null;
  handleSelectedCreature: (content: CreatureType) => void;
  selectedEffect: Effect | null;
  handleSelectedEffect: (effect: Effect) => void;
  seed: string;
  setSeed: React.Dispatch<React.SetStateAction<string>>;
  load: () => void;
}

export const Toolbar: React.FC<Props> = (props) => {
  return (
    <Wrapper>
      <div style={{ height: '80%', overflowY: 'scroll' }}>
        <p>Tiles</p>
        {TILES.map((tile) => {
          return (
            <CellWrapper
              key={tile.name}
              selected={props.selectedTile === tile.type}
              onClick={() => props.handleSelectedTile(tile.type)}
            >
              <Cell {...defaultCellProps} tileType={tile.type} />
              <Label>{tile.name}</Label>
            </CellWrapper>
          );
        })}
        <p>Contents</p>
        <CellWrapper
          selected={props.selectedContent === 'Player'}
          onClick={() => props.handleSelectedContent('Player')}
        >
          <Cell {...defaultCellProps} tileType={'.'} content="Player" />
          <Label>Player</Label>
        </CellWrapper>
        {ITEMS.map((item) => {
          return (
            <CellWrapper
              key={item.type}
              selected={props.selectedContent === item.type}
              onClick={() => props.handleSelectedContent(item.type)}
            >
              <Cell {...defaultCellProps} tileType={'.'} content={item.type} />
              <Label>{item.type}</Label>
            </CellWrapper>
          );
        })}
        <p>Creatures</p>
        {Object.keys(CREATURES).map((creature) => {
          const type = creature as CreatureType;
          return (
            <CellWrapper
              key={type}
              selected={props.selectedCreature === type}
              onClick={() => props.handleSelectedCreature(type)}
            >
              <Cell {...defaultCellProps} tileType={'.'} creature={type} />
              <Label>{type}</Label>
            </CellWrapper>
          );
        })}
        <p>Effects</p>
        <CellWrapper
          selected={props.selectedEffect === 'burn'}
          onClick={() => props.handleSelectedEffect('burn')}
        >
          <Label>Burn</Label>
        </CellWrapper>
      </div>
      <div style={{ height: '20%' }}>
        <p>----</p>
        <Link to="/">PLAY</Link>
        <input
          style={{ marginTop: 15 }}
          value={props.seed}
          onChange={(event) => props.setSeed(event.target.value)}
        />
        <button style={{ marginTop: 15 }} onClick={props.load}>
          Load from seed
        </button>
      </div>
    </Wrapper>
  );
};
