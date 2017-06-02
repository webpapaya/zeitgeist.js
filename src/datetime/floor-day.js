import { fragmentsRoundDecorator } from './decorator';

const floorDays = fragmentsRoundDecorator((fragments) =>
  ({ ...fragments, hour: 0, minute: 0, second: 0 }));

export default floorDays;
