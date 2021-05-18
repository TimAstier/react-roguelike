import { v4 as uuid } from 'uuid';

import { CreatureEntity, CREATURES } from '../constants/creatures';
import { GameState } from './game';

export const reduceInitCreatures = (draft: GameState): void => {
  draft.currentMap.forEach((row, j) =>
    row.forEach((cellData, i) => {
      const creatureData = cellData.creature;
      if (creatureData) {
        const id = uuid();
        const template = CREATURES[creatureData.type];
        const creature: CreatureEntity = {
          id,
          type: creatureData.type,
          position: [i, j],
          hp: template.maxHp,
          maxHp: template.maxHp,
          conditions: {},
        };
        draft.creatures[id] = creature;
        draft.currentMap[j][i].creature = { id, type: creatureData.type };
      }
    })
  );
};
