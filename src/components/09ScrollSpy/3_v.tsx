import { vanillaIntersectionObserverV2 } from "#/hooks/vanilla/intersectionObserverV2";
import { VanillaWrapper } from "../vanillaWrapper";
import cx from "./cx";
import data from "./data";

const HeaderHeight = 60;

const generateListItem = ({
  id,
  title,
  description,
  index,
}: {
  id: string;
  title: string;
  description: string;
  index: number;
}) => {
  const elem = document.createElement("li");
  elem.id = id;
  elem.setAttribute("data-index", `${index}`);
  elem.insertAdjacentHTML(
    "afterbegin",
    `<p><strong>${index + 1}. ${title}</strong></p>
    <div>
    ${description
      .split("\r\n")
      .map((line) => `<p>${line}</p>`)
      .join("")}
    </div>`,
  );

  return elem;
};

const IOOptions: IntersectionObserverInit = {
  rootMargin: `-${HeaderHeight}px 0% 0% 0%`,
  threshold: [0.5, 1],
};

const initiator = (wrapper: HTMLDivElement) => {
  let curIdx = 0;

  const $header = document.createElement("header");
  $header.classList.add(cx("floatingHeader"));
  $header.insertAdjacentHTML(
    "afterbegin",
    `<h3 class="${cx("title")}">스크롤 스파이 #3. Vanilla - IntersectionObserver`,
  );

  const $navList = document.createElement("ul");
  $navList.classList.add(cx("nav"));
  const $navItems = data.map((_, i) => {
    const $button = document.createElement("button");
    $button.textContent = `${i + 1}`;

    const $navItem = document.createElement("li");
    $navItem.classList.add(cx("navItem"));
    $navItem.setAttribute("data-index", `${i}`);
    $navItem.append($button);

    return $navItem;
  });
  $navList.append(...$navItems);
  $header.append($navList);

  const $list = document.createElement("ul");
  const $items = data.map(({ description, id, title }, i) =>
    generateListItem({
      description,
      id,
      title,
      index: i,
    }),
  );
  $list.append(...$items);

  /**
   * composedPath 매서드를 통한 DOM 탐색
   */
  const handleNavClick = (event: Event) => {
    const path = event.composedPath() as HTMLElement[];
    const $li = path.find((elem) => elem.localName === "li");
    const index = +($li?.dataset.index || 0);

    const { scrollTop } = document.scrollingElement!;
    const itemTop = $items[index]?.getBoundingClientRect().top || 0;
    const top = scrollTop + itemTop - HeaderHeight;
    window.scrollTo({
      top,
      behavior: "smooth",
    });
  };
  $navList.addEventListener("click", handleNavClick);

  const handleIntersect = (
    intersectingEntries: IntersectionObserverEntry[],
  ) => {
    const $target = intersectingEntries[0]?.target as HTMLElement;
    const idx = $target?.dataset.index;

    if (typeof idx === "string") {
      curIdx = parseInt(idx, 10);
      $navItems.forEach(($elem, i) => {
        $elem.classList.toggle(cx("current"), i === curIdx);
      });
      $navItems[curIdx]?.scrollIntoView({
        block: "nearest",
        inline: "center",
        behavior: "instant",
      });
    }
  };
  vanillaIntersectionObserverV2($items, IOOptions, handleIntersect);

  wrapper.classList.add(cx("ScrollSpy"));
  wrapper.append($header, $list);
};

export function ScrollSpy3V() {
  return <VanillaWrapper initiator={initiator} />;
}
