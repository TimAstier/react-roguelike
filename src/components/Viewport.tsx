import React from 'react';
import styled from 'styled-components';

import { VIEWPORT_WIDTH_IN_PIXELS } from '../constants/config';

const Wrapper = styled.div`
  overflow: hidden;
  width: ${() => `${VIEWPORT_WIDTH_IN_PIXELS}px`};
  height: ${() => `${VIEWPORT_WIDTH_IN_PIXELS}px`};
  background-color: black;
  border: solid 5px black;
  border-spacing: border-box;
  border: 2px solid #6e6e6e;
  border-radius: 5px;
`;

const Viewport: React.FC = (props) => {
  return <Wrapper>{props.children}</Wrapper>;
};

export default Viewport;
