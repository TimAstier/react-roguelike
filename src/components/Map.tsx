import React from 'react';
import styled from 'styled-components';

import Cell from './Cell';

const GRID_WIDTH = 20;
const GRID_HEIGHT = 20;

const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  display: flex;
  flex-wrap: wrap;
  border: solid 1px black;
`;

const Map = () => {
  const renderCells = () => {
    const cells = [];
    let index = 0;
    for (let i = 1; i <= GRID_WIDTH; i += 1) {
      for (let j = 1; j <= GRID_HEIGHT; j += 1) {
        cells.push(<Cell key={index} />);
        index += 1;
      }
    }
    return cells;
  };

  return <Wrapper>{renderCells()}</Wrapper>;
};

export default Map;
