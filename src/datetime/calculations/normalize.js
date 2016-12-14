import { roundDecorator } from '../decorator';
import { normalize as _normalize } from './normalize.internal';

export const normalize = roundDecorator(_normalize);
