import { TileType } from '../typings/tileType';

interface Tile {
  type: TileType;
  name: string;
  nameInSentence: string;
  clearBackgroundColor: string;
  dimBackgroundColor: string;
}

export const TILES: Tile[] = [
  {
    type: ' ',
    name: 'void',
    nameInSentence: 'the void',
    clearBackgroundColor: 'rgb(0,0,0,1)',
    dimBackgroundColor: 'rgb(0,0,0,1)',
  },
  {
    type: '#',
    name: 'wall',
    nameInSentence: 'a wall',
    clearBackgroundColor: '#BEB5C4',
    dimBackgroundColor: '#6E6E6E',
  },
  {
    type: '.',
    name: 'ground',
    nameInSentence: 'the ground',
    clearBackgroundColor: '#131226',
    dimBackgroundColor: '#020211',
  },
  {
    type: '@',
    name: 'spawn',
    nameInSentence: 'where you come from',
    clearBackgroundColor: '#131226',
    dimBackgroundColor: '#020211',
  },
];

export const getTile = (tileType: TileType): Tile | undefined => {
  return TILES.find((tile) => tile.type === tileType);
};
