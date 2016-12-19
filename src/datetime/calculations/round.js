import { roundDecorator, fragmentsRoundDecorator } from '../decorator';
import {
  roundYear as _roundYear,
  roundMonth as _roundMonth,
  roundWeek as _roundWeek,
  roundDay as _roundDay,
  roundHour as _roundHour,
  roundMinute as _roundMinute,
  roundSecond as _roundSecond,
} from './round.internal';

export const roundYear = fragmentsRoundDecorator(_roundYear);
export const roundMonth = fragmentsRoundDecorator(_roundMonth);
export const roundWeek = fragmentsRoundDecorator(_roundWeek);
export const roundDay = fragmentsRoundDecorator(_roundDay);
export const roundHour = fragmentsRoundDecorator(_roundHour);
export const roundMinute = fragmentsRoundDecorator(_roundMinute);
export const roundSecond = fragmentsRoundDecorator(_roundSecond);

