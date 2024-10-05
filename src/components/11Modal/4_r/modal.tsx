/* eslint-disable react/button-has-type */
import { ReactNode, RefObject, SyntheticEvent, useCallback } from "react";

import { cx } from "../cx";

function Modal({
  modalRef,
  hideOnClickOutside = false,
  children,
  hide,
  onClose,
  className,
}: {
  modalRef: RefObject<HTMLDialogElement>;
  hideOnClickOutside?: boolean;
  children: ReactNode;
  hide: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClose?: (...arg: any[]) => void;
  className?: string;
}) {
  const handleClose = () => {
    hide();
    onClose?.();
  };

  const handleClick = useCallback(
    (e: SyntheticEvent) => {
      if (hideOnClickOutside && modalRef.current === e.target) {
        handleClose();
      }
    },
    [hideOnClickOutside],
  );

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <dialog
      className={cx("Dialog", className)}
      ref={modalRef}
      onClick={handleClick}
    >
      {children}
    </dialog>
  );
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
    <div className={cx("ModalHeader", "gModalHeader")}>
      <div className={cx("title")}>{title}</div>
      {children}
      <button className={cx("close", "gModalClose")} onClick={hide} />
    </div>
  );
}

function ModalContent({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={cx("ModalContent", className)}>{children}</div>;
}

function ModalFooter({ children }: { children: ReactNode }) {
  return <div className={cx("ModalFooter")}>{children}</div>;
}

Modal.Header = ModalHeader;
Modal.Content = ModalContent;
Modal.Footer = ModalFooter;

/* Compound Component */

export default Modal;
