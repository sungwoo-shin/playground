/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { RefObject } from "react";

import { useStyleInView } from "#/hooks/useStyleInView";
import cx from "../cx";

const menuPosition = {
  top: -4,
  bottom: -4,
  left: 8,
  right: 8,
};
function MenuPopover({
  id,
  close,
  wrapperRef,
  dialogRef,
  opened,
}: {
  id: string;
  close: () => void;
  wrapperRef: RefObject<HTMLElement>;
  dialogRef: RefObject<HTMLDialogElement>;
  opened: boolean;
}) {
  const style = useStyleInView({
    wrapperRef,
    targetRef: dialogRef,
    position: menuPosition,
    positionType: "absolute",
    needUpdate: opened,
  });

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <dialog
      className={cx("MenuDialog")}
      ref={dialogRef}
      style={style}
      onClick={close}
    >
      <ul className={cx("menus")} onClick={(e) => e.stopPropagation()}>
        <li>#{id}</li>
        <li>스레드의 댓글</li>
        <li>메시지 전달</li>
        <li>나중을 위해 저장</li>
        <li>읽지 않음으로 표시</li>
        <li>삭제</li>
      </ul>
    </dialog>
  );
}

export default MenuPopover;
