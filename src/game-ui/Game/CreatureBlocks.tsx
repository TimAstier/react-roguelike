import React from 'react';
import styled from 'styled-components';

import { CreatureEntity, CREATURES } from '../../constants/creatures';
import { DoubleBorders } from '../Shared/DoubleBorders';
import { Sprite } from '../Shared/Sprite';

const Wrapper = styled.div`
  margin-top: 10px;
  max-height: 576px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    /*Chrome, Safari and Opera */
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

interface BlockProps {
  entity: CreatureEntity;
  index: number;
}

const Block: React.FC<BlockProps> = ({ entity, index }) => {
  const { imageSrc, spritePosition } = CREATURES[entity.type];
  const hpPercentage = (entity.hp / entity.maxHp) * 100;
  return (
    <div style={{ marginTop: index !== 0 ? 10 : undefined }}>
      <DoubleBorders>
        <div
          style={{
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 17,
            paddingBottom: 17,
          }}
        >
          <div style={{ width: 164 }}>
            <div style={{ display: 'flex' }}>
              <span>
                <Sprite imageSrc={imageSrc} position={spritePosition} pixelDimensions={16} />
              </span>
              <div style={{ width: 125 }}>
                <div
                  style={{
                    marginLeft: 20,
                    height: 20,
                  }}
                >
                  {entity.hp}/{entity.maxHp}
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
              <span>*</span>
              <span style={{ marginLeft: 20 }}>{entity.status}</span>
            </div>
          </div>
        </div>
      </DoubleBorders>
    </div>
  );
};

interface Props {
  entities: CreatureEntity[];
}

export const CreatureBlocks: React.FC<Props> = (props) => {
  return (
    <Wrapper>
      {props.entities.map((entity, index) => {
        return <Block key={entity.id} entity={entity} index={index} />;
      })}
    </Wrapper>
  );
};
