import { curry } from '../utils';
import { toFragments, toIso } from './index';
import calculationDecorator from './_internal/calculation-decorator';

const addYears = (...args) => calculationDecorator(curry((years, isoDatetime) => {
  const fragments = toFragments(isoDatetime);
  return toIso({ ...fragments, year: fragments.year + years });
}))(...args); // TODO: FIXME! travis CI issue

export default addYears;
