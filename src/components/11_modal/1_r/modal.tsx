/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ReactNode, SyntheticEvent } from "react";

import cx from "../cx";
import { useSetModals } from "./modalContext";

function Modal({
  id,
  hideOnClickOutside = false,
  children,
}: {
  id: string;
  hideOnClickOutside?: boolean;
  children: ReactNode;
}) {
  const { closeModal } = useSetModals();
  const closeThis = () => closeModal(id);
  const stopPropagation = (e: SyntheticEvent) => e.stopPropagation();

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={cx("Modal")}
      onClick={hideOnClickOutside ? closeThis : undefined}
    >
      <div className={cx("inner")} onClick={stopPropagation}>
        {children}
      </div>
    </div>
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
