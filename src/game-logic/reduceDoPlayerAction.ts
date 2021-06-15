import { GameState } from './game';
import { initRound } from './initRound';
import { tick } from './tick';

export const reduceDoPlayerAction = (draft: GameState, playerAction: string): void => {
  if (draft.playerActions.includes(playerAction) === false) {
    return;
  }

  if (playerAction === 'wait') {
    initRound(draft);
    draft.waitStreak++;
    tick(draft);
  }
};
