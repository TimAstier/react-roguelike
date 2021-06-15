import React from 'react';
import styled from 'styled-components';

import { PLAYER_ACTIONS } from '../../constants/playerActions';
import { GameAction, gameActions } from '../../game-logic/game';

const Wrapper = styled.div`
  height: 380px;
`;

const ActionWrapper = styled.div`
  cursor: pointer;
`;

interface Props {
  actions: string[];
  dispatch: React.Dispatch<GameAction>;
}

export const Actions: React.FC<Props> = (props) => {
  const renderPlayerActions = () =>
    props.actions.map((action) => {
      const playerAction = PLAYER_ACTIONS.find((a) => a.type === action);
      if (playerAction) {
        return (
          <ActionWrapper
            key={action}
            onClick={() => props.dispatch(gameActions.doPlayerAction(action))}
          >{`${playerAction.gameKey}. ${playerAction.type}`}</ActionWrapper>
        );
      }
    });

  return <Wrapper>{renderPlayerActions()}</Wrapper>;
};
