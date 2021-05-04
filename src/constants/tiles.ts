import { TileType } from '../typings/tileType';

export const NON_REVEALED_BACKGROUND_COLOR = 'rgb(0,0,0,1)';
export const DEFAULT_FONT_COLOR = '#5C606A';

interface Tile {
  type: TileType;
  name: string;
  nameInSentence: string;
  clearBackgroundColor: string;
  dimBackgroundColor: string;
  clearFontColor: string;
  dimFontColor: string;
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
  },
  {
    type: '#',
    name: 'wall',
    nameInSentence: 'a wall',
    clearBackgroundColor: '#BEB5C4',
    dimBackgroundColor: '#6E6E6E',
    clearFontColor: 'black',
    dimFontColor: 'black',
  },
  {
    type: '.',
    name: 'ground',
    nameInSentence: 'the ground',
    clearBackgroundColor: '#131226',
    dimBackgroundColor: '#020211',
    clearFontColor: DEFAULT_FONT_COLOR,
    dimFontColor: '#555564',
  },
  {
    type: '@',
    name: 'spawn',
    nameInSentence: 'where you come from',
    clearBackgroundColor: '#131226',
    dimBackgroundColor: '#020211',
    clearFontColor: DEFAULT_FONT_COLOR,
    dimFontColor: '#555564',
  },
];

export const getTile = (tileType: TileType): Tile | undefined => {
  return TILES.find((tile) => tile.type === tileType);
};
