import createAddUnitFunction from './_internal/create-add-unit-function';
import { ONE_MINUTE } from './constants';
import { calculationDecorator } from './decorator'; // TODO: move calculation decorator to createAddUnitFunction

export default calculationDecorator(createAddUnitFunction(ONE_MINUTE));
