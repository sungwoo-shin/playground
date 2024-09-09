import { useEffect, useRef } from "react";

import { useIntersectionObserver } from "#/hooks/useIntersectionObserver";
import { useInfiniteFetch } from "./useInfiniteFetcher";

const ioOptions = { threshold: 1 };

export const useInfiniteScroll = () => {
  const { data, state, fetchNextPage } = useInfiniteFetch();
  const sensorRef = useRef<HTMLDivElement>(null);
  const {
    ioEntries: [entry],
  } = useIntersectionObserver(sensorRef, ioOptions);

  const isIntersecting = entry?.isIntersecting;

  useEffect(() => {
    if (isIntersecting) {
      fetchNextPage();
    }
  }, [fetchNextPage, isIntersecting]);

  return { data, state, sensorRef };
};
