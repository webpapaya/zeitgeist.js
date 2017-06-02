import { toIso } from './index';
import { roundDecorator } from './decorator';

import floorHour from './floor-hours';
import addHours from './add-hours';

// TODO: remove toIso call here
const ceilHours = roundDecorator((isoDatetime) =>
  floorHour(addHours(1, toIso(isoDatetime))));

export default ceilHours;
