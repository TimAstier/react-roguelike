import React from 'react';
import styled from 'styled-components';

import { Position } from '../typings/position';

interface Props {
  imageSrc: string;
  pixelDimensions: number;
  position: Position;
}

const Wrapper = styled.img<Props>`
  width: ${(p) => p.pixelDimensions + 4}px;
  height: ${(p) => p.pixelDimensions + 4}px;
  background: url(${(p) => p.imageSrc}) no-repeat;
  background-position: ${(p) => -p.position[0] * p.pixelDimensions}px
    ${(p) => -p.position[1] * p.pixelDimensions}px;
`;

export const Sprite: React.FC<Props> = (props) => {
  return <Wrapper {...props} />;
};
