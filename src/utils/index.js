export const formatNumber = number => {
  const roundedNumber = Math.round(number * 100) / 100;
  const fixedNumber = roundedNumber.toFixed(2);
  return fixedNumber.replace(/(\.0*|(?<=\.\d)0*)$/, '');
};
