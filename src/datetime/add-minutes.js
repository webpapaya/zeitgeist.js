import createAddUnitFunction from './_internal/create-add-unit-function';
import { ONE_MINUTE } from './constants';

export default (...args) => createAddUnitFunction(ONE_MINUTE)(...args);
