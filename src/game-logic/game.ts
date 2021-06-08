import { INITIAL_MAX_HP } from '../constants/config';
import { CreatureEntity } from '../constants/creatures';
import { ItemType } from '../constants/items';
import { ActiveConditions } from '../typings/activeConditions';
import { CellData } from '../typings/cell';
import { GameStatus } from '../typings/gameStatus';
import { Hit } from '../typings/hit';
import { MoveDirection } from '../typings/moveDirection';
import { Position } from '../typings/position';
import { getDijkstraMap } from '../utils/getDijkstraMap';
import { HoverCellPayload, reduceHoverCell } from './reduceHoverCell';
import { reduceInitCreatures } from './reduceInitCreatures';
import { reduceMovePlayer } from './reduceMovePlayer';
import { reduceUpdateCell, UpdateCellPayload } from './reduceUpdateCell';
import { updateVisibility } from './updateVisibility';

// ACTIONS

export type GameAction =
  | { type: '@@GAME/MOVE_PLAYER'; direction: MoveDirection }
  | { type: '@@GAME/SET_CURRENT_MAP'; currentMap: CellData[][] }
  | { type: '@@GAME/SET_SEED'; seed: string }
  | { type: '@@GAME/INIT_PLAYER_SPAWN'; playerSpawn: Position }
  | { type: '@@GAME/UPDATE_CELL'; payload: UpdateCellPayload }
  | { type: '@@GAME/INIT_VISIBILITY' }
  | { type: '@@GAME/INIT_CREATURES' }
  | { type: '@@GAME/HOVER_CELL'; payload: HoverCellPayload }
  | { type: '@@GAME/HOVER_AWAY_FROM_CELL' }
  | { type: '@@GAME/HOVER_CREATURE_BLOCK'; creatureId: string }
  | { type: '@@GAME/HOVER_AWAY_FROM_CREATURE_BLOCK' };

const movePlayer = (direction: MoveDirection): GameAction => ({
  type: '@@GAME/MOVE_PLAYER',
  direction,
});

const setCurrentMap = (currentMap: CellData[][]): GameAction => ({
  type: '@@GAME/SET_CURRENT_MAP',
  currentMap,
});

const setSeed = (seed: string): GameAction => ({
  type: '@@GAME/SET_SEED',
  seed,
});

const initPlayerSpawn = (playerSpawn: Position): GameAction => ({
  type: '@@GAME/INIT_PLAYER_SPAWN',
  playerSpawn,
});

const updateCell = (payload: UpdateCellPayload): GameAction => ({
  type: '@@GAME/UPDATE_CELL',
  payload,
});

const initVisibility = (): GameAction => ({
  type: '@@GAME/INIT_VISIBILITY',
});

const initCreatures = (): GameAction => ({
  type: '@@GAME/INIT_CREATURES',
});

const hoverCell = (payload: HoverCellPayload): GameAction => ({
  type: '@@GAME/HOVER_CELL',
  payload,
});

const hoverAwayFromCell = (): GameAction => ({
  type: '@@GAME/HOVER_AWAY_FROM_CELL',
});

const hoverCreatureBlock = (creatureId: string): GameAction => ({
  type: '@@GAME/HOVER_CREATURE_BLOCK',
  creatureId,
});

const hoverAwayFromCreatureBlock = (): GameAction => ({
  type: '@@GAME/HOVER_AWAY_FROM_CREATURE_BLOCK',
});

export const gameActions = {
  movePlayer,
  setCurrentMap,
  setSeed,
  initPlayerSpawn,
  updateCell,
  initVisibility,
  initCreatures,
  hoverCell,
  hoverAwayFromCell,
  hoverCreatureBlock,
  hoverAwayFromCreatureBlock,
};

// INITIAL_STATE

export interface GameState {
  currentMap: CellData[][];
  dijkstraMap: string[][];
  seed: string;
  gameStatus: GameStatus;
  depth: number;
  round: number;
  deathText: string;
  moveDirection: MoveDirection;
  playerPosition: Position;
  playerPreviousPosition: Position;
  characterName: string;
  hp: number;
  maxHp: number;
  gold: number;
  equipedItems: ItemType[];
  inventory: ItemType[];
  interactionText: string;
  eventLogs: string[];
  playerConditions: ActiveConditions;
  creatures: { [id: string]: CreatureEntity };
  hitsLastRound: Hit[];
  deathPositionsThisRound: Position[];
  hoveredCreatureId: string;
}

export const INITIAL_STATE: GameState = {
  currentMap: [],
  dijkstraMap: [],
  seed: '',
  gameStatus: 'playing',
  depth: 1,
  round: 0,
  deathText: '',
  moveDirection: 'Right',
  characterName: 'Kerhebos',
  interactionText: 'You enter the dungeon.',
  eventLogs: [],
  creatures: {},
  playerPosition: [0, 0],
  playerPreviousPosition: [0, 0],
  hp: INITIAL_MAX_HP,
  maxHp: INITIAL_MAX_HP,
  equipedItems: [],
  inventory: [],
  gold: 0,
  playerConditions: {},
  hitsLastRound: [],
  deathPositionsThisRound: [],
  hoveredCreatureId: '',
};

// REDUCER

export const game = (draft = INITIAL_STATE, action: GameAction): GameState | void => {
  switch (action.type) {
    case '@@GAME/MOVE_PLAYER':
      return reduceMovePlayer(draft, action.direction);
    case '@@GAME/SET_CURRENT_MAP':
      return void (draft.currentMap = action.currentMap);
    case '@@GAME/SET_SEED':
      return void (draft.seed = action.seed);
    case '@@GAME/INIT_PLAYER_SPAWN':
      draft.dijkstraMap = getDijkstraMap(
        draft.currentMap.map((row) => row.map((cellData) => cellData.tile)),
        action.playerSpawn
      );
      draft.playerPreviousPosition = action.playerSpawn;
      return void (draft.playerPosition = action.playerSpawn);
    case '@@GAME/UPDATE_CELL':
      return reduceUpdateCell(draft, action.payload);
    case '@@GAME/INIT_VISIBILITY':
      return void (draft.currentMap = updateVisibility(draft.playerPosition, draft.currentMap));
    case '@@GAME/INIT_CREATURES':
      return reduceInitCreatures(draft);
    case '@@GAME/HOVER_CELL':
      return reduceHoverCell(draft, action.payload);
    case '@@GAME/HOVER_AWAY_FROM_CELL':
      draft.hoveredCreatureId = '';
      return void (draft.interactionText = '');
    case '@@GAME/HOVER_CREATURE_BLOCK':
      return void (draft.hoveredCreatureId = action.creatureId);
    case '@@GAME/HOVER_AWAY_FROM_CREATURE_BLOCK':
      return void (draft.hoveredCreatureId = '');
  }
};
