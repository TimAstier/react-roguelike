import { TileType } from '../typings/tileType';

export const NON_REVEALED_BACKGROUND_COLOR = 'rgb(0,0,0,1)';
export const DEFAULT_FONT_COLOR = '#5C606A';

export interface Tile {
  type: TileType;
  name: string;
  nameInSentence: string;
  clearBackgroundColor: string;
  dimBackgroundColor: string;
  clearFontColor: string;
  dimFontColor: string;
  // flammability: number;
  // opacity: number;
  canWalkThrough: boolean;
}

export const TILES: Tile[] = [
  {
    type: ' ',
    name: 'void',
    nameInSentence: 'the void',
    clearBackgroundColor: 'rgb(0,0,0,1)',
    dimBackgroundColor: 'rgb(0,0,0,1)',
    clearFontColor: DEFAULT_FONT_COLOR,
    dimFontColor: '#555564',
    canWalkThrough: true,
  },
  {
    type: '#',
    name: 'wall',
    nameInSentence: 'a wall',
    clearBackgroundColor: '#BEB5C4',
    dimBackgroundColor: '#6E6E6E',
    clearFontColor: 'black',
    dimFontColor: 'black',
    canWalkThrough: false,
  },
  {
    type: '.',
    name: 'ground',
    nameInSentence: 'the ground',
    clearBackgroundColor: '#131226',
    dimBackgroundColor: '#020211',
    clearFontColor: DEFAULT_FONT_COLOR,
    dimFontColor: '#555564',
    canWalkThrough: true,
  },
  {
    type: '@',
    name: 'spawn',
    nameInSentence: 'where you come from',
    clearBackgroundColor: '#131226',
    dimBackgroundColor: '#020211',
    clearFontColor: DEFAULT_FONT_COLOR,
    dimFontColor: '#555564',
    canWalkThrough: true,
  },
  {
    type: '+',
    name: 'woodenDoor',
    nameInSentence: 'a wooden door',
    clearBackgroundColor: '#732e1d',
    dimBackgroundColor: '#511E12',
    clearFontColor: '#EB833D',
    dimFontColor: '#EB833D',
    canWalkThrough: true,
  },
];

export const getTile = (tileType: TileType): Tile | undefined => {
  return TILES.find((tile) => tile.type === tileType);
};
