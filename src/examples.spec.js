import { assertThat, equalTo, not } from 'hamjest';
import { pipe } from './utils';
import * as DateTime from './datetime/index';

describe('Datetime Examples', () => {
  it('all calculations are curried', () => {
    const addSingleSchoolHour = DateTime.addMinutes(45);

    assertThat(addSingleSchoolHour('2000-01-01T08:00:00'),
      equalTo('2000-01-01T08:45:00'));
  });

  describe('currying enables functional composition', () => {
    it('with the pipe/compose fn from ramda.js OR lodash/fn', () => {
      const addDoubleSchoolHour = pipe(
        DateTime.addMinutes(30),
        DateTime.addHour(1),
      );

      assertThat(addDoubleSchoolHour('2000-01-01T08:00:00'),
        equalTo('2000-01-01T09:30:00'));
    });

    it('this composition can be used in async code as well', () => {
      const Api = { getCurrentTime: () => Promise.resolve('2000-01-01T08:00:00') };
      const addDoubleSchoolHour = pipe(
        DateTime.addMinutes(30),
        DateTime.addHour(1),
      );

      return Api.getCurrentTime()
        .then(addDoubleSchoolHour)
        .then((date) => assertThat(date, equalTo('2000-01-01T09:30:00')));
    });

    it('custom transformations between different formats can be archived easily', () => {
      const addDoubleSchoolHour = pipe(
        DateTime.fromUnixTimestamp,
        DateTime.addMinutes(30),
        DateTime.addHour(1),
        DateTime.toUnixTimestamp,
      );

      assertThat(addDoubleSchoolHour(9467020822), equalTo(9472420822));
    });
  });

  describe('all calculations return a new ISO-8601 string', () => {
    it('which makes it immutable by default', () => {
      const now = DateTime.now();
      const in1Minute = DateTime.addMinutes(1, now);

      assertThat(now, not(equalTo(in1Minute)));
    });
  });
});
