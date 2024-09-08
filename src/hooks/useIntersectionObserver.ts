import { RefObject, useEffect, useRef, useState } from "react";

import { assertIsDefined } from "#/utils/assetIsDefined";

export const useIntersectionObserver = (
  target: RefObject<HTMLElement>,
  stableOptions?: IntersectionObserverInit,
) => {
  const ioRef = useRef<IntersectionObserver>();
  const [ioEntries, setIoEntries] = useState<IntersectionObserverEntry[]>([]);

  useEffect(() => {
    const targetElem = target.current;
    assertIsDefined(targetElem);

    ioRef.current = new IntersectionObserver(setIoEntries, stableOptions);

    ioRef.current.observe(targetElem);

    return () => {
      ioRef.current?.disconnect();
    };
  }, [target, stableOptions]);

  return {
    ioEntries,
    ioRef,
  };
};
