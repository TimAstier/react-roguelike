import { CONDITIONS } from '../constants/conditions';
import {
  BURNING_DAMAGE_PERCENTAGE,
  GRID_HEIGHT,
  GRID_WIDTH,
  INITIAL_MAX_HP,
} from '../constants/config';
import { CreatureEntity, CREATURES, CreatureType } from '../constants/creatures';
import { getItem } from '../constants/items';
import { ItemType } from '../constants/items';
import { getTile, Tile, TileType } from '../constants/tiles';
import { ActiveConditions } from '../typings/activeConditions';
import { CellContent, CellData, CreatureData } from '../typings/cell';
import { GameStatus } from '../typings/gameStatus';
import { MoveDirection } from '../typings/moveDirection';
import { Position } from '../typings/position';
import { Visibility } from '../typings/visibility';
import { getRandomIntInclusive } from '../utils/getRandomIntInclusive';
import { getRandomString } from '../utils/getRandomString';
import { lootItem } from './lootItem';
import { updateBurningTiles } from './updateBurningTiles';
import { updateVisibility } from './updateVisibility';

// ACTIONS

interface UpdateCellPayload {
  cellData: CellData;
  position: Position;
}

export interface HoverCellPayload {
  tileType: TileType;
  visibility: Visibility;
  revealed: boolean;
  content: CellContent;
  burning: boolean;
  creature?: CreatureData;
}

export type GameAction =
  | { type: '@@GAME/MOVE_PLAYER'; direction: MoveDirection }
  | { type: '@@GAME/SET_CURRENT_MAP'; currentMap: CellData[][] }
  | { type: '@@GAME/SET_SEED'; seed: string }
  | { type: '@@GAME/INIT_PLAYER_SPAWN'; playerSpawn: Position }
  | { type: '@@GAME/UPDATE_CELL'; payload: UpdateCellPayload }
  | { type: '@@GAME/INIT_VISIBILITY' }
  | { type: '@@GAME/INIT_CREATURES' }
  | { type: '@@GAME/HOVER_CELL'; payload: HoverCellPayload }
  | { type: '@@GAME/HOVER_AWAY_FROM_CELL' };

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
};

// INITIAL_STATE

export interface GameState {
  currentMap: CellData[][] | null;
  seed: string;
  gameStatus: GameStatus;
  moveDirection: MoveDirection;
  playerPosition: Position;
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
}

export const INITIAL_STATE: GameState = {
  currentMap: null,
  seed: '',
  gameStatus: 'playing',
  moveDirection: 'Right',
  playerPosition: [0, 0],
  characterName: 'Kerhebos',
  hp: INITIAL_MAX_HP,
  maxHp: INITIAL_MAX_HP,
  gold: 0,
  equipedItems: [],
  inventory: [],
  interactionText: 'You enter the dungeon.',
  eventLogs: [],
  playerConditions: {},
  creatures: {},
};

// REDUCER

const resolveConditions = (draft: GameState) => {
  if (draft.playerConditions.burning) {
    if (draft.playerConditions.burning.activeRounds === 1) {
      draft.eventLogs.push('You are no longer on fire');
      delete draft.playerConditions.burning;
    } else {
      const damagePercentage = getRandomIntInclusive(
        Math.min(0, BURNING_DAMAGE_PERCENTAGE - 5),
        BURNING_DAMAGE_PERCENTAGE + 2
      );
      const fireDamage = Math.ceil(draft.maxHp * (damagePercentage / 100));
      draft.hp = Math.max(draft.hp - fireDamage, 0);
      draft.eventLogs.push(`You suffer ${fireDamage} points of fire damage.`);
      if (draft.hp === 0) {
        draft.eventLogs.push('You burnt to death...');
        draft.gameStatus = 'gameover';
      }
      draft.playerConditions.burning.activeRounds--;
    }
  }
};

const checkCreaturesDeath = (draft: GameState) => {
  for (const [key, value] of Object.entries(draft.creatures)) {
    if (value.hp <= 0) {
      draft.eventLogs.push(`The ${value.type} dies!`);
      delete draft.creatures[key];
      if (draft.currentMap) {
        delete draft.currentMap[value.position[1]][value.position[0]].creature;
      }
    }
  }
};

