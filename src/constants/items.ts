import roguelikeitems from '../assets/images/roguelikeitems.png';
import { ItemType } from '../typings/itemType';
import { Position } from '../typings/position';

interface Item {
  type: ItemType;
  spritePosition: Position;
  imageSrc: string;
}

export const ITEMS: Item[] = [
  {
    type: 'Sword',
    spritePosition: [2, 7],
    imageSrc: roguelikeitems,
  },
  {
    type: 'Ruby',
    spritePosition: [3, 3],
    imageSrc: roguelikeitems,
  },
  {
    type: 'Key',
    spritePosition: [11, 3],
    imageSrc: roguelikeitems,
  },
];

export const getItem = (itemType: ItemType): Item | undefined => {
  return ITEMS.find((item) => item.type === itemType);
};
