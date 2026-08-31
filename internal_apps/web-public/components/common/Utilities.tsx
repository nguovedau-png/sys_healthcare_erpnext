/**
 * Converts a number to a shortened string representation with metric prefix
 * @param n - The number to convert
 * @param d - The number of decimal places to round to
 * @returns A string with the shortened number and metric prefix (k, M, G, T, P, E)
 */
export const convertNum = (n: number, d: number): string => {
  const x: number = (`${n}`).length;
  const p = Math.pow;
  const decimal = p(10, d);
  const adjustedX = x - (x % 3);
  return `${Math.round(n * decimal / p(10, adjustedX)) / decimal} kMGTPE`[adjustedX / 3];
};