import { useModalActions } from "./ModalContext";
import { Modal } from "./ModalLayout";

type TProps = {
  id: string;
  text: string;
};

export function AlertModal({ id, text }: TProps) {
  const { closeModal } = useModalActions();

  return (
    <Modal id={id}>
      <Modal.Content>
        <p>{text}</p>
      </Modal.Content>
      <Modal.Footer>
        <button type="button" onClick={() => closeModal(id)}>
          확인
        </button>
      </Modal.Footer>
    </Modal>
  );
}
