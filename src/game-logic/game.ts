import { CONDITIONS } from '../constants/conditions';
import {
  BIG_GOLD_AMOUNT,
  BIG_GOLD_MODIFIER,
  GRID_HEIGHT,
  GRID_WIDTH,
  INITIAL_MAX_HP,
  SMALL_GOLD_AMOUNT,
  SMALL_GOLD_MODIFIER,
} from '../constants/config';
import { getItem } from '../constants/items';
import { ItemType } from '../constants/items';
import { getTile, Tile, TileType } from '../constants/tiles';
import { ActiveConditions } from '../typings/activeConditions';
import { CellContent, CellData } from '../typings/cell';
import { GameStatus } from '../typings/gameStatus';
import { MoveDirection } from '../typings/moveDirection';
import { Position } from '../typings/position';
import { Visibility } from '../typings/visibility';
import { getRandomIntInclusive } from '../utils/getRandomIntInclusive';
import { updateBurningTiles } from '../utils/updateBurningTiles';
import { updateVisibility } from '../utils/updateVisibility';

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
}

export type GameAction =
  | { type: '@@GAME/MOVE_PLAYER'; direction: MoveDirection }
  | { type: '@@GAME/SET_CURRENT_MAP'; currentMap: CellData[][] }
  | { type: '@@GAME/INIT_PLAYER_SPAWN'; playerSpawn: Position }
  | { type: '@@GAME/UPDATE_CELL'; payload: UpdateCellPayload }
  | { type: '@@GAME/INIT_VISIBILITY' }
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
  initPlayerSpawn,
  updateCell,
  initVisibility,
  hoverCell,
  hoverAwayFromCell,
};

// INITIAL_STATE

export interface GameState {
  currentMap: CellData[][] | null;
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
}

export const INITIAL_STATE: GameState = {
  currentMap: null,
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
};

// REDUCER

