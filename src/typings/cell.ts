import { Visibility } from '../typings/visibility';

export type CellContent = 0 | 'Player';
export type CellTile = ' ' | 'X' | '.' | '@';

export interface CellData {
  content: CellContent;
  tile: CellTile;
  revealed: boolean;
  visibility: Visibility;
}
