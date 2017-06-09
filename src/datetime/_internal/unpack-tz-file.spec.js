import { assertThat, equalTo } from 'hamjest';
import unpackTzFile from './unpack-tz-file';
import { expected, data } from './unpack-tz-file.fixtures';

describe('unpackTzFile', () => {
  it('unpacks the tz file correctly', () => {
    const unpackedData = unpackTzFile(data.data);
    assertThat(unpackedData, equalTo(expected));
  });
});

