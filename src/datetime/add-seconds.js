import createAddUnitFunction from './_internal/create-add-unit-function';
import { ONE_SECOND } from './constants';

export default (...args) => createAddUnitFunction(ONE_SECOND)(...args);
