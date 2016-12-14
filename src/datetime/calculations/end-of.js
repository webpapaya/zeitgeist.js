import { roundDecorator } from '../decorator';
import {
  endOfSecond as _endOfSecond,
  endOfMinute as _endOfMinute,
  endOfHour as _endOfHour,
  endOfDay as _endOfDay,
  endOfWeek as _endOfWeek,
  endOfMonth as _endOfMonth,
  endOfYear as _endOfYear,
} from './end-of.internal';

export const endOfSecond = roundDecorator(_endOfSecond);
export const endOfMinute = roundDecorator(_endOfMinute);
export const endOfHour = roundDecorator(_endOfHour);
export const endOfDay = roundDecorator(_endOfDay);
export const endOfWeek = roundDecorator(_endOfWeek);
export const endOfMonth = roundDecorator(_endOfMonth);
export const endOfYear = roundDecorator(_endOfYear);

