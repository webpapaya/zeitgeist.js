import { fragmentsRoundDecorator } from './decorator';

const floorSeconds = fragmentsRoundDecorator((fragments) =>
  ({ ...fragments, second: Math.floor(fragments.second) }));

export default floorSeconds;
