import { fragmentsRoundDecorator } from './decorator';

const floorMinutes = fragmentsRoundDecorator((fragments) =>
  ({ ...fragments, second: 0 }));

export default floorMinutes;
