import { token as defaultToken } from '../locales/default-token';
import { locale as defaultLocale } from '../locales/default-locale';
import getTimezoneOffset from './get-timezone-offset';

import {
  toFragments,
  getDateComponent,
  getTimeComponent,
} from './index';

const sortByLengthDesc = (a, b) => b.length - a.length;
const findToken = (isoDatetime, format, tokenRegex) =>
  format.match(tokenRegex) || [];

const buildTokenRegex = (tokenList) => {
  const token = Object
    .keys(tokenList)
    .sort(sortByLengthDesc)
    .join('|');

  return new RegExp(token, 'g');
};

export const format = (isoDatetime, givenFormat, options = {}) => {
  const {
    tokenList = defaultToken,
    locale = defaultLocale,
  } = options;

  const fragments = toFragments(isoDatetime);
  const tokenRegex = buildTokenRegex(tokenList);

  return findToken(isoDatetime, givenFormat, tokenRegex).reduce((formattedDate, token) => {
    const replacedToken = tokenList[token](fragments, locale);
    return formattedDate.replace(token, replacedToken);
  }, givenFormat);
};

export const applyFormat = (original, modified) => {
  const originalTimeComponent = getTimeComponent(original);
  const originalDateComponent = getDateComponent(original);

  const modifiedTimeComponent = `${getTimeComponent(modified)}.000000`;
  const modifiedDateComponent = getDateComponent(modified);

  return [
    modifiedDateComponent.substring(0, originalDateComponent.length),
    modifiedTimeComponent.substring(0, originalTimeComponent.length),
  ].join('');
};

export const dropTimezone = (isoDatetime) => {
  const timezone = getTimezoneOffset(isoDatetime) || '';
  return isoDatetime.replace(timezone, '');
};
