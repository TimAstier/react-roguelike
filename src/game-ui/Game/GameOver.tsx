import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

interface Props {
  deathText: string;
}

export const GameOver: React.FC<Props> = ({ deathText }) => {
  return (
    <Wrapper>
      <div style={{ marginBottom: 35 }}>GAME OVER</div>
      <div>{deathText}</div>
    </Wrapper>
  );
};
