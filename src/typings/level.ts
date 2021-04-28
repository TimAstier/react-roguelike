import { CellTile } from '../typings/cell';
import { Position } from '../typings/position';

export interface Level {
  map: CellTile[][];
  playerSpawn: Position;
}
