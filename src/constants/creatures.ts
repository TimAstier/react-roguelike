import roguelikecreatures from '../assets/images/roguelikecreatures.png';
import { ActiveConditions } from '../typings/activeConditions';
import { Position } from '../typings/position';

export type CreatureType = 'goblin' | 'rat';

export type Trait = 'keenSmell';

export type CreatureStatus = 'idle' | 'hostile';

export interface Creature {
  maxHp: number;
  spritePosition: Position;
  imageSrc: string;
  baseAttack: string;
  baseAC: number;
  aggroRange: number;
  spawnNumber: number;
  traits: Trait[];
}

export interface CreatureEntity {
  id: string;
  type: CreatureType;
  position: Position;
  hp: number;
  maxHp: number;
  conditions: ActiveConditions;
  status: CreatureStatus;
}

export const CREATURES: { [C in CreatureType]: Creature } = {
  // A rather robust standard opponent
  goblin: {
    maxHp: 20,
    spritePosition: [0, 2],
    imageSrc: roguelikecreatures,
    baseAttack: '1d8+5',
    baseAC: 8,
    aggroRange: 6,
    spawnNumber: 2,
    traits: [],
  },
  // Spawns in large and aggro from far away without needing LOS
  rat: {
    maxHp: 10,
    spritePosition: [0, 1],
    imageSrc: roguelikecreatures,
    baseAttack: '2d4',
    baseAC: 10,
    aggroRange: 10,
    spawnNumber: 5,
    traits: ['keenSmell'],
  },
};
