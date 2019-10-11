import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { ANIMATION_SPEED, ANIMATION_STEPS } from '../constants/config';
import { gameSelectors } from '../redux/game';
import { MoveDirection } from '../typings/moveDirection';
import { ReduxState } from '../typings/reduxState';

const mapMoveDirectionToAngle = {
  Left: -90,
  Right: 90,
  Up: 0,
  Down: 180,
};

interface StylingProps {
  animation?: string;
  transform: string;
}

const Wrapper = styled.div`
  width: 24px;
  height: 24px;
  background-color: blue;
  animation: ${(p: StylingProps) => p.animation};
  transform: ${(p: StylingProps) => p.transform};
`;

const Front = styled.div`
  width: 10px;
  height: 10px;
  background-color: black;
  margin-left: auto;
  margin-right: auto;
`;

interface StateProps {
  shouldPlayerAnimate: boolean;
}

interface OwnProps {
  moveDirection: MoveDirection;
}

type Props = StateProps & OwnProps;

const Player: React.FC<Props> = ({ moveDirection, shouldPlayerAnimate }) => {
  const animation = shouldPlayerAnimate
    ? `move${moveDirection} ${ANIMATION_SPEED / 1000}s steps(${ANIMATION_STEPS})`
    : undefined;
  const transform = `rotate(${mapMoveDirectionToAngle[moveDirection]}deg)`;
  return (
    <Wrapper animation={animation} transform={transform}>
      <Front />
    </Wrapper>
  );
};

const mapStateToProps = (state: ReduxState): StateProps => ({
  shouldPlayerAnimate: gameSelectors.getShouldPlayerAnimate(state.game),
});

export default connect(mapStateToProps)(Player);
