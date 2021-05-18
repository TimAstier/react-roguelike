import { GameState } from './game';

export const checkCreaturesDeath = (draft: GameState): void => {
  for (const [key, value] of Object.entries(draft.creatures)) {
    if (value.hp <= 0) {
      draft.eventLogs.push(`The ${value.type} dies!`);
      delete draft.creatures[key];
      delete draft.currentMap[value.position[1]][value.position[0]].creature;
    }
  }
};
