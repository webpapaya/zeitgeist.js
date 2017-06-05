import getTimezone from '../get-timezone';

const dropTimezone = (isoDatetime) => {
  const timezone = getTimezone(isoDatetime) || '';
  return isoDatetime.replace(timezone, '');
};

export default dropTimezone;
