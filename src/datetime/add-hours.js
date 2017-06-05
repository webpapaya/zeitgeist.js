import createAddUnitFunction from './_internal/create-add-unit-function';
import { ONE_HOUR } from './constants';

export default (...args) => createAddUnitFunction(ONE_HOUR)(...args);
