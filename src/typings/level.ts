import { CellData } from '../typings/cell';
import { Position } from '../typings/position';

export interface Level {
  gameMap: CellData[][];
  playerSpawn: Position;
}
