import { ItemType } from './itemType';
import { TileType } from './tileType';
import { Visibility } from './visibility';

export type CellContent = 0 | 'Player' | ItemType;

export interface CellData {
  content: CellContent;
  tile: TileType;
  revealed: boolean;
  visibility: Visibility;
}
