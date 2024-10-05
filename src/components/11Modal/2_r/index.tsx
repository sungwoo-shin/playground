import { ReactNode, useState } from "react";

import { AlertModal, ConfirmModal, FormModal } from "./modalComponents";
import { ModalRoot } from "./modalRoot";
import { useModal } from "./useModal";

type TProps = {
  text: string;
};

function AlertTrigger({ text }: TProps) {
  const { opened, openModal, closeModal } = useModal();

  return (
    <>
      <button type="button" onClick={openModal}>
        얼럿 모달 열기
      </button>
      <AlertModal opened={opened} text={text} hide={closeModal} />
    </>
  );
}

function ConfirmTrigger({ children }: { children: ReactNode }) {
  const { opened, openModal, closeModal } = useModal();
  const [confirmed, setConfirmed] = useState<boolean | null>(null);

  return (
    <>
      <button type="button" onClick={openModal}>
        확인 모달 열기 {confirmed ? "확인됨" : "확인안됨"}
      </button>
      <ConfirmModal
        opened={opened}
        confirmed={confirmed}
        onConfirm={() => {
          setConfirmed(true);
          closeModal();
        }}
        onCancel={() => {
          setConfirmed(false);
          closeModal();
        }}
        hide={closeModal}
      >
        {children}
      </ConfirmModal>
    </>
  );
}

function FormTrigger({ id }: { id: string }) {
  const { opened, openModal, closeModal } = useModal();

  return (
    <>
      <button type="button" onClick={openModal}>
        폼모달 열기
      </button>
      <FormModal
        id={id}
        opened={opened}
        hide={closeModal}
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
      </FormModal>
    </>
  );
}

export function Modal2R() {
  return (
    <>
      <h2>모달</h2>
      <h3>
        #2. React<sub>createPortal</sub>
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
      <AlertTrigger text="1번 경고입니다. 아무튼 경고예요." />
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <AlertTrigger text="2번 경고입니다. 주의하세욧!" />
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <ConfirmTrigger>
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
      <ConfirmTrigger>
        <>
          <p>이건 이래서 저런 문제가 있는데, 정말 진행합니까?</p>
          <p>중첩해서 모달을 띄워봅시다아</p>
          <p>중첩해서 모달을 띄워봅시다아</p>
          <p>중첩해서 모달을 띄워봅시다아</p>
          <ConfirmTrigger>
            <>
              <p>이건 이런 문제가 있는데, 정말 진행합니까?</p>
              <p>중첩해서 모달을 띄워봅시다아</p>
              <p>중첩해서 모달을 띄워봅시다아</p>
              <ConfirmTrigger>
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

      <ModalRoot />
    </>
  );
}
