export const getRandomIntInclusive = (min: number, max: number, rng?: () => number): number => {
  const getRandom = rng ? rng : Math.random;
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(getRandom() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
};
