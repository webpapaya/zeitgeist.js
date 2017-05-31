import createAddUnitFunction from './_internal/create-add-unit-function';
import { ONE_HOUR } from './constants';
import { calculationDecorator } from './decorator'; // TODO: move calculation decorator to createAddUnitFunction

export default calculationDecorator(createAddUnitFunction(ONE_HOUR));
