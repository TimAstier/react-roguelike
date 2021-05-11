import React from 'react';
import styled from 'styled-components';

import roguelikeitems from '../../assets/images/roguelikeitems.png';
import rpgicons from '../../assets/images/rpgicons.png';
import { CONDITIONS } from '../../constants/conditions';
import { ItemType } from '../../constants/items';
import { ActiveConditions } from '../../typings/activeConditions';
import { DoubleBorders } from '../Shared/DoubleBorders';
import { Sprite } from '../Shared/Sprite';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

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

const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
};

interface Props {
  withBackgroundMusic: boolean;
  setWithBackgroundMusic: React.Dispatch<React.SetStateAction<boolean>>;
  characterName: string;
  hp: number;
  maxHp: number;
  gold: number;
  equipedItems: ItemType[];
  playerConditions: ActiveConditions;
}

export const PlayerStats: React.FC<Props> = (props) => {
  const burningPercentage =
    props.playerConditions.burning === undefined
      ? 0
      : (props.playerConditions.burning?.activeRounds / CONDITIONS.burning.duration) * 100;

  return (
    <Wrapper>
      <div>
        <DoubleBorders>
          <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 17, paddingBottom: 17 }}>
            <div>
              <div style={{ display: 'flex' }}>
                <span>
                  <Sprite imageSrc={rpgicons} position={[0, 2]} pixelDimensions={16} />
                </span>
                <span style={{ marginLeft: 20 }}>{props.characterName}</span>
              </div>
            </div>
            <div style={{ marginTop: 13 }}>
              <div style={{ display: 'flex' }}>
                <span>
                  <Sprite imageSrc={rpgicons} position={[0, 0]} pixelDimensions={16} />
                </span>
                <span style={{ marginLeft: 20 }}>
                  {props.hp}/{props.maxHp}
                </span>
              </div>
            </div>
            <div style={{ marginTop: 13 }}>
              <div style={{ display: 'flex' }}>
                <span>
                  <Sprite imageSrc={rpgicons} position={[1, 0]} pixelDimensions={16} />
                </span>
                <span style={{ marginLeft: 20 }}>{props.gold}</span>
              </div>
            </div>
            {props.playerConditions.burning && (
              <div
                style={{
                  marginTop: 13,
                  backgroundColor: 'orange',
                  width: `${burningPercentage}%`,
                  height: 25,
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: 10,
                }}
              >
                BURNING
              </div>
            )}
          </div>
        </DoubleBorders>
      </div>
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
      <div>
        <DoubleBorders>
          <div style={{ height: 80, paddingLeft: 20, paddingRight: 20 }}>
            <div style={{ cursor: 'pointer', marginTop: 17 }} onClick={() => toggleFullScreen()}>
              FULL SCR.
            </div>
            <div
              style={{ cursor: 'pointer', marginTop: 13 }}
              onClick={() => props.setWithBackgroundMusic(!props.withBackgroundMusic)}
            >
              {props.withBackgroundMusic ? 'BGM: ON' : 'BGM: OFF'}
            </div>
          </div>
        </DoubleBorders>
      </div>
    </Wrapper>
  );
};
