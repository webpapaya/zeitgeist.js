import createAddUnitFunction from './_internal/create-add-unit-function';
import { ONE_REGULAR_DAY } from './constants';

export default (...args) => createAddUnitFunction(ONE_REGULAR_DAY)(...args);
