import { cx } from "../cx";
import { useModalActions } from "./ModalContext";

type TProps = {
  id: string;
  hideOnClickOutside?: boolean;
  children: React.ReactNode;
};

function Modal({ id, hideOnClickOutside = false, children }: TProps) {
  const { closeModal } = useModalActions();

  return (
    <div
      className={cx("Modal")}
      onClick={hideOnClickOutside ? () => closeModal(id) : undefined}
    >
      <div className={cx("inner")} onClick={(event) => event.stopPropagation()}>
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
