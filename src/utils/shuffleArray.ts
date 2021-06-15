export const shuffleArray = (array: any[], rng?: () => number): any[] => {
  let currentIndex = array.length;
  let randomIndex;
  const random = rng ? rng : Math.random;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
};