const reduceMovePlayer = (draft = INITIAL_STATE, moveDirection: MoveDirection) => {
  let nextTileX: number;
  let nextTileY: number;
  let nextTileType: TileType;
  let nextTile: Tile | undefined;
  let creature;

  if (draft.currentMap === null) {
    return;
  }

  draft.interactionText = '';
  draft.moveDirection = moveDirection;

  // Resolve playerConditions
  resolveConditions(draft);

  const moveToNewPosition = (position: Position) => {
    if (draft.currentMap) {
      // Empty previous location
      draft.currentMap[draft.playerPosition[1]][draft.playerPosition[0]].content = 0;

      // Loot item
      lootItem(draft, position);

      // Move player
      draft.currentMap[position[1]][position[0]].content = 'Player';

      // Update player position
      draft.playerPosition = position;

      // Update visibility
      draft.currentMap = updateVisibility(position, draft.currentMap);
    }
  };

  const moveAndStayAtSamePosition = (tileNameInSentence: string | undefined) => {
    draft.interactionText = `You hit ${tileNameInSentence || ''}.`;
  };

  const attackCreature = (id: string, type: CreatureType) => {
    draft.creatures[id].hp = draft.creatures[id].hp - 5;
    draft.eventLogs.push(`You hit the ${type} for 5 damage!`);
  };

  //  TODO: DRY this
  switch (moveDirection) {
    case 'Left':
      nextTileX =
        draft.playerPosition[0] > 0 ? draft.playerPosition[0] - 1 : draft.playerPosition[0];
      nextTileY = draft.playerPosition[1];
      nextTileType = draft.currentMap[nextTileY][nextTileX].tile;
      nextTile = getTile(nextTileType);

      creature = draft.currentMap[nextTileY][nextTileX].creature;
      if (creature) {
        attackCreature(creature.id, creature.type);
        break;
      }
      if (draft.playerPosition[0] > 0 && nextTile?.canWalkThrough === true) {
        moveToNewPosition([nextTileX, nextTileY]);
        break;
      }
      moveAndStayAtSamePosition(nextTile?.nameInSentence);
      break;
    case 'Right':
      nextTileX =
        draft.playerPosition[0] < GRID_WIDTH
          ? draft.playerPosition[0] + 1
          : draft.playerPosition[0];
      nextTileY = draft.playerPosition[1];
      nextTileType = draft.currentMap[nextTileY][nextTileX].tile;
      nextTile = getTile(nextTileType);

      creature = draft.currentMap[nextTileY][nextTileX].creature;
      if (creature) {
        attackCreature(creature.id, creature.type);
        break;
      }
      if (draft.playerPosition[0] < GRID_WIDTH - 1 && nextTile?.canWalkThrough === true) {
        moveToNewPosition([nextTileX, nextTileY]);
        break;
      }
      moveAndStayAtSamePosition(nextTile?.nameInSentence);
      break;

    case 'Up':
      nextTileX = draft.playerPosition[0];
      nextTileY =
        draft.playerPosition[1] > 0 ? draft.playerPosition[1] - 1 : draft.playerPosition[1];
      nextTileType = draft.currentMap[nextTileY][nextTileX].tile;
      nextTile = getTile(nextTileType);

      creature = draft.currentMap[nextTileY][nextTileX].creature;
      if (creature) {
        attackCreature(creature.id, creature.type);
        break;
      }
      if (draft.playerPosition[1] > 0 && nextTile?.canWalkThrough === true) {
        moveToNewPosition([nextTileX, nextTileY]);
        break;
      }
      moveAndStayAtSamePosition(nextTile?.nameInSentence);
      break;

    case 'Down':
      nextTileX = draft.playerPosition[0];
      nextTileY =
        draft.playerPosition[1] < GRID_HEIGHT - 1
          ? draft.playerPosition[1] + 1
          : draft.playerPosition[1];
      nextTileType = draft.currentMap[nextTileY][nextTileX].tile;
      nextTile = getTile(nextTileType);

      creature = draft.currentMap[nextTileY][nextTileX].creature;
      if (creature) {
        attackCreature(creature.id, creature.type);
        break;
      }
      if (draft.playerPosition[1] < GRID_HEIGHT - 1 && nextTile?.canWalkThrough === true) {
        moveToNewPosition([nextTileX, nextTileY]);
        break;
      }
      moveAndStayAtSamePosition(nextTile?.nameInSentence);
      break;
  }

  // Update burning tiles
  draft.currentMap = updateBurningTiles(draft.currentMap);

  // Resolve starting and ending conditions
  if (draft.currentMap[draft.playerPosition[1]][draft.playerPosition[0]].burningRounds > 0) {
    if (!draft.playerConditions.burning) {
      draft.eventLogs.push('You start burning!');
    }
    draft.playerConditions.burning = { activeRounds: CONDITIONS.burning.duration };
  }

  // Check for dead creatures
  checkCreaturesDeath(draft);
};

