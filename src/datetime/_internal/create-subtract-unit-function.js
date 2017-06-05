import { curry } from '../../utils';

const createSubtractUnitFunction = (addFn) => curry((amount, isoDatetime) =>
  addFn(amount * - 1, isoDatetime));

export default createSubtractUnitFunction;
