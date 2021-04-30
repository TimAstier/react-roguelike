import React from 'react';
import styled from 'styled-components';

import dagger from '../assets/images/ravenmore64/dagger.png';
import potionBlue from '../assets/images/ravenmore64/potionBlue.png';
import sword from '../assets/images/ravenmore64/sword.png';
// import { Sprite } from './Sprite';
import { DoubleBorders } from './DoubleBorders';

const Slot = styled.div`
  height: 50px;
  width: 50px;
  background-color: white;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: solid 2px #6e6e6e;
  border-radius: 10px;
  box-sizing: border-box;
`;

const Wrapper = styled.div`
  width: 100%;
  padding-right: 5px;
  padding-left: 5px;
  box-sizing: border-box;
`;

const SlotsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 85%;
`;

// TODO: Left arm / Right arm

export const Inventory: React.FC = () => {
  return (
    <Wrapper>
      <DoubleBorders>
        <SlotsWrapper>
          <Slot>
            <img src={dagger} />
          </Slot>{' '}
          <Slot>
            <img src={sword} />
          </Slot>{' '}
          <Slot>
            <img src={potionBlue} />
          </Slot>{' '}
          <Slot /> <Slot /> <Slot />
          <Slot /> <Slot /> <Slot />
          <Slot /> <Slot /> <Slot />
          <Slot /> <Slot /> <Slot />
          <Slot /> <Slot /> <Slot />
          <Slot /> <Slot /> <Slot />
        </SlotsWrapper>
      </DoubleBorders>
    </Wrapper>
  );
};
