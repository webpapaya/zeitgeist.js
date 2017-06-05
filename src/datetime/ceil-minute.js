import { toIso } from './index';
import { roundDecorator } from './decorator';

import floorMinute from './floor-minute';
import addMinutes from './add-minutes';

// TODO: remove toIso call here
const ceilMinutes = roundDecorator((isoDatetime) =>
  floorMinute(addMinutes(1, toIso(isoDatetime))));

export default ceilMinutes;
