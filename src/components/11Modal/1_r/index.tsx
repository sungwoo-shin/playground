import { ReactNode, useState } from "react";

import { AlertModal } from "./AlertModal";
import { ConfirmModal } from "./ConfirmModal";
import { FormModal } from "./FormModal";
import { ModalContextProvider, useModalActions } from "./ModalContext";

function AlertTrigger({ id, text }: { id: string; text: string }) {
  const { openModal } = useModalActions();

  const openAlertModal = () => {
    openModal(id, <AlertModal id={id} text={text} />);
  };

  return (
    <button type="button" onClick={openAlertModal}>
      얼럿 모달 열기
    </button>
  );
}

function ConfirmTrigger({ id, children }: { id: string; children: ReactNode }) {
  const { openModal, closeModal } = useModalActions();
  const [confirmed, setConfirmed] = useState<boolean | null>(null);

  const closeThis = () => closeModal(id);

  const openConfirmModal = () => {
    openModal(
      id,
      <ConfirmModal
        id={id}
        confirmed={confirmed}
        onConfirm={() => {
          setConfirmed(true);
          closeThis();
        }}
        onCancel={() => {
          setConfirmed(false);
          closeThis();
        }}
        hide={closeThis}
      >
        {children}
      </ConfirmModal>,
    );
  };

  return (
    <button type="button" onClick={openConfirmModal}>
      확인 모달 열기 {confirmed ? "확인됨" : "확인안됨"}
    </button>
  );
}

function FormTrigger({ id }: { id: string }) {
  const { openModal } = useModalActions();

  const openFormModal = () => {
    openModal(
      id,
      <FormModal
        id={id}
        onSubmit={(formData) => {
          console.log(Array.from(formData));
        }}
      >
        <input name="name" placeholder="상품명" />
        <input name="price" type="number" placeholder="가격" />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>
          <input name="soldOut" type="checkbox" /> 품절
        </label>
      </FormModal>,
    );
  };

  return (
    <button type="button" onClick={openFormModal}>
      폼 모달 열기
    </button>
  );
}

export function Modal1R() {
  return (
    <ModalContextProvider>
      <h2>모달</h2>
      <h3>
        #1. React<sub>context</sub>
      </h3>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <AlertTrigger id="1" text="1번 경고입니다. 아무튼 경고예요." />
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <AlertTrigger id="2" text="2번 경고입니다. 주의하세욧!" />
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <ConfirmTrigger id="3">
        <p>이건 이래서 저런 문제가 있는데, 정말 진행합니까?</p>
      </ConfirmTrigger>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <ConfirmTrigger id="4">
        <>
          <p>이건 이래서 저런 문제가 있는데, 정말 진행합니까?</p>
          <p>중첩해서 모달을 띄워봅시다아</p>
          <p>중첩해서 모달을 띄워봅시다아</p>
          <p>중첩해서 모달을 띄워봅시다아</p>
          <ConfirmTrigger id="5">
            <>
              <p>이건 이런 문제가 있는데, 정말 진행합니까?</p>
              <p>중첩해서 모달을 띄워봅시다아</p>
              <p>중첩해서 모달을 띄워봅시다아</p>
              <ConfirmTrigger id="6">
                <p>이건 문제가 있는데, 정말 진행합니까?</p>
              </ConfirmTrigger>
            </>
          </ConfirmTrigger>
        </>
      </ConfirmTrigger>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <FormTrigger id="7" />
    </ModalContextProvider>
  );
}
