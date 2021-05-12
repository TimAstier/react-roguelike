import './App.css';

import { HowlOptions } from 'howler';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { useImmerReducer } from 'use-immer';
import useSound from 'use-sound';

import crystalCaveSong from './assets/music/crystal-cave-song.mp3';
import { game } from './game-logic';
import { INITIAL_STATE } from './game-logic/game';
import { Game } from './game-ui/Game';
import { useDetectUserInput } from './game-ui/hooks/useDetectUserInput';
import { MapGenerator } from './game-ui/MapGenerator';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  height: 100%;
  width: 100%;
  font-family: UglyTerminal;
`;

export const App: React.FC = () => {
  const [state, dispatch] = useImmerReducer(game, INITIAL_STATE);
  const [play, { stop }] = useSound<HowlOptions>(crystalCaveSong, { loop: true, volume: 0.1 });
  const didUserInput = useDetectUserInput();
  const [withBackgroundMusic, setWithBackgroundMusic] = React.useState(false);

  React.useEffect(() => {
    if (didUserInput && withBackgroundMusic) {
      play();
    }
  }, [didUserInput]);

  React.useEffect(() => {
    if (withBackgroundMusic === false) {
      stop();
    } else {
      play();
    }
  }, [withBackgroundMusic]);

  return (
    <Wrapper>
      <Router>
        <Switch>
          <Route exact path="/">
            <Game
              state={state}
              dispatch={dispatch}
              withBackgroundMusic={withBackgroundMusic}
              setWithBackgroundMusic={setWithBackgroundMusic}
            />
          </Route>
          <Route exact path="/pcg">
            <MapGenerator state={state} dispatch={dispatch} />
          </Route>
        </Switch>
      </Router>
    </Wrapper>
  );
};
