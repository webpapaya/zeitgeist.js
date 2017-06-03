import betweenDecorator from './_internal/between-decorator';
import { toJulianDay, containsDateComponent } from './index';

const differenceInCalendarDates = betweenDecorator((from, to) => {
  const daysFrom = containsDateComponent(from) ? toJulianDay(from) : 0;
  const daysTo = containsDateComponent(to) ? toJulianDay(to) : 0;

  return Math.floor(daysTo + 0.5) - Math.floor(daysFrom + 0.5);
});

export default differenceInCalendarDates;
