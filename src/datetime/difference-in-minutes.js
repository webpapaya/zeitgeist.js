import betweenDecorator from './_internal/between-decorator';
import { ONE_MINUTE } from './constants';
import differenceInMicroseconds from './difference-in-microseconds';

const differenceInMinutes = betweenDecorator((from, to) =>
  differenceInMicroseconds(from, to) / ONE_MINUTE);

export default differenceInMinutes;
