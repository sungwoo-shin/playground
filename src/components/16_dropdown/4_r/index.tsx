/* eslint-disable react/button-has-type */
import { KeyboardEvent, ReactNode, RefObject, useRef } from "react";
import { createPortal } from "react-dom";

import useStyleInView from "#/hook/useStyleInView";
import cx from "../cx";
import data from "../data";
import useDropdown, {
  DropdownItemProps,
  DropdownListProps,
  DropdownTriggerProps,
} from "./useDropdown";

type DropdownItemType = {
  id: string;
  text: string;
};

function DDTrigger({
  selectedItem,
  toggle,
}: DropdownTriggerProps<DropdownItemType>) {
  return (
    // eslint-disable-next-line react/button-has-type
    <button className={cx("button-toggle")} onClick={() => toggle()}>
      <span className={cx("text")}>
        {selectedItem?.text || "항목을 선택하세요"}
      </span>
    </button>
  );
}

function DDItem({
  item,
  index,
  selectedIndex,
  focusedIndex,
  selectIndex,
  itemsRef,
}: DropdownItemProps<DropdownItemType>) {
  return (
    <li
      className={cx("item")}
      role="option"
      aria-selected={selectedIndex === index}
      aria-current={focusedIndex === index}
      ref={(r) => {
        if (r && itemsRef.current) {
          // eslint-disable-next-line no-param-reassign
          itemsRef.current[index] = r;
        }
      }}
    >
      <button onClick={() => selectIndex(index)}>
        <span>{item.text}</span>
      </button>
    </li>
  );
}

const dropdownPosition = {
  top: 5,
  bottom: 5,
  left: 0,
  right: 0,
};

export function DDList({ children, containerRef, isOpen }: DropdownListProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const style = useStyleInView(
    containerRef,
    listRef,
    dropdownPosition,
    "absolute",
    true,
  );
  const $root = document.querySelector("#popoverRoot");

  if (!$root) {
    return null;
  }

  return createPortal(
    <ul
      className={cx("DropdownList")}
      style={{ display: isOpen ? "block" : "none", ...style }}
      ref={listRef}
    >
      {children}
    </ul>,
    $root,
  );
}

export function DDContainer({
  handleKeyDown,
  children,
  containerRef,
}: {
  handleKeyDown: (e: KeyboardEvent) => void;
  children: ReactNode;
  containerRef: RefObject<HTMLDivElement>;
}) {
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={cx("Dropdown")}
      onKeyDown={handleKeyDown}
      onClick={(e) => e.stopPropagation()}
      ref={containerRef}
    >
      {children}
    </div>
  );
}

function Dropdown4() {
  const { getContainerProps, getTriggerProps, getListProps, getItemProps } =
    useDropdown(data);

  return (
    <article>
      <h3>#4. Headless Component - popover</h3>
      <p>-</p>
      <p>-</p>
      <p>-</p>
      <p>-</p>
      <p>-</p>
      <p>-</p>
      <p>-</p>
      <p>-</p>
      <p>-</p>
      <p>-</p>
      <p>-</p>
      <p>-</p>
      <p>-</p>
      <p>-</p>
      <p>-</p>
      <p>-</p>
      <p>-</p>
      <p>-</p>
      <DDContainer {...getContainerProps()}>
        <DDTrigger {...getTriggerProps()} />
        <DDList {...getListProps()}>
          {data.map((item, i) => (
            <DDItem key={item.id} {...getItemProps(i)} />
          ))}
        </DDList>
      </DDContainer>
      <p>-</p>
      <p>-</p>
      <p>-</p>
      <p>-</p>
      <p>-</p>
      <p>-</p>
      <p>-</p>
      <p>-</p>
      <p>-</p>
      <p>-</p>
    </article>
  );
}

export default Dropdown4;
