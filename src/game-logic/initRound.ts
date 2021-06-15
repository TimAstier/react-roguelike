import { GameState } from './game';

export const initRound = (draft: GameState): void => {
  draft.interactionText = '';
  draft.hitsLastRound = [];
  draft.deathPositionsThisRound = [];
  draft.sounds = [];
  draft.playerPreviousPosition = draft.playerPosition;
};
