import {
  INVALID_DURATION,
  ONE_HOUR,
  ONE_MINUTE,
  ONE_SECOND,
} from '../constants';

import {
  toIso,
  toFragments,
  asMicroseconds,
  removeDateComponent,
  isValid,
} from '../index';

const validate = (fn) => (isoDuration) => isValid(isoDuration)
  ? fn(isoDuration)
  : INVALID_DURATION;

export const normalize = validate((isoDuration) => {
  const fragments = toFragments(isoDuration);

  const microseconds = asMicroseconds(removeDateComponent(isoDuration));
  const hours = Math.floor(microseconds / ONE_HOUR);
  const minutes = Math.floor((microseconds - hours * ONE_HOUR) / ONE_MINUTE);
  const seconds = ((microseconds - minutes * ONE_MINUTE) - (hours * ONE_HOUR)) / ONE_SECOND;

  return toIso({
    ...fragments,
    hours,
    minutes,
    seconds,
  });
});
