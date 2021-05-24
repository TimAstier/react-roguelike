import React from 'react';

import rpgicons from '../../assets/images/rpgicons.png';
import { CreatureEntity, CREATURES } from '../../constants/creatures';
import { DoubleBorders } from '../Shared/DoubleBorders';
import { Sprite } from '../Shared/Sprite';

interface BlockProps {
  entity: CreatureEntity;
}

const Block: React.FC<BlockProps> = ({ entity }) => {
  const { imageSrc, spritePosition } = CREATURES[entity.type];
  return (
    <div style={{ marginTop: 10 }}>
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
              <span style={{ marginLeft: 20 }}>{entity.type}</span>
            </div>
          </div>
          <div style={{ marginTop: 13 }}>
            <div style={{ display: 'flex' }}>
              <span>
                <Sprite imageSrc={rpgicons} position={[0, 0]} pixelDimensions={16} />
              </span>
              <span style={{ marginLeft: 20 }}>
                {entity.hp}/{entity.maxHp}
              </span>
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
  entities: { [id: string]: CreatureEntity };
}

export const CreatureBlocks: React.FC<Props> = (props) => {
  return (
    <>
      {Object.entries(props.entities).map(([, entity]) => {
        return <Block key={entity.id} entity={entity} />;
      })}
    </>
  );
};
