export const getCallStackSize = () => {
  let i = 0;
  try {
    const stackSizeTester = () => {
      if(i >= 10e6) { return 10e6; }
      i++; stackSizeTester();
    };
    stackSizeTester();
  } catch(error) {}
  return i;
};
