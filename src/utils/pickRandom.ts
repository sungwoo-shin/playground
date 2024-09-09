export const pickRandom = <T>(data: T[] = [], length: number = 1) =>
  [...data].sort(() => (Math.random() - 0.5 >= 0 ? 1 : -1)).slice(0, length);
