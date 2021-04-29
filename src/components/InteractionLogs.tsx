import React from 'react';
import styled from 'styled-components';

import { DoubleBorders } from './DoubleBorders';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75px;
  width: 100%;
  background-color: black;
  color: white;
  margin-top: 15px;
  padding: 5px;
  box-sizing: border-box;
`;

export const InteractionLogs: React.FC = () => {
  return (
    <Wrapper>
      <DoubleBorders>You enter a cold and humid room.</DoubleBorders>
    </Wrapper>
  );
};
