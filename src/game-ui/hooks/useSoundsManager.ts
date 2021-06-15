import React from 'react';
import useSound from 'use-sound';

import attack from '../../assets/sounds/attack.wav';
import crit from '../../assets/sounds/crit.mp3.flac';
import goblinAttack from '../../assets/sounds/goblin_attack.wav';
import goblinDeath from '../../assets/sounds/goblin_death.wav';
import goblinPain from '../../assets/sounds/goblin_pain.wav';
import lootBigGold from '../../assets/sounds/lootBigGold.ogg';
import lootSmallGold from '../../assets/sounds/lootSmallGold.ogg';
import miss from '../../assets/sounds/miss.wav';
import ratAttack from '../../assets/sounds/rat_attack.ogg';
import ratDeath from '../../assets/sounds/rat_death.ogg';
import ratPain from '../../assets/sounds/rat_pain.ogg';
import stairs from '../../assets/sounds/stairs.ogg';
import { useDetectUserInput } from './useDetectUserInput';

export const SOUNDS = {
  crit,
  attack,
  miss,
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

  const [playCrit] = useSound(crit);
  const [playAttack] = useSound(attack, { volume: 3 });
  const [playMiss] = useSound(miss, { volume: 0.6 });
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
    crit: playCrit,
    attack: playAttack,
    miss: playMiss,
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
