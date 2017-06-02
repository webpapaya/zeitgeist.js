import { getWeekday } from './index';

import floorDay from './floor-days';
import addDays from './add-days';


// TODO: remove toIso call here
const ceilWeek = (isoDatetime) =>
  floorDay(addDays(7 - getWeekday(isoDatetime) + 1, isoDatetime));

export default ceilWeek;
