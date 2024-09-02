import { useCallback, useEffect, useRef, useState } from "react";

import useIntersectionObserver from "#/hook/useIntersectionObserverV2";
import ScrollBox, { ScrollBoxHandle } from "../08_scrollBox/react/scrollBox";
import cx from "./cx";
import data from "./data";

const HeaderHeight = 60;

function NavItem({
  index,
  handleClick,
}: {
  index: number;
  handleClick?: () => void;
}) {
  // eslint-disable-next-line react/button-has-type
  return <button onClick={handleClick}>{index + 1}</button>;
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
  rootMargin: `-${HeaderHeight}px 0% 0% 0%`,
  threshold: [0.5, 1],
};

type Elem = HTMLElement | null;
function ScrollSpy4() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollboxRef = useRef<ScrollBoxHandle>();
  const itemsRef = useRef<Elem[]>([]);
  const { entries } = useIntersectionObserver(itemsRef, IOOptions);

  const setCurrentItem = useCallback((index: number) => {
    setCurrentIndex(index);
    scrollboxRef.current?.scrollFocus(index);
  }, []);

  const handleNavClick = useCallback(
    (item: unknown, index: number) => () => {
      const { scrollTop } = document.scrollingElement!;
      const itemY = itemsRef.current[index]?.getBoundingClientRect().top || 0;
      const top = scrollTop + itemY - HeaderHeight;
      window.scrollTo({
        top,
        behavior: "smooth",
      });
    },
    [],
  );

  useEffect(() => {
    itemsRef.current = data.map((d) => document.getElementById(d.id));
  }, []);

  useEffect(() => {
    const entryIndexes = entries.map(
      (e) => +((e.target as HTMLElement).dataset.index || 0),
    );
    const minIndex = Math.min(...entryIndexes);
    const $target = entries.find(
      (e) => +((e.target as HTMLElement).dataset.index || 0) === minIndex,
    )?.target as HTMLElement;
    const index = $target?.dataset.index;
    if (typeof index === "string") {
      setCurrentItem(+index);
    }
  }, [entries]);

  return (
    <div className={cx("ScrollSpy")}>
      <header className={cx("floatingHeader")}>
        <h3 className={cx("title")}>
          스크롤 스파이 #4. React <sub>IO + ScrollBox</sub>
        </h3>

        <ScrollBox
          ref={scrollboxRef}
          list={data}
          Item={NavItem}
          handleItemClick={handleNavClick}
          currentIndex={currentIndex}
          wrapperClassName={cx("nav", "with-scrollbox")}
        />
      </header>
      <ul>
        {data.map((item) => (
          <ListItem {...item} index={item.index} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

export default ScrollSpy4;
