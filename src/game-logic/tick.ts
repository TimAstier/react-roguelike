import { checkCreaturesDeath } from './checkCreaturesDeath';
import { checkWaitStreak } from './checkWaitStreak';
import { GameState } from './game';
import { performCreaturesActions } from './performCreaturesActions';
import { resolveConditions } from './resolveConditions';
import { resolveStartingAndEndingConditions } from './resolveStartingAndEndingConditions';
import { updateBurningTiles } from './updateBurningTiles';

export const tick = (draft: GameState): void => {
  draft.round++;
  resolveConditions(draft);
  draft.currentMap = updateBurningTiles(draft.currentMap);
  resolveStartingAndEndingConditions(draft);
  checkCreaturesDeath(draft);
  performCreaturesActions(draft);
  checkWaitStreak(draft);
};
