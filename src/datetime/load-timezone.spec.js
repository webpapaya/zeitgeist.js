import { assertThat, equalTo } from 'hamjest';
import { data, expected } from './_internal/tz-fixtures';
import loadTimezone from './load-timezone';
import REGISTRY from './_internal/timezone-registry';

describe('loadTimezone', () => {
  it('adds zone to registry', () => {
    loadTimezone(data);
    assertThat(REGISTRY[data.name], equalTo(expected));
  });
});
