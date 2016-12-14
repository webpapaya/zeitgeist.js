import { calculationDecorator } from '../decorator';
import {
  addDuration as _addDuration,
  addYears as _addYears,
  addMonths as _addMonths,
  addDays as _addDays,
  addHours as _addHours,
  addMinutes as _addMinutes,
  addSeconds as _addSeconds,
} from './add.internal';

export const addDuration = calculationDecorator(_addDuration);
export const addYears = calculationDecorator(_addYears);
export const addMonths = calculationDecorator(_addMonths);
export const addDays = calculationDecorator(_addDays);
export const addHours = calculationDecorator(_addHours);
export const addMinutes = calculationDecorator(_addMinutes);
export const addSeconds = calculationDecorator(_addSeconds);
