import { ItemType } from './itemType';
import { Visibility } from './visibility';

export type CellContent = 0 | 'Player' | ItemType;
export type CellTile = ' ' | '#' | '.' | '@';

export interface CellData {
  content: CellContent;
  tile: CellTile;
  revealed: boolean;
  visibility: Visibility;
}
