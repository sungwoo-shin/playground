import { VanillaWrapper } from "#/components/vanillaWrapper";
import { vanillaIntersectionObserver } from "#/hooks/vanilla/intersectionObserver";
import { cx } from "../cx";
import { Datum, FetchState, infinitePageFetcher } from "./infiniteFetcher";

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

  const handleFetch = (state: FetchState, data?: Datum[]) => {
    if (prevState === state) {
      return;
    }
    prevState = state;

    if (state === "loading") {
      wrapper.insertAdjacentElement("beforeend", $spinner);
    } else {
      $spinner.remove();
    }

    if (state === "fetched" && data) {
      page += 1;
      const list = data.map((item, i) =>
        generateListItem((page - 1) * 20 + i + 1, item.title, item.description),
      );
      $list.append(...list);
    }
  };

  const handleIntersect = ([entry]: IntersectionObserverEntry[] = []) => {
    const { isIntersecting } = entry;
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
