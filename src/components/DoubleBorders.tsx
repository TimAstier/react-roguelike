import React from 'react';
import styled from 'styled-components';

const BorderA = styled.div`
  border: 3px solid #6e6e6e;
  border-radius: 5px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px;
  box-sizing: border-box;
`;

const BorderB = styled.div`
  border: 3px solid #6e6e6e;
  border-radius: 3px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

export const DoubleBorders: React.FC = (props) => {
  return (
    <BorderA>
      <BorderB>{props.children}</BorderB>
    </BorderA>
  );
};
