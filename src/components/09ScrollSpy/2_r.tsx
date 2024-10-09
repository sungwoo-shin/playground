import { useCallback, useEffect, useRef, useState } from "react";

import { useIntersectionObserverV2 } from "#/hooks/useIntersectionObserverV2";
import { assertIsDefined } from "#/utils/assetIsDefined";
import cx from "./cx";
import data from "./data";

const HeaderHeight = 60;

function ListItem({
  id,
  index,
  title,
  description,
}: {
  id: string;
  index: number;
  title: string;
  description: string;
}) {
  return (
    <li id={id} data-index={index}>
      <p>
        <strong>
          {index + 1}. {title}
        </strong>
      </p>
      <div>
        {description.split("\r\n").map((line, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <p key={i}>{line}</p>
        ))}
      </div>
    </li>
  );
}

const IOOptions: IntersectionObserverInit = {
  rootMargin: `-${HeaderHeight}px 0% 0% 0%`,
  threshold: [0.5, 1],
};

type TElem = HTMLElement | null;

export function ScrollSpy2() {
  const [curIdx, setCurIdx] = useState(0);
  const navsRef = useRef<TElem[]>([]);
  const itemsRef = useRef<TElem[]>([]);

  useEffect(() => {
    itemsRef.current = data.map((d) => document.getElementById(d.id));
  }, []);

  const stableHandleIntersect = useCallback(
    (intersectingEntries: IntersectionObserverEntry[]) => {
      const intersectingEntryTops = intersectingEntries.map(
        (intersectingEntry) => intersectingEntry.boundingClientRect.top,
      );
      const minTop = Math.min(...intersectingEntryTops);
      const $target = intersectingEntries.find(
        (intersectingEntry) =>
          intersectingEntry.boundingClientRect.top === minTop,
      )?.target as HTMLElement;
      const index = $target?.dataset.index;

      if (typeof index === "string") {
        const parsedIdx = parseInt(index, 10);
        setCurIdx(parsedIdx);
        navsRef.current.at(parsedIdx)?.scrollIntoView({
          block: "nearest",
          inline: "center",
          behavior: "instant",
        });
      }
    },
    [],
  );
  useIntersectionObserverV2(itemsRef, stableHandleIntersect, IOOptions);

  const handleNavClick = (idx: number) => {
    assertIsDefined(document.scrollingElement);
    const { scrollTop } = document.scrollingElement;

    const itemY = itemsRef.current[idx]?.getBoundingClientRect().top || 0;
    const top = scrollTop + itemY - HeaderHeight;
    window.scrollTo({
      top,
      behavior: "smooth",
    });
  };

  return (
    <div className={cx("ScrollSpy")}>
      <header className={cx("floatingHeader")}>
        <h3 className={cx("title")}>
          스크롤 스파이 #2. React - IntersectionObserver
        </h3>
        <ul className={cx("nav")}>
          {data.map(({ index, id }) => (
            <li
              key={id}
              className={cx("navItem", { current: curIdx === index })}
              ref={(r) => {
                navsRef.current[index] = r;
              }}
            >
              <button type="button" onClick={() => handleNavClick(index)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </header>
      <ul>
        {data.map(({ description, id, index, title }) => (
          <ListItem
            key={id}
            description={description}
            id={id}
            title={title}
            index={index}
          />
        ))}
      </ul>
    </div>
  );
}
