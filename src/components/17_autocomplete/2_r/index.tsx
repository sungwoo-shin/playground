/* eslint-disable react/button-has-type */
/* https://react.dev/reference/react/useDeferredValue */
import {
  KeyboardEvent,
  ReactNode,
  RefObject,
  SyntheticEvent,
  useCallback,
  useDeferredValue,
  useEffect,
  useState,
} from "react";

import { DDList } from "#/components/16_dropdown/4_r";
import useDropdown, {
  DropdownItemProps,
} from "#/components/16_dropdown/4_r/useDropdown";
import cx from "../cx";
import { useFetch } from "./fakeApi";

type Album = {
  id: string;
  title: string;
  year: number;
};

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

export type ACFormProps<T> = {
  isOpen: boolean;
  selectedItem: T;
  focusIndex: (index: number) => void;
  selectIndex: (index: number) => void;
  setItems: (items: T[]) => void;
  toggle: (force?: boolean) => void;
};

function ACForm({
  selectedItem,
  isOpen,
  focusIndex,
  selectIndex,
  toggle,
  setItems,
}: ACFormProps<Album>) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const { data, state } = useFetch<Album[]>(
    `/search?q=${deferredQuery}`,
    !!deferredQuery,
  );

  const handleInput = useCallback((e: SyntheticEvent) => {
    const el = e.target as HTMLInputElement;
    const val = el.value.trim().toLowerCase();
    focusIndex(-1);
    selectIndex(-1);
    setQuery(val);
  }, []);

  useEffect(() => {
    if (selectedItem) {
      setQuery(selectedItem.title);
    }
  }, [selectedItem]);

  useEffect(() => {
    const hasValue = !!data?.length;
    toggle(hasValue);
    setItems(data || []);
  }, [data, toggle, setItems]);

  return (
    <div className={cx("form")}>
      <input
        type="text"
        name="country"
        placeholder="Search Album"
        autoComplete="off"
        onChange={handleInput}
        value={query}
      />
      <button
        className={cx("toggle-button", { open: isOpen })}
        type="button"
        onClick={() => toggle()}
      />
      {state}
    </div>
  );
}

function ACItem({
  item: { title, year },
  index,
  selectedIndex,
  focusedIndex,
  selectIndex,
  itemsRef,
}: DropdownItemProps<Album>) {
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
      <button onClick={() => selectIndex}>
        {title} <sub>{year}</sub>
      </button>
    </li>
  );
}

function Autocomplete2() {
  const [items, setItems] = useState<Album[]>([]);
  const {
    getContainerProps,
    getTriggerProps,
    getListProps,
    getItemProps,
    isOpen,
  } = useDropdown(items);

  return (
    <ACContainer {...getContainerProps()}>
      <ACForm {...getTriggerProps()} setItems={setItems} isOpen={isOpen} />
      <DDList {...getListProps()}>
        {items.map((item, index) => (
          <ACItem key={item.id} {...getItemProps(index)} />
        ))}
      </DDList>
    </ACContainer>
  );
}

export default Autocomplete2;
