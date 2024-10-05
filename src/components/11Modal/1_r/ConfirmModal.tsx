import { Modal } from "./ModalLayout";

type TProps = {
  id: string;
  children: React.ReactNode;
  confirmed: boolean | null;
  onConfirm: () => void;
  onCancel: () => void;
  hide: () => void;
};

export function ConfirmModal({
  id,
  children,
  confirmed,
  onConfirm,
  onCancel,
  hide,
}: TProps) {
  return (
    <Modal id={id} hideOnClickOutside>
      <Modal.Header
        title={confirmed ? "확인된 컨펌" : "확인안된 컨펌"}
        hide={hide}
      />
      <Modal.Content>{children}</Modal.Content>
      <Modal.Footer>
        <button type="button" onClick={onConfirm}>
          확인
        </button>
        <button type="button" onClick={onCancel}>
          취소
        </button>
      </Modal.Footer>
    </Modal>
  );
}
