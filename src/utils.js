export const buildMaybeMonad = (value) => {
  const isEmpty = () =>
    value === null || value === void 0;

  const map = (fn) => {
    if(isEmpty()) { return buildMaybeMonad(void 0); }
    return buildMaybeMonad(fn(value));
  };

  return { map, value };
};
