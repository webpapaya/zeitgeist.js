import { toIso, toFragments } from '../index';
import { pipe } from '../../utils';
import { fragmentsRoundDecorator } from '../decorator';

const toFragmentsExecuteAndBack = (fn) => fragmentsRoundDecorator(pipe(
  toFragments,
  fn,
  toIso,
));

export default toFragmentsExecuteAndBack;
