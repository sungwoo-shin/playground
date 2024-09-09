export const vanillaIntersectionObserver = (
  $elem: HTMLElement,
  options: IntersectionObserverInit,
  callback: (entries: IntersectionObserverEntry[]) => void,
) => {
  const observer = new IntersectionObserver(callback, options);
  observer.observe($elem);

  return observer;
};
