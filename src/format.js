import { token as defaultToken } from './locales/default-token';
import { toFragments } from './index';

const sortByLengthDesc = (a, b) => b.length - a.length
const findToken = (isoString, format, tokenRegex) =>
  format.match(tokenRegex) || [];

const buildTokenRegex = (tokenList) => {
  const token = Object
    .keys(tokenList)
    .sort(sortByLengthDesc)
    .join('|');

  return new RegExp(token, 'g');
};

export const format = (isoString, format, tokenList = defaultToken) => {
  const fragments = toFragments(isoString);
  const tokenRegex = buildTokenRegex(tokenList);

  return findToken(isoString, format, tokenRegex).reduce((formattedDate, token) => {
    const replacedToken = tokenList[token](fragments);
    return formattedDate.replace(token, replacedToken);
  }, format);
};
