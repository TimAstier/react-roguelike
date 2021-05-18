import { GRID_HEIGHT, GRID_WIDTH } from '../constants/config';
import { CreatureType } from '../constants/creatures';
import { getTile, Tile, TileType } from '../constants/tiles';
import { MoveDirection } from '../typings/moveDirection';
import { Position } from '../typings/position';
import { checkCreaturesDeath } from './checkCreaturesDeath';
import { GameState } from './game';
import { lootItem } from './lootItem';
import { resolveConditions } from './resolveConditions';
import { resolveStartingAndEndingConditions } from './resolveStartingAndEndingConditions';
import { updateBurningTiles } from './updateBurningTiles';
import { updateVisibility } from './updateVisibility';

export const reduceMovePlayer = (draft: GameState, moveDirection: MoveDirection): void => {
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
  resolveStartingAndEndingConditions(draft);

  // Check for dead creatures
  checkCreaturesDeath(draft);
};
