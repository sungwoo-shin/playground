import { useCallback, useEffect, useRef, useState } from "react";

import { useIntersectionObserverV2 } from "#/hooks/useIntersectionObserverV2";
import {
  ForwardedScrollBox,
  TScrollBoxHandle,
} from "../08ScrollBox/react/scrollBox";
import cx from "./cx";
import data from "./data";

const HEADER_HEIGHT_PX = 60;

function NavItem({
  index,
  handleClick,
}: {
  index: number;
  handleClick?: () => void;
}) {
  return (
    <button type="button" onClick={handleClick}>
      {index + 1}
    </button>
  );
}

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
  rootMargin: `-${HEADER_HEIGHT_PX}px 0% 0% 0%`,
  threshold: [0.5, 1],
};

type TElem = HTMLElement | null;

export function ScrollSpy4R() {
  const [curIdx, setCurIdx] = useState(0);
  const scrollboxRef = useRef<TScrollBoxHandle>();
  const itemsRef = useRef<TElem[]>([]);

  useEffect(() => {
    itemsRef.current = data.map((d) => document.getElementById(d.id));
  }, []);

  const stableHandleIntersect = useCallback(
    (intersectingEntries: IntersectionObserverEntry[]) => {
      const $target = intersectingEntries.at(0)?.target as HTMLElement;
      const idx = $target?.dataset.index;

      if (typeof idx === "string") {
        const parsedIdx = parseInt(idx, 10);
        setCurIdx(parsedIdx);
        scrollboxRef.current?.scrollIntoIdx(parsedIdx);
      }
    },
    [],
  );
  useIntersectionObserverV2(itemsRef, stableHandleIntersect, IOOptions);

  const handleNavClick = useCallback(
    (item: unknown, index: number) => () => {
      const { scrollTop } = document.scrollingElement!;
      const itemTop =
        itemsRef.current.at(index)?.getBoundingClientRect().top || 0;
      const top = scrollTop + itemTop - HEADER_HEIGHT_PX;
      window.scrollTo({
        top,
        behavior: "smooth",
      });
    },
    [],
  );

  return (
    <div className={cx("ScrollSpy")}>
      <header className={cx("floatingHeader")}>
        <h3 className={cx("title")}>
          스크롤 스파이 #4. React - IO + ScrollBox
        </h3>

        <ForwardedScrollBox
          ref={scrollboxRef}
          list={data}
          Item={NavItem}
          onItemClick={handleNavClick}
          currentIndex={curIdx}
          wrapperClassName={cx("nav", "with-scrollbox")}
        />
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
