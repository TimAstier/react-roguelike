import { CONDITIONS } from '../constants/conditions';
import { GameState } from './game';

export const resolveStartingAndEndingConditions = (draft: GameState): void => {
  if (draft.currentMap) {
    if (draft.currentMap[draft.playerPosition[1]][draft.playerPosition[0]].burningRounds > 0) {
      if (!draft.playerConditions.burning) {
        draft.eventLogs.push('You start burning!');
      }
      draft.playerConditions.burning = { activeRounds: CONDITIONS.burning.duration };
    }
  }
};
