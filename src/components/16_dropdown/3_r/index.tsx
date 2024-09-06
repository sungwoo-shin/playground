/* eslint-disable react/button-has-type */
import { KeyboardEvent, ReactNode } from "react";

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

function DDList({ children, isOpen }: DropdownListProps) {
  return (
    <ul
      className={cx("DropdownList")}
      style={{ display: isOpen ? "block" : "none" }}
    >
      {children}
    </ul>
  );
}

function DDContainer({
  handleKeyDown,
  children,
}: {
  handleKeyDown: (e: KeyboardEvent) => void;
  children: ReactNode;
}) {
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={cx("Dropdown")}
      onKeyDown={handleKeyDown}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
}

function Dropdown3() {
  const { getContainerProps, getTriggerProps, getListProps, getItemProps } =
    useDropdown(data);

  return (
    <article>
      <h3>#3. Headless Component - only hook</h3>
      <DDContainer {...getContainerProps()}>
        <DDTrigger {...getTriggerProps()} />
        <DDList {...getListProps()}>
          {data.map((item, i) => (
            <DDItem key={item.id} {...getItemProps(i)} />
          ))}
        </DDList>
      </DDContainer>
    </article>
  );
}

export default Dropdown3;
