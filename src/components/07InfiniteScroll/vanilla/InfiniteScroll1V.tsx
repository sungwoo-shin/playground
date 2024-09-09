import { VanillaWrapper } from "#/components/vanillaWrapper";
import { vanillaIntersectionObserver } from "#/hooks/vanilla/intersectionObserver";
import { pickRandom } from "#/utils/pickRandom";
import { getRandomStepNumber } from "#/utils/randomize";
import { waitFor } from "#/utils/util";
import { cx } from "../cx";
import { data } from "../data";

type Datum = {
  index: number;
  id: string;
  title: string;
  description: string;
};

type FetchState = "loading" | "fetched" | "idle" | "error";

const getRandomPageData = async () => {
  await waitFor(getRandomStepNumber(300, 1500, 50));
  const randomPageData = pickRandom(data, 20);

  return randomPageData;
};

const infinitePageFetcher = async (
  callback: (state: FetchState, data?: Datum[]) => void,
) => {
  callback("loading");
  const nextPageData = await getRandomPageData();
  callback("fetched", nextPageData);
};

const generateListItem = (
  number: number,
  title: string,
  description: string,
) => {
  const $li = document.createElement("li");
  $li.insertAdjacentHTML(
    "beforeend",
    `
  <p><strong>${number}. ${title}</strong></p>
  <div>${description}</div>
  `,
  );

  return $li;
};

const initiator = (wrapper: HTMLDivElement) => {
  const $sensor = document.createElement("div");
  const $list = document.createElement("ul");
  const $spinner = document.createElement("div");
  $spinner.classList.add(cx("spinner"));

  let prevState: FetchState = "idle";
  let page = 0;

  const handleFetch = (state: FetchState, nextData?: Datum[]) => {
    if (prevState === state) {
      return;
    }
    prevState = state;

    if (state === "loading") {
      wrapper.insertAdjacentElement("beforeend", $spinner);
    } else {
      $spinner.remove();
    }

    if (state === "fetched" && nextData) {
      page += 1;
      const list = nextData.map((item, i) =>
        generateListItem((page - 1) * 20 + i + 1, item.title, item.description),
      );
      $list.append(...list);
    }
  };

  const handleIntersect = ([entry]: IntersectionObserverEntry[] = []) => {
    const isIntersecting = entry?.isIntersecting;
    if (isIntersecting && prevState !== "loading") {
      infinitePageFetcher(handleFetch);
    }
  };

  wrapper.append($list, $sensor);
  vanillaIntersectionObserver($sensor, { threshold: 1 }, handleIntersect);
};

export function InfiniteScroll1V() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <h2>무한스크롤</h2>
      <h3>#2. Vanilla</h3>
      <VanillaWrapper initiator={initiator} />
    </div>
  );
}
