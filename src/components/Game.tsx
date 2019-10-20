import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import { ANIMATION_SPEED, PAUSE_TIME_BETWEEN_MOVES } from '../constants/config';
import maps from '../data/maps';
import { gameActions } from '../redux/game';
import { CellTile } from '../typings/cell';
import { MoveDirection } from '../typings/moveDirection';
import { Position } from '../typings/position';
import { ReduxState } from '../typings/reduxState';
import Map from './Map';
import Viewport from './Viewport';

const LEFT_KEYCODE = 37;
const UP_KEYCODE = 38;
const RIGHT_KEYCODE = 39;
const DOWN_KEYCODE = 40;

const GAME_KEYS = [LEFT_KEYCODE, RIGHT_KEYCODE, UP_KEYCODE, DOWN_KEYCODE];

const mapKeyCodeToDirection = (keyCode: number): MoveDirection | undefined => {
  if (!GAME_KEYS.includes(keyCode)) {
    return undefined;
  }
  switch (keyCode) {
    case LEFT_KEYCODE:
      return 'Left';
    case RIGHT_KEYCODE:
      return 'Right';
    case UP_KEYCODE:
      return 'Up';
    case DOWN_KEYCODE:
      return 'Down';
  }
};

interface StateProps {
  currentMap: CellTile[][];
  moveDirection: MoveDirection;
  playerPosition: Position;
}

interface DispatchProps {
  movePlayer: typeof gameActions.movePlayer;
  setCurrentMap: typeof gameActions.setCurrentMap;
}

type Props = StateProps & DispatchProps;

const Game: React.FC<Props> = ({
  currentMap,
  moveDirection,
  movePlayer,
  playerPosition,
  setCurrentMap,
}) => {
  const lastMoveDate = useRef(Date.now());

  useEffect(() => {
    setCurrentMap(maps.intro);
  }, [setCurrentMap]);

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      const keyCode: number = event.keyCode;

      // Prevent reacting to other keys
      if (!GAME_KEYS.includes(keyCode)) {
        return;
      }

      event.preventDefault();

      // Prevent moving again before animation is finished
      if (Date.now() - lastMoveDate.current < ANIMATION_SPEED + PAUSE_TIME_BETWEEN_MOVES) {
        return;
      }

      // Perform the move
      lastMoveDate.current = Date.now();
      const direction = mapKeyCodeToDirection(keyCode);
      if (direction) {
        movePlayer(direction);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [movePlayer]);

  const renderGameContent = () => {
    return currentMap ? (
      <Map playerPosition={playerPosition} moveDirection={moveDirection} tiles={currentMap} />
    ) : null;
  };

  return <Viewport>{renderGameContent()}</Viewport>;
};

const mapStateToProps = (state: ReduxState) => ({
  currentMap: state.game.currentMap,
  moveDirection: state.game.moveDirection,
  playerPosition: state.game.playerPosition,
});

const mapDispatchToProps = {
  movePlayer: gameActions.movePlayer,
  setCurrentMap: gameActions.setCurrentMap,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
