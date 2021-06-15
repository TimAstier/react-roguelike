import React from 'react';
import useSound from 'use-sound';

import lootBigGold from '../../assets/sounds/lootBigGold.ogg';
import lootSmallGold from '../../assets/sounds/lootSmallGold.ogg';
import stairs from '../../assets/sounds/stairs.ogg';
import stone from '../../assets/sounds/stepstone_1.wav';
import { useDetectUserInput } from './useDetectUserInput';

export const SOUNDS = {
  lootSmallGold,
  lootBigGold,
  stairs,
  stone,
};

interface Options {
  sounds: (keyof typeof SOUNDS)[];
  round: number;
}

export const useSoundsManager = ({ sounds, round }: Options): void => {
  const didUserInput = useDetectUserInput();

  const [playLootSmallGold] = useSound(lootSmallGold);
  const [playLootBigGold] = useSound(lootBigGold);
  const [playStairs] = useSound(stairs);
  const [playStone] = useSound(stone, { volume: 0.2 });

  const soundPlayer: { [key: string]: typeof playLootSmallGold } = {
    lootSmallGold: playLootSmallGold,
    lootBigGold: playLootBigGold,
    stairs: playStairs,
    stone: playStone,
  };

  React.useEffect(() => {
    if (didUserInput) {
      sounds.forEach((sound) => {
        soundPlayer[sound]();
      });
    }
  }, [didUserInput, round, sounds]);
};
