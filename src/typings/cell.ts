import { CreatureType } from '../constants/creatures';
import { ItemType } from '../constants/items';
import { TileType } from '../constants/tiles';
import { Visibility } from './visibility';

export type CellContent = 0 | 'Player' | ItemType;

export interface CreatureData {
  id: string;
  type: CreatureType;
}

export interface CellData {
  creature?: CreatureData;
  content: CellContent;
  tile: TileType;
  revealed: boolean;
  visibility: Visibility;
  burningRounds: number;
}
