/* eslint-disable react/button-has-type */
import { KeyboardEvent, ReactNode } from "react";

import cx from "../cx";
import data from "../data";
import createDropdown, {
  DropdownItemProps,
  DropdownListProps,
  DropdownTriggerProps,
} from "./dropdown";

type DropdownItemType = {
  id: string;
  text: string;
};
const Dropdown = createDropdown<DropdownItemType>();

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

function DDList({ items, isOpen }: DropdownListProps<DropdownItemType>) {
  if (!isOpen) {
    return null;
  }

  return (
    <ul className={cx("DropdownList")}>
      {items.map((item, i) => (
        <Dropdown.Item item={item} index={i} key={item.id}>
          {DDItem}
        </Dropdown.Item>
      ))}
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

function Dropdown2() {
  return (
    <article>
      <h3>#2. Headless Component</h3>
      <Dropdown.Provider list={data}>
        <Dropdown.Container Component={DDContainer}>
          <Dropdown.Trigger>{DDTrigger}</Dropdown.Trigger>
          <Dropdown.List>{DDList}</Dropdown.List>
        </Dropdown.Container>
      </Dropdown.Provider>
    </article>
  );
}

export default Dropdown2;
