import { GameState } from './game';

export const checkWaitStreak = (draft: GameState): void => {
  if (draft.hp < draft.maxHp) {
    if (draft.waitStreak === 1) {
      draft.eventLogs.push('You catch your breath.');
    }
    if (draft.waitStreak === 2) {
      draft.eventLogs.push('You take a deep breathe.');
    }
    if (draft.waitStreak >= 3) {
      if (draft.waitStreak === 3) {
        draft.eventLogs.push('You feel a little bit better.');
      }
      draft.hp++;
    }
  } else {
    if (draft.waitStreak === 1) {
      draft.eventLogs.push('You start waiting.');
    }
  }
};
