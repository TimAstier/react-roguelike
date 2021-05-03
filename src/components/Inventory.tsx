import React from 'react';
import styled from 'styled-components';

import roguelikeitems from '../assets/images/roguelikeitems.png';
import { Sprite } from '../components/Sprite';
import { DoubleBorders } from './DoubleBorders';

interface ItemWrapperProps {
  hasItem: boolean;
}

const ItemWrapper = styled.div<ItemWrapperProps>`
  box-sizing: border-box;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(p) => (p.hasItem ? 'white' : '#6e6e6e')};
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
  inventory: string[];
}

export const Inventory: React.FC<Props> = (props) => {
  return (
    <Wrapper>
      <div>
        <DoubleBorders>
          <div>
            <Items>
              <SingleItemWrapper>
                {props.inventory.some((item) => item === 'Key') ? (
                  <ItemWrapper hasItem={true}>
                    <Sprite imageSrc={roguelikeitems} position={[11, 3]} pixelDimensions={16} />
                  </ItemWrapper>
                ) : (
                  <SingleItemWrapper>
                    <ItemWrapper hasItem={false}></ItemWrapper>
                  </SingleItemWrapper>
                )}
              </SingleItemWrapper>
              <SingleItemWrapper>
                <ItemWrapper hasItem={false}></ItemWrapper>
              </SingleItemWrapper>
              <SingleItemWrapper>
                <ItemWrapper hasItem={false}></ItemWrapper>
              </SingleItemWrapper>
              <SingleItemWrapper>
                <ItemWrapper hasItem={false}></ItemWrapper>
              </SingleItemWrapper>
              <SingleItemWrapper>
                <ItemWrapper hasItem={false}></ItemWrapper>
              </SingleItemWrapper>
              <SingleItemWrapper>
                <ItemWrapper hasItem={false}></ItemWrapper>
              </SingleItemWrapper>
              <SingleItemWrapper>
                <ItemWrapper hasItem={false}></ItemWrapper>
              </SingleItemWrapper>
              <SingleItemWrapper>
                <ItemWrapper hasItem={false}></ItemWrapper>
              </SingleItemWrapper>
              <SingleItemWrapper>
                <ItemWrapper hasItem={false}></ItemWrapper>
              </SingleItemWrapper>
              <SingleItemWrapper>
                <ItemWrapper hasItem={false}></ItemWrapper>
              </SingleItemWrapper>
              <SingleItemWrapper>
                <ItemWrapper hasItem={false}></ItemWrapper>
              </SingleItemWrapper>
              <SingleItemWrapper>
                <ItemWrapper hasItem={false}></ItemWrapper>
              </SingleItemWrapper>
            </Items>
          </div>
        </DoubleBorders>
      </div>
    </Wrapper>
  );
};
