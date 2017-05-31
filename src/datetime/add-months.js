import { curry } from '../utils';
import { toFragments, toIso } from './index';
import { calculationDecorator } from './decorator'; // TODO: move calculation decorator to createAddUnitFunction

const addMonths = calculationDecorator(curry((months, isoDatetime) => {
  const fragments = toFragments(isoDatetime);
  return toIso({
    ...fragments,
    year: (fragments.year + Math.floor((fragments.month + months - 1) / 12)),
    month: (fragments.month + months + 11) % 12 + 1,
  });
}));

export default addMonths;
