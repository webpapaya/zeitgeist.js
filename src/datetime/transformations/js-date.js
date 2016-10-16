import { toIso } from '../index';

export const now = () => new Date().toISOString();
export const toJsDate = (isoStringOrFragments) => new Date(toIso(isoStringOrFragments));
export const fromJsDate = (jsDate) => toIso(jsDate.toISOString());
