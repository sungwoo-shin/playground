export const measureTextRows = (target: HTMLElement, value: string) => {
  const canvas = document.createElement("canvas");
  const canvasContext: CanvasRenderingContext2D = canvas.getContext("2d")!;

  const style = window.getComputedStyle(target);
  canvasContext.font = `${style.getPropertyValue("font-size")} ${style.getPropertyValue(
    "font-family",
  )}`;

  return value
    .split("\n")
    .map((row) =>
      Math.max(
        Math.ceil(canvasContext.measureText(row).width / target.offsetWidth),
        1,
      ),
    )
    .reduce((a, b) => a + b);
};
