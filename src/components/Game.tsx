import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { actions as gameActions } from '../redux/game';
import { MoveDirection } from '../typings/moveDirection';
import { Position } from '../typings/position';
import Map from './Map';

const LEFT_KEYCODE = 37;
const UP_KEYCODE = 38;
const RIGHT_KEYCODE = 39;
const DOWN_KEYCODE = 40;

const keyCodeToDirectionMap = {
  [LEFT_KEYCODE]: 'Left',
  [RIGHT_KEYCODE]: 'Right',
  [UP_KEYCODE]: 'Up',
  [DOWN_KEYCODE]: 'Down',
};

interface StateProps {
  moveDirection: MoveDirection;
  playerPosition: Position;
}

interface DispatchProps {
  movePlayer: (direction: MoveDirection) => void;
}

type Props = StateProps & DispatchProps;

const Game: React.FC<Props> = ({ moveDirection, movePlayer, playerPosition }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (![LEFT_KEYCODE, RIGHT_KEYCODE, UP_KEYCODE, DOWN_KEYCODE].includes(event.keyCode)) {
        return;
      }
      event.preventDefault();
      movePlayer(keyCodeToDirectionMap[event.keyCode]); // How does TS get the type here?
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [movePlayer]);


  return <Map playerPosition={playerPosition} moveDirection={moveDirection} />;
};

const mapStateToProps = (state) => ({
  moveDirection: state.game.moveDirection,
  playerPosition: state.game.playerPosition,
});

const mapDispatchToProps = ({
  movePlayer: gameActions.movePlayer,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
