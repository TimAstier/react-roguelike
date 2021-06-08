import React from 'react';
import styled from 'styled-components';

import { CreatureEntity, CREATURES } from '../../constants/creatures';
import { GameAction, gameActions } from '../../game-logic/game';
import { DoubleBorders } from '../Shared/DoubleBorders';
import { Sprite } from '../Shared/Sprite';

const Wrapper = styled.div`
  margin-top: 10px;
  height: 576px;
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
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  highlighted: boolean;
}

const Block: React.FC<BlockProps> = ({
  entity,
  index,
  handleMouseEnter,
  handleMouseLeave,
  highlighted,
}) => {
  const { imageSrc, spritePosition } = CREATURES[entity.type];
  const hpPercentage = (entity.hp / entity.maxHp) * 100;
  return (
    <div style={{ marginTop: index !== 0 ? 10 : undefined }}>
      <DoubleBorders>
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 17,
            paddingBottom: 17,
            background: highlighted ? 'radial-gradient(#555454, #030303)' : undefined,
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
  dispatch: React.Dispatch<GameAction>;
  hoveredCreatureId: string;
}

export const CreatureBlocks: React.FC<Props> = (props) => {
  const makeHandleMouseEnter = (creatureId: string) => () =>
    props.dispatch(gameActions.hoverCreatureBlock(creatureId));

  const handleMouseLeave = () => props.dispatch(gameActions.hoverAwayFromCreatureBlock());

  return (
    <Wrapper>
      {props.entities.map((entity, index) => {
        return (
          <Block
            key={entity.id}
            entity={entity}
            index={index}
            handleMouseEnter={makeHandleMouseEnter(entity.id)}
            handleMouseLeave={handleMouseLeave}
            highlighted={entity.id === props.hoveredCreatureId}
          />
        );
      })}
    </Wrapper>
  );
};