const reduceUpdateCell = (draft = INITIAL_STATE, payload: UpdateCellPayload) => {
  const { position, cellData } = payload;

  if (draft.currentMap !== null) {
    draft.currentMap[position[1]][position[0]] = cellData;
  }
};

const reduceHoverCell = (draft = INITIAL_STATE, payload: HoverCellPayload) => {
  const { tileType, visibility, revealed, content, burning, creature } = payload;

  if (content === 'Player') {
    draft.interactionText = 'This is you.';
    return;
  }

  if (revealed === false && visibility === 'dark') {
    return;
  }

  if (creature && visibility !== 'dark') {
    if (visibility === 'dim') {
      draft.interactionText = 'You see something standing in the shadows.';
      return;
    }
    if (visibility === 'clear') {
      draft.interactionText = `You see a ${creature.type}!`;
      return;
    }
  }

  if (visibility === 'dim' && !revealed && content !== 0) {
    draft.interactionText = 'You discern something on the ground.';
    return;
  }

  let verb = 'see';
  let location = '';

  if (visibility === 'dark' && revealed) {
    verb = 'remember seeing';
  }

  if (visibility === 'dim' && revealed) {
    verb = 'remember seeing';
  }

  if (visibility === 'dim') {
    verb = 'get a glimpse of';
  }

  let object;

  if (content !== 0) {
    object = getItem(content)?.nameInSentence;
  } else {
    object = getTile(tileType)?.nameInSentence;
  }

  if (verb === 'remember seeing') {
    location = ' over there';
  }

  const interactionText = `You ${verb} ${object}${
    burning && visibility !== 'dark' ? ' burning' : ''
  }${location}.`;
  draft.interactionText = interactionText;
};

const reduceInitCreatures = (draft = INITIAL_STATE) => {
  const currentMap = draft.currentMap;
  if (currentMap !== null) {
    currentMap.forEach((row, j) =>
      row.forEach((cellData, i) => {
        const creatureData = cellData.creature;
        if (creatureData) {
          const id = getRandomString(); // TODO: Use UUID
          const template = CREATURES[creatureData.type];
          const creature: CreatureEntity = {
            id,
            type: creatureData.type,
            position: [i, j],
            hp: template.maxHp,
            maxHp: template.maxHp,
            conditions: {},
          };
          draft.creatures[id] = creature;
          currentMap[j][i].creature = { id, type: creatureData.type };
        }
      })
    );
  }
};

export const game = (draft = INITIAL_STATE, action: GameAction): GameState | void => {
  switch (action.type) {
    case '@@GAME/MOVE_PLAYER':
      return reduceMovePlayer(draft, action.direction);
    case '@@GAME/SET_CURRENT_MAP':
      return void (draft.currentMap = action.currentMap);
    case '@@GAME/SET_SEED':
      return void (draft.seed = action.seed);
    case '@@GAME/INIT_PLAYER_SPAWN':
      return void (draft.playerPosition = action.playerSpawn);
    case '@@GAME/UPDATE_CELL':
      return reduceUpdateCell(draft, action.payload);
    case '@@GAME/INIT_VISIBILITY':
      if (draft.currentMap !== null) {
        return void (draft.currentMap = updateVisibility(draft.playerPosition, draft.currentMap));
      }
      break;
    case '@@GAME/INIT_CREATURES':
      return reduceInitCreatures(draft);
    case '@@GAME/HOVER_CELL':
      return reduceHoverCell(draft, action.payload);
    case '@@GAME/HOVER_AWAY_FROM_CELL':
      return void (draft.interactionText = '');
  }
};
