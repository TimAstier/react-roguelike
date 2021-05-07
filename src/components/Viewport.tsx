import React from 'react';
import styled from 'styled-components';

import { VIEWPORT_HEIGHT_IN_PIXELS, VIEWPORT_WIDTH_IN_PIXELS } from '../constants/config';

const Wrapper = styled.div`
  overflow: hidden;
  width: ${() => `${VIEWPORT_WIDTH_IN_PIXELS}px`};
  height: ${() => `${VIEWPORT_HEIGHT_IN_PIXELS}px`};
  background-color: black;
`;

export const Viewport: React.FC = (props) => {
  return <Wrapper>{props.children}</Wrapper>;
};
