import { useModalActions } from "./ModalContext";
import { Modal } from "./ModalLayout";

type TProps = {
  id: string;
  children: React.ReactNode;
  onSubmit?: (formData: FormData) => void;
  onCancel?: () => void;
};

/**
 * formId를 통한 form, submit button의 연결
 */
export function FormModal({ id, children, onSubmit, onCancel }: TProps) {
  const { closeModal } = useModalActions();

  const formId = `form_${id}`;

  const closeThis = () => closeModal(id);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    onSubmit?.(formData);

    closeThis();
  };

  const handleCancel = () => {
    onCancel?.();
    closeThis();
  };

  return (
    <Modal id={id}>
      <Modal.Header hide={closeThis} />
      <Modal.Content>
        <form id={formId} onSubmit={handleSubmit}>
          {children}
        </form>
      </Modal.Content>
      <Modal.Footer>
        <button type="submit" form={formId}>
          확인
        </button>
        <button type="button" onClick={handleCancel}>
          취소
        </button>
      </Modal.Footer>
    </Modal>
  );
}
