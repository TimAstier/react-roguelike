import { MAX_CLEAR_VISIBILITY, MAX_VISIBILITY } from '../constants/config';
import { CellData } from '../typings/cell';
import { Position } from '../typings/position';
import { getSurroundingPositions } from '../utils/getSurroundingPositions';
import { getVisibility } from '../utils/getVisibility';

export const updateVisibility = (position: Position, gameMap: CellData[][]): CellData[][] => {
  const newGameMap = gameMap;
  // TODO: Only set to 'dim' to cells that just went out of visibility
  // Then we should be able to remove "Set dark revealed cells to dim"
  // First reset all cells to dark
  newGameMap.forEach((row) => {
    row.forEach((cell) => {
      cell.visibility = 'dark';
    });
  });

  // Get surroundingPositions
  const surroundingPositions = getSurroundingPositions(position, MAX_VISIBILITY);

  // Visibility
  surroundingPositions.forEach((p) => {
    const visibility = getVisibility({
      position: p,
      playerPosition: position,
      gameMap: newGameMap,
      maxClearVisibility: MAX_CLEAR_VISIBILITY,
      maxVisibility: MAX_VISIBILITY,
    });
    newGameMap[p[1]][p[0]].visibility = visibility;

    // Update revealed for visible cells
    const visible = visibility === 'clear' || visibility === 'dim';
    if (visible && newGameMap[p[1]][p[0]].revealed === false) {
      newGameMap[p[1]][p[0]].revealed = true;
    }
  });

  // Set dark revealed cells to dim
  newGameMap.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell.visibility === 'dark' && cell.revealed === true) {
        newGameMap[y][x].visibility = 'dim';
      }
    });
  });

  return newGameMap;
};
