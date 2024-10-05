import { ReactNode, RefObject, useCallback } from "react";

import { cx } from "../cx";

type TProps = {
  modalRef: RefObject<HTMLDialogElement>;
  hideOnClickOutside?: boolean;
  children: ReactNode;
  hide: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClose?: (...arg: any[]) => void;
  className?: string;
};

function Modal({
  modalRef,
  hideOnClickOutside = false,
  children,
  hide,
  onClose,
  className,
}: TProps) {
  const handleClick = useCallback(
    (event: React.SyntheticEvent) => {
      if (hideOnClickOutside && modalRef.current === event.target) {
        hide();
        onClose?.();
      }
    },
    [hide, hideOnClickOutside, modalRef, onClose],
  );

  return (
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
      <button
        type="button"
        className={cx("close", "gModalClose")}
        onClick={hide}
      />
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

export { Modal };
