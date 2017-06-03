import betweenDecorator from './_internal/between-decorator';
import { ONE_MILLISECOND } from './constants';
import differenceInMicroseconds from './difference-in-microseconds'

const differenceInMilliseconds = betweenDecorator((from, to) =>
  differenceInMicroseconds(from, to) / ONE_MILLISECOND);

export default differenceInMilliseconds;
