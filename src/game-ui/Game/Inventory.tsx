import React, { ReactNode } from 'react';
import styled from 'styled-components';

import roguelikeitems from '../../assets/images/roguelikeitems.png';
import { NUMBER_OF_INVENTORY_SLOTS } from '../../constants/config';
import { getItem, ItemType } from '../../constants/items';
import { DoubleBorders } from '../Shared/DoubleBorders';
import { Sprite } from '../Shared/Sprite';

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

const Wrapper = styled.div`
  width: 100%;
  padding-right: 5px;
  padding-left: 5px;
  box-sizing: border-box;
`;

const Items = styled.div`
  width: 85%;
  display: flex;
  flex-wrap: wrap;
  margin-left: auto;
  margin-right: auto;
  padding-top: 20px;
  padding-bottom: 20px;
  justify-content: center;
`;

const SingleItemWrapper = styled.div`
  box-sizing: border-box;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface Props {
  inventory: ItemType[];
}

const renderItemSlot = (itemType: ItemType | null, index: number) => {
  if (itemType) {
    return (
      <SingleItemWrapper key={`slot-${index}`}>
        <ItemWrapper key={itemType}>
          <Sprite
            imageSrc={roguelikeitems}
            position={getItem(itemType)?.spritePosition || [0, 0]}
            pixelDimensions={16}
          />
        </ItemWrapper>
      </SingleItemWrapper>
    );
  }
  return (
    <SingleItemWrapper key={`slot-${index}`}>
      <ItemWrapper></ItemWrapper>
    </SingleItemWrapper>
  );
};

export const Inventory: React.FC<Props> = (props) => {
  const renderItemSlots = () => {
    const itemSlots: ReactNode[] = [];
    for (let i = 0; i < NUMBER_OF_INVENTORY_SLOTS; i++) {
      if (props.inventory[i]) {
        itemSlots.push(renderItemSlot(props.inventory[i], i));
      } else {
        itemSlots.push(renderItemSlot(null, i));
      }
    }

    return itemSlots;
  };

  return (
    <Wrapper>
      <div>
        <DoubleBorders>
          <Items>{renderItemSlots()}</Items>
        </DoubleBorders>
      </div>
    </Wrapper>
  );
};
