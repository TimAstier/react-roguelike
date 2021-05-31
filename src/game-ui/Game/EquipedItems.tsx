import React from 'react';
import styled from 'styled-components';

import roguelikeitems from '../../assets/images/roguelikeitems.png';
import { ItemType } from '../../constants/items';
import { Sprite } from '../Shared/Sprite';

const EquipedWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 85%;
  margin-left: auto;
  margin-right: auto;
`;

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

const ItemWrapper = styled.div`
  box-sizing: border-box;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #131226;
  border-radius: 6px;
`;

const PlaceholderSlot = styled.div`
  height: 50px;
  width: 50px;
  background-color: black;
  margin-bottom: 10px;
`;

interface Props {
  equipedItems: ItemType[];
}

export const EquipedItems: React.FC<Props> = (props) => {
  return (
    <EquipedWrapper>
      <PlaceholderSlot />
      <Slot>
        <ItemWrapper />
      </Slot>{' '}
      <PlaceholderSlot />
      {props.equipedItems.some((item) => item === 'Sword') ? (
        <Slot>
          <ItemWrapper>
            <Sprite imageSrc={roguelikeitems} position={[3, 8]} pixelDimensions={16} />
          </ItemWrapper>
        </Slot>
      ) : (
        <Slot>
          <ItemWrapper />
        </Slot>
      )}
      <Slot>
        <ItemWrapper />
      </Slot>{' '}
      <Slot>
        <ItemWrapper />
      </Slot>{' '}
      <Slot>
        <ItemWrapper />
      </Slot>{' '}
      <Slot>
        <ItemWrapper />
      </Slot>{' '}
      <Slot>
        <ItemWrapper />
      </Slot>{' '}
    </EquipedWrapper>
  );
};
