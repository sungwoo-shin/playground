/* eslint-disable react/button-has-type */
import { useRef, useState } from "react";

import useInfiniteScroll from "#/components/part1/useInfiniteScroll";
import { ViewportRectContextProvider } from "#/contexts/ViewportRectContextProvider";
import cx from "../cx";
import MenuPopover from "./menuPopover";

function ListItem({
  id,
  title,
  index,
}: {
  id: string;
  title: string;
  index: number;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [menuOpened, toggleMenu] = useState(false);
  const handleClickButton = () => toggleMenu(true);

  return (
    <li id={id} className={cx("list-item")}>
      #{index + 1}. {title}
      <button
        className={cx("popover-button")}
        onClick={handleClickButton}
        ref={buttonRef}
      />
      {menuOpened && (
        <MenuPopover
          id={`${index + 1}`}
          close={() => toggleMenu(false)}
          wrapperRef={buttonRef}
        />
      )}
    </li>
  );
}

function Popover2() {
  const { data, state, moreRef } = useInfiniteScroll();

  return (
    <ViewportRectContextProvider>
      <div className={cx("Popovers")}>
        <h2>팝오버</h2>
        <h3>
          #2. React<sub>createPortal로 외부 이동</sub>
        </h3>
        <ul className={cx("list")}>
          {data.map((page, i) =>
            // eslint-disable-next-line react/no-array-index-key
            page.map((item, j) => <ListItem {...item} key={`${i}_${j}`} />),
          )}
        </ul>
        <div ref={moreRef} />
        {state === "loading" && <div>Loading...</div>}
      </div>
      <div id="popoverRoot" />
    </ViewportRectContextProvider>
  );
}

export default Popover2;
