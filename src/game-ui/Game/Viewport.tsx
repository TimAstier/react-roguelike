import './fadein.css';

import React from 'react';
import styled from 'styled-components';

import { VIEWPORT_HEIGHT_IN_PIXELS, VIEWPORT_WIDTH_IN_PIXELS } from '../../constants/config';

const Wrapper = styled.div`
  overflow: hidden;
  width: ${() => `${VIEWPORT_WIDTH_IN_PIXELS}px`};
  height: ${() => `${VIEWPORT_HEIGHT_IN_PIXELS}px`};
  background-color: black;
`;

interface Props {
  depth: number;
}

export const Viewport: React.FC<Props> = (props) => {
  const [opacity, setOpacity] = React.useState(0);
  const [nextDepthClass, setNextDepthClass] = React.useState('');

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

  return (
    <Wrapper style={{ opacity }} className={nextDepthClass}>
      {props.children}
    </Wrapper>
  );
};
