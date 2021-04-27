import './App.css';

import { HowlOptions } from 'howler';
import React from 'react';
import styled from 'styled-components';
import useSound from 'use-sound';

import crystalCaveSong from './assets/music/crystal-cave-song.mp3';
import { Game } from './components/Game';
import { useDetectUserInput } from './hooks/useDetectUserInput';

// Additional typings to workaround this:
// https://github.com/joshwcomeau/use-sound/pull/51
export declare type SpriteMap = {
  [key: string]: [number, number];
};
export interface HookOptions {
  volume?: number;
  playbackRate?: number;
  interrupt?: boolean;
  soundEnabled?: boolean;
  sprite?: SpriteMap;
  onload?: () => void;
}

type UseCustomSoundOptions = HookOptions & HowlOptions;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: lightgrey;
  height: 100%;
  font-family: UglyTerminal;
`;

export const App: React.FC = () => {
  const soundOptions: UseCustomSoundOptions = { loop: true, volume: 0.1 };
  const [play, { stop }] = useSound(crystalCaveSong, soundOptions);
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
      <Game
        withBackgroundMusic={withBackgroundMusic}
        setWithBackgroundMusic={setWithBackgroundMusic}
      />
    </Wrapper>
  );
};
