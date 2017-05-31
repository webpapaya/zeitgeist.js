import { curry } from '../utils';
import { toFragments, toIso } from './index';
import { calculationDecorator } from './decorator'; // TODO: move calculation decorator to createAddUnitFunction

const addYears = calculationDecorator(curry((years, isoDatetime) => {
  const fragments = toFragments(isoDatetime);
  return toIso({ ...fragments, year: fragments.year + years });
}));

export default addYears;
