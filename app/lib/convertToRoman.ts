export const convertToRoman = (num: number): string => {
  if (num < 1) {
    return '';
  }
  if (num >= 40) {
    return `XL${convertToRoman(num - 40)}`;
  }
  if (num >= 10) {
    return `X${convertToRoman(num - 10)}`;
  }
  if (num >= 9) {
    return `IX${convertToRoman(num - 9)}`;
  }
  if (num >= 5) {
    return `V${convertToRoman(num - 5)}`;
  }
  if (num >= 4) {
    return `IV${convertToRoman(num - 4)}`;
  }
  if (num >= 1) {
    return `I${convertToRoman(num - 1)}`;
  }
  return '';
};
