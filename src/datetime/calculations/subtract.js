import { calculationDecorator } from '../decorator';
import {
  subtractDuration as _subtractDuration,
  subtractYears as _subtractYears,
  subtractMonths as _subtractMonths,
  subtractDays as _subtractDays,
  subtractHours as _subtractHours,
  subtractMinutes as _subtractMinutes,
  subtractSeconds as _subtractSeconds,
} from './subtract.internal';

export const subtractDuration = calculationDecorator(_subtractDuration);
export const subtractYears = calculationDecorator(_subtractYears);
export const subtractMonths = calculationDecorator(_subtractMonths);
export const subtractDays = calculationDecorator(_subtractDays);
export const subtractHours = calculationDecorator(_subtractHours);
export const subtractMinutes = calculationDecorator(_subtractMinutes);
export const subtractSeconds = calculationDecorator(_subtractSeconds);
