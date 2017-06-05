import { toFragments, toIso } from './index';
import calculationDecorator from './_internal/calculation-decorator';

const addMonths = calculationDecorator((months, isoDatetime) => {
  const fragments = toFragments(isoDatetime);
  return toIso({
    ...fragments,
    year: (fragments.year + Math.floor((fragments.month + months - 1) / 12)),
    month: (fragments.month + months + 11) % 12 + 1,
  });
});

export default addMonths;
