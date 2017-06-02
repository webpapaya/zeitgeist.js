import { toIso } from './index';
import { roundDecorator } from './decorator';

import floorYear from './floor-years';
import addYears from './add-years';

// TODO: remove toIso call here
const ceilYears = roundDecorator((isoDatetime) =>
  floorYear(addYears(1, toIso(isoDatetime))));

export default ceilYears;
