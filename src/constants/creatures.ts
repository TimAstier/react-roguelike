export type CreatureType = 'goblin' | 'ghost';
import roguelikecreatures from '../assets/images/roguelikecreatures.png';
import { ActiveConditions } from '../typings/activeConditions';
import { Position } from '../typings/position';

export interface Creature {
  maxHp: number;
  spritePosition: Position;
  imageSrc: string;
}

export interface CreatureEntity {
  id: string;
  type: CreatureType;
  position: Position;
  hp: number;
  maxHp: number;
  conditions: ActiveConditions;
}

export const CREATURES: { [C in CreatureType]: Creature } = {
  goblin: {
    maxHp: 10,
    spritePosition: [0, 2],
    imageSrc: roguelikecreatures,
  },
  ghost: {
    maxHp: 10,
    spritePosition: [0, 7],
    imageSrc: roguelikecreatures,
  },
};
