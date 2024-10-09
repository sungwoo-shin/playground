import { useCallback, useEffect, useRef, useState } from "react";

import {
  useViewportRect,
  ViewportRectContextProvider,
} from "#/contexts/ViewportRectContextProvider";
import { assertIsDefined } from "#/utils/assetIsDefined";
import cx from "./cx";
import data from "./data";

const HeaderHeight = 60;

function ListItem({
  id,
  number,
  title,
  description,
}: {
  id: string;
  number: number;
  title: string;
  description: string;
}) {
  return (
    <li id={id} data-number={number}>
      <p>
        <strong>
          {number}. {title}
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

function ScrollSpy() {
  const { top: viewportTop } = useViewportRect();
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsRef = useRef<
    ({
      index: number;
      top: number;
      height: number;
      elem: HTMLElement;
    } | null)[]
  >([]);
  const navsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const handleResize = () => {
      assertIsDefined(document.scrollingElement);
      const { scrollTop } = document.scrollingElement;

      itemsRef.current = data.map(({ id }, i) => {
        const $item = document.getElementById(id);
        assertIsDefined($item);
        const { top, height } = $item.getBoundingClientRect();

        return { elem: $item, top: top + scrollTop, height, index: i };
      });
    };

    const resizeObserver = new ResizeObserver(handleResize);
    assertIsDefined(document.scrollingElement);
    resizeObserver.observe(document.scrollingElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const scrollTop = viewportTop * -1;
    const target = itemsRef.current.find(
      (item) =>
        item &&
        scrollTop >= item.top - HeaderHeight - item.height / 2 &&
        scrollTop < item.top - HeaderHeight + item.height / 2,
    );

    if (target) {
      setCurrentIndex(target.index);
      navsRef.current[target.index]?.scrollIntoView({
        block: "nearest",
        inline: "center",
        behavior: "instant",
      });
    }
  }, [viewportTop]);

  const handleNavClick = useCallback((index: number) => {
    const itemY = (itemsRef.current[index]?.top || 0) - HeaderHeight;
    window.scrollTo({
      top: itemY,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className={cx("ScrollSpy")}>
      <header className={cx("floatingHeader")}>
        <h3 className={cx("title")}>스크롤 스파이 #1. React - scroll event</h3>
        <ul className={cx("nav")}>
          {data.map(({ index, id }) => (
            <li
              className={cx("navItem", { current: currentIndex === index })}
              key={id}
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
            number={index + 1}
          />
        ))}
      </ul>
    </div>
  );
}

export function ScrollSpy1() {
  return (
    <ViewportRectContextProvider>
      <ScrollSpy />
    </ViewportRectContextProvider>
  );
}
