import React from 'react';
import useSound from 'use-sound';

import goblinAttack from '../../assets/sounds/goblin_attack.wav';
import goblinDeath from '../../assets/sounds/goblin_death.wav';
import goblinPain from '../../assets/sounds/goblin_pain.wav';
import lootBigGold from '../../assets/sounds/lootBigGold.ogg';
import lootSmallGold from '../../assets/sounds/lootSmallGold.ogg';
import ratAttack from '../../assets/sounds/rat_attack.ogg';
import ratDeath from '../../assets/sounds/rat_death.ogg';
import ratPain from '../../assets/sounds/rat_pain.ogg';
import stairs from '../../assets/sounds/stairs.ogg';
import { useDetectUserInput } from './useDetectUserInput';

export const SOUNDS = {
  lootSmallGold,
  lootBigGold,
  stairs,
  ratAttack,
  ratPain,
  ratDeath,
  goblinAttack,
  goblinPain,
  goblinDeath,
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
  const [playRatAttack] = useSound(ratAttack, { volume: 0.3 });
  const [playRatPain] = useSound(ratPain, { volume: 0.3 });
  const [playRatDeath] = useSound(ratDeath, { volume: 0.3 });
  const [playGoblinAttack] = useSound(goblinAttack, { volume: 0.3 });
  const [playGoblinPain] = useSound(goblinPain, { volume: 0.3 });
  const [playGoblinDeath] = useSound(goblinDeath, { volume: 0.3 });

  const soundPlayer: { [key: string]: typeof playLootSmallGold } = {
    lootSmallGold: playLootSmallGold,
    lootBigGold: playLootBigGold,
    stairs: playStairs,
    ratAttack: playRatAttack,
    ratPain: playRatPain,
    ratDeath: playRatDeath,
    goblinAttack: playGoblinAttack,
    goblinPain: playGoblinPain,
    goblinDeath: playGoblinDeath,
  };

  React.useEffect(() => {
    if (didUserInput) {
      sounds.forEach((sound) => {
        soundPlayer[sound]();
      });
    }
  }, [didUserInput, round, sounds]);
};
