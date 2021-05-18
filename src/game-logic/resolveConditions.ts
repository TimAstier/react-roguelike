import { BURNING_DAMAGE_PERCENTAGE } from '../constants/config';
import { getRandomIntInclusive } from '../utils/getRandomIntInclusive';
import { GameState } from './game';

export const resolveConditions = (draft: GameState): void => {
  if (draft.playerConditions.burning) {
    if (draft.playerConditions.burning.activeRounds === 1) {
      draft.eventLogs.push('You are no longer on fire');
      delete draft.playerConditions.burning;
    } else {
      const damagePercentage = getRandomIntInclusive(
        Math.min(0, BURNING_DAMAGE_PERCENTAGE - 5),
        BURNING_DAMAGE_PERCENTAGE + 2
      );
      const fireDamage = Math.ceil(draft.maxHp * (damagePercentage / 100));
      draft.hp = Math.max(draft.hp - fireDamage, 0);
      draft.eventLogs.push(`You suffer ${fireDamage} points of fire damage.`);
      if (draft.hp === 0) {
        draft.eventLogs.push('You burnt to death...');
        draft.gameStatus = 'gameover';
      }
      draft.playerConditions.burning.activeRounds--;
    }
  }
};
