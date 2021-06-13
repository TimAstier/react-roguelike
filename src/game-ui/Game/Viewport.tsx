import './fade.css';

import React from 'react';
import styled from 'styled-components';

import {
  GAMEOVER_FADEOUT_DURATION,
  VIEWPORT_HEIGHT_IN_PIXELS,
  VIEWPORT_WIDTH_IN_PIXELS,
} from '../../constants/config';
import { GameStatus } from '../../typings/gameStatus';

const Wrapper = styled.div`
  overflow: hidden;
  width: ${() => `${VIEWPORT_WIDTH_IN_PIXELS}px`};
  height: ${() => `${VIEWPORT_HEIGHT_IN_PIXELS}px`};
  background-color: black;
`;

interface Props {
  depth: number;
  gameStatus: GameStatus;
}

export const Viewport: React.FC<Props> = (props) => {
  const [opacity, setOpacity] = React.useState(0);
  const [nextDepthClass, setNextDepthClass] = React.useState('');
  const [gameoverClass, setGameoverClass] = React.useState('');

  React.useEffect(() => {
    setNextDepthClass('fadein');
    const timer = setTimeout(() => {
      setNextDepthClass('');
      setOpacity(1);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [props.depth]);

  React.useEffect(() => {
    if (props.gameStatus === 'gameover') {
      setGameoverClass('fadeout');
      const timer = setTimeout(() => {
        setGameoverClass('fadein');
      }, GAMEOVER_FADEOUT_DURATION);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [props.gameStatus]);

  return (
    <Wrapper style={{ opacity }} className={`${nextDepthClass} ${gameoverClass}`}>
      {props.children}
    </Wrapper>
  );
};
