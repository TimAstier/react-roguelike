import { NUMBER_OF_ROUNDS_BURNING } from '../constants/config';
import { getTile } from '../constants/tiles';
import { CellData } from '../typings/cell';
import { Position } from '../typings/position';
import {
  getSurroundingPositions,
  GetSurroundingPositionsOptions,
} from '../utils/getSurroundingPositions';

export const updateBurningTiles = (map: CellData[][]): CellData[][] => {
  const startedBurningTiles: Position[] = [];
  const nextMap = map.map((arr) => arr.slice());
  const mapHeight = nextMap.length;
  const mapWidth = nextMap[0].length;

  // Propagate fire
  nextMap.forEach((row, j) => {
    row.forEach((cellData, i) => {
      if (
        cellData.burningRounds > 0 &&
        !startedBurningTiles.some((position) => position[0] === i && position[1] === j)
      ) {
        const options: GetSurroundingPositionsOptions = {
          position: [i, j],
          radius: 1,
          mapWidth,
          mapHeight,
        };
        const surroundingPositions = getSurroundingPositions(options);
        surroundingPositions.forEach((p) => {
          if (JSON.stringify(p) !== JSON.stringify([i, j])) {
            if (nextMap[p[1]][p[0]].burningRounds === 0) {
              const tile = getTile(nextMap[p[1]][p[0]].tile);
              if (tile && tile.flammability > 0) {
                if (Math.random() < tile.flammability) {
                  startedBurningTiles.push(p);
                  nextMap[p[1]][p[0]].burningRounds = NUMBER_OF_ROUNDS_BURNING + 1;
                }
              }
            }
          }
        });
      }
    });
  });

  // Decrement burning rounds
  nextMap.forEach((row, j) => {
    row.forEach((cellData, i) => {
      if (cellData.burningRounds > 0) {
        const nextBurningRounds = cellData.burningRounds - 1;
        const tileType = nextBurningRounds === 0 ? "'" : cellData.tile;
        nextMap[j][i] = { ...cellData, burningRounds: nextBurningRounds, tile: tileType };
      }
    });
  });
  return nextMap;
};
