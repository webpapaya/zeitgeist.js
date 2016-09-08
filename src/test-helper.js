export const getCallStackSize = () => {
  let i = 0;
  try {
    const stackSizeTester = () => {
      i++; stackSizeTester();
    };
    stackSizeTester();
  } catch(error) {}
  return i;
};
