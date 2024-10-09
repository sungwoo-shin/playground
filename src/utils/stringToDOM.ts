export const stringToDOM = (text: string) =>
  new DOMParser().parseFromString(text, "text/html").body.children[0];
