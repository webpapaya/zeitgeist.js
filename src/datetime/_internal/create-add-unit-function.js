import { curry, pipe } from '../../utils';
import toUnixMicroseconds from '../to-unix-microseconds';
import fromUnixMicroseconds from '../from-unix-microseconds';

const createAddUnitFunction = (unit) => curry((amount, isoDatetime) => pipe(
  toUnixMicroseconds,
  (unixMicroseconds) => unixMicroseconds + amount * unit,
  fromUnixMicroseconds,
)(isoDatetime));

export default createAddUnitFunction;
