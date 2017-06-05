import { fragmentsRoundDecorator } from './decorator';
import { toIso as toIsoTODORemoved } from './index';
import { isSameOrAfter } from './compare.internal';

import addDays from './add-days';
import floorMonth from './floor-month';
import floorDay from './floor-day';
import ceilMonth from './ceil-month';
import differenceInCalendarDays from './difference-in-calendar-dates';

const roundMonth = fragmentsRoundDecorator((fragments) => {
  const startOfThisMonth = floorMonth(fragments);
  const startOfNextMonth = ceilMonth(fragments);

  const daysInThisMonth = differenceInCalendarDays(startOfThisMonth, startOfNextMonth);
  const middleOfMonth = floorDay(addDays(daysInThisMonth / 2, startOfThisMonth));

  return isSameOrAfter(toIsoTODORemoved(fragments), middleOfMonth)
    ? ceilMonth(fragments)
    : floorMonth(fragments);
});

export default roundMonth;
