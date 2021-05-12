import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const GameOver: React.FC = () => {
  return <Wrapper>GAME OVER</Wrapper>;
};
