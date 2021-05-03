import React from 'react';
import styled from 'styled-components';

import { VIEWPORT_WIDTH_IN_PIXELS } from '../constants/config';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75px;
  width: ${VIEWPORT_WIDTH_IN_PIXELS}px;
  background-color: black;
  color: white;
  margin-top: 15px;
  padding: 5px;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
`;

interface Props {
  interactionText: string;
}

export const InteractionText: React.FC<Props> = (props) => {
  return <Wrapper>{props.interactionText}</Wrapper>;
};
