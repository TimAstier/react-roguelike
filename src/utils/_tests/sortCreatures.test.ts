import { CreatureEntity } from '../../constants/creatures';
import { CellData } from '../../typings/cell';
import { Hit } from '../../typings/hit';
import { sortCreatures } from '../sortCreatures';

const c: CellData = {
  content: 0,
  tile: '.',
  revealed: true,
  visibility: 'clear',
  burningRounds: 0,
  position: 'x,x',
};

const d: CellData = { ...c, visibility: 'dim' };

const map: CellData[][] = [
  [c, d, c, c],
  [c, c, c, c],
  [c, c, c, c],
  [c, c, c, c],
];

const entityA: CreatureEntity = {
  id: '1',
  type: 'goblin',
  position: [0, 0],
  hp: 10,
  maxHp: 10,
  conditions: {},
  status: 'idle',
  walkingDistanceToPlayer: 2,
};

const entityB: CreatureEntity = {
  id: '2',
  type: 'goblin',
  position: [1, 0],
  hp: 10,
  maxHp: 10,
  conditions: {},
  status: 'idle',
  walkingDistanceToPlayer: 1,
};

const entityC: CreatureEntity = {
  id: '3',
  type: 'goblin',
  position: [3, 0],
  hp: 10,
  maxHp: 10,
  conditions: {},
  status: 'idle',
  walkingDistanceToPlayer: 1,
};

describe('sortCreatures', () => {
  it('filters out creatures that are not visible', () => {
    const creatures: { [id: string]: CreatureEntity } = {
      '1': entityA,
      '2': entityB,
    };

    const currentMap: CellData[][] = map;
    const hitsLastRound: Hit[] = [];
    const options = { creatures, currentMap, hitsLastRound };
    const expected = [entityA];
    expect(sortCreatures(options)).toEqual(expected);
  });
  it('sorts creatures based on walkingDistanceToPlayer', () => {
    const creatures: { [id: string]: CreatureEntity } = {
      '1': entityA,
      '3': entityC,
    };

    const currentMap: CellData[][] = map;
    const hitsLastRound: Hit[] = [];
    const options = { creatures, currentMap, hitsLastRound };
    const expected = [entityC, entityA];
    expect(sortCreatures(options)).toEqual(expected);
  });
  it('puts creatures that have been hit last round at the top', () => {
    const entityD = { ...entityA, walkingDistanceToPlayer: 1 };
    const creatures: { [id: string]: CreatureEntity } = {
      '1': entityD,
      '3': entityC,
    };

    const currentMap: CellData[][] = map;
    const hitsLastRound: Hit[] = [{ creatureId: '3', damage: 1 }];
    const options = { creatures, currentMap, hitsLastRound };
    const expected = [entityC, entityD];
    expect(sortCreatures(options)).toEqual(expected);
  });
});
