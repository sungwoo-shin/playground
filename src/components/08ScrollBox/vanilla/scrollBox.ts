import { buildLazyImg } from "#/components/06LazyLoading/2_v/LazyLoad2V";
import { vanillaIntersectionObserverV2 } from "#/hooks/vanilla/intersectionObserverV2";
import cx from "../cx";
import data from "../data";

type TDirection = "prev" | "next";
type TItemElem = HTMLLIElement | null;
type TShowNavButton = Record<TDirection, boolean>;

const defaultShowNavButton: TShowNavButton = { prev: true, next: true };

const generateListItem = ({
  description,
  imgUrl,
}: {
  id: string;
  description: string;
  imgUrl: string;
}) => {
  const $div = document.createElement("div");
  const $lazyImage = buildLazyImg(imgUrl, 250, 400);
  const $span = document.createElement("span");
  $span.textContent = description;
  $div.append($lazyImage, $span);

  return $div;
};

const getVisibileEdgeItems = ($list: HTMLUListElement, $items: TItemElem[]) => {
  const { left: lLeft, right: lRight } = $list.getBoundingClientRect();
  const isVisible = ($item: TItemElem) => {
    const { left, right } = $item?.getBoundingClientRect() || {
      left: 0,
      right: 0,
    };

    // 전부 화면상에 존재하는 조건: left >= lLeft && right <= lRight
    // 애매하게 걸친 경우까지 인정하는 조건: left <=lRight && right >= lLeft
    return left <= lRight && right >= lLeft; // 애매하게 보이는 경우까지 모두 포함시킴.
  };
  const leftIndex = Math.max($items.findIndex(isVisible), 0);
  const rightIndex = Math.min(
    $items.findLastIndex(isVisible),
    $items.length - 1,
  );

  return { left: $items[leftIndex], right: $items[rightIndex] };
};

export const vanillaScrollBox = () => {
  const setButtonEnabled = (state: TShowNavButton) => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    $prevBtn.classList.toggle(cx("on"), state.prev);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    $nextBtn.classList.toggle(cx("on"), state.next);
  };

  const move = (direction: TDirection) => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const { left, right } = getVisibileEdgeItems($list, $items);
    const elem = direction === "prev" ? left : right; // 보여지는 맨 끝 아이템!
    elem?.scrollIntoView({
      inline: direction === "prev" ? "end" : "start", // 가로위치 'start' | 'end' | 'nearest' | 'center'
      block: "nearest", // 세로위치 'start' | 'end' | 'nearest' | 'center'
      behavior: "smooth", // 애니메이션 유무. smooth: O / instant: X / auto: 알아서...
    });
  };

  const $list = document.createElement("ul");
  $list.classList.add(cx("list"));

  const $prevObserver = document.createElement("li");
  $prevObserver.classList.add(cx("observer"));
  $prevObserver.setAttribute("data-direction", "prev");

  const $nextObserver = document.createElement("li");
  $nextObserver.classList.add(cx("observer"));
  $nextObserver.setAttribute("data-direction", "next");

  const $items = data.map((item) => {
    const $item = document.createElement("li");
    $item.classList.add(cx("item"));
    $item.append(generateListItem(item));

    return $item;
  });
  $list.append($prevObserver, ...$items, $nextObserver);

  const $prevBtn = document.createElement("button");
  $prevBtn.classList.add(cx("nav-button"), cx("prev"));
  $prevBtn.addEventListener("click", () => move("prev"));

  const $nextBtn = document.createElement("button");
  $nextBtn.classList.add(cx("nav-button"), cx("next"));
  $nextBtn.addEventListener("click", () => move("next"));

  const $container = document.createElement("div");
  $container.classList.add(cx("scrollBox"));
  $container.append($list, $prevBtn, $nextBtn);

  vanillaIntersectionObserverV2(
    [$prevObserver, $nextObserver],
    {},
    (entries) => {
      if (!entries.length) {
        setButtonEnabled(defaultShowNavButton);
      }
      const newState = { ...defaultShowNavButton };
      entries.forEach((e) => {
        const direction = (e.target as HTMLLIElement).dataset
          .direction as TDirection;
        newState[direction] = false;
      });
      setButtonEnabled(newState);
    },
  );

  return $container;
};
