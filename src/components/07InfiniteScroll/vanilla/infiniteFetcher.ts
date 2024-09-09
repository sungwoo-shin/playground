import { pickRandom } from "#/utils/pickRandom";
import { getRandomStepNumber } from "#/utils/randomize";
import { waitFor } from "#/utils/util";
import { data } from "../data";

export type Datum = {
  index: number;
  id: string;
  title: string;
  description: string;
};
export type FetchState = "loading" | "fetched" | "idle" | "error";

const getRandomPageData = async () => {
  await waitFor(getRandomStepNumber(300, 1500, 50));
  const randomPageData = pickRandom(data, 20);

  return randomPageData;
};

export const infinitePageFetcher = async (
  callback: (state: FetchState, data?: Datum[]) => void,
) => {
  callback("loading");
  const nextPageData = await getRandomPageData();
  callback("fetched", nextPageData);
};
