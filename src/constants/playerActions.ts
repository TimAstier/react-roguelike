export interface PlayerAction {
  type: string;
  gameKey: string;
}

export const PLAYER_ACTIONS: PlayerAction[] = [
  {
    type: 'wait',
    gameKey: 'w',
  },
];
