import Konva from 'konva';
import React from 'react';
import { Group, Rect } from 'react-konva';

import { PAUSE_TIME_BETWEEN_MOVES } from '../../constants/config';
import {
  CELL_WIDTH_IN_PIXELS,
  NUMBER_OF_CELLS_IN_VIEWPORT_X,
  NUMBER_OF_CELLS_IN_VIEWPORT_Y,
} from '../../constants/config';
import { GameAction, gameActions } from '../../game-logic/game';
import { Hit } from '../../typings/hit';
import { MoveDirection } from '../../typings/moveDirection';

interface Props {
  moveDirection: MoveDirection;
  dispatch: React.Dispatch<GameAction>;
  hitsLastRound: Hit[];
  round: number;
}

export const Player: React.FC<Props> = ({ moveDirection, dispatch, hitsLastRound, round }) => {
  const rectRef = React.useRef<Konva.Rect>(null);
  const [hasBlinked, setHasBlinked] = React.useState(false);
  const playerWidth = 0.6 * CELL_WIDTH_IN_PIXELS;
  const frontWidth = 0.3 * CELL_WIDTH_IN_PIXELS;
  let frontXModifier: number;
  let frontYModifier: number;

  const wasHitLastRound = hitsLastRound.filter((h) => h.creatureId === 'player').length !== 0;
  const shouldBlink = wasHitLastRound && !hasBlinked;

  React.useEffect(() => {
    setHasBlinked(false);
  }, [round]);

  React.useEffect(() => {
    // TODO: UseBlink and use same logic for creature?
    if (rectRef.current) {
      if (shouldBlink) {
        const tween = new Konva.Tween({
          node: rectRef.current,
          duration: PAUSE_TIME_BETWEEN_MOVES / 1000,
          easing: Konva.Easings.BounceEaseInOut,
          fill: 'blue',
          onFinish: () => setHasBlinked(true),
        });
        tween.play();
        return () => {
          tween.pause();
        };
      }
    }
  }, [round, shouldBlink]);

  switch (moveDirection) {
    case 'Up':
      frontXModifier = frontWidth / 2;
      frontYModifier = playerWidth - frontWidth;
      break;
    case 'Down':
      frontXModifier = frontWidth / 2;
      frontYModifier = -playerWidth + frontWidth * 2;
      break;
    case 'Left':
      frontXModifier = playerWidth - frontWidth;
      frontYModifier = frontWidth / 2;
      break;
    case 'Right':
      frontXModifier = -playerWidth + frontWidth * 2;
      frontYModifier = frontWidth / 2;
      break;
  }

  const handleMouseEnter = () =>
    dispatch(
      gameActions.hoverCell({
        tileType: '.',
        visibility: 'clear',
        revealed: true,
        content: 'Player',
        burning: false,
      })
    );

  const handleMouseLeave = () => dispatch(gameActions.hoverAwayFromCell());

  return (
    <Group onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Rect
        ref={rectRef}
        width={playerWidth}
        height={playerWidth}
        fill={shouldBlink ? 'red' : 'blue'}
        x={(CELL_WIDTH_IN_PIXELS * NUMBER_OF_CELLS_IN_VIEWPORT_X) / 2 - playerWidth / 2}
        y={(CELL_WIDTH_IN_PIXELS * NUMBER_OF_CELLS_IN_VIEWPORT_Y) / 2 - playerWidth / 2}
        _useStrictMode
      />
      <Rect
        width={frontWidth}
        height={frontWidth}
        fill={'black'}
        x={(CELL_WIDTH_IN_PIXELS * NUMBER_OF_CELLS_IN_VIEWPORT_X) / 2 - frontXModifier}
        y={(CELL_WIDTH_IN_PIXELS * NUMBER_OF_CELLS_IN_VIEWPORT_Y) / 2 - frontYModifier}
      />
    </Group>
  );
};
