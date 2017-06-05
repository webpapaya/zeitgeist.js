const MATCH_TIMEZONE = /([+-]\d\d:\d\d$)|(Z$)/;

// TODO: Should return the local time if no timezone is defined
const getTimezoneOffset = (isoDatetime) => {
  const timezone = isoDatetime.match(MATCH_TIMEZONE);
  return timezone === null ? null : timezone[0];
};

export default getTimezoneOffset;
