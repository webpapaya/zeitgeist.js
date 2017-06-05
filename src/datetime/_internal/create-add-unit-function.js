import { pipe } from '../../utils';
import calculationDecorator from './calculation-decorator';
import toUnixMicroseconds from '../to-unix-microseconds';
import fromUnixMicroseconds from '../from-unix-microseconds';

const createAddUnitFunction = (unit) => calculationDecorator((amount, isoDatetime) => pipe(
  toUnixMicroseconds,
  (unixMicroseconds) => unixMicroseconds + amount * unit,
  fromUnixMicroseconds,
)(isoDatetime));

export default createAddUnitFunction;
