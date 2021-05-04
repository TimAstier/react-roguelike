import roguelikeitems from '../assets/images/roguelikeitems.png';
import { ItemType } from '../typings/itemType';
import { Position } from '../typings/position';

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
];

export const getItem = (itemType: ItemType): Item | undefined => {
  return ITEMS.find((item) => item.type === itemType);
};
