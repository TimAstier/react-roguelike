import roguelikeitems from '../assets/images/roguelikeitems.png';
import { Position } from '../typings/position';

export type ItemType = 'Sword' | 'Ruby' | 'Key' | 'SmallGold' | 'BigGold';

interface Item {
  type: ItemType;
  spritePosition: Position;
  imageSrc: string;
  nameInSentence: string;
}

export const ITEMS: Item[] = [
  {
    type: 'Sword',
    spritePosition: [2, 7],
    imageSrc: roguelikeitems,
    nameInSentence: 'a sword',
  },
  {
    type: 'Ruby',
    spritePosition: [3, 3],
    imageSrc: roguelikeitems,
    nameInSentence: 'a ruby',
  },
  {
    type: 'Key',
    spritePosition: [11, 3],
    imageSrc: roguelikeitems,
    nameInSentence: 'a key',
  },
  {
    type: 'SmallGold',
    spritePosition: [8, 3],
    imageSrc: roguelikeitems,
    nameInSentence: 'some gold',
  },
  {
    type: 'BigGold',
    spritePosition: [7, 3],
    imageSrc: roguelikeitems,
    nameInSentence: 'a lot of gold',
  },
];

export const getItem = (itemType: ItemType): Item | undefined => {
  return ITEMS.find((item) => item.type === itemType);
};
