import { createPortal } from "react-dom";

import { cx } from "../cx";

type TProps = {
  hideOnClickOutside?: boolean;
  children: React.ReactNode;
  opened: boolean;
  hide: () => void;
};

function Modal({ hideOnClickOutside = false, children, opened, hide }: TProps) {
  return opened
    ? createPortal(
        <div
          className={cx("Modal")}
          onClick={hideOnClickOutside ? hide : undefined}
        >
          <div
            className={cx("inner")}
            onClick={(event) => event.stopPropagation()}
          >
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
  children?: React.ReactNode;
  hide?: () => void;
}) {
  return (
    <div className={cx("ModalHeader")}>
      <div className={cx("title")}>{title}</div>
      {children}
      <button type="button" className={cx("close")} onClick={hide} />
    </div>
  );
}

function ModalContent({ children }: { children: React.ReactNode }) {
  return <div className={cx("ModalContent")}>{children}</div>;
}

function ModalFooter({ children }: { children: React.ReactNode }) {
  return <div className={cx("ModalFooter")}>{children}</div>;
}

Modal.Header = ModalHeader;
Modal.Content = ModalContent;
Modal.Footer = ModalFooter;

export { Modal };
