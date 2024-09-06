/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { RefObject, useRef } from "react";

import useStyleInView from "#/hook/useStyleInView";
import cx from "../cx";

const menuPosition = {
  top: 39,
  bottom: "calc(100% - 5px)",
  left: 8,
  right: 8,
};

function MenuPopover({
  id,
  close,
  wrapperRef,
}: {
  id: string;
  close: () => void;
  wrapperRef: RefObject<HTMLElement>;
}) {
  const targetRef = useRef<HTMLUListElement>(null);
  const style = useStyleInView(wrapperRef, targetRef, menuPosition);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className={cx("MenuPopover")} onClick={close}>
      <ul
        className={cx("menus")}
        onClick={(e) => e.stopPropagation()}
        ref={targetRef}
        style={style}
      >
        <li>#{id}</li>
        <li>스레드의 댓글</li>
        <li>메시지 전달</li>
        <li>나중을 위해 저장</li>
        <li>읽지 않음으로 표시</li>
        <li>삭제</li>
      </ul>
    </div>
  );
}

export default MenuPopover;
