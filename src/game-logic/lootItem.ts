import {
  BIG_GOLD_AMOUNT,
  BIG_GOLD_MODIFIER,
  SMALL_GOLD_AMOUNT,
  SMALL_GOLD_MODIFIER,
} from '../constants/config';
import { getItem } from '../constants/items';
import { Position } from '../typings/position';
import { getRandomIntInclusive } from '../utils/getRandomIntInclusive';
import { GameState } from './game';

export const lootItem = (draft: GameState, position: Position): void => {
  const content = draft.currentMap[position[1]][position[0]].content;
  if (content && content !== 'Player') {
    const item = getItem(content);
    if (item) {
      if (item.type === 'SmallGold') {
        const amount = getRandomIntInclusive(
          SMALL_GOLD_AMOUNT - SMALL_GOLD_MODIFIER,
          SMALL_GOLD_AMOUNT + SMALL_GOLD_MODIFIER
        );
        draft.gold = draft.gold + amount;
        draft.eventLogs.push(`You found ${amount} gold.`);
      } else if (item.type === 'BigGold') {
        const amount = getRandomIntInclusive(
          BIG_GOLD_AMOUNT - BIG_GOLD_MODIFIER,
          BIG_GOLD_AMOUNT + BIG_GOLD_MODIFIER
        );
        draft.gold = draft.gold + amount;
        draft.eventLogs.push(`You found ${amount} gold!`);
      } else {
        draft.inventory.push(content);
        draft.eventLogs.push(`You found ${item.nameInSentence}.`);
      }
    }
  }
};
