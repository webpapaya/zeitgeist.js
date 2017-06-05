import { curry } from '../../utils';
import { getTimezone } from '../getters';
import { containsDateComponent, toUtc } from '../index';

const dropTimezone = (isoDatetime) => {
  const timezone = getTimezone(isoDatetime) || '';
  return isoDatetime.replace(timezone, '');
};

const betweenDecorator = (fn) => curry((from, to) => {
  return fn(
    dropTimezone(containsDateComponent(from) ? toUtc(from) : from),
    dropTimezone(containsDateComponent(to) ? toUtc(to) : to)
  );
});

export default betweenDecorator;

