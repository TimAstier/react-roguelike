// From: https://gist.github.com/6174/6062387

export const getRandomString = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};
