import fromUnixMicroseconds from './from-unix-microseconds';

export default (unixTimestamp) =>
  fromUnixMicroseconds(unixTimestamp * 1000);
