import React from 'react';
import styled from 'styled-components';

import { MoveDirection } from '../typings/moveDirection';

const mapMoveDirectionToAngle = {
  Left: -90,
  Right: 90,
  Up: 0,
  Down: 180,
};

interface StylingProps {
  animation: string;
  transform: string;
}

const Wrapper = styled.div`
  width: 15px;
  height: 15px;
  background-color: blue;
  animation: ${(p: StylingProps) => p.animation};
  transform: ${(p: StylingProps) => p.transform};
`;

const Front = styled.div`
  width: 5px;
  height: 5px;
  background-color: black;
  margin-left: auto;
  margin-right: auto;
`;

interface Props {
  moveDirection: MoveDirection;
}

const Player: React.FC<Props> = ({ moveDirection }) => {
  const animation = `move${moveDirection} 0.25s steps(16)`;
  const transform = `rotate(${mapMoveDirectionToAngle[moveDirection]}deg)`;
  return <Wrapper animation={animation} transform={transform}><Front /></Wrapper>;
};

export default Player;
