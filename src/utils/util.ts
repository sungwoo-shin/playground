export const waitFor = (ms: number) =>
  // eslint-disable-next-line no-promise-executor-return
  new Promise((resolve) => setTimeout(resolve, ms));

export const stringToDOM = (text: string) =>
  new DOMParser().parseFromString(text, "text/html").body.children[0];

export const generateDOM = (
  tag: keyof HTMLElementTagNameMap,
  className?: string,
  text?: string,
) => {
  const elem = document.createElement(tag);
  if (className) {
    elem.classList.add(...className.split(" "));
  }
  if (text) {
    elem.textContent = text;
  }

  return elem;
};
