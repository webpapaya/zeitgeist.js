import { fractionOfNumber } from '../utils';
import { fragmentsRoundDecorator } from './decorator';

import floorSecond from './floor-second';
import ceilSecond from './ceil-second';

const roundSecond = fragmentsRoundDecorator((fragments) => fractionOfNumber(fragments.second) >= 0.5
  ? ceilSecond(fragments)
  : floorSecond(fragments));

export default roundSecond;

