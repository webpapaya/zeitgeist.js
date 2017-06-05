import { fragmentsRoundDecorator } from './decorator';

const floorHours = fragmentsRoundDecorator((fragments) =>
  ({ ...fragments, minute: 0, second: 0 }));

export default floorHours;
