import createAddUnitFunction from './_internal/create-add-unit-function';
import { ONE_MICROSECOND } from './constants';

export default (...args) => createAddUnitFunction(ONE_MICROSECOND)(...args);
