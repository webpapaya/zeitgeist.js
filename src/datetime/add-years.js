import { curry } from '../utils';
import { toFragments, toIso } from './index';
import  calculationDecorator from './_internal/calculation-decorator';

const addYears = calculationDecorator(curry((years, isoDatetime) => {
  const fragments = toFragments(isoDatetime);
  return toIso({ ...fragments, year: fragments.year + years });
}));

export default addYears;
