import { fragmentsRoundDecorator } from './decorator';

import floorMinute from './floor-minute';
import ceilMinute from './ceil-minute';

const roundMinute = fragmentsRoundDecorator((fragments) => fragments.second >= 30
  ? ceilMinute(fragments)
  : floorMinute(fragments));

export default roundMinute;
