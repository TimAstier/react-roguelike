export type ConditionType = 'burning';

interface Condition {
  duration: number;
}

export interface ActiveCondition {
  activeRounds: number;
}

export const CONDITIONS: { [C in ConditionType]: Condition } = {
  burning: {
    duration: 10,
  },
};
