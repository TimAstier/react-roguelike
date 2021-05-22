import { GRID_HEIGHT, GRID_WIDTH } from '../constants/config';
import { CreatureType } from '../constants/creatures';
import { getTile, Tile } from '../constants/tiles';
import { MoveDirection } from '../typings/moveDirection';
import { Position } from '../typings/position';
import { getDijkstraMap } from '../utils/getDijkstraMap';
import { checkCreaturesDeath } from './checkCreaturesDeath';
import { GameState } from './game';
import { lootItem } from './lootItem';
import { performCreaturesActions } from './performCreaturesActions';
import { resolveConditions } from './resolveConditions';
import { resolveStartingAndEndingConditions } from './resolveStartingAndEndingConditions';
import { updateBurningTiles } from './updateBurningTiles';
import { updateVisibility } from './updateVisibility';

const getNextPosition = (draft: GameState, moveDirection: MoveDirection): Position => {
  let nextTileX: number;
  let nextTileY: number;
  switch (moveDirection) {
    case 'Left':
      nextTileX =
        draft.playerPosition[0] > 0 ? draft.playerPosition[0] - 1 : draft.playerPosition[0];
      nextTileY = draft.playerPosition[1];
      break;
    case 'Right':
      nextTileX =
        draft.playerPosition[0] < GRID_WIDTH
          ? draft.playerPosition[0] + 1
          : draft.playerPosition[0];
      nextTileY = draft.playerPosition[1];
      break;
    case 'Up':
      nextTileX = draft.playerPosition[0];
      nextTileY =
        draft.playerPosition[1] > 0 ? draft.playerPosition[1] - 1 : draft.playerPosition[1];
      break;
    case 'Down':
      nextTileX = draft.playerPosition[0];
      nextTileY =
        draft.playerPosition[1] < GRID_HEIGHT - 1
          ? draft.playerPosition[1] + 1
          : draft.playerPosition[1];
  }
  return [nextTileX, nextTileY];
};

const getCanWalkToNextPosition = (
  draft: GameState,
  moveDirection: MoveDirection,
  nextTile: Tile | undefined
): boolean => {
  switch (moveDirection) {
    case 'Left':
      return draft.playerPosition[0] > 0 && nextTile?.canWalkThrough === true;
    case 'Right':
      return draft.playerPosition[0] < GRID_WIDTH - 1 && nextTile?.canWalkThrough === true;
    case 'Up':
      return draft.playerPosition[1] > 0 && nextTile?.canWalkThrough === true;
    case 'Down':
      return draft.playerPosition[1] < GRID_HEIGHT - 1 && nextTile?.canWalkThrough === true;
  }
};

const moveToNewPosition = (draft: GameState, position: Position) => {
  draft.currentMap[draft.playerPosition[1]][draft.playerPosition[0]].content = 0;
  lootItem(draft, position);
  draft.currentMap[position[1]][position[0]].content = 'Player';
  draft.playerPosition = position;
  draft.currentMap = updateVisibility(position, draft.currentMap);
  draft.dijkstraMap = getDijkstraMap(
    draft.currentMap.map((row) => row.map((cellData) => cellData.tile)),
    position
  );
};

const moveAndStayAtSamePosition = (draft: GameState, tileNameInSentence: string | undefined) => {
  draft.interactionText = `You hit ${tileNameInSentence || ''}.`;
};

const attackCreature = (draft: GameState, id: string, type: CreatureType) => {
  draft.creatures[id].hp = draft.creatures[id].hp - 5;
  draft.eventLogs.push(`You hit the ${type} for 5 damage!`);
};

const tick = (draft: GameState) => {
  resolveConditions(draft);
  draft.currentMap = updateBurningTiles(draft.currentMap);
  resolveStartingAndEndingConditions(draft);
  checkCreaturesDeath(draft);
  performCreaturesActions(draft);
};

export const reduceMovePlayer = (draft: GameState, moveDirection: MoveDirection): void => {
  draft.interactionText = '';
  draft.moveDirection = moveDirection;
  draft.playerPreviousPosition = draft.playerPosition;

  const nextPosition = getNextPosition(draft, moveDirection);
  const nextTileType = draft.currentMap[nextPosition[1]][nextPosition[0]].tile;
  const nextTile = getTile(nextTileType);
  const creature = draft.currentMap[nextPosition[1]][nextPosition[0]].creature;

  if (creature) {
    attackCreature(draft, creature.id, creature.type);
  } else if (getCanWalkToNextPosition(draft, moveDirection, nextTile)) {
    moveToNewPosition(draft, nextPosition);
  } else {
    moveAndStayAtSamePosition(draft, nextTile?.nameInSentence);
  }

  tick(draft);
};
