import { Modal } from "./modal";

export function AlertModal({
  opened,
  text,
  hide,
}: {
  opened: boolean;
  text: string;
  hide: () => void;
}) {
  return (
    <Modal opened={opened} hide={hide}>
      <Modal.Content>
        <p>{text}</p>
      </Modal.Content>
      <Modal.Footer>
        <button type="button" onClick={hide}>
          확인
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export function ConfirmModal({
  opened,
  children,
  confirmed,
  onConfirm,
  onCancel,
  hide,
}: {
  opened: boolean;
  children: React.ReactNode;
  confirmed: boolean | null;
  onConfirm: () => void;
  onCancel: () => void;
  hide: () => void;
}) {
  return (
    <Modal opened={opened} hide={hide} hideOnClickOutside>
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

export function FormModal({
  id,
  opened,
  children,
  onSubmit,
  onCancel,
  hide,
}: {
  id: string;
  children: React.ReactNode;
  opened: boolean;
  onSubmit?: (formData: FormData) => void;
  onCancel?: () => void;
  hide: () => void;
}) {
  const formId = `form_${id}`;

  const handleSubmit: React.FormEventHandler = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    onSubmit?.(formData);
    hide();
  };

  const handleCancel = () => {
    onCancel?.();
    hide();
  };

  return (
    <Modal opened={opened} hide={hide}>
      <Modal.Header hide={hide} />
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
