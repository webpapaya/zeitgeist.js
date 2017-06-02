import { fragmentsRoundDecorator } from './decorator';

import floorDay from './floor-day';
import ceilDay from './ceil-day';

export const roundDay = fragmentsRoundDecorator((fragments) => fragments.hour >= 12
  ? ceilDay(fragments)
  : floorDay(fragments));

export default roundDay;

