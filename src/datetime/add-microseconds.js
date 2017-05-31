import { pipe } from '../utils';
import { calculationDecorator } from './decorator';
import toUnixMicroseconds from './to-unix-microseconds';
import fromUnixMicroseconds from './from-unix-microseconds';
import { ONE_MICROSECOND } from './constants';

const addMicroseconds = calculationDecorator((microseconds, isoDatetime) => pipe(
  toUnixMicroseconds,
  (unixMicroseconds) => unixMicroseconds + microseconds * ONE_MICROSECOND,
  fromUnixMicroseconds,
)(isoDatetime));

export default addMicroseconds;
