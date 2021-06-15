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

export const PLAYER_ACTION_SHORTCUTS = PLAYER_ACTIONS.map((a) => a.gameKey);
