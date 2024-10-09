import { useCallback, useState } from "react";

import { pickRandom } from "#/utils/pickRandom";
import { getRandomStepNumber } from "#/utils/randomize";
import { waitFor } from "#/utils/waitFor";
import { data } from "../components/07InfiniteScroll/data";

type Datum = {
  index: number;
  id: string;
  title: string;
  description: string;
};

export type TState<T> = {
  data: T[][];
  state: "loading" | "fetched" | "idle" | "error";
};

const getRandomPageData = async () => {
  await waitFor(getRandomStepNumber(300, 1500, 50));
  const randomPageData = pickRandom(data, 20);

  return randomPageData;
};

/**
 * [[20개], [20개], [20개]...]
 */
export const useInfiniteFetch = () => {
  const [res, setRes] = useState<TState<Datum>>({
    state: "idle",
    data: [],
  });

  const fetchNextPage = useCallback(async () => {
    setRes((prev) => ({
      ...prev,
      state: "loading",
    }));

    const nextPageData = await getRandomPageData();

    setRes((prev) => ({
      data: [...prev.data, nextPageData],
      state: "fetched",
    }));
  }, []);

  return {
    ...res,
    fetchNextPage,
  };
};
