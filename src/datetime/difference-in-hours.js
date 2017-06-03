import betweenDecorator from './_internal/between-decorator';
import { ONE_HOUR } from './constants';
import differenceInMicroseconds from './difference-in-microseconds';

const differenceInHours = betweenDecorator((from, to) =>
  differenceInMicroseconds(from, to) / ONE_HOUR);

export default differenceInHours;
