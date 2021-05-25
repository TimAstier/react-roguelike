import React from 'react';
import styled from 'styled-components';

import rpgicons from '../../assets/images/rpgicons.png';
import { CONDITIONS } from '../../constants/conditions';
import { ActiveConditions } from '../../typings/activeConditions';
import { DoubleBorders } from '../Shared/DoubleBorders';
import { Sprite } from '../Shared/Sprite';

const Wrapper = styled.div`
  /* height: 100%; */
  display: flex;
  /* flex-direction: column;
  justify-content: space-between; */
`;

// const toggleFullScreen = () => {
//   if (!document.fullscreenElement) {
//     document.documentElement.requestFullscreen();
//   } else {
//     if (document.exitFullscreen) {
//       document.exitFullscreen();
//     }
//   }
// };

interface Props {
  withBackgroundMusic: boolean;
  setWithBackgroundMusic: React.Dispatch<React.SetStateAction<boolean>>;
  characterName: string;
  hp: number;
  maxHp: number;
  gold: number;
  playerConditions: ActiveConditions;
}

export const PlayerStats: React.FC<Props> = (props) => {
  const hpPercentage = (props.hp / props.maxHp) * 100;
  const burningPercentage =
    props.playerConditions.burning === undefined
      ? 0
      : (props.playerConditions.burning?.activeRounds / CONDITIONS.burning.duration) * 100;

  return (
    <Wrapper>
      <div>
        <DoubleBorders>
          <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 17, paddingBottom: 17 }}>
            <div style={{ width: 164 }}>
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
                <div style={{ width: 125 }}>
                  <div
                    style={{
                      marginLeft: 20,
                      width: `${hpPercentage}%`,
                      display: 'flex',
                      alignItems: 'center',
                      height: 20,
                    }}
                  >
                    {props.hp}/{props.maxHp}
                  </div>
                  <div
                    style={{
                      marginLeft: 20,
                      backgroundColor: '#FF4847',
                      width: `${hpPercentage}%`,
                      height: 3,
                    }}
                  />
                </div>
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
      {/* <div>
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
      </div> */}
    </Wrapper>
  );
};
