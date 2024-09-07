import { useEffect, useRef } from "react";

import useIntersectionObserver from "#/hooks/useIntersectionObserver";
import useInfiniteFetcher from "./useInfiniteFetcher";

const ioOptions = { threshold: 1 };

const useInfiniteScroll = () => {
  const { data, state, fetchNextPage } = useInfiniteFetcher();
  const moreRef = useRef<HTMLDivElement>(null);
  const {
    entries: [entry],
  } = useIntersectionObserver(moreRef, ioOptions);
  const isIntersecting = entry?.isIntersecting;

  useEffect(() => {
    if (isIntersecting) {
      fetchNextPage();
    }
  }, [isIntersecting]);

  return { data, state, moreRef };
};

export default useInfiniteScroll;
