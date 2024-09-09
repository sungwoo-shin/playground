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
export type State<T> = {
  data: T[][];
  state: "loading" | "fetched" | "idle" | "error";
};

const generatePageData = async () => {
  const randomData = pickRandom(data, 20);
  await waitFor(getRandomStepNumber(300, 1500, 50));

  return randomData;
};

const infinitePageFetcher = async (
  callback: (state: FetchState, data?: Datum[]) => void,
) => {
  callback("loading");
  const nextPageData = await generatePageData();
  callback("fetched", nextPageData);
};

export default infinitePageFetcher;
