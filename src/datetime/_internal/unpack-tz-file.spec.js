import { assertThat, equalTo, hasProperty } from 'hamjest';
import unpackTzFile from './unpack-tz-file';
import { expected, data} from './unpack-tz-file.fixtures';

describe('unpackTzFile', () => {
  it('contains a list of objects where every object contains until, offset and abbr', () => {
    const unpackedData = unpackTzFile(data.data);
    assertThat(unpackedData, equalTo(expected));
  });
});


