import { fragmentsRoundDecorator } from './decorator';

import floorHour from './floor-hour';
import ceilHour from './ceil-hour';

const roundHour = fragmentsRoundDecorator((fragments) => fragments.minute >= 30
  ? ceilHour(fragments)
  : floorHour(fragments));

export default roundHour;

