import { roundDecorator } from '../decorator';
import {
  roundYear as _roundYear,
  roundMonth as _roundMonth,
  roundWeek as _roundWeek,
  roundDay as _roundDay,
  roundHour as _roundHour,
  roundMinute as _roundMinute,
  roundSecond as _roundSecond,
} from './round.internal';

export const roundYear = roundDecorator(_roundYear);
export const roundMonth = roundDecorator(_roundMonth);
export const roundWeek = roundDecorator(_roundWeek);
export const roundDay = roundDecorator(_roundDay);
export const roundHour = roundDecorator(_roundHour);
export const roundMinute = roundDecorator(_roundMinute);
export const roundSecond = roundDecorator(_roundSecond);

