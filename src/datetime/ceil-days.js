import { toIso } from './index';
import { roundDecorator } from './decorator';

import floorDay from './floor-days';
import addDays from './add-days';

// TODO: remove toIso call here
const ceilDays = roundDecorator((isoDatetime) =>
  floorDay(addDays(1, toIso(isoDatetime))));

export default ceilDays;

