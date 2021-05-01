import React from 'react';
import styled from 'styled-components';

import armor from '../assets/images/ravenmore64/armor.png';
import backpack from '../assets/images/ravenmore64/backpack.png';
import gemBlue from '../assets/images/ravenmore64/gemBlue.png';
import gemGreen from '../assets/images/ravenmore64/gemGreen.png';
import helmet from '../assets/images/ravenmore64/helmet.png';
import shieldSmall from '../assets/images/ravenmore64/shieldSmall.png';
import swordWood from '../assets/images/ravenmore64/swordWood.png';
// import { Sprite } from './Sprite';
import { DoubleBorders } from './DoubleBorders';

const Slot = styled.div`
  height: 50px;
  width: 50px;
  background-color: black;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 2px #6e6e6e;
  border-radius: 10px;
  box-sizing: border-box;
`;

const PlaceholderSlot = styled.div`
  height: 50px;
  width: 50px;
  background-color: black;
  margin-bottom: 10px;
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
          <PlaceholderSlot />
          <Slot>
            <img src={helmet} />
          </Slot>{' '}
          <PlaceholderSlot />
          <Slot>
            <img src={swordWood} />
          </Slot>{' '}
          <Slot>
            <img src={armor} />
          </Slot>{' '}
          <Slot>
            <img src={shieldSmall} />
          </Slot>{' '}
          <Slot>
            <img src={gemBlue} />
          </Slot>{' '}
          <Slot></Slot>{' '}
          <Slot>
            <img src={gemGreen} />
          </Slot>{' '}
          <PlaceholderSlot />
          <PlaceholderSlot />
          <PlaceholderSlot />
          <PlaceholderSlot />{' '}
          <Slot>
            <img src={backpack} />
          </Slot>{' '}
          <PlaceholderSlot />
          <Slot /> <Slot /> <Slot />
          <Slot /> <Slot /> <Slot />
        </SlotsWrapper>
      </DoubleBorders>
    </Wrapper>
  );
};
