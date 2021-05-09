export const NON_REVEALED_BACKGROUND_COLOR = 'rgb(0,0,0,1)';
export const DEFAULT_FONT_COLOR = '#5C606A';

export type TileType = ' ' | '#' | '.' | '@' | '+' | '"' | "'";

export interface Tile {
  type: TileType;
  name: string;
  nameInSentence: string;
  clearBackgroundColor: string;
  dimBackgroundColor: string;
  clearFontColor: string;
  dimFontColor: string;
  canWalkThrough: boolean;
  flammability: number; // From 0 to 1 | 0 = won't burn; 1 = burns for sure next round
  // opacity: number;
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
    flammability: 0,
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
    flammability: 0,
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
    flammability: 0,
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
    flammability: 0,
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
    flammability: 0.12,
  },
  {
    type: '"',
    name: 'grass',
    nameInSentence: 'some grass',
    clearBackgroundColor: '#131226',
    dimBackgroundColor: '#020211',
    clearFontColor: '#548419',
    dimFontColor: '#245702',
    canWalkThrough: true,
    flammability: 0.25,
  },
  {
    type: "'",
    name: 'ashes',
    nameInSentence: 'a pile of ashes',
    clearBackgroundColor: '#131226',
    dimBackgroundColor: '#020211',
    clearFontColor: 'grey',
    dimFontColor: '#808080',
    canWalkThrough: true,
    flammability: 0,
  },
];

export const getTile = (tileType: TileType): Tile | undefined => {
  return TILES.find((tile) => tile.type === tileType);
};
