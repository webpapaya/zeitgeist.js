import { toIso } from '../index';

export const toJsDate = (isoStringOrFragments) => new Date(toIso(isoStringOrFragments));

export const fromJsDate = (jsDate) => toIso(jsDate.toISOString());
