import { CellData } from '../typings/cell';
import { Position } from '../typings/position';
import { GameState } from './game';

export interface UpdateCellPayload {
  cellData: CellData;
  position: Position;
}

export const reduceUpdateCell = (draft: GameState, payload: UpdateCellPayload): void => {
  const { position, cellData } = payload;

  if (draft.currentMap !== null) {
    draft.currentMap[position[1]][position[0]] = cellData;
  }
};
