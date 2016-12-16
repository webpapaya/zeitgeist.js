import {
  betweenDecorator,
} from '../decorator';

import {
  datesBetween as _datesBetween,
  microsecondsBetween as _microsecondsBetween,
  millisecondsBetween as _millisecondsBetween,
  secondsBetween as _secondsBetween,
  minutesBetween as _minutesBetween,
  hoursBetween as _hoursBetween,
  daysBetween as _daysBetween,
} from './between.internal';

export const datesBetween = betweenDecorator(_datesBetween);
export const microsecondsBetween = betweenDecorator(_microsecondsBetween);
export const millisecondsBetween = betweenDecorator(_millisecondsBetween);
export const secondsBetween = betweenDecorator(_secondsBetween);
export const minutesBetween = betweenDecorator(_minutesBetween);
export const hoursBetween = betweenDecorator(_hoursBetween);
export const daysBetween = betweenDecorator(_daysBetween);
