import React from 'react';
import styled from 'styled-components';

import { VIEWPORT_WIDTH_IN_PIXELS } from '../constants/config';

const Wrapper = styled.div`
  height: 120px;
  width: ${VIEWPORT_WIDTH_IN_PIXELS}px;
  background-color: #131226;
  border-radius: 10px;
  color: white;
  margin-bottom: 15px;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  font-family: Ubuntu Mono;
  font-size: 16px;
  padding: 5px 12px 5px 12px;
  font-weight: 400;
`;

const Log = styled.div`
  height: 22px;
  display: flex;
  align-items: center;
`;

interface Props {
  eventLogs: string[];
}

const NUMBER_OF_LOGS_DISPLAYED = 5;

export const EventLogs: React.FC<Props> = (props) => {
  return (
    <Wrapper>
      {props.eventLogs
        .slice(
          Math.max(0, props.eventLogs.length - NUMBER_OF_LOGS_DISPLAYED),
          props.eventLogs.length
        )
        .map((log, index) => (
          <Log key={index}>{log}</Log>
        ))}
    </Wrapper>
  );
};
