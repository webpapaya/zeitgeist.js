import { toIso } from './index';
import { roundDecorator } from './decorator';

import floorMonth from './floor-month';
import addMonths from './add-months';

// TODO: remove toIso call here
const ceilMonths = roundDecorator((isoDatetime) =>
  floorMonth(addMonths(1, toIso(isoDatetime))));

export default ceilMonths;
