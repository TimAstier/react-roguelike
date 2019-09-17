import React, { useEffect, useState } from 'react';

import { GRID_WIDTH } from '../constants/grid';
import { MoveDirection } from '../typings/moveDirection';
import { Position } from '../typings/position';
import Map from './Map';

const LEFT_ARROW_KEYCODE = 37;
const UP_ARROW_KEYCODE = 38;
const RIGHT_ARROW_KEYCODE = 39;
const DOWN_ARROW_KEYCODE = 40;

const Game = () => {
  const [playerPosition, setPlayerPosition] = useState<Position>([0, 0]);
  const [moveDirection, setMoveDirection] = useState<MoveDirection>('Right');

  const handleKeyDown = (event) => {
    switch (event.keyCode) {
      case LEFT_ARROW_KEYCODE:
        event.preventDefault();
        if (playerPosition[1] > 0) {
          setMoveDirection('Left');
          setPlayerPosition([playerPosition[0], playerPosition[1] - 1]);
        }
        break;
      case RIGHT_ARROW_KEYCODE:
        event.preventDefault();
        if (playerPosition[1] < GRID_WIDTH - 1) {
          setMoveDirection('Right');
          setPlayerPosition([playerPosition[0], playerPosition[1] + 1]);
        }
        break;
      case UP_ARROW_KEYCODE:
        event.preventDefault();
        if (playerPosition[0] > 0) {
          setMoveDirection('Up');
          setPlayerPosition([playerPosition[0] - 1, playerPosition[1]]);
        }
        break;
      case DOWN_ARROW_KEYCODE:
        event.preventDefault();
        if (playerPosition[0] < GRID_WIDTH - 1) {
          setMoveDirection('Down');
          setPlayerPosition([playerPosition[0] + 1, playerPosition[1]]);
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });


  return <Map playerPosition={playerPosition} moveDirection={moveDirection} />;
};

export default Game;
