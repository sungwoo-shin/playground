import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { useIntersectionObserverV2 } from "#/hooks/useIntersectionObserverV2";
import { assertIsDefined } from "#/utils/assetIsDefined";
import cx from "../cx";

type TDirection = "prev" | "next";
type TItemElem = HTMLLIElement | null;

const defaultShowNavButton = { prev: true, next: true };

// 화면상에 들어온 항목 계산
const getVisibleEdgeItems = ($list: HTMLUListElement, $items: TItemElem[]) => {
  const { left: listLeft, right: listRight } = $list.getBoundingClientRect();

  const isItemVisible = ($item: TItemElem) => {
    const { left: itemLeft, right: itemRight } =
      $item?.getBoundingClientRect() || {
        left: 0,
        right: 0,
      };

    // 완전히 화면상에 들어온 경우: itemLeft >= listLeft && itemRight <= listRight
    // 화면상에 걸쳐서 들어온 경우 포함: itemLeft <= listRight && itemRight >= listLeft
    return itemLeft <= listRight && itemRight >= listLeft;
  };

  const leftEdgeItemIdx = Math.max($items.findIndex(isItemVisible), 0);
  const rightEdgeItemIdx = Math.min(
    $items.findLastIndex(isItemVisible),
    $items.length - 1,
  );

  return {
    leftEdgeItem: $items[leftEdgeItemIdx],
    rightEdgeItem: $items[rightEdgeItemIdx],
  };
};

type TScrollBoxHandle =
  | {
      scrollIntoIdx: (index: number, behavior?: "instant" | "smooth") => void;
    }
  | null
  | undefined;

type TProps<T> = {
  list: T[];
  Item: (props: T & { onClick?: () => void }) => JSX.Element;
  currentIndex?: number;
  wrapperClassName?: string;
  onItemClick?: (item: T, index: number) => () => void;
};

/**
 * 목록 데이터와 아이템 컴포넌트를 별도의 props로 받는 패턴
 */
function ScrollBox<T extends { id: string }>(
  {
    list,
    Item,
    currentIndex = 0,
    wrapperClassName = "",
    onItemClick,
  }: TProps<T>,
  ref: React.ForwardedRef<unknown>,
) {
  const [showShowNavButton, setShowNavButton] = useState<{
    prev: boolean;
    next: boolean;
  }>(defaultShowNavButton);
  const listRef = useRef<HTMLUListElement>(null);
  const itemsRef = useRef<TItemElem[]>([]);
  const watchersRef = useRef<TItemElem[]>([]);

  const scrollIntoIdx = useCallback(
    (idx: number, behavior: "instant" | "smooth" = "instant") => {
      itemsRef.current[idx]?.scrollIntoView({
        block: "nearest",
        inline: "center",
        behavior,
      });
    },
    [],
  );
  useImperativeHandle(
    ref,
    () => ({
      scrollIntoIdx,
    }),
    [scrollIntoIdx],
  );

  const stableHandleIntersect = useCallback(
    (intersectingWatcherEntries: IntersectionObserverEntry[]) => {
      if (!intersectingWatcherEntries.length) {
        setShowNavButton(defaultShowNavButton);
      }

      setShowNavButton(() => {
        const newState = { ...defaultShowNavButton };

        intersectingWatcherEntries.forEach((entry) => {
          const direction = (entry.target as HTMLLIElement).dataset
            .direction as TDirection;
          newState[direction] = false;
        });

        return newState;
      });
    },
    [],
  );
  useIntersectionObserverV2(watchersRef, stableHandleIntersect);

  const handleNavBtnClick = (direction: TDirection) => {
    assertIsDefined(listRef.current);
    assertIsDefined(itemsRef.current);

    const { leftEdgeItem, rightEdgeItem } = getVisibleEdgeItems(
      listRef.current,
      itemsRef.current,
    );
    const targetElem = direction === "prev" ? leftEdgeItem : rightEdgeItem;
    targetElem?.scrollIntoView({
      inline: direction === "prev" ? "end" : "start",
      block: "nearest",
      behavior: "smooth",
    });
  };

  return (
    <div className={cx("scrollBox", wrapperClassName)}>
      <ul className={cx("list")} ref={listRef}>
        <li
          className={cx("observer")}
          ref={(prevObserverRef) => {
            watchersRef.current[0] = prevObserverRef;
          }}
          data-direction="prev"
        />
        {list.map((itemProps, i) => (
          <li
            key={itemProps.id}
            className={cx("item", { current: currentIndex === i })}
            ref={(itemRef) => {
              itemsRef.current[i] = itemRef;
            }}
          >
            <Item {...itemProps} onClick={onItemClick?.(itemProps, i)} />
          </li>
        ))}
        <li
          className={cx("observer")}
          ref={(nextObserverRef) => {
            watchersRef.current[1] = nextObserverRef;
          }}
          data-direction="next"
        />
      </ul>

      <button
        type="button"
        className={cx("nav-button", "prev", { on: showShowNavButton.prev })}
        onClick={() => handleNavBtnClick("prev")}
      />
      <button
        type="button"
        className={cx("nav-button", "next", { on: showShowNavButton.next })}
        onClick={() => handleNavBtnClick("next")}
      />
    </div>
  );
}

export const ForwardedScrollBox = forwardRef(ScrollBox) as <
  T extends { id: string },
>(
  props: TProps<T> & { ref: React.Ref<TScrollBoxHandle> },
) => JSX.Element;
