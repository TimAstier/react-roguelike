import { TileType } from '../typings/tileType';

interface Tile {
  type: TileType;
  name: string;
  nameInSentence: string;
}

export const TILES: Tile[] = [
  {
    type: ' ',
    name: 'void',
    nameInSentence: 'the void',
  },
  {
    type: '#',
    name: 'wall',
    nameInSentence: 'a wall',
  },
  {
    type: '.',
    name: 'ground',
    nameInSentence: 'the ground',
  },
  {
    type: '@',
    name: 'spawn',
    nameInSentence: 'where you come from',
  },
];

export const getTile = (tileType: TileType): Tile | undefined => {
  return TILES.find((tile) => tile.type === tileType);
};
