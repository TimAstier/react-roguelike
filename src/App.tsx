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
`;

export const App: React.FC = () => {
  const soundOptions: UseCustomSoundOptions = { loop: true, volume: 0.1 };
  const [play] = useSound(crystalCaveSong, soundOptions);
  const didUserInput = useDetectUserInput();

  React.useEffect(() => {
    if (didUserInput) {
      play();
    }
  }, [didUserInput]);

  return (
    <Wrapper>
      <Game />
    </Wrapper>
  );
};