const reduceMovePlayer = (draft = INITIAL_STATE, moveDirection: MoveDirection) => {
  let nextTileX: number;
  let nextTileY: number;
  let nextTileType: TileType;
  let nextTile: Tile | undefined;

  if (draft.currentMap === null) {
    return;
  }

  draft.interactionText = '';
  draft.moveDirection = moveDirection;

  const moveToNewPosition = (position: Position) => {
    // Resolve playerConditions

    if (draft.playerConditions.burning) {
      if (draft.playerConditions.burning.activeRounds === 1) {
        draft.eventLogs.push('You are no longer on fire');
        delete draft.playerConditions.burning;
      } else {
        const fireDamage = Math.ceil(draft.maxHp / 10);
        draft.hp = Math.max(draft.hp - fireDamage, 0);
        draft.eventLogs.push(`You suffer ${fireDamage} points of fire damage.`);
        if (draft.hp === 0) {
          draft.eventLogs.push('You burnt to death...');
          draft.gameStatus = 'gameover';
        }
        draft.playerConditions.burning.activeRounds--;
      }
    }

    if (draft.currentMap) {
      // Empty previous location
      draft.currentMap[draft.playerPosition[1]][draft.playerPosition[0]].content = 0;

      // Loot item
      const content = draft.currentMap[position[1]][position[0]].content;
      if (content && content !== 'Player') {
        const item = getItem(content);
        if (item) {
          if (item.type === 'SmallGold') {
            const amount = getRandomIntInclusive(
              SMALL_GOLD_AMOUNT - SMALL_GOLD_MODIFIER,
              SMALL_GOLD_AMOUNT + SMALL_GOLD_MODIFIER
            );
            draft.gold = draft.gold + amount;
            draft.eventLogs.push(`You found ${amount} gold.`);
          } else if (item.type === 'BigGold') {
            const amount = getRandomIntInclusive(
              BIG_GOLD_AMOUNT - BIG_GOLD_MODIFIER,
              BIG_GOLD_AMOUNT + BIG_GOLD_MODIFIER
            );
            draft.gold = draft.gold + amount;
            draft.eventLogs.push(`You found ${amount} gold!`);
          } else {
            draft.inventory.push(content);
            draft.eventLogs.push(`You found ${item.nameInSentence}.`);
          }
        }
      }

      // Move player
      draft.currentMap[position[1]][position[0]].content = 'Player';

      // Update visibility
      draft.currentMap = updateVisibility(position, draft.currentMap);

      // Update burning tiles
      draft.currentMap = updateBurningTiles(draft.currentMap);

      // Update player position
      draft.playerPosition = position;

      // Check conditions
      if (draft.currentMap[position[1]][position[0]].burningRounds > 0) {
        if (!draft.playerConditions.burning) {
          draft.eventLogs.push('You start burning!');
        }
        draft.playerConditions.burning = { activeRounds: CONDITIONS.burning.duration };
      }
    }
  };

  const moveAndStayAtSamePosition = (tileNameInSentence: string | undefined) => {
    draft.interactionText = `You hit ${tileNameInSentence || ''}.`;
  };

  switch (moveDirection) {
    case 'Left':
      nextTileX =
        draft.playerPosition[0] > 0 ? draft.playerPosition[0] - 1 : draft.playerPosition[0];
      nextTileY = draft.playerPosition[1];
      nextTileType = draft.currentMap[nextTileY][nextTileX].tile;
      nextTile = getTile(nextTileType);

      if (draft.playerPosition[0] > 0 && nextTile?.canWalkThrough === true) {
        return moveToNewPosition([nextTileX, nextTileY]);
      }
      return moveAndStayAtSamePosition(nextTile?.nameInSentence);

    case 'Right':
      nextTileX =
        draft.playerPosition[0] < GRID_WIDTH
          ? draft.playerPosition[0] + 1
          : draft.playerPosition[0];
      nextTileY = draft.playerPosition[1];
      nextTileType = draft.currentMap[nextTileY][nextTileX].tile;
      nextTile = getTile(nextTileType);

      if (draft.playerPosition[0] < GRID_WIDTH - 1 && nextTile?.canWalkThrough === true) {
        return moveToNewPosition([nextTileX, nextTileY]);
      }
      return moveAndStayAtSamePosition(nextTile?.nameInSentence);

    case 'Up':
      nextTileX = draft.playerPosition[0];
      nextTileY =
        draft.playerPosition[1] > 0 ? draft.playerPosition[1] - 1 : draft.playerPosition[1];
      nextTileType = draft.currentMap[nextTileY][nextTileX].tile;
      nextTile = getTile(nextTileType);

      if (draft.playerPosition[1] > 0 && nextTile?.canWalkThrough === true) {
        return moveToNewPosition([nextTileX, nextTileY]);
      }
      return moveAndStayAtSamePosition(nextTile?.nameInSentence);

    case 'Down':
      nextTileX = draft.playerPosition[0];
      nextTileY =
        draft.playerPosition[1] < GRID_HEIGHT - 1
          ? draft.playerPosition[1] + 1
          : draft.playerPosition[1];
      nextTileType = draft.currentMap[nextTileY][nextTileX].tile;
      nextTile = getTile(nextTileType);

      if (draft.playerPosition[1] < GRID_HEIGHT - 1 && nextTile?.canWalkThrough === true) {
        return moveToNewPosition([nextTileX, nextTileY]);
      }
      return moveAndStayAtSamePosition(nextTile?.nameInSentence);
  }
};

const reduceUpdateCell = (draft = INITIAL_STATE, payload: UpdateCellPayload) => {
  const { position, cellData } = payload;

  if (draft.currentMap !== null) {
    draft.currentMap[position[1]][position[0]] = cellData;
  }
};

const reduceHoverCell = (draft = INITIAL_STATE, payload: HoverCellPayload) => {
  const { tileType, visibility, revealed, content, burning } = payload;

  if (content === 'Player') {
    draft.interactionText = 'This is you.';
    return;
  }

  if (revealed === false && visibility === 'dark') {
    return;
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

export const game = (draft = INITIAL_STATE, action: GameAction): GameState | void => {
  switch (action.type) {
    case '@@GAME/MOVE_PLAYER':
      return reduceMovePlayer(draft, action.direction);
    case '@@GAME/SET_CURRENT_MAP':
      return void (draft.currentMap = action.currentMap);
    case '@@GAME/INIT_PLAYER_SPAWN':
      return void (draft.playerPosition = action.playerSpawn);
    case '@@GAME/UPDATE_CELL':
      return reduceUpdateCell(draft, action.payload);
    case '@@GAME/INIT_VISIBILITY':
      if (draft.currentMap !== null) {
        return void (draft.currentMap = updateVisibility(draft.playerPosition, draft.currentMap));
      }
      break;
    case '@@GAME/HOVER_CELL':
      return reduceHoverCell(draft, action.payload);
    case '@@GAME/HOVER_AWAY_FROM_CELL':
      return void (draft.interactionText = '');
  }
};
