import { fragmentsRoundDecorator } from './decorator';

const floorYears = fragmentsRoundDecorator((fragments) =>
  ({ ...fragments, month: 1, day: 1, hour: 0, minute: 0, second: 0 }));

export default floorYears;
