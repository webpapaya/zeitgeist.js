import betweenDecorator from './_internal/between-decorator';
import { ONE_SECOND } from './constants';
import differenceInMicroseconds from './difference-in-microseconds';

const secondsBetween = betweenDecorator((from, to) =>
  differenceInMicroseconds(from, to) / ONE_SECOND);

export default secondsBetween;
