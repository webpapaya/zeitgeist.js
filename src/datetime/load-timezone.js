import unpack from './_internal/unpack-tz-file';
import TIMEZONE_REGISTRY from './_internal/timezone-registry';

const loadTimezone = (data) => {
  if (!TIMEZONE_REGISTRY[data.name]) { TIMEZONE_REGISTRY[data.name] = unpack(data.data); }
  return TIMEZONE_REGISTRY;
};

export default loadTimezone;
