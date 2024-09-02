/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ReactNode, SyntheticEvent } from "react";
import { createPortal } from "react-dom";

import cx from "../cx";

function Modal({
  hideOnClickOutside = false,
  children,
  opened,
  hide,
}: {
  hideOnClickOutside?: boolean;
  children: ReactNode;
  opened: boolean;
  hide: () => void;
}) {
  const stopPropagation = (e: SyntheticEvent) => e.stopPropagation();

  return opened
    ? createPortal(
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div
          className={cx("Modal")}
          onClick={hideOnClickOutside ? hide : undefined}
        >
          <div className={cx("inner")} onClick={stopPropagation}>
            {children}
          </div>
        </div>,
        document.querySelector("#modalRoot")!,
      )
    : null;
}

function ModalHeader({
  title,
  children,
  hide,
}: {
  title?: string;
  children?: ReactNode;
  hide?: () => void;
}) {
  return (
    <div className={cx("ModalHeader")}>
      <div className={cx("title")}>{title}</div>
      {children}
      <button className={cx("close")} onClick={hide} />
    </div>
  );
}

function ModalContent({ children }: { children: ReactNode }) {
  return <div className={cx("ModalContent")}>{children}</div>;
}

function ModalFooter({ children }: { children: ReactNode }) {
  return <div className={cx("ModalFooter")}>{children}</div>;
}

Modal.Header = ModalHeader;
Modal.Content = ModalContent;
Modal.Footer = ModalFooter;

/* Compound Component */

export default Modal;
