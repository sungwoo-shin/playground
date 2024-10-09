export const vanillaIntersectionObserverV2 = (
  $elems: HTMLElement[],
  options: IntersectionObserverInit,
  callback: (entries: IntersectionObserverEntry[]) => void,
) => {
  const entriesState: Map<Element, IntersectionObserverEntry> = new Map();

  const handleIntersect = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const $item = entry.target;
      entriesState.set($item, entry);
    });
    callback(
      Array.from(entriesState.values()).filter((entry) => entry.isIntersecting),
    );
  };
  const observer = new IntersectionObserver(handleIntersect, options);

  $elems.forEach(($elem) => $elem && observer.observe($elem));

  return observer;
};
