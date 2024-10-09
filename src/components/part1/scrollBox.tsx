/* eslint-disable react/button-has-type */
import {
  ForwardedRef,
  forwardRef,
  Ref,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import classNames from "classnames/bind";

import { useIntersectionObserverV2 } from "#/hooks/useIntersectionObserverV2";
import styles from "./scrollBox.module.scss";

const cx = classNames.bind(styles);

type Direction = "prev" | "next";
type ItemElemType = HTMLLIElement | null;
const DefaultButtonState = { prev: true, next: true };

const getVisibileEdgeItems = (
  $list: HTMLUListElement,
  $items: ItemElemType[],
) => {
  const { left: lLeft, right: lRight } = $list.getBoundingClientRect();
  const isVisible = ($item: ItemElemType) => {
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

export type ScrollBoxHandle =
  | {
      scrollFocus: (index: number, behavior?: "instant" | "smooth") => void;
    }
  | null
  | undefined;

type ScrollBoxProps<T> = {
  list: T[];
  Item: (props: T & { handleClick?: () => void }) => JSX.Element;
  currentIndex?: number;
  wrapperClassName?: string;
  handleItemClick?: (item: T, index: number) => () => void;
};

function ScrollBox<T extends { id: string }>(
  {
    list,
    Item,
    currentIndex = 0,
    wrapperClassName = "",
    handleItemClick,
  }: ScrollBoxProps<T>,
  ref: ForwardedRef<unknown>,
) {
  const [buttonEnabled, setButtonEnabled] = useState<{
    prev: boolean;
    next: boolean;
  }>(DefaultButtonState);
  const listRef = useRef<HTMLUListElement>(null);
  const itemsRef = useRef<ItemElemType[]>([]);
  const watchersRef = useRef<ItemElemType[]>([]);

  const stableHandleIntersect = useCallback(
    (intersectingWatcherEntries: IntersectionObserverEntry[]) => {
      if (!intersectingWatcherEntries.length) {
        setButtonEnabled(DefaultButtonState);
      }
      setButtonEnabled(() => {
        const newState = { ...DefaultButtonState };
        intersectingWatcherEntries.forEach((e) => {
          const direction = (e.target as HTMLLIElement).dataset
            .direction as Direction;
          newState[direction] = false;
        });

        return newState;
      });
    },
    [],
  );
  useIntersectionObserverV2(watchersRef, stableHandleIntersect);

  const scrollFocus = useCallback(
    (index: number, behavior: "instant" | "smooth" = "instant") => {
      itemsRef.current[index]?.scrollIntoView({
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
      scrollFocus,
    }),
    [],
  );

  const move = useCallback((direction: Direction) => {
    if (!listRef.current || !itemsRef.current.length) {
      return;
    }
    const { left, right } = getVisibileEdgeItems(
      listRef.current,
      itemsRef.current,
    );
    const elem = direction === "prev" ? left : right; // 보여지는 맨 끝 아이템!
    elem?.scrollIntoView({
      inline: direction === "prev" ? "end" : "start", // 가로위치 'start' | 'end' | 'nearest' | 'center'
      block: "nearest", // 세로위치 'start' | 'end' | 'nearest' | 'center'
      behavior: "smooth", // 애니메이션 유무. smooth: O / instant: X / auto: 알아서...
    });
  }, []);

  return (
    <div className={cx("scrollBox", wrapperClassName)}>
      <ul className={cx("list")} ref={listRef}>
        <li
          className={cx("observer")}
          ref={(r) => {
            watchersRef.current[0] = r;
          }}
          data-direction="prev"
        />
        {list.map((item, i) => (
          <li
            key={item.id}
            className={cx("item", { current: currentIndex === i })}
            ref={(r) => {
              itemsRef.current[i] = r;
            }}
          >
            <Item {...item} handleClick={handleItemClick?.(item, i)} />
          </li>
        ))}
        <li
          className={cx("observer")}
          ref={(r) => {
            watchersRef.current[1] = r;
          }}
          data-direction="next"
        />
      </ul>
      <button
        className={cx("nav-button", "prev", { on: buttonEnabled.prev })}
        onClick={() => move("prev")}
      />
      <button
        className={cx("nav-button", "next", { on: buttonEnabled.next })}
        onClick={() => move("next")}
      />
    </div>
  );
}

const ForwardedScrollBox = forwardRef(ScrollBox) as <T extends { id: string }>(
  props: ScrollBoxProps<T> & { ref: Ref<ScrollBoxHandle> },
) => JSX.Element;

export default ForwardedScrollBox;
