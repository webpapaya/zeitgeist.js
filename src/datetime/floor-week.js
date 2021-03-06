import floorDays from './floor-day';
import subtractDays from './subtract-days';
import { getWeekday } from './index';

const floorWeeks = (isoDatetime) => {
  const weekDay = getWeekday(isoDatetime);
  return floorDays(subtractDays(weekDay - 1, isoDatetime));
};

export default floorWeeks;
