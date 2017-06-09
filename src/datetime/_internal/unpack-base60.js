const charCodeToInt = (charCode) => {
  if (charCode > 96) { return charCode - 87; }
  if (charCode > 64) { return charCode - 29; }

  return charCode - 48;
};

function unpackBase60(string) {
  let i = 0;
  const parts = string.split('.');
  const whole = parts[0];
  const fractional = parts[1] || '';
  let multiplier = 1;
  let num;
  let out = 0;
  let sign = 1;

  // handle negative numbers
  if (string.charCodeAt(0) === 45) {
    i = 1;
    sign = -1;
  }

  // handle digits before the decimal
  for (i; i < whole.length; i++) {
    num = charCodeToInt(whole.charCodeAt(i));
    out = 60 * out + num;
  }

  // handle digits after the decimal
  for (i = 0; i < fractional.length; i++) {
    multiplier = multiplier / 60;
    num = charCodeToInt(fractional.charCodeAt(i));
    out += num * multiplier;
  }

  return out * sign;
}

export default unpackBase60;
