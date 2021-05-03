import React from 'react';
import styled from 'styled-components';

import roguelikeitems from '../assets/images/roguelikeitems.png';
import { Sprite } from '../components/Sprite';
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

const ItemWrapper = styled.div`
  box-sizing: border-box;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 6px;
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

const InnerWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OtherItems = styled.div`
  width: 85%;
  display: flex;
  flex-wrap: wrap;
`;

const EquipedWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 85%;
`;

const SingleItemWrapper = styled.div`
  box-sizing: border-box;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Inventory: React.FC = () => {
  return (
    <Wrapper>
      <DoubleBorders>
        <InnerWrapper>
          <p>-----</p>
          <EquipedWrapper>
            <PlaceholderSlot />
            <Slot>
              <ItemWrapper />
            </Slot>{' '}
            <PlaceholderSlot />
            <Slot>
              <ItemWrapper>
                <Sprite imageSrc={roguelikeitems} position={[0, 0]} pixelDimensions={16} />
              </ItemWrapper>
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
            <Slot></Slot>{' '}
            <Slot>
              <ItemWrapper />
            </Slot>{' '}
          </EquipedWrapper>
          <p>-----</p>
          <OtherItems>
            <SingleItemWrapper>
              <ItemWrapper>
                <Sprite imageSrc={roguelikeitems} position={[0, 0]} pixelDimensions={16} />
              </ItemWrapper>
            </SingleItemWrapper>
            <SingleItemWrapper>
              <ItemWrapper>
                <Sprite imageSrc={roguelikeitems} position={[0, 0]} pixelDimensions={16} />
              </ItemWrapper>
            </SingleItemWrapper>
            <SingleItemWrapper>
              <ItemWrapper>
                <Sprite imageSrc={roguelikeitems} position={[0, 0]} pixelDimensions={16} />
              </ItemWrapper>
            </SingleItemWrapper>
            <SingleItemWrapper>
              <ItemWrapper>
                <Sprite imageSrc={roguelikeitems} position={[0, 0]} pixelDimensions={16} />
              </ItemWrapper>
            </SingleItemWrapper>
            <SingleItemWrapper>
              <ItemWrapper>
                <Sprite imageSrc={roguelikeitems} position={[0, 0]} pixelDimensions={16} />
              </ItemWrapper>
            </SingleItemWrapper>
            <SingleItemWrapper>
              <ItemWrapper>
                <Sprite imageSrc={roguelikeitems} position={[0, 0]} pixelDimensions={16} />
              </ItemWrapper>
            </SingleItemWrapper>
            <SingleItemWrapper>
              <ItemWrapper>
                <Sprite imageSrc={roguelikeitems} position={[0, 0]} pixelDimensions={16} />
              </ItemWrapper>
            </SingleItemWrapper>
          </OtherItems>
        </InnerWrapper>
      </DoubleBorders>
    </Wrapper>
  );
};
