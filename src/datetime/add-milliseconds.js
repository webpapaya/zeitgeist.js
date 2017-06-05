import createAddUnitFunction from './_internal/create-add-unit-function';
import { ONE_MILLISECOND } from './constants';

export default (...args) => createAddUnitFunction(ONE_MILLISECOND)(...args);
