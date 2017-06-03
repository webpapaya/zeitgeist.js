import betweenDecorator from '../_internal/between-decorator';
import { datesBetween as _datesBetween } from './between.internal';

export const datesBetween = betweenDecorator(_datesBetween);
