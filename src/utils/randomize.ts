export const getRandomStepNumber = (
  min: number = 0,
  max: number = 0,
  step: number = 1,
) => {
  if (max < min || max - min < step) {
    throw Error("Unexpected args");
  }

  const boundedNumber = Math.random() * (max - min) + min;

  return Math.max(Math.floor(boundedNumber / step) * step, min);
};
