import React from 'react';
import styled from 'styled-components';

import { MoveDirection } from '../typings/moveDirection';

interface StylingProps {
  animation: string;
}

const Wrapper = styled.div`
  width: 15px;
  height: 15px;
  background-color: blue;
  animation: ${(p: StylingProps) => p.animation};
`;

interface Props {
  moveDirection: MoveDirection;
}

const Player: React.FC<Props> = ({ moveDirection }) => {
  const animation = `move${moveDirection} 0.5s steps(16)`;
  return <Wrapper animation={animation} />;
};

export default Player;
