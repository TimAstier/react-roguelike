import { getAdjacentPositions } from '../utils/getAdjacentPositions';
import { GameState } from './game';

export const performCreaturesActions = (draft: GameState): void => {
  const mapWidth = draft.currentMap[0].length;
  const mapHeight = draft.currentMap.length;
  for (const [, value] of Object.entries(draft.creatures)) {
    const shuffledAdjacentPositions = getAdjacentPositions(
      value.position,
      mapWidth,
      mapHeight
    ).sort(() => Math.random() - 0.5);
    if (
      shuffledAdjacentPositions
        .map((p) => JSON.stringify(p))
        .includes(JSON.stringify(draft.playerPreviousPosition))
    ) {
      draft.hp = Math.max(draft.hp - 3, 0);
      draft.eventLogs.push(`The ${value.type} hits you for 3 damage!`);
      if (draft.hp === 0) {
        draft.eventLogs.push('You died.');
        draft.gameStatus = 'gameover';
      }
    } else {
      // TODO: Check if creature has aggro
      const distances = shuffledAdjacentPositions.map((p) => {
        return draft.dijkstraMap[p[1]][p[0]] === '#'
          ? Infinity
          : Number(draft.dijkstraMap[p[1]][p[0]]);
      });
      // TODO: Randomise ties
      const nextDistance = Math.min(...distances);
      if (nextDistance === 0) {
        return;
      }
      const nextPositionIndex = distances.findIndex((d) => d === nextDistance);
      const nextPosition = shuffledAdjacentPositions[nextPositionIndex];

      // Perform the move
      draft.currentMap[nextPosition[1]][nextPosition[0]].creature = {
        id: value.id,
        type: value.type,
      };
      delete draft.currentMap[value.position[1]][value.position[0]].creature;
      value.position = nextPosition;
    }
  }
};
