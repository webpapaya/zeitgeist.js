import createAddUnitFunction from './_internal/create-add-unit-function';
import { ONE_REGULAR_DAY } from './constants';
import { calculationDecorator } from './decorator'; // TODO: move calculation decorator to createAddUnitFunction

export default calculationDecorator(createAddUnitFunction(ONE_REGULAR_DAY));
