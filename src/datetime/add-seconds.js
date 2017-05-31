import createAddUnitFunction from './_internal/create-add-unit-function';
import { ONE_SECOND } from './constants';
import { calculationDecorator } from './decorator'; // TODO: move calculation decorator to createAddUnitFunction

export default calculationDecorator(createAddUnitFunction(ONE_SECOND));
