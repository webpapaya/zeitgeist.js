import { curry } from '../../utils';
import { containsDateComponent, toUtc } from '../index';
import getTimezoneOffset from '../get-timezone-offset';


const dropTimezone = (isoDatetime) => {
  const timezone = getTimezoneOffset(isoDatetime) || '';
  return isoDatetime.replace(timezone, '');
};

const betweenDecorator = (fn) => curry((from, to) => {
  return fn(
    dropTimezone(containsDateComponent(from) ? toUtc(from) : from),
    dropTimezone(containsDateComponent(to) ? toUtc(to) : to)
  );
});

export default betweenDecorator;

