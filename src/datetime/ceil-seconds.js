import { toIso } from './index';
import { roundDecorator } from './decorator';

import floorSecond from './floor-seconds';
import addSeconds from './add-seconds';

// TODO: remove toIso call here
const ceilSeconds = roundDecorator((isoDatetime) =>
  floorSecond(addSeconds(1, toIso(isoDatetime))));

export default ceilSeconds;
