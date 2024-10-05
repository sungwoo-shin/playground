import { RefObject, useEffect, useRef } from "react";

type Elem = Element | null;

export const useIntersectionObserverV2 = (
  elemsRef: RefObject<Elem | Elem[]>,
  stableOnIntersect: (intersectingEntries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit,
) => {
  const ioRef = useRef<IntersectionObserver>();

  useEffect(() => {
    const elems = elemsRef.current;

    const handleIntersect: IntersectionObserverCallback = (
      entries: IntersectionObserverEntry[],
    ) => {
      // setIntersectingEntries((prev) =>
      //   Array.from(
      //     // 중복 제거 / 최신정보 업데이트 => Map 사용 (덮어쓰기)
      //     new Map(
      //       prev.concat(entries).map((entry) => [entry.target, entry]),
      //     ).values(),
      //   ).filter((entry) => entry.isIntersecting),
      // );

      stableOnIntersect(entries.filter((entry) => entry.isIntersecting));
    };

    const io = new IntersectionObserver(handleIntersect, options);
    ioRef.current = io;

    if (Array.isArray(elems)) {
      elems.forEach((elem) => elem && io.observe(elem));
    } else if (elems) {
      io.observe(elems);
    }

    return () => {
      io.disconnect();
    };
  }, [elemsRef, stableOnIntersect, options]);

  return {
    ioRef,
  };
};
