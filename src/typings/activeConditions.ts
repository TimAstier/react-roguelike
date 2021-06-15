import { ActiveCondition, ConditionType } from '../constants/conditions';

export type ActiveConditions = { [C in ConditionType]?: ActiveCondition };
