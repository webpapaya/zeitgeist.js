import { roundDecorator, fragmentsRoundDecorator } from '../decorator';
import {
  floorYear as _floorYear,
  floorMonth as _floorMonth,
  floorWeek as _floorWeek,
  floorDay as _floorDay,
  floorHour as _floorHour,
  floorMinute as _floorMinute,
  floorSecond as _floorSecond,
} from './floor.internal';

export const floorYear = fragmentsRoundDecorator(_floorYear);
export const floorMonth = fragmentsRoundDecorator(_floorMonth);
export const floorWeek = roundDecorator(_floorWeek);
export const floorDay = fragmentsRoundDecorator(_floorDay);
export const floorHour = fragmentsRoundDecorator(_floorHour);
export const floorMinute = fragmentsRoundDecorator(_floorMinute);
export const floorSecond = fragmentsRoundDecorator(_floorSecond);

