import createAddUnitFunction from './_internal/create-add-unit-function';
import { ONE_MICROSECOND } from './constants';
import { calculationDecorator } from './decorator'; // TODO: move calculation decorator to createAddUnitFunction

export default calculationDecorator(createAddUnitFunction(ONE_MICROSECOND));
