import React from 'react';
import styled from 'styled-components';

import { DoubleBorders } from './DoubleBorders';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 130px;
  width: 100%;
  background-color: black;
  color: red;
  margin-bottom: 15px;
  padding: 5px;
  box-sizing: border-box;
`;

export const EventLogs: React.FC = () => {
  return (
    <Wrapper>
      <DoubleBorders>The Spider hits you!</DoubleBorders>
    </Wrapper>
  );
};
