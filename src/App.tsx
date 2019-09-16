import './App.css';

import React from 'react';
import styled from 'styled-components';

import Map from './components/Map';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: lightgrey;
  height: 100%;
`;

const App = () => {
  return (
    <Wrapper>
      <Map />
    </Wrapper>
  );
};

export default App;
