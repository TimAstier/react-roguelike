import React from 'react';
import { Sprite } from 'react-konva';

import { CELL_WIDTH_IN_PIXELS } from '../../constants/config';
import { Position } from '../../typings/position';
import { getRandomIntInclusive } from '../../utils/getRandomIntInclusive';

interface Props {
  position: Position;
  flameImage: HTMLImageElement | undefined;
  opacity: number;
}

export const Flame: React.FC<Props> = ({ position, flameImage, opacity }) => {
  const animations = {
    burning: [
      0,
      0,
      16,
      24, //
      16,
      0,
      16,
      24, //
      32,
      0,
      16,
      24, //
      48,
      0,
      16,
      24, //
      0,
      24,
      16,
      24, //
      16,
      24,
      16,
      24, //
      32,
      24,
      16,
      24, //
      48,
      24,
      16,
      24, //
      0,
      48,
      16,
      24, //
      16,
      48,
      16,
      24, //
      32,
      48,
      16,
      24, //
      48,
      48,
      16,
      24, //
    ],
  };
  return (
    <Sprite
      ref={(node) => {
        if (node && !node.isRunning()) node.start();
      }}
      x={position[0] * CELL_WIDTH_IN_PIXELS + (CELL_WIDTH_IN_PIXELS - 16) / 2}
      y={position[1] * CELL_WIDTH_IN_PIXELS}
      animation="burning"
      animations={animations}
      image={flameImage || new window.Image()}
      frameRate={8}
      frameIndex={getRandomIntInclusive(0, 11)}
      opacity={opacity}
    />
  );
};
