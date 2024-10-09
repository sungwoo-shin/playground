import { RefObject, useEffect, useRef } from "react";

import { assertIsDefined } from "#/utils/assetIsDefined";

type Elem = Element | null;

export const useIntersectionObserverV2 = (
  elemsRef: RefObject<Elem[]>,
  stableOnIntersect: (intersectingEntries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit,
) => {
  const ioRef = useRef<IntersectionObserver>();

  useEffect(() => {
    const elems = elemsRef.current;
    assertIsDefined(elems);

    const io = new IntersectionObserver((entries) => {
      stableOnIntersect(entries.filter((entry) => entry.isIntersecting));
    }, options);
    ioRef.current = io;

    elems.forEach((elem) => elem && io.observe(elem));

    return () => {
      io.disconnect();
    };
  }, [elemsRef, stableOnIntersect, options]);

  return {
    ioRef,
  };
};
