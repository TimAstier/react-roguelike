import React from 'react';
import useSound from 'use-sound';

import lootBigGold from '../../assets/sounds/lootBigGold.ogg';
import lootSmallGold from '../../assets/sounds/lootSmallGold.ogg';
import { useDetectUserInput } from './useDetectUserInput';

export const SOUNDS = {
  lootSmallGold,
  lootBigGold,
};

interface Options {
  sounds: (keyof typeof SOUNDS)[];
  round: number;
}

export const useSoundsManager = ({ sounds, round }: Options): void => {
  const [playLootSmallGold] = useSound(lootSmallGold);
  const [playLootBigGold] = useSound(lootBigGold);
  const didUserInput = useDetectUserInput();

  const soundPlayer: { [key: string]: typeof playLootSmallGold } = {
    lootSmallGold: playLootSmallGold,
    lootBigGold: playLootBigGold,
  };

  React.useEffect(() => {
    if (didUserInput) {
      sounds.forEach((sound) => {
        soundPlayer[sound]();
      });
    }
  }, [didUserInput, round]);
};
