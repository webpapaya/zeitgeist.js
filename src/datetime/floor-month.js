import prepareParams from './_internal/to-fragments-execute-and-back';

const floorMonths = prepareParams((fragments) =>
  ({ ...fragments, day: 1, hour: 0, minute: 0, second: 0 }));

export default floorMonths;
