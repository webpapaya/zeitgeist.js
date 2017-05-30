import toUnixMicroseconds from './to-unix-microseconds';

export default (isoDatetime) => toUnixMicroseconds(isoDatetime) / 1000;
