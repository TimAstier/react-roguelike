import { getItem } from '../constants/items';
import { getTile, TileType } from '../constants/tiles';
import { CellContent, CreatureData } from '../typings/cell';
import { Visibility } from '../typings/visibility';
import { GameState } from './game';

export interface HoverCellPayload {
  tileType: TileType;
  visibility: Visibility;
  revealed: boolean;
  content: CellContent;
  burning: boolean;
  creature?: CreatureData;
  creatureDiedThisRound?: boolean;
}

export const reduceHoverCell = (draft: GameState, payload: HoverCellPayload): void => {
  const {
    tileType,
    visibility,
    revealed,
    content,
    burning,
    creature,
    creatureDiedThisRound,
  } = payload;

  if (content === 'Player') {
    draft.interactionText = 'This is you.';
    return;
  }

  if (revealed === false && visibility === 'dark') {
    return;
  }

  if (creature && visibility !== 'dark') {
    if (visibility === 'dim') {
      draft.interactionText = 'You see something standing in the shadows.';
      return;
    }
    if (visibility === 'clear') {
      draft.interactionText = `You see a ${creature.type}!`;
      return;
    }
  }

  if (visibility === 'dim' && !revealed && content !== 0) {
    draft.interactionText = 'You discern something on the ground.';
    return;
  }

  let verb = 'see';
  let location = '';

  if (visibility === 'dark' && revealed) {
    verb = 'remember seeing';
  }

  if (visibility === 'dim' && revealed) {
    verb = 'remember seeing';
  }

  if (visibility === 'dim') {
    verb = 'get a glimpse of';
  }

  let object;

  if (content !== 0) {
    object = getItem(content)?.nameInSentence;
  } else {
    object = getTile(tileType)?.nameInSentence;
  }

  if (creatureDiedThisRound) {
    object = 'a very much dead creature';
  }

  if (verb === 'remember seeing') {
    location = ' over there';
  }

  const interactionText = `You ${verb} ${object}${
    burning && visibility !== 'dark' ? ' burning' : ''
  }${location}.`;

  draft.interactionText = interactionText;
};
