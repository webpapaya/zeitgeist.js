import { roundDecorator } from '../decorator';
import {
  floorYear as _floorYear,
  floorMonth as _floorMonth,
  floorWeek as _floorWeek,
  floorDay as _floorDay,
  floorHour as _floorHour,
  floorMinute as _floorMinute,
  floorSecond as _floorSecond,
} from './floor.internal';

export const floorYear = roundDecorator(_floorYear);
export const floorMonth = roundDecorator(_floorMonth);
export const floorWeek = roundDecorator(_floorWeek);
export const floorDay = roundDecorator(_floorDay);
export const floorHour = roundDecorator(_floorHour);
export const floorMinute = roundDecorator(_floorMinute);
export const floorSecond = roundDecorator(_floorSecond);

