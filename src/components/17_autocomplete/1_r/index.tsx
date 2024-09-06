/* eslint-disable react/button-has-type */
import {
  KeyboardEvent,
  ReactNode,
  RefObject,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { DDList } from "#/components/16_dropdown/4_r";
import useDropdown from "#/components/16_dropdown/4_r/useDropdown";
import cx from "../cx";
import data from "../data";

type Country = {
  id: string;
  name: string;
};

export type ACFormProps<T> = {
  list: T[];
  isOpen: boolean;
  selectedItem: T;
  focusIndex: (index: number) => void;
  selectIndex: (index: number) => void;
  setItems: (items: T[]) => void;
  toggle: (force?: boolean) => void;
};

export type ACItemProps<T> = {
  item: T;
  index: number;
  focusedIndex: number;
  selectedIndex: number;
  selectIndex: (index: number) => void;
  itemsRef: RefObject<HTMLElement[]>;
};

export type ACContainerProps = {
  handleKeyDown: (e: KeyboardEvent) => void;
};

function ACForm({
  list,
  selectedItem,
  isOpen,
  focusIndex,
  selectIndex,
  toggle,
  setItems,
}: ACFormProps<Country>) {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleInput = useCallback((e: SyntheticEvent) => {
    const el = e.target as HTMLInputElement;
    const val = el.value.trim().toLowerCase();
    const res = list.filter(
      ({ name }) => val && name.toLowerCase().includes(val),
    );
    focusIndex(-1);
    selectIndex(-1);
    setItems(res);
    if (res.length > 0) {
      toggle(true);
    }
  }, []);

  useEffect(() => {
    if (selectedItem && inputRef.current) {
      inputRef.current.value = selectedItem.name;
    }
  }, [selectedItem]);

  return (
    <div className={cx("form")}>
      <input
        type="text"
        name="country"
        placeholder="Search Country"
        autoComplete="off"
        onChange={handleInput}
        ref={inputRef}
      />
      <button
        className={cx("toggle-button", { open: isOpen })}
        type="button"
        onClick={() => toggle()}
      />
    </div>
  );
}

function ACItem({
  item,
  index,
  selectedIndex,
  focusedIndex,
  selectIndex,
  itemsRef,
}: ACItemProps<Country>) {
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
        <span>{item.name}</span>
      </button>
    </li>
  );
}

function ACContainer({
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

function Autocomplete1() {
  const [items, setItems] = useState<Country[]>([]);
  const {
    getContainerProps,
    getTriggerProps,
    getListProps,
    getItemProps,
    isOpen,
  } = useDropdown(items);

  return (
    <ACContainer {...getContainerProps()}>
      <ACForm
        {...getTriggerProps()}
        list={data}
        isOpen={isOpen}
        setItems={setItems}
      />
      <DDList {...getListProps()}>
        {items.map((item, index) => (
          <ACItem key={item.id} {...getItemProps(index)} />
        ))}
      </DDList>
    </ACContainer>
  );
}

export default Autocomplete1;
