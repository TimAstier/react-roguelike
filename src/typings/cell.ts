import { Visibility } from '../typings/visibility';

export type CellContent = 0 | 'Player' | 'Sword' | 'Ruby' | 'Key';
export type CellTile = ' ' | '#' | '.' | '@';

export interface CellData {
  content: CellContent;
  tile: CellTile;
  revealed: boolean;
  visibility: Visibility;
}
