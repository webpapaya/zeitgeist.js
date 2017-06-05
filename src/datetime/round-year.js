import { fragmentsRoundDecorator } from './decorator';

import floorYear from './floor-year';
import ceilYear from './ceil-year';

const roundYear = fragmentsRoundDecorator((fragments) => fragments.month >= 6
  ? ceilYear(fragments)
  : floorYear(fragments));
export default roundYear;

