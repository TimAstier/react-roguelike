export type CreatureType = 'goblin';
import { ActiveConditions } from '../typings/activeConditions';
import { Position } from '../typings/position';

export interface Creature {
  maxHp: number;
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
  },
};
