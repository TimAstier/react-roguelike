import { getAdjacentPositions } from '../utils/getAdjacentPositions';
import { GameState } from './game';

export const performCreaturesActions = (draft: GameState): void => {
  const mapWidth = draft.currentMap[0].length;
  const mapHeight = draft.currentMap.length;
  for (const [, value] of Object.entries(draft.creatures)) {
    const adjacentPositions = getAdjacentPositions(value.position, mapWidth, mapHeight);
    if (
      adjacentPositions
        .map((p) => JSON.stringify(p))
        .includes(JSON.stringify(draft.playerPreviousPosition))
    ) {
      draft.hp = Math.max(draft.hp - 3, 0);
      draft.eventLogs.push(`The ${value.type} hits you for 3 damage!`);
      if (draft.hp === 0) {
        draft.eventLogs.push('You died.');
        draft.deathText = `Killed by a ${value.type} on depth ${draft.depth}.`;
        draft.gameStatus = 'gameover';
      }
    } else {
      // TODO: Check if creature has aggro
      const shuffledAdjacentPositions = adjacentPositions.sort(() => Math.random() - 0.5);

      // Remove options already occupied by a creature
      const shuffledElmptyAdjacentPositions = shuffledAdjacentPositions.filter((position) => {
        return !draft.currentMap[position[1]][position[0]].creature;
      });

      const distances = shuffledElmptyAdjacentPositions.map((p) => {
        return draft.dijkstraMap[p[1]][p[0]] === '#'
          ? Infinity
          : Number(draft.dijkstraMap[p[1]][p[0]]);
      });

      const nextDistance = Math.min(...distances);
      if (nextDistance === 0) {
        // Cannot move where the player is
        return;
      }
      const nextPositionIndex = distances.findIndex((d) => d === nextDistance);
      const nextPosition = shuffledElmptyAdjacentPositions[nextPositionIndex];

      // Perform the move
      // BUG: Returns TypeError: Cannot read property '1' of undefined sometimes
      // Most likely related to the bug were monsters move into walls.
      draft.currentMap[nextPosition[1]][nextPosition[0]].creature = {
        id: value.id,
        type: value.type,
      };
      delete draft.currentMap[value.position[1]][value.position[0]].creature;
      value.position = nextPosition;
    }
  }
};
