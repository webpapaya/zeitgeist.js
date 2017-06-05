import { roundDecorator } from './decorator';
import { toFragments, toIso } from './index';

const endOfSecond = (isoDatetime) => {
  const fragments = toFragments(isoDatetime);
  return toIso({ ...fragments, second: Math.floor(fragments.second) + 0.999999 });
};

export default roundDecorator(endOfSecond);
