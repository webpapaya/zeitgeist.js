import {
  ONE_HOUR,
  ONE_MINUTE,
  ONE_SECOND,
} from '../constants';

import {
  toIso,
  toFragments,
  asMicroseconds,
  removeDateComponent,
} from '../index';

export const normalize = (isoString) => {
  const fragments = toFragments(isoString);

  const microseconds = asMicroseconds(removeDateComponent(isoString));
  const hours = Math.floor(microseconds / ONE_HOUR);
  const minutes = Math.floor((microseconds - hours * ONE_HOUR) / ONE_MINUTE);
  const seconds = ((microseconds - minutes * ONE_MINUTE) - (hours * ONE_HOUR)) / ONE_SECOND;

  return toIso({
    ...fragments,
    hours,
    minutes,
    seconds,
  });
};
