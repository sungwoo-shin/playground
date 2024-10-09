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
