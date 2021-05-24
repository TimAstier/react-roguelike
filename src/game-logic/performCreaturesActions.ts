import { DiceRoll } from 'rpg-dice-roller';

import { PLAYER_BASE_AC } from '../constants/config';
import { Creature, CreatureEntity, CREATURES } from '../constants/creatures';
import { Position } from '../typings/position';
import { getAdjacentPositions } from '../utils/getAdjacentPositions';
import { isInsideCircle } from '../utils/isInsideCircle';
import { line } from '../utils/line';
import { GameState } from './game';

const attackPlayer = (draft: GameState, template: Creature) => {
  // Check if the attack hits
  const hitRoll = new DiceRoll('d20');
  if (hitRoll.total < PLAYER_BASE_AC) {
    draft.eventLogs.push(`The ${template.type} misses you.`);
    return;
  }
  // Deal damage
  const isCriticalHit = hitRoll.total === 20;
  const dice = isCriticalHit ? `${template.baseAttack}*2` : template.baseAttack;
  const damageRoll = new DiceRoll(dice);
  const damage = damageRoll.total;
  draft.hp = Math.max(draft.hp - damage, 0);
  draft.eventLogs.push(
    `${isCriticalHit ? '[CRIT] ' : ''}The ${template.type} hits you for ${damage} damage!`
  );
  if (draft.hp === 0) {
    draft.eventLogs.push('You died.');
    draft.deathText = `Killed by a ${template.type} on depth ${draft.depth}.`;
    draft.gameStatus = 'gameover';
  }
};

const tryMove = (
  draft: GameState,
  entity: CreatureEntity,
  template: Creature,
  adjacentPositions: Position[]
) => {
  // Check if creature is in aggro range
  const isInAggroRange = isInsideCircle({
    center: draft.playerPosition,
    position: entity.position,
    radius: template.aggroRange,
  });

  if (!isInAggroRange) {
    entity.status = 'idle';
    return;
  }

  // Check if creature has LOS
  if (!template.traits.includes('keenSmell')) {
    const inBetweenOpaqueTiles = line(entity.position, draft.playerPosition).filter(
      (p) => draft.currentMap[p[1]][p[0]].tile === '#'
      // Note: What about doors?
    );

    const numberOfInBetweenOpaqueTiles = inBetweenOpaqueTiles.length;
    const hasLOS = numberOfInBetweenOpaqueTiles === 0;
    if (!hasLOS) {
      if (entity.status === 'idle') {
        return;
      }
    } else {
      entity.status = 'hostile';
    }
  }

  const shuffledAdjacentPositions = adjacentPositions.sort(() => Math.random() - 0.5);

  // Remove options already occupied by a creature
  const shuffledElmptyAdjacentPositions = shuffledAdjacentPositions.filter((position) => {
    return !draft.currentMap[position[1]][position[0]].creature;
  });

  const distances = shuffledElmptyAdjacentPositions.map((p) => {
    return draft.dijkstraMap[p[1]][p[0]] === '#' ? Infinity : Number(draft.dijkstraMap[p[1]][p[0]]);
  });

  const nextDistance = Math.min(...distances);
  if (nextDistance === 0 || nextDistance === Infinity) {
    // Cannot move where the player is or to a non-passable position
    return;
  }
  const nextPositionIndex = distances.findIndex((d) => d === nextDistance);
  const nextPosition = shuffledElmptyAdjacentPositions[nextPositionIndex];

  // Perform the move
  draft.currentMap[nextPosition[1]][nextPosition[0]].creature = {
    id: entity.id,
    type: entity.type,
  };
  delete draft.currentMap[entity.position[1]][entity.position[0]].creature;
  entity.position = nextPosition;
};

export const performCreaturesActions = (draft: GameState): void => {
  const mapWidth = draft.currentMap[0].length;
  const mapHeight = draft.currentMap.length;

  Object.entries(draft.creatures).forEach(([, entity]) => {
    const adjacentPositions = getAdjacentPositions(entity.position, mapWidth, mapHeight);
    const template = CREATURES[entity.type];
    if (
      adjacentPositions
        .map((p) => JSON.stringify(p))
        .includes(JSON.stringify(draft.playerPreviousPosition))
    ) {
      attackPlayer(draft, template);
    } else {
      tryMove(draft, entity, template, adjacentPositions);
    }
  });
};
