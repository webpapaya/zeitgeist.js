import getTimezoneOffset from '../get-timezone-offset';

const dropTimezone = (isoDatetime) => {
  const timezone = getTimezoneOffset(isoDatetime) || '';
  return isoDatetime.replace(timezone, '');
};

export default dropTimezone;
