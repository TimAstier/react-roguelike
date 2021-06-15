import React from 'react';
import styled from 'styled-components';

import { CELL_WIDTH_MAP_GENERATOR } from '../../constants/config';

const Wrapper = styled.div`
  width: ${0.6 * CELL_WIDTH_MAP_GENERATOR}px;
  height: ${0.6 * CELL_WIDTH_MAP_GENERATOR}px;
  background-color: blue;
`;

const Front = styled.div`
  width: ${0.3 * CELL_WIDTH_MAP_GENERATOR}px;
  height: ${0.3 * CELL_WIDTH_MAP_GENERATOR}px;
  background-color: black;
  margin-left: auto;
  margin-right: auto;
`;

export const Player: React.FC = () => {
  return (
    <Wrapper>
      <Front />
    </Wrapper>
  );
};
